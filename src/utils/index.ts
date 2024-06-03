import JWT from 'jsonwebtoken'
import { AuthFailureError } from '@/core/error.response'
import _ from 'lodash'
import { Types } from 'mongoose'

export const convertToObjectIdMongodb = (id: string): Types.ObjectId => new Types.ObjectId(id)

export const getInfoData = ({ fields, object }: { fields: string[], object: object }): object => {
  return _.pick(object, fields)
}

export const jwtVerification = (token: string, key: string): string | JWT.JwtPayload => {
  try {
    const decode = JWT.verify(token, key as JWT.Secret)
    if (!decode) throw new AuthFailureError('An error occurred during authentication!')

    return decode
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new AuthFailureError('An error occurred during acthentication!')
    } else {
      throw new AuthFailureError('An unknown error occurred during authentication!')
    }
  }
}
