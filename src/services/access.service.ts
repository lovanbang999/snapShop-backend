import bcrypt from 'bcrypt'
import crypto from 'crypto'
import { BadRequestError } from '@/core/error.response'
import userModel from '@/models/user.model'
import { ROLES_USER } from '@/constants'
import { createTokenPair } from '@/auth/authUtil'
import KeyTokenService from './keyToken.service'
import { getInfoData } from '@/utils'

interface BodyProps {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

class AccessService {

  static signUp = async (body: BodyProps) => {

    const { username, email, password, confirmPassword }: BodyProps = body

    if (password !== confirmPassword) throw new BadRequestError('Passwords do not match!')

    const hasUsername = await userModel.findOne({ username }).lean()
    if (!!hasUsername) throw new BadRequestError('Usename has registerd!')

    const foundEmail = await userModel.findOne({ email }).lean()
    if (!!foundEmail) throw new BadRequestError('Email has registerd!')

    const hashedPassword = bcrypt.hashSync(password, 10)

    const createdUser = await userModel.create({ username, email, password: hashedPassword, roles: [ROLES_USER.USER] })

    const privateKey = crypto.randomBytes(64).toString('hex')
    const publicKey = crypto.randomBytes(64).toString('hex')

    const { accessToken, refreshToken } = createTokenPair({ username, email }, publicKey, privateKey)

    await KeyTokenService.createKeyToken({
      userId: createdUser._id,
      publicKey,
      privateKey,
      refreshToken
    })

    return {
      user: getInfoData({ fields: ['_id', 'username', 'email'], object: createdUser }),
      tokens: {
        accessToken,
        refreshToken
      }
    }

  }

}

export default AccessService
