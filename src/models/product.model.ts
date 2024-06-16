import { Schema, model } from 'mongoose'
import { ClothesProps, ElectronicProps, FurnitureProps, ProductProps } from '@/interfaces/product'
import slugify from 'slugify'

const DOCUMENT_NAME = 'product'
const COLLECTION_NAME = 'products'

// Declare the Schema of the product model
const productSchema = new Schema<ProductProps>({
  name: { type: String, required: true },
  thumb: { type: String, required: true },
  description: String,
  slug: String,
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  type: {
    type: String,
    required: true,
    enum: ['Electronic', 'Clothes', 'Furniture']
  },
  shopId: { type: Schema.Types.ObjectId, ref: 'shop' },
  attributes: { type: Schema.Types.Mixed, required: true },
  // More
  ratingsAverge: {
    type: Number,
    default: 4,
    min: [1, 'Rating must be above 1.0'],
    max: [5, 'Rating must be below 5.0'],
    set: (value: number) => Math.round(value * 10) / 10
  },
  variation: { type: Array, default: [] },
  isDraft: { type: Boolean, default: true, index: true, select: false },
  isPublish: { type: Boolean, default: false, index: true, select: false }
}, {
  timestamps: true,
  collection: COLLECTION_NAME
})

// Document middleware: runs before .save() and .create() ...
productSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true })
  next()
})

// Declare the Schema of the product has type [electronic]
const electronicSchema = new Schema<ElectronicProps>({
  manufacturer: { type: String, required: true },
  deviceModel: String,
  color: String,
  shopId: { type: Schema.Types.ObjectId, ref: 'shop', required: true }
}, {
  timestamps: true,
  collection: 'electronics'
})

// Declare the Schema of the product has type [Clothing]
const clothesSchema = new Schema<ClothesProps>({
  brand: { type: String, required: true },
  size: String,
  materia: String,
  shopId: { type: Schema.Types.ObjectId, ref: 'shop', required: true }
}, {
  timestamps: true,
  collection: 'clothes'
})

// Declare the Schema of the product has type [Furniture]
const furnitureSchema = new Schema<FurnitureProps>({
  brand: { type: String, required: true },
  type: String,
  material: String,
  shopId: { type: Schema.Types.ObjectId, ref: 'shop', required: true }
}, {
  timestamps: true,
  collection: 'furnitures'
})

export const product = model(DOCUMENT_NAME, productSchema)
export const electronic = model('electronic', electronicSchema)
export const clothes = model('clothes', clothesSchema)
export const furniture = model('furniture', furnitureSchema)
