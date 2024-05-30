import bcrypt from 'bcrypt'
import crypto from 'crypto'
import { AuthFailureError, BadRequestError } from '@/core/error.response'
import userModel from '@/models/user.model'
import { ROLES_USER } from '@/constants'
import { createTokenPair } from '@/auth/authUtil'
import KeyTokenService from './keyToken.service'
import { getInfoData } from '@/utils'

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
    const privateKey = crypto.randomBytes(64).toString('hex')
    const publicKey = crypto.randomBytes(64).toString('hex')

    // Create token pair (AT and RT)
    const { accessToken, refreshToken } = createTokenPair({ username, email }, publicKey, privateKey)

    // Save the newly created toeken into keyTokenModel
    await KeyTokenService.createKeyToken({
      userId: createdUser._id,
      publicKey,
      privateKey,
      refreshToken
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

    // Check if the password from client matches the password in the bds
    const matchPassword: boolean = bcrypt.compareSync(password, passwordOfUser as string)
    if (!matchPassword) throw new AuthFailureError('There was an authentication error!')

    // Create public and private Key
    const privateKey: string = crypto.randomBytes(64).toString('hex')
    const publicKey: string = crypto.randomBytes(64).toString('hex')

    // Generate token pair
    const { accessToken, refreshToken }: { accessToken: string, refreshToken: string } = createTokenPair({ _id, email }, publicKey, privateKey)

    // Save the newly token created token into keyTonkenModel
    await KeyTokenService.createKeyToken({
      userId: hasUser._id,
      publicKey,
      privateKey,
      refreshToken
    })

    // Return data to the client
    return {
      user: getInfoData({ fields: ['_id', 'username'], object: hasUser }),
      tokens: {
        accessToken,
        refreshToken
      }
    }
  }

}

export default AccessService
