import config from '@/configs/environments'
import { authentication } from '@/auth/checkAuth'
import accessController from '../../controllers/access.controller'
import asyncHandler from '@/helpers/asyncHandler'
import accessValidation from '@/validations/access.validation'
import express from 'express'
import passport from 'passport'
import crypto from 'crypto'
import codeModel from '@/models/code.model'
import { UserType } from '@/models/user.model'

const accessRoutes = express.Router()

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
accessRoutes.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
accessRoutes.get('/auth/google/callback', passport.authenticate('google', { session: false }), asyncHandler( async (req, res): Promise<void> => {
  const user = req.user as UserType

  // Create tempcode
  const tempcode = crypto.randomBytes(32).toString('hex')

  // Save tempCode to database and set expires
  const newCode = await codeModel.create({ code: tempcode, userId: user._id })

  // Redirect user
  res.redirect(`${config.frontendUrl}/auth/callback?code=${newCode.code}`)
}))
accessRoutes.post('/auth/exchange', asyncHandler(accessController.exchange))

accessRoutes.post('/register', accessValidation.signUp, asyncHandler(accessController.signUp))
accessRoutes.post('/login', accessValidation.logIn, asyncHandler(accessController.logIn))

accessRoutes.use(authentication)

accessRoutes.post('/handlerrefreshtoken', asyncHandler(accessController.handleRefreshToken))
accessRoutes.post('/logout', asyncHandler(accessController.logout))

export default accessRoutes
