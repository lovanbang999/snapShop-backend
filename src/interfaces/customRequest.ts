import { Request } from 'express'
import { KeyTokenProps } from './keyToken'
import { Types } from 'mongoose'

export interface UserProps {
  userId: Types.ObjectId;
  email: string;
}

export interface CusTomRequest extends Request {
  keyStore?: KeyTokenProps;
  user?: UserProps;
  refreshToken?: string;
}

export interface TypedRequest<T> extends CusTomRequest {
  body: T
}
