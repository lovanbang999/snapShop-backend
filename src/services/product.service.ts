import { CreateProductV1Type } from '@/interfaces/product'
import productModel from '@/models/product.model'
class ProductService {
  static createProduct = async (body: CreateProductV1Type) => {
    const newProduct = await productModel.create(body)

    return newProduct
  }
}

export default ProductService
