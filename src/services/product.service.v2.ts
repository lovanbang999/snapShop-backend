/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { BadRequestError } from '@/core/error.response'
import { ActualClassificationType, CreateProductType, ImageType } from '@/interfaces/product'
import { clothes, electronic, furniture, product } from '@/models/product.model.v2'
import { Types } from 'mongoose'

type Constructor<T = object> = new (...args: T[]) => any;

class ProductFactory {
  private static productRegistry: Record<string, Constructor<CreateProductType>> = {}

  static registerProductType(type: string, classRef: Constructor<CreateProductType>) {
    ProductFactory.productRegistry[type] = classRef
  }

  static async createProduct(type: string, payload: CreateProductType) {
    const productClass = ProductFactory.productRegistry[type]
    if (!productClass) throw new BadRequestError(`Invalid product type ${type}!`)

    return await new productClass(payload).createProduct()
  }
}

class Product {
  name: string
  thumb: ImageType
  images: ImageType[]
  convertionChartImage: ImageType
  description: string
  weight: number
  category: string
  attributes?: any
  actualClassification: ActualClassificationType[]
  shopId: string

  constructor({
    name,
    thumb,
    images,
    convertionChartImage,
    description,
    weight,
    category,
    attributes,
    actualClassification,
    shopId
  }: CreateProductType) {
    this.name = name
    this.thumb = thumb
    this.images = images
    this.description = description
    this.convertionChartImage = convertionChartImage
    this.weight = weight
    this.category = category
    this.actualClassification = actualClassification
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.attributes = attributes ?? undefined
    this.shopId = shopId
  }

  // Create new product
  async createProduct(productId: Types.ObjectId) {
    const newProduct = await product.create({ ...this, _id: productId })

    return newProduct
  }

}

// Define sub-class for different product type Clothes
class Clothes extends Product {
  async createProduct() {
    const newClothes = await clothes.create({
      ...this.attributes,
      shopId: this.shopId
    })

    if (!newClothes) throw new BadRequestError('Create new clothes error!')

    const newProduct = await super.createProduct(newClothes._id as Types.ObjectId)
    if (!newProduct) throw new BadRequestError('Create new product error!')

    return newProduct
  }
}

// Define sub-class for different product type Electronic
class Electronic extends Product {
  async createProduct() {
    const newElectronic = await electronic.create({
      ...this.attributes,
      shopId: this.shopId
    })

    if (!newElectronic) throw new BadRequestError('Create new electronic error!')

    const newProduct = await super.createProduct(newElectronic._id as Types.ObjectId)
    if (!newProduct) throw new BadRequestError('Create new product error!')

    return newProduct
  }
}

// Define sub-class for different product type Furniture
class Furniture extends Product {
  async createProduct() {
    const newFurniture = await furniture.create({
      ...this.attributes,
      shopId: this.shopId
    })

    if (!newFurniture) throw new BadRequestError('Create new furniture error!')

    const newProduct = await super.createProduct(newFurniture._id as Types.ObjectId)
    if (!newProduct) throw new BadRequestError('Create new product error!')

    return newProduct
  }
}

// Register product types
ProductFactory.registerProductType('electronic', Electronic)
ProductFactory.registerProductType('clothes', Clothes)
ProductFactory.registerProductType('furniture', Furniture)

export default ProductFactory
