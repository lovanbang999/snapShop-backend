import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20'
import { Strategy as FacebookStrategy } from 'passport-facebook'
import config from '@/configs/environments'
import userModel from '@/models/user.model'
import { convertDisplaynameToUsername } from '@/utils'
import { BadRequestError } from '@/core/error.response'
import unidecode from 'unidecode'

// Configure passport to the use Google OAuth 2.0
export const googleAuth = new Strategy({
  clientID: config.googleOAuth20.clientId,
  clientSecret: config.googleOAuth20.clientSecret,
  callbackURL: 'http://localhost:5000/v1/api/auth/google/callback'
}, (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
  const usernameFormated = unidecode(convertDisplaynameToUsername(profile.displayName))

  // First, try to find a user by Google ID
  userModel.findOne({ 'oauthId.google': profile.id })
    .then(user => {
      if (user) {
        done(null, user)
        return
      }

      // If the user not found, check if an email already exists in the database
      userModel.findOne({ email: profile.emails?.[0]?.value })
        .then(existingUser => {
          if (existingUser) {
            // If the email exsist but is not linked to Google, throw an error
            if (!existingUser.oauthId?.google) {
              done(new BadRequestError('Email is already used by another login method'), false)
              return
            }
          }

          // If the email not found, create a new user
          const newUser = new userModel({
            oauthId: {
              google: profile.id
            },
            username: usernameFormated,
            email: profile.emails?.[0].value,
            avata: profile.photos?.[0].value
          })

          newUser.save()
            .then(user => {
              done(null, user)
              return
            })
            .catch((err: unknown) => {
              done(err, false)
              return
            })
        })
        .catch((err: unknown) => { done(err, false) })
    })
    .catch((err: unknown) => { done(err, false) })
})

// Configure passport to the use Facebook OAuth
export const facebookOAuth = new FacebookStrategy({
  clientID: config.facebookOAuth.clientId,
  clientSecret: config.facebookOAuth.clientSecret,
  callbackURL: 'http://localhost:5000/v1/api/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'photos', 'email']
}, (accessToken, refreshToken, profile, cb) => {
  const usernameFormated = unidecode(convertDisplaynameToUsername(profile.displayName))

  // First, try to find a user by Facebook ID
  userModel.findOne({ 'oauthId.facebook': profile.id })
    .then(user => {
      if (user) {
        cb(null, user)
        return
      }

      // If not found user, check if an email already exists in the database
      userModel.findOne({ email: profile.emails?.[0].value })
        .then(existingUser => {
          if (existingUser) {
            // If the email exsist but is not linked to Facebook, throw an error
            if (!existingUser.oauthId?.facebook) {
              cb(new BadRequestError('Email is already used by another login method'), false)
              return
            }
          }

          // If the email is not found, create a new user
          const newUser = new userModel({
            oauthId: {
              facebook: profile.id
            },
            username: usernameFormated,
            email: profile.emails?.[0].value,
            avata: profile.photos?.[0].value
          })

          newUser.save()
            .then(user => {
              cb(null, user)
              return
            })
            .catch((err: unknown) => {
              cb(err, false)
              return
            })
        })
        .catch((err: unknown) => { cb(err, false) })
    })
    .catch((err: unknown) => { cb(err, false) })
})
