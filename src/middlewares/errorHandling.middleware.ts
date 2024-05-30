import { NextFunction, Response, Request } from 'express'
import config from '../configs/environments'

interface CustomError extends Error {
  status?: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandling = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  const statusCode: number = err.status ?? 500

  const responseError = {
    status: 'Error!',
    code: statusCode,
    message: err.message || 'Internal Server error',
    stack: err.stack
  }

  // Only if the environment is DEV will Stack Trace be returned for easier debugging, otherwise it will be deleted
  if (config.app.buildMode !== 'dev') delete responseError.stack

  return res.status(statusCode).json(responseError)
}

export default errorHandling
