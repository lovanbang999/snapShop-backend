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
  constructor(message = ReasonPhrases.CONFLICT, status = StatusCodes.CONFLICT) {
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
  constructor(message = ReasonPhrases.UNAUTHORIZED, status = StatusCodes.UNAUTHORIZED) {
    super(message, status)
  }
}

// NotFoundError
export class NotFoundError extends ErrorResponse {
  constructor(message = ReasonPhrases.NOT_FOUND, status = StatusCodes.NOT_FOUND) {
    super(message, status)
  }
}

// ForbiddenError
export class ForbiddenError extends ErrorResponse {
  constructor(message = ReasonPhrases.FORBIDDEN, status = StatusCodes.FORBIDDEN) {
    super(message, status)
  }
}
