import ProductFactory from '@/services/product.service'
import { Ok } from '@/core/success.response'
import { Response } from 'express'
import { CusTomRequest } from '@/interfaces/customRequest'
import { ProductProps } from '@/interfaces/product'

class ProductController {
  createProduct = async (req: CusTomRequest, res: Response) => {
    new Ok({
      message: 'Create new product successfully!',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      metaData: await ProductFactory.createProduct(req.body?.type as string, { ...req.body, shopId: req.user?.userId } as ProductProps)
    }).send(res)
  }
}

export default new ProductController()
