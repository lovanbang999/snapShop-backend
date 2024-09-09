import { ParsedQs } from 'qs'
import productModel from '../product.model'
import { FilterQuery, SortOrder } from 'mongoose'
import { convertToObjectIdMongodb, getSelectData } from '@/utils'

type FilterType = 'all' | 'active' | 'deactive' | 'violation'

interface GetGeneralInfoProducts {
  userId: string,
  type?: string,
  current?: number,
  limit?: number,
  queryParams: ParsedQs
}

const filterList: Record<FilterType, FilterQuery<any>> = {
  all: {
    $or: [
      { isPublish: true, isDraft: false, isViolation: false },
      { isPublish: false, isDraft: true, isViolation: false },
      { isPublish: false, isDraft: false, isViolation: true }
    ]
  },
  active: { isPublish: true, isDraft: false },
  deactive: { isPublish: false, isDraft: true },
  violation: { isViolation: true }
}

export const getGeneralInfoProducts = async ({
  userId,
  type = 'all',
  current = 1,
  limit = 5,
  queryParams
}: GetGeneralInfoProducts) => {
  // Set filter based on type
  const filter = filterList[type as FilterType]
  const filterBy = { shopId: convertToObjectIdMongodb(userId), ...filter }

  const sort: Record<string, 1 | -1> = {}

  // Hanlde date sorting
  if (queryParams.date) {
    sort.createdAt = queryParams.date === 'desc' ? -1 : 1
  }

  // Handle price sorting
  if (queryParams.price) {
    sort.price = queryParams.price === 'desc' ? -1 : 1
  }

  const totalProducts = await productModel.countDocuments(filterBy).lean()
  const totalPages = Math.ceil(totalProducts / limit)
  const skip = (current - 1) * limit

  const result = await productModel.find(filterBy)
    .select({ name: 1, thumb: 1, category: 1, price: 1, quantity: 1, status: 1, createdAt: 1 })
    .limit(limit)
    .skip(skip)
    .sort(sort)
    .lean()

  return { result, totalPages, currentPage: current }
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
