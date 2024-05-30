import Joi from 'joi'
import { Request, Response, NextFunction } from 'express'
import { EMAIL_RULE, EMAIL_RULE_MESSAGE } from '@/constants'
import validateAsyncHandler from '@/helpers/validateAsyncHandler'

const signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const correctCondition = Joi.object({
    username: Joi.string().min(3).max(15).required(),
    email: Joi.string().pattern(EMAIL_RULE).message(EMAIL_RULE_MESSAGE).required(),
    password: Joi.string().min(6).max(20).required(),
    confirmPassword: Joi.ref('password')
  })

  await validateAsyncHandler(correctCondition, req, next, { abortEarly: false })
}

const accessValidation = {
  signUp
}

export default accessValidation
