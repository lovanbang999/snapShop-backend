import { authentication, authenticationForShop } from '@/auth/checkAuth'
import productController from '@/controllers/product.controller'
import asyncHandler from '@/helpers/asyncHandler'
import productValidation from '@/validations/product.validation'
import express from 'express'

const productRoutes = express.Router()

productRoutes.use(authentication)
productRoutes.use(authenticationForShop)

productRoutes.post('/', productValidation.create, asyncHandler(productController.createProduct))

export default productRoutes
