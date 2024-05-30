import keyTokenModel from '@/models/keyToken.model'

interface CreateKeyTokenProps {
  userId: unknown;
  publicKey: string;
  privateKey: string;
  refreshToken: string;
}

class KeyTokenService {
  static createKeyToken = async ({ userId, publicKey, privateKey, refreshToken }: CreateKeyTokenProps) => {
    const filter = { userId }
    const update = { publicKey, privateKey, refreshToken, refreshTokenUsed: [] }
    const options = { upsert: true, new: true }

    return await keyTokenModel.findOneAndUpdate(filter, update, options)
  }
}

export default KeyTokenService
