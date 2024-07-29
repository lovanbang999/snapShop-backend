import { Schema, model } from 'mongoose'
import { ClothesProps, ElectronicProps, FurnitureProps, ImageType } from '@/interfaces/product'
import slugify from 'slugify'

const DOCUMENT_NAME = 'product'
const COLLECTION_NAME = 'products'

/*
  name: 'Iphone 15 promax',
  thumb: { url: 'https://abc.com', publicId: '133423' },
  images: [
    { url: 'https://abc.com', publicId: '133423' },
    { url: 'https://abc.com', publicId: '133423' },
    { url: 'https://abc.com', publicId: '133423' }
  ],
  convertionChartImage: { url: 'https://abc.com', publicId: '133423' },
  description: 'iPhone 15 Pro Max sở hữu màn hình Super Retina XDR OLED 6.7 inches với độ phân giải 2796 x 1290 pixels, cung cấp trải nghiệm hình ảnh sắc nét, chân thực. So với các phiên bản tiền nhiệm, thế hệ iPhone 15 bản Pro Max đảm bảo mang tới hiệu năng mạnh mẽ với sự hỗ trợ của chipset Apple A17 Pro, cùng bộ nhớ ấn tượng. Đặc biệt hơn, điện thoại iPhone 15 ProMax mới này còn được đánh giá cao với camera sau 48MP và camera trước 12MP, hỗ trợ chụp ảnh với độ rõ nét cực đỉnh.',
  weight: 7,
  type - category: electronic,
  attributes: {
    "manufacturer": "Apple",
    "model": "iPhone 14",
    "color": "Gold"
  } | {},
  ratingsAverge: 4.5,
  actualClassification: [
    {sku: 'Red, S', skucode: 'w35hh', size: "s", status: true, normalGoodsInventory: 3, faultyGoodsInventory: 3, image: { url: 'https://abc.com', publicId: '133423' }}
    {sku: 'Red, M', status: true, faultyGoodsInventory: 3, normalGoodsInventory: 3, image: { url: 'https://abc.com', publicId: '133423' }}
    {sku: 'Blue, S', status: true, faultyGoodsInventory: 3, normalGoodsInventory: 3, image: null}
    {sku: 'Blue, M', status: true, faultyGoodsInventory: 3, normalGoodsInventory: 3, image: { url: 'https://abc.com', publicId: '133423' }}
  ],
  shopId: ObjectId(6683969bae890571b2365d6d),
  slug: 'iphone-15-promax',
  isDraft: true,
  isPublish: flase
*/

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
  originalSellingPrice: { type: Number, default: null }
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
  category: {
    type: String,
    required: true,
    enum: ['electronic', 'clothes', 'furniture']
  },
  shopId: { type: Schema.Types.ObjectId, ref: 'shop' },
  actualClassification: [actualClassificationSchema],
  attributes: { type: Schema.Types.Mixed, required: true },
  // More
  ratingsAverge: {
    type: Number,
    default: 4,
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
