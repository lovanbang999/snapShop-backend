import bcrypt from 'bcrypt'
import { AuthFailureError, BadRequestError, ForbiddenError, InternalServerError } from '@/core/error.response'
import userModel from '@/models/user.model'
import { ROLES_USER } from '@/constants'
import { createTokenPair, generatePubAndPrivKey } from '@/auth/authUtil'
import KeyTokenService from './keyToken.service'
import { getInfoData } from '@/utils'
import keyTokenModel from '@/models/keyToken.model'
import { KeyTokenProps } from '@/interfaces/keyToken'
import { UserProps } from '@/interfaces/customRequest'
import codeModel from '@/models/code.model'

export interface SignUpBodyProps {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginBodyProps {
  username: string;
  password: string;
}

interface DeleteResult {
  acknowledged: boolean;
  deletedCount: number;
}

class AccessService {

  static signUp = async ({ username, email, password, confirmPassword }: SignUpBodyProps) => {

    // Check if the password and confirmPassword match
    if (password !== confirmPassword) throw new BadRequestError('Passwords do not match!')

    // Check if the username has in dbs
    const hasUsername = await userModel.findOne({ username }).lean()
    if (!!hasUsername) throw new BadRequestError('Usename has registerd!')

    // Check if the email has in bds
    const foundEmail = await userModel.findOne({ email }).lean()
    if (!!foundEmail) throw new BadRequestError('Email has registerd!')

    // Create hash password from password raw
    const hashedPassword = bcrypt.hashSync(password, 10)

    // Create user
    const createdUser = await userModel.create({ username, email, password: hashedPassword, roles: [ROLES_USER.USER] })

    // Generate publich and private key
    const { publicKey, privateKey } = generatePubAndPrivKey()

    // Create token pair (AT and RT)
    const { accessToken, refreshToken } = createTokenPair({ userId: createdUser._id, email }, publicKey, privateKey)

    // Save the newly created toeken into keyTokenModel
    await KeyTokenService.createKeyToken({
      userId: createdUser._id,
      publicKey,
      privateKey,
      refreshToken,
      refreshTokensUsed: []
    })

    // Return data to client
    return {
      user: getInfoData({ fields: ['_id', 'username', 'email'], object: createdUser }),
      tokens: {
        accessToken,
        refreshToken
      }
    }

  }

  static logIn = async ({ username, password }: LoginBodyProps) => {

    // Check if username exists in dbs?
    const hasUser = await userModel.findOne({ username }).lean()
    if (!hasUser) throw new BadRequestError('User is not registered!')

    const { password: passwordOfUser, _id, email } = hasUser

    if (!passwordOfUser) throw new BadRequestError('User does not exist!')

    // Check if the password from client matches the password in the bds
    const matchPassword: boolean = bcrypt.compareSync(password, passwordOfUser)
    if (!matchPassword) throw new AuthFailureError('There was an authentication error!')

    // Create public and private Key
    const { publicKey, privateKey } = generatePubAndPrivKey()

    // Generate token pair
    const { accessToken, refreshToken }: { accessToken: string, refreshToken: string } = createTokenPair({ userId: _id, email }, publicKey, privateKey)

    // Save the newly token created token into keyTonkenModel
    await KeyTokenService.createKeyToken({
      userId: hasUser._id,
      publicKey,
      privateKey,
      refreshToken
    })

    // Return data to the client
    return {
      user: getInfoData({ fields: ['_id', 'username', 'email'], object: hasUser }),
      tokens: {
        accessToken,
        refreshToken
      }
    }
  }

  static exchange = async ({ code }: { code: string }) => {
    const tempCode = await codeModel.findOne({ code })
    if (!tempCode) throw new AuthFailureError('There was an authentication error!')

    const user = await userModel.findById(tempCode.userId)
    if (!user) throw new BadRequestError('User not found!')

    // Detele the temporary code
    await tempCode.deleteOne({ _id: tempCode._id })

    // Create public and private Key
    const { publicKey, privateKey } = generatePubAndPrivKey()

    // Generate token pair
    const { accessToken, refreshToken }: { accessToken: string, refreshToken: string } = createTokenPair({ userId: user._id, email: user.email }, publicKey, privateKey)

    // Save the newly token created token into keyTonkenModel
    await KeyTokenService.createKeyToken({
      userId: user._id,
      publicKey,
      privateKey,
      refreshToken
    })

    // Return data to the client
    return {
      user: getInfoData({ fields: ['_id', 'username', 'email'], object: user }),
      tokens: {
        accessToken,
        refreshToken
      }
    }
  }

  static handleRefreshToken = async ({
    refreshToken,
    user,
    keyStore
  }: { refreshToken?: string, user?: UserProps, keyStore?: KeyTokenProps }) => {

    if (!user) throw new InternalServerError('An error occurred!')
    const { userId, email } = user

    if (!refreshToken) throw new InternalServerError('An error occurred!')
    if (keyStore?.refreshTokensUsed.includes(refreshToken)) {
      await keyTokenModel.deleteOne({ userId })
      throw new ForbiddenError('Something wrong happend! Please relogin')
    }

    if (keyStore?.refreshToken !== refreshToken) throw new AuthFailureError('User is not registered!')

    const hasUser = await userModel.findOne({ email }).lean()
    if (!hasUser) throw new AuthFailureError('User is not registered!')

    const { publicKey, privateKey } = generatePubAndPrivKey()

    const tokens = createTokenPair({ userId, email }, publicKey, privateKey)

    await keyStore.updateOne({
      $set: {
        publicKey,
        privateKey,
        refreshToken: tokens.refreshToken
      },
      $push: {
        refreshTokensUsed: refreshToken // // Used to receive new tokens
      }
    })

    return {
      user: getInfoData({ fields: ['_id', 'username', 'email'], object: hasUser }),
      tokens
    }
  }

  static logout = async ({ user, keyStore }: { user?: UserProps, keyStore?: KeyTokenProps }) => {

    if (user?.userId !== keyStore?.userId.toString()) throw new AuthFailureError('There was an authentication error!')

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const message: DeleteResult = await keyStore?.deleteOne()

    return { deletecount: message.deletedCount }
  }
}

export default AccessService
