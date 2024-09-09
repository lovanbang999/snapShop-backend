import { BadRequestError } from '@/core/error.response'
import { Ok } from '@/core/success.response'
import { CusTomRequest } from '@/interfaces/customRequest'
import MediaService from '@/services/media.sevice'
import { Response } from 'express'

class MediaController {
  uploadThumb = async (req: CusTomRequest, res: Response) => {
    const { file, user } = req
    if (!file) throw new BadRequestError('Not receive file!')

    const shopId = user.userId
    if (!shopId) throw new BadRequestError('Invalid request!')

    new Ok({
      message: 'Upload thumb successfully!',
      metaData: await MediaService.uploadThumb({ shopId: shopId, file })
    }).send(res)
  }

  uploadImages = async (req: CusTomRequest, res: Response) => {
    const { files, user } = req

    if (!files) throw new BadRequestError('Not receive file!')

    const shopId = user.userId
    if (!shopId) throw new BadRequestError('Invalid request!')

    const filesConvertType = files as Express.Multer.File[]

    new Ok({
      message: 'Upload images successfully!',
      metaData: await MediaService.uploadImages({ shopId: shopId, files: filesConvertType })
    }).send(res)
  }

  uploadConvertionImage = async (req: CusTomRequest, res: Response) => {
    const { file, user } = req
    if (!file) throw new BadRequestError('Not receive file!')

    const shopId = user.userId
    if (!shopId) throw new BadRequestError('Invalid request!')

    new Ok({
      message: 'Upload convertion image successfully!',
      metaData: await MediaService.uploadConvertionImage({ shopId: shopId, file })
    }).send(res)
  }

  uploadSkuImages = async (req: CusTomRequest, res: Response) => {
    const { files, user } = req

    if (!files) throw new BadRequestError('Not receive file!')

    const shopId = user.userId
    if (!shopId) throw new BadRequestError('Invalid request!')

    const filesConvertType = files as Express.Multer.File[]

    new Ok({
      message: 'Upload sku images successfully!',
      metaData: await MediaService.uploadSkuImages({ shopId: shopId, files: filesConvertType })
    }).send(res)
  }
}

export default new MediaController()
