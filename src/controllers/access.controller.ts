import { Created } from '@/core/success.response'
import AccessService from '@/services/access.service'
import { Request, Response } from 'express'

class AccessController {
  signUp = async (req: Request, res: Response) => {
    new Created({
      message: 'Registered successfully!',
      metaData: await AccessService.signUp(req.body),
      options: {}
    }).send(res)
  }
}

export default new AccessController()
