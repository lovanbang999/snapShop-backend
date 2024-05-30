import { AuthFailureError } from '@/core/error.response'
import { Request, NextFunction } from 'express'

const validateAsyncHandler = (condition: any, req: Request, next: NextFunction, options?: any) => {
  try {
    condition.validateAsync(req.body, options)

    next()
  } catch (error: any) {
    next(new AuthFailureError(error.message))
  }
}

export default validateAsyncHandler
