import { Types } from 'mongoose'
import { Document } from 'mongoose'

export interface ProductProps extends Document {
  name: string;
  thumb: string;
  description?: string;
  slug?: string;
  price: number;
  quantity: number;
  type: string;
  shopId: Types.ObjectId;
  attributes: object;
  ratingsAverge?: number;
  variation?: object[];
  isDraft?: boolean;
  isPublish?: boolean;
}

export interface ElectronicProps extends Document {
  manufacturer: string;
  deviceModel?: string;
  color?: string;
  shopId: Types.ObjectId;
}

export interface ClothesProps extends Document {
  brand: string;
  size?: string;
  materia?: string;
  shopId: Types.ObjectId;
}

export interface FurnitureProps extends Document {
  brand: string;
  type?: string;
  material: string;
  shopId: Types.ObjectId;
}
