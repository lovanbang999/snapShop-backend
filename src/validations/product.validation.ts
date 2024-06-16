import Joi from 'joi'
import { Request, Response, NextFunction } from 'express'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '@/constants'
import validateAsyncHandler from '@/helpers/validateAsyncHandler'

const create = (req: Request, res: Response, next: NextFunction): void => {
  const correctCondition = Joi.object({
    name: Joi.string().min(3).max(80).required(),
    description: Joi.string(),
    price: Joi.number().required(),
    shopId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).required(),
    type: Joi.string().required(),
    thumb: Joi.string(),
    quantity: Joi.number().required(),
    attributes: Joi.object()
  })

  validateAsyncHandler(correctCondition, req, next, { abortEarly: false })
}

const productValidation = {
  create
}

export default productValidation
