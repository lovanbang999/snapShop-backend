import express from 'express'
import accessRoutes from './access'

const Routes = express.Router()

Routes.use('/v1/api/', accessRoutes)

export default Routes
