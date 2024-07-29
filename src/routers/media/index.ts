import { authentication } from '@/auth/checkAuth'
import mediaController from '@/controllers/media.controller'
import asyncHandler from '@/helpers/asyncHandler'
import upload from '@/middlewares/multer'
import express from 'express'

const mediaRoutes = express.Router()

mediaRoutes.use(authentication)

mediaRoutes.post('/product/thumb/upload', upload.single('thumb'), asyncHandler(mediaController.uploadThumb))
mediaRoutes.post('/product/images/upload', upload.array('images', 10), asyncHandler(mediaController.uploadImages))
mediaRoutes.post('/product/convertion/upload', upload.single('convertion'), asyncHandler(mediaController.uploadConvertionImage))
mediaRoutes.post('/product/sku/upload', upload.array('sku-image'), asyncHandler(mediaController.uploadSkuImages))

export default mediaRoutes
