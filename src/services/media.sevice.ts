import cloudinary from '@/configs/cloudinary'
import { UploadApiResponse } from 'cloudinary'
import streamifier from 'streamifier'

const upload_preset = 'image_preset'

interface UploadThumbType {
  shopId: string;
  file: Express.Multer.File;
}

interface UploadImagesType {
  shopId: string;
  files: Express.Multer.File[]
}

class MediaService {
  static uploadThumb = async ({ shopId, file }: UploadThumbType) => {
    const uploadThumb: UploadApiResponse = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: `SnapShop/${shopId}/thumb`,
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
      streamifier.createReadStream(file.buffer).pipe(uploadStream)
    })

    const uploadResult = [{ url: uploadThumb.secure_url, publicId: uploadThumb.public_id }]

    return uploadResult
  }

  static uploadImages = async ({ shopId, files }: UploadImagesType) => {
    const uploadedImages: UploadApiResponse[] = await Promise.all(files.map( async (file: Express.Multer.File) => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: `SnapShop/${shopId}/addtional-images`,
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
        streamifier.createReadStream(file.buffer).pipe(uploadStream)
      })
    }))

    const uploadResult = uploadedImages.map((
      image: UploadApiResponse
    ): { url: string, publicId: string} => ({ url: image.secure_url, publicId: image.public_id }))

    return uploadResult
  }

  static uploadConvertionImage = async ({ shopId, file }: UploadThumbType) => {
    const uploadThumb: UploadApiResponse = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: `SnapShop/${shopId}/convertion-iamge`,
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
      streamifier.createReadStream(file.buffer).pipe(uploadStream)
    })

    const uploadResult = [{ url: uploadThumb.secure_url, publicId: uploadThumb.public_id }]

    return uploadResult
  }

  static uploadSkuImages = async ({ shopId, files }: UploadImagesType) => {
    const uploadedImages: UploadApiResponse[] = await Promise.all(files.map( async (file: Express.Multer.File) => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: `SnapShop/${shopId}/sku-images`,
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
        streamifier.createReadStream(file.buffer).pipe(uploadStream)
      })
    }))

    const uploadResult = uploadedImages.map((
      image: UploadApiResponse
    ): { url: string, publicId: string} => ({ url: image.secure_url, publicId: image.public_id }))

    return uploadResult
  }
}

export default MediaService
