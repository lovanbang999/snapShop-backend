import { CreateProductV1Type } from '@/interfaces/product'
import productModel from '@/models/product.model'
import { getCartProductForUser, getGeneralInfoProducts } from '@/models/repositories/product.repo'
import { ParsedQs } from 'qs'

interface getCartProductTypes {
  limit?: number;
  sort?: string;
  page?: number;
  filter?: {
    isPublish?: boolean;
  };
}

class ProductService {
  static createProduct = async (body: CreateProductV1Type) => {
    const newProduct = await productModel.create(body)
    return newProduct
  }

  static getGeneralInfoProducts = async (query: ParsedQs) => {
    return getGeneralInfoProducts(query)
  }

  static getCartProduct = async ({ limit = 50, sort = 'ctime', page = 1 }: getCartProductTypes) => {
    return await getCartProductForUser({ limit, sort, page, filter: { isPublish: true }, select: [
      'thumb', 'name', 'price', 'ratingsAverge'
    ] })
  }
}

export default ProductService
