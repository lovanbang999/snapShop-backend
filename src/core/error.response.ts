import { ReasonPhrases, StatusCodes } from 'http-status-codes'

// Base class extends from Error class
export class ErrorResponse extends Error {
  status : number

  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

// ConflictRequestError
export class ConflictRequestError extends ErrorResponse {
  constructor(message: string = ReasonPhrases.CONFLICT, status: number = StatusCodes.CONFLICT) {
    super(message, status)
  }
}

// BadRequestError
export class BadRequestError extends ErrorResponse {
  constructor(message: string = ReasonPhrases.BAD_REQUEST, status: number = StatusCodes.BAD_REQUEST) {
    super(message, status)
  }
}

// AuthFailureError
export class AuthFailureError extends ErrorResponse {
  constructor(message: string = ReasonPhrases.UNAUTHORIZED, status: number = StatusCodes.UNAUTHORIZED) {
    super(message, status)
  }
}

// NotFoundError
export class NotFoundError extends ErrorResponse {
  constructor(message: string = ReasonPhrases.NOT_FOUND, status: number = StatusCodes.NOT_FOUND) {
    super(message, status)
  }
}

// ForbiddenError
export class ForbiddenError extends ErrorResponse {
  constructor(message: string = ReasonPhrases.FORBIDDEN, status: number = StatusCodes.FORBIDDEN) {
    super(message, status)
  }
}

export class InternalServerError extends ErrorResponse {
  constructor(message: string = ReasonPhrases.INTERNAL_SERVER_ERROR, status: number = StatusCodes.INTERNAL_SERVER_ERROR) {
    super(message, status)
  }
}
