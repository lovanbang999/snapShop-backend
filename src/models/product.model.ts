import { Schema, model } from 'mongoose'
import { ImageType } from '@/interfaces/product'
import slugify from 'slugify'

const DOCUMENT_NAME = 'product'
const COLLECTION_NAME = 'products'

const imageSchema = new Schema<ImageType>({
  url: { type: String, required: true },
  publicId: { type: String, required: true }
}, {
  _id: false
})

const actualClassificationSchema = new Schema({
  sku: { type: String, required: true },
  skucode: { type: String, default: null },
  size: { type: String, default: null },
  color: { type: String, default: null },
  image: imageSchema,
  barcode: { type: String, default: null },
  normalGoodsInventory: { type: Number, required: true },
  faultyGoodsInventory: { type: Number, default: null },
  saftyInventory: { type: Number, default: null },
  initialEntryPrice: { type: Number, default: null },
  originalSellingPrice: { type: Number, default: null },
  status: { type: Boolean, default: true }
}, {
  _id: false
})


// Declare the Schema of the product model
const productSchema = new Schema({
  name: { type: String, required: true },
  thumb: imageSchema,
  images: [imageSchema],
  convertionChartImage: imageSchema,
  weight: Number,
  description: String,
  price: String,
  category: {
    type: String,
    required: true,
    enum: ['electronic', 'clothes', 'furniture']
  },
  shopId: { type: Schema.Types.ObjectId, ref: 'shop' },
  actualClassification: [actualClassificationSchema],
  // More
  ratingsAverge: {
    type: Number,
    default: 5,
    min: [1, 'Rating must be above 1.0'],
    max: [5, 'Rating must be below 5.0'],
    set: (value: number) => Math.round(value * 10) / 10
  },
  slug: String,
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

export default model(DOCUMENT_NAME, productSchema)
