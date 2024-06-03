import { Document } from 'mongoose'

export interface CreateKeyTokenProps {
  userId: unknown;
  publicKey: string;
  privateKey: string;
  refreshToken: string;
  refreshTokensUsed?: string[];
}

export interface KeyTokenProps extends Document {
  userId: unknown;
  publicKey: string;
  privateKey: string;
  refreshToken: string;
  refreshTokensUsed: string[];
}

