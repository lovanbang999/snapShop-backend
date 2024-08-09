import express from 'express'
import accessRoutes from './access'
import productRoutes from './shop/product'
import mediaRoutes from './shop/media'

const Routes = express.Router()

Routes.use('/', accessRoutes)
Routes.use('/product', productRoutes)
Routes.use('/media', mediaRoutes)

export default Routes
