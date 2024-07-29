import { Types } from 'mongoose'
import { Document } from 'mongoose'

export interface ActualClassificationProps {
  sku: string;
  skucode?: string;
  size?: number;
  color?: string;
  image?: string;
  barcode?: string;
  normalGoodsInventory: number;
  faultyGoodsInventory: number;
  saftyInventory: number;
  initialEntryPrice: number;
  originalSellingPrice: number;
}

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
  actualClassification: ActualClassificationProps;
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

// New
export interface ImageType {
  url: string;
  publicId: string;
}

export interface ActualClassificationType {
  sku: string;
  skuCode?: string;
  size?: string;
  color?: string ;
  image?: ImageType;
  barcode?: string;
  normalGoodsInventory?: number;
  faultyGoodsInventory?: number,
  saftyInventory?: number,
  initialEntryPrice?: number,
  originalSellingPrice?: number,
  status: boolean;
}
export interface CreateProductType {
  name: string;
  thumb: ImageType;
  images: ImageType[];
  convertionChartImage: ImageType;
  description: string;
  weight: number;
  category: string;
  attributes?: any;
  actualClassification: ActualClassificationType[];
  shopId: string;
}

export interface CreateProductV1Type {
  name: string;
  thumb: ImageType;
  images: ImageType[];
  convertionChartImage: ImageType;
  description: string;
  weight: number;
  category: string;
  actualClassification: ActualClassificationType[];
  shopId: string;
}

