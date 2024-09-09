import { STATUS } from '@/constants/product.constants'
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
    let quantity = 0
    body.actualClassification.forEach(item => {
      quantity += item.normalGoodsInventory

      if (item.faultyGoodsInventory)
        quantity += item.faultyGoodsInventory

      if (item.saftyInventory)
        quantity += item.saftyInventory
    })

    return await productModel.create({
      ...body,
      quantity,
      status: STATUS.DEACTIVE
    })
  }

  static getGeneralInfoProducts = async (userId: string, query: ParsedQs) => {
    const type = query.type as string || undefined
    let current = +(query.current as string) || undefined
    let limit = +(query.pageSize as string) || undefined

    if (current && current < 0) current = 1
    if (limit && limit < 0) limit = 5

    return await getGeneralInfoProducts({
      userId,
      type,
      current,
      limit,
      queryParams: query
    })
  }

  static getCartProduct = async ({ limit = 50, sort = 'ctime', page = 1 }: getCartProductTypes) => {
    return await getCartProductForUser({ limit, sort, page, filter: { isPublish: true }, select: [
      'thumb', 'name', 'price', 'ratingsAverge'
    ] })
  }
}

export default ProductService
