import { CreateProductV1Type } from '@/interfaces/product'
import productModel from '@/models/product.model'
import { getGeneralInfoProducts } from '@/models/repositories/product.repo'
import { ParsedQs } from 'qs'
class ProductService {
  static createProduct = async (body: CreateProductV1Type) => {
    const newProduct = await productModel.create(body)
    return newProduct
  }

  static getGeneralInfoProducts = async (query: ParsedQs) => {
    return getGeneralInfoProducts(query)
  }
}

export default ProductService
