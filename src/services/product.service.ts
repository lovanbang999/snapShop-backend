/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { BadRequestError } from '@/core/error.response'
import { ProductProps } from '@/interfaces/product'
import { clothes, electronic, furniture, product } from '@/models/product.model'
import { Types } from 'mongoose'

type Constructor<T = object> = new (...args: T[]) => any;

class ProductFactory {
  private static productRegistry: Record<string, Constructor<ProductProps>> = {}

  static registerProductType(type: string, classRef: Constructor<ProductProps>) {
    ProductFactory.productRegistry[type] = classRef
  }

  static async createProduct(type: string, payload: ProductProps): Promise<ProductProps> {
    const productClass = ProductFactory.productRegistry[type]
    if (!productClass) throw new BadRequestError(`Invalid product type ${type}!`)

    return await new productClass(payload).createProduct()
  }
}

class Product {
  name: string
  thumb: string
  description?: string
  slug?: string
  price: number
  quantity: number
  type: string
  shopId: Types.ObjectId
  attributes: object

  constructor({
    name,
    thumb,
    description,
    price,
    quantity,
    type,
    shopId,
    attributes
  }: ProductProps) {
    this.name = name
    this.thumb = thumb
    this.description = description
    this.price = price
    this.quantity = quantity
    this.type = type
    this.shopId = shopId
    this.attributes = attributes
  }

  // Create new product
  async createProduct(productId: Types.ObjectId): Promise<ProductProps | null> {
    const newProduct = await product.create({ ...this, _id: productId })

    return newProduct
  }

}

// Define sub-class for different product type Clothes
class Clothes extends Product {
  async createProduct(): Promise<ProductProps> {
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
  async createProduct(): Promise<ProductProps> {
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
  async createProduct(): Promise<ProductProps> {
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
ProductFactory.registerProductType('Electronic', Electronic)
ProductFactory.registerProductType('Clothes', Clothes)
ProductFactory.registerProductType('Furniture', Furniture)

export default ProductFactory
