import { Ok } from '@/core/success.response'
import MediaService from '@/services/media.sevice'
import { Request, Response } from 'express'

class MediaController {
  uploadImages = async (req: Request, res: Response) => {
    new Ok({
      message: 'Upload images successfully!',
      metaData: await MediaService.uploadImages(req.files as Express.Multer.File[])
    }).send(res)
  }
}

export default new MediaController()
