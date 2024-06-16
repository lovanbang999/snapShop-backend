import express from 'express'
import accessRoutes from './access'
import productRoutes from './product'

const Routes = express.Router()

Routes.use('/', accessRoutes)
Routes.use('/product', productRoutes)

export default Routes
