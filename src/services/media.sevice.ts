import cloudinary from '@/configs/cloudinary'
import { UploadApiResponse } from 'cloudinary'

const upload_preset = 'image_preset'

class MediaService {
  static uploadImages = async (files: Express.Multer.File[]) => {
    const uploadedImages: UploadApiResponse[] = await Promise.all(files.map( async (file: Express.Multer.File) => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: 'SnapShop-image',
            upload_preset: upload_preset
          },
          (error, result) => {
            if (error) {
              reject(new Error(error.message))
            } else if (result) {
              resolve(result)
            } else {
              reject(new Error('Upload result is undefined'))
            }
          }
        )

        uploadStream.end(file.buffer)
      })
    }))

    const uploadResult = uploadedImages.map((
      image: UploadApiResponse
    ): { url: string, publicId: string} => ({ url: image.url, publicId: image.public_id }))

    return { uploadResult }
  }
}

export default MediaService
