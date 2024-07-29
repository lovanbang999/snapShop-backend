import { AuthFailureError } from '@/core/error.response'
import { Request, NextFunction } from 'express'
interface Validateable {
  validateAsync(data: any, options?: any): Promise<void>;
}

const validateAsyncHandler = (condition: Validateable, req: Request, next: NextFunction, options?: any) => {
  condition.validateAsync(req.body, options)
    .then(() => {
      next()
    })
    .catch((error: unknown) => {
      if (error instanceof Error) {
        next(new AuthFailureError(error.message))
      } else {
        next(new AuthFailureError('An unknown error occurred!'))
      }
    })
}

export default validateAsyncHandler
