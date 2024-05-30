import keyTokenModel from '@/models/keyToken.model'

interface CreateKeyTokenProps {
  userId: unknown;
  publicKey: string;
  privateKey: string;
  refreshToken: string;
}

class KeyTokenService {
  static createKeyToken = async ({ userId, publicKey, privateKey, refreshToken }: CreateKeyTokenProps) => {
    await keyTokenModel.create({ userId, publicKey, privateKey, refreshToken })
  }
}

export default KeyTokenService
