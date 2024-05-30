import { Schema, model } from 'mongoose'

const DOCUMENT_NAME = 'key'
const COLLECTION_NAME = 'keys'

const keyModel: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  publicKey: { type: String, required: true },
  privateKey: { type: String, required: true },
  refreshToken: { type: String, required: true },
  refreshTokenUsed: { type: Array, required: [] } // List refreshToken has used
}, {
  timestamps: true,
  collection: COLLECTION_NAME
})

export default model(DOCUMENT_NAME, keyModel)
