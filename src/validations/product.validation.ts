import Joi from 'joi'
import { Request, Response, NextFunction } from 'express'
import validateAsyncHandler from '@/helpers/validateAsyncHandler'

const create = (req: Request, res: Response, next: NextFunction): void => {
  const imageSchema = Joi.object({
    url: Joi.string(),
    publicId: Joi.string()
  })

  const actualClassificationSchema = Joi.object({
    sku: Joi.string().required(),
    skuCode: Joi.string().optional(),
    size: Joi.string().optional(),
    color: Joi.string().optional(),
    image: imageSchema,
    barcode: Joi.string().optional(),
    normalGoodsInventory: Joi.number().required(),
    faultyGoodsInventory: Joi.number().optional(),
    saftyInventory: Joi.number().optional(),
    initialEntryPrice: Joi.number().optional(),
    originalSellingPrice: Joi.number().optional(),
    status: Joi.boolean().default(true).optional()
  })

  const correctCondition = Joi.object({
    name: Joi.string().min(3).max(80),
    thumb: imageSchema,
    images: Joi.array().items(imageSchema),
    convertionChartImage: imageSchema,
    description: Joi.string().min(120),
    price: Joi.string(),
    weight: Joi.number(),
    category: Joi.string(),
    attributes: Joi.object(),
    actualClassification: Joi.array().items(actualClassificationSchema)
  })

  validateAsyncHandler(correctCondition, req, next, { abortEarly: false })
}

const productValidation = {
  create
}

export default productValidation

