import { AuthFailureError, ForbiddenError } from '@/core/error.response'
import asyncHandler from '@/helpers/asyncHandler'
import KeyTokenService from '@/services/keyToken.service'
import { jwtVerification } from '@/utils'
import { NextFunction, Response } from 'express'
import { CusTomRequest, UserProps } from '@/interfaces/customRequest'
import keyTokenModel from '@/models/keyToken.model'
import { KeyTokenProps } from '@/interfaces/keyToken'
import userModel from '@/models/user.model'
import { ROLES_USER } from '@/constants'

interface HeaderProps {
  API_KEY: string;
  CLIENT_ID: string;
  AUTHORIZATION: string;
  REFRESHTOKEN: string;
}

const HEADER: HeaderProps = {
  API_KEY: 'x-api-key',
  CLIENT_ID: 'x-client-id',
  AUTHORIZATION: 'authorization',
  REFRESHTOKEN: 'x-rtoken-id'
}

export const authentication = asyncHandler( async (req: CusTomRequest, res: Response, next: NextFunction) => {
  // Check userId missing?
  const userId = req.headers[HEADER.CLIENT_ID] as string
  if (!userId) throw new AuthFailureError('Invalid request!')

  const foundUser = await userModel.findById(userId)
  if (!foundUser) throw new AuthFailureError('An error occurred! Please try again.')

  // Check if keytoken exists?
  const keyStore: KeyTokenProps | null = await KeyTokenService.findByUserId(userId)

  if (!keyStore) throw new AuthFailureError('Something wrong happend! Please relogin')
  const { publicKey, privateKey, refreshTokensUsed } = keyStore

  // Check if req.headers has refreshtoken?
  if (req.headers[HEADER.REFRESHTOKEN]) {
    const refreshToken = (req.headers[HEADER.REFRESHTOKEN] as string).split(' ')[1]

    if (refreshTokensUsed.includes(refreshToken)) {
      await keyTokenModel.deleteOne({ userId })
      throw new AuthFailureError('Something wrong happend! Please relogin')
    }

    const decodeUser = jwtVerification(refreshToken, privateKey) as UserProps
    if (decodeUser.userId as unknown !== userId) throw new AuthFailureError('Something wrong happend! Please relogin')

    req.keyStore = keyStore
    req.user = decodeUser
    req.refreshToken = refreshToken

    next()
    return
  }

  const accessToken = (req.headers[HEADER.AUTHORIZATION] as string).split(' ')[1]
  if (!accessToken) throw new AuthFailureError('Something wrong happend! Please relogin')

  const decodeUser = jwtVerification(accessToken, publicKey) as UserProps

  if (decodeUser.userId as unknown !== userId) throw new AuthFailureError('An error occurred during authentication!')
  req.keyStore = keyStore
  req.user = decodeUser

  next()
} )

export const authenticationForShop = asyncHandler( async (req: CusTomRequest, res: Response, next: NextFunction) => {
  if (!req.user?.userId) throw new ForbiddenError('Forbidden error!')

  const foundUser = await userModel.findById(req.user.userId).lean()
  if (!foundUser) throw new ForbiddenError('Forbidden error!')

  if (Array.isArray(foundUser.roles)) {
    if (!foundUser.roles.includes(ROLES_USER.ADMIN)) throw new ForbiddenError('Forbidden error!')
  }

  next()
})
