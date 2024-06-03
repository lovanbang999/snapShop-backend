import { Request } from 'express'
import { KeyTokenProps } from './keyToken'

export interface UserProps {
  userId: string;
  email: string;
}

export interface CusTomRequest extends Request {
  keyStore?: KeyTokenProps;
  user?: UserProps;
  refreshToken?: string;
}
