import { Document, Schema, model, Types } from 'mongoose'

interface CodeType extends Document {
  code: string;
  userId: Types.ObjectId;
  createdAt: Date;
}

const DOCUMENT_NAME = 'code'
const COLLECTION_NAME = 'codes'

const codeModel = new Schema<CodeType>({
  code: { type: String, required: true, unique: true },
  userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  createdAt: { type: Date, default: Date.now, expires: '1m' } // Set TTL(Time to live) 1 minutes
}, {
  timestamps: true,
  collection: COLLECTION_NAME
})

export default model(DOCUMENT_NAME, codeModel)
