import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20'
import config from '@/configs/environments'
import userModel from '@/models/user.model'
import { convertDisplaynameToUsername } from '@/utils'

// Configure passport to the use Google OAuth 2.0
export const googleAuth = new Strategy({
  clientID: config.googleOAuth20.clientId,
  clientSecret: config.googleOAuth20.clientSecret,
  callbackURL: 'http://localhost:5000/v1/api/auth/google/callback'
}, (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
  userModel.findOne({ googleId: profile.id })
    .then(user => {
      if (user) {
        done(null, user)
        return
      }
      const newUser = new userModel({
        googleId: profile.id,
        username: convertDisplaynameToUsername(profile.displayName),
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
