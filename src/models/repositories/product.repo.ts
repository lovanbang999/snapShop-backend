import { ParsedQs } from 'qs'
import productModel from '../product.model'
import { FilterQuery, SortOrder } from 'mongoose'
import { getSelectData } from '@/utils'

type FilterType = 'active' | 'not-yet-active' | 'violation'

const filterList: Record<FilterType, FilterQuery<any>> = {
  active: { isPublish: true, isDraft: false },
  'not-yet-active': { isPublish: false, isDraft: true },
  violation: { isViolation: true }
}

export const getGeneralInfoProducts = (queryParams: ParsedQs) => {
  // Set filter based on type
  const filter = filterList[queryParams.type as FilterType]

  const sort: Record<string, 1 | -1> = {}

  // Hanlde date sorting
  if (queryParams.date) {
    sort.createdAt = queryParams.date === 'desc' ? -1 : 1
  }

  // Handle price sorting
  if (queryParams.price) {
    sort.price = queryParams.price === 'desc' ? -1 : 1
  }

  return productModel.find(filter)
    .select({ name: 1, thumb: 1, shopId: 1, price: 1, createdAt: 1 })
    .sort(sort)
    .lean()
}

export const getCartProductForUser = async ({
  limit,
  sort,
  page,
  filter,
  select
}: {
  limit: number,
  sort: string,
  page: number,
  filter: Record<string, any>,
  select: string[]
}) => {
  const skip = (page - 1) * limit
  const sortBy: Record<string, SortOrder> = sort === 'ctime' ? { _id: -1 } : { _id: 1 }

  const products = await productModel.find(filter)
    .sort(sortBy)
    .skip(skip)
    .limit(limit)
    .select(getSelectData(select))
    .lean()

  return products
}
