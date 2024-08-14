import { Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

interface ParamsSuccess {
  message?: string;
  status?: number;
  reasonStatusCode?: string;
  metaData?: object;
}

// Base class SuccessResponse
export class SuccessResponse {
  message: string
  status: number
  reasonStatusCode: string
  metaData?: object

  constructor({ message, status = StatusCodes.OK, reasonStatusCode = ReasonPhrases.OK, metaData = {} }: ParamsSuccess) {
    this.message = message ?? reasonStatusCode,
    this.status = status,
    this.reasonStatusCode = reasonStatusCode,
    this.metaData = metaData
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  send(res: Response, header = {}) {
    return res.status(this.status).json(this)
  }
}

export class Ok extends SuccessResponse {
  constructor({ message, metaData = {} }: { message?: string, metaData: object }) {
    super({ message, metaData })
  }
}

export class Created extends SuccessResponse {
  options?: object

  constructor({
    message,
    status = StatusCodes.CREATED,
    reasonStatusCode = ReasonPhrases.CREATED,
    metaData = {},
    options = {}
  }: { message: string, status?: number, reasonStatusCode?: string, metaData?: object, options?: object }) {
    super({ message, status, reasonStatusCode, metaData })
    this.options = options
  }
}
