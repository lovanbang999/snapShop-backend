import { Request, Response, NextFunction, RequestHandler } from 'express'

type AsyncHandlerFunc<T extends Request = Request> = (req: T, res: Response, next: NextFunction) => Promise<void>

const asyncHandler = <T extends Request = Request>(fn: AsyncHandlerFunc<T>): RequestHandler => {
  return (req, res, next) => {
    fn(req as T, res, next)
      .catch((error: unknown) => { next(error) })
  }
}

export default asyncHandler
