import { CusTomRequest } from '@/interfaces/customRequest'
import { Request, Response, NextFunction } from 'express'

type AsyncHandlerFunc = (req: Request | CusTomRequest, res: Response, next: NextFunction) => Promise<void>

const asyncHandler = (fn: AsyncHandlerFunc) => {
  return (req: Request | CusTomRequest, res: Response, next: NextFunction): void => {
    fn(req, res, next)
      .catch((error: unknown) => { next(error) })
  }
}

export default asyncHandler
