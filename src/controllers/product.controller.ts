import { Ok } from '@/core/success.response'
import { Request, Response } from 'express'
import { CusTomRequest } from '@/interfaces/customRequest'
import { CreateProductType, CreateProductV1Type } from '@/interfaces/product'
import ProductService from '@/services/product.service'

interface CreateProductRequestType extends CusTomRequest {
  body: CreateProductType
}

class ProductController {
  createProduct = async (req: CreateProductRequestType, res: Response) => {
    const data = { ...req.body, shopId: req.user?.userId } as CreateProductV1Type
    new Ok({
      message: 'Create new product successfully!',
      metaData: await ProductService.createProduct(data)
    }).send(res)
  }

  getGeneralInfoProducts = async (req: Request, res: Response) => {
    new Ok({
      message: 'Get general product successfully!',
      metaData: await ProductService.getGeneralInfoProducts(req.query)
    }).send(res)
  }
}

export default new ProductController()
