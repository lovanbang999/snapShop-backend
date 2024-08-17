import { ROLES_USER } from '@/constants'
import { Document, Schema, model } from 'mongoose'

interface OAuthIdType {
  google?: string;
  facebook?: string;
  x?: string;
}

export interface UserType extends Document {
  username?: string;
  email: string;
  password?: string;
  avata?: string;
  oauthId?: OAuthIdType;
  isActive: boolean;
  roles: string[];
}

const DOCUMENT_NAME = 'user'
const COLLECTION_NAME = 'users'

const userModel = new Schema<UserType>({
  username: { type: String, unique: true, trim: true, parse: true },
  email: { type: String, unique: true, trim: true, required: true },
  password: {
    type: String,
    parse: false,
    minlength: 6
  },
  avata: { type: String, default: null },
  oauthId: {
    google: { type: String, unique: true, sparse: true },
    facebook: { type: String, unique: true, sparse: true },
    x: { type: String, unique: true, sparse: true }
  },
  isActive: { type: Boolean, default: false },
  roles: { type: [String], default: [ROLES_USER.USER] }
}, {
  timestamps: true,
  collection: COLLECTION_NAME
})

export default model(DOCUMENT_NAME, userModel)
