import { CreateKeyTokenProps, KeyTokenProps } from '@/interfaces/keyToken'
import keyTokenModel from '@/models/keyToken.model'
import { convertToObjectIdMongodb } from '@/utils'

class KeyTokenService {
  static createKeyToken = async ({ userId, publicKey, privateKey, refreshToken }: CreateKeyTokenProps): Promise<CreateKeyTokenProps | null> => {
    const filter = { userId }
    const update = { publicKey, privateKey, refreshToken, refreshTokenUsed: [] }
    const options = { upsert: true, new: true }

    return await keyTokenModel.findOneAndUpdate(filter, update, options)
  }

  static findByUserId = async (userId: string): Promise<KeyTokenProps | null> => {
    return await keyTokenModel.findOne({ userId: convertToObjectIdMongodb(userId) })
  }
}

export default KeyTokenService
