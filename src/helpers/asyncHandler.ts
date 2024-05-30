import { Request, Response, NextFunction } from 'express'

type AsyncHandlerFunc = (req: Request, res: Response, next: NextFunction) => Promise<void>

const asyncHandler = (fn: AsyncHandlerFunc) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    fn(req, res, next)
      .catch(next)
  }

}

export default asyncHandler
