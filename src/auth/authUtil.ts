import crypto from 'crypto'
import JWT from 'jsonwebtoken'

export const createTokenPair = (payload: string | object | Buffer, publicKey: string, privateKey: string) => {
  const accessToken: string = JWT.sign(payload, publicKey, {
    expiresIn: '2 days'
  })

  const refreshToken: string = JWT.sign(payload, privateKey, {
    expiresIn: '7 days'
  })

  return { accessToken, refreshToken }
}

export const generatePubAndPrivKey = () => {
  const privateKey: string = crypto.randomBytes(64).toString('hex')
  const publicKey: string = crypto.randomBytes(64).toString('hex')

  return { publicKey, privateKey }
}
