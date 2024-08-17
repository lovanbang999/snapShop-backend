import config from '@/configs/environments'
import { authentication } from '@/auth/checkAuth'
import accessController from '../../controllers/access.controller'
import asyncHandler from '@/helpers/asyncHandler'
import accessValidation from '@/validations/access.validation'
import express, { RequestHandler } from 'express'
import passport from 'passport'
import crypto from 'crypto'
import codeModel from '@/models/code.model'
import { UserType } from '@/models/user.model'
import productController from '@/controllers/product.controller'

const accessRoutes = express.Router()

// Authentication by Google
accessRoutes.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }) as RequestHandler)
accessRoutes.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: `${config.frontendUrl}/login`, session: false }) as RequestHandler, asyncHandler( async (req, res): Promise<void> => {
  const user = req.user as UserType

  // Create tempcode
  const tempcode = crypto.randomBytes(32).toString('hex')

  // Save tempCode to database and set expires
  const newCode = await codeModel.create({ code: tempcode, userId: user._id })

  // Redirect user
  res.redirect(`${config.frontendUrl}/auth/callback?code=${newCode.code}`)
}))

// Authentication by Facebook
accessRoutes.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }) as RequestHandler)
accessRoutes.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: `${config.frontendUrl}/login`, session: false }) as RequestHandler, asyncHandler( async (req, res): Promise<void> => {
  const user = req.user as UserType

  // Create tempcode
  const tempcode = crypto.randomBytes(32).toString('hex')

  // Save tempCode to database and set expires
  const newCode = await codeModel.create({ code: tempcode, userId: user._id })

  // Redirect user
  res.redirect(`${config.frontendUrl}/auth/callback?code=${newCode.code}`)
}))

// Exchange code when user login by OAuth
accessRoutes.post('/auth/exchange', asyncHandler(accessController.exchange))

accessRoutes.post('/register', accessValidation.signUp, asyncHandler(accessController.signUp))
accessRoutes.post('/login', accessValidation.logIn, asyncHandler(accessController.logIn))

accessRoutes.get('/cart/mini', asyncHandler(productController.getCartProduct))

accessRoutes.use(authentication)

accessRoutes.post('/handlerrefreshtoken', asyncHandler(accessController.handleRefreshToken))
accessRoutes.post('/logout', asyncHandler(accessController.logout))

export default accessRoutes
