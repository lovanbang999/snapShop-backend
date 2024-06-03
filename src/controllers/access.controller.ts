import { Created, Ok } from '@/core/success.response'
import { CusTomRequest } from '@/interfaces/customRequest'
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

  handleRefreshToken = async (req: CusTomRequest, res: Response): Promise<void> => {
    new Ok({
      message: 'Get token successfully!',
      metaData: await AccessService.handleRefreshToken({
        keyStore: req.keyStore,
        user: req.user,
        refreshToken: req.refreshToken
      })
    }).send(res)
  }
}

export default new AccessController()
