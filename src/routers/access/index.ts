import accessController from '../../controllers/access.controller'
import asyncHandler from '@/helpers/asyncHandler'
import accessValidation from '@/validations/access.validation'
import express from 'express'

const accessRoutes = express.Router()

accessRoutes.post('/register', accessValidation.signUp, asyncHandler(accessController.signUp))
accessRoutes.post('/login', accessValidation.logIn, asyncHandler(accessController.logIn))

export default accessRoutes
