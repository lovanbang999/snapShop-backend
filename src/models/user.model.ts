import { ROLES_USER } from '@/constants'
import { Schema, model } from 'mongoose'

const DOCUMENT_NAME = 'user'
const COLLECTION_NAME = 'users'

const userModel: Schema = new Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isActive: { type: Boolean, default: false },
  roles: { type: Array, default: [ROLES_USER.USER] }
}, {
  timestamps: true,
  collection: COLLECTION_NAME
})

export default model(DOCUMENT_NAME, userModel)
