import { authentication } from '@/auth/checkAuth'
import mediaController from '@/controllers/media.controller'
import asyncHandler from '@/helpers/asyncHandler'
import upload from '@/middlewares/multer'
import express from 'express'

const mediaRoutes = express.Router()

mediaRoutes.use(authentication)

mediaRoutes.post('/product/images/upload', upload.array('images', 10), asyncHandler(mediaController.uploadImages))

export default mediaRoutes
