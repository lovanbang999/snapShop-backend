import { KeyTokenProps } from '@/interfaces/keyToken'
import { Schema, model } from 'mongoose'

const DOCUMENT_NAME = 'key'
const COLLECTION_NAME = 'keys'

const keyModel: Schema = new Schema<KeyTokenProps>({
  userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  publicKey: { type: String, required: true },
  privateKey: { type: String, required: true },
  refreshToken: { type: String, required: true },
  refreshTokensUsed: { type: [], required: true } // List refreshToken has used
}, {
  timestamps: true,
  collection: COLLECTION_NAME
})

export default model<KeyTokenProps>(DOCUMENT_NAME, keyModel)
