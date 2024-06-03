import { AuthFailureError, ForbiddenError, NotFoundError } from '@/core/error.response'
import asyncHandler from '@/helpers/asyncHandler'
import KeyTokenService from '@/services/keyToken.service'
import { jwtVerification } from '@/utils'
import { NextFunction, Response } from 'express'
import { CusTomRequest, UserProps } from '@/interfaces/customRequest'
import keyTokenModel from '@/models/keyToken.model'
import { KeyTokenProps } from '@/interfaces/keyToken'

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

  // Check if keytoken exists?
  const keyStore: KeyTokenProps | null = await KeyTokenService.findByUserId(userId)
  if (!keyStore) throw new NotFoundError('Not found keyStore!')
  const { publicKey, privateKey, refreshTokensUsed } = keyStore

  // Check if req.headers has refreshtoken?
  if (req.headers[HEADER.REFRESHTOKEN]) {
    const refreshToken = req.headers[HEADER.REFRESHTOKEN] as string

    if (refreshTokensUsed.includes(refreshToken)) {
      await keyTokenModel.deleteOne({ userId })
      throw new ForbiddenError('Something wrong happend! Please relogin')
    }

    const decodeUser = jwtVerification(refreshToken, privateKey) as UserProps
    if (decodeUser.userId !== userId) throw new AuthFailureError('An error occurred during authentication!')

    req.keyStore = keyStore
    req.user = decodeUser
    req.refreshToken = refreshToken

    next()
    return
  }

  const accessToken = req.headers[HEADER.AUTHORIZATION] as string
  if (!accessToken) throw new AuthFailureError('Authentication failed!')

  const decodeUser = jwtVerification(accessToken, publicKey) as UserProps
  if (decodeUser.userId !== userId) throw new AuthFailureError('An error occurred during authentication!')
  req.keyStore = keyStore
  req.user = decodeUser

  next()
} )
