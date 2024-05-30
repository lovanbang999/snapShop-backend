import Joi from 'joi'
import { Request, Response, NextFunction } from 'express'
import { EMAIL_RULE, EMAIL_RULE_MESSAGE } from '@/constants'
import validateAsyncHandler from '@/helpers/validateAsyncHandler'

const signUp = (req: Request, res: Response, next: NextFunction): void => {
  const correctCondition = Joi.object({
    username: Joi.string().min(3).max(15).required(),
    email: Joi.string().pattern(EMAIL_RULE).message(EMAIL_RULE_MESSAGE).required(),
    password: Joi.string().min(6).max(20).required(),
    confirmPassword: Joi.ref('password')
  })

  validateAsyncHandler(correctCondition, req, next, { abortEarly: false })
}

const logIn = (req: Request, res: Response, next: NextFunction): void => {
  const correctCondition = Joi.object({
    username: Joi.string().min(3).max(15).required(),
    password: Joi.string().min(6).max(20).required()
  })

  validateAsyncHandler(correctCondition, req, next, { abortEarly: false })
}


const accessValidation = {
  signUp,
  logIn
}

export default accessValidation
