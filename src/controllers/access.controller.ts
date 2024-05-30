import { Created, Ok } from '@/core/success.response'
import AccessService, { LoginBodyProps, SignUpBodyProps } from '@/services/access.service'
import { Request, Response } from 'express'

interface SignUpRequest extends Request {
  body: SignUpBodyProps;
}

interface LogInRequest extends Request {
  body: LoginBodyProps;
}

class AccessController {
  signUp = async (req: SignUpRequest, res: Response): Promise<void> => {
    new Created({
      message: 'Registered successfully!',
      metaData: await AccessService.signUp(req.body),
      options: {}
    }).send(res)
  }

  logIn = async(req: LogInRequest, res: Response): Promise<void> => {
    new Ok({
      message: 'Login successfully!',
      metaData: await AccessService.logIn(req.body)
    }).send(res)
  }
}

export default new AccessController()
