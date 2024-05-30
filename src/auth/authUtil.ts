import JWT from 'jsonwebtoken'

export const createTokenPair = (payload: string | object | Buffer, publicKey: string, privateKey: string) => {
  const accessToken = JWT.sign(payload, publicKey, {
    expiresIn: '2 days'
  })

  const refreshToken = JWT.sign(payload, privateKey, {
    expiresIn: '7 days'
  })

  return { accessToken, refreshToken }
}
