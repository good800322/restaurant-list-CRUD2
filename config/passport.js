//passport
const express = require('express')
const mongoose = require('mongoose')
const User = require('../models/user.js')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const bcrypt = require('bcryptjs')


module.exports = passport => {
  //use local strategy
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      User.findOne({ email: email })
        .then(user => {
          if (!user) {
            return done(null, false, { message: 'The email is not registered' })
          }
          //利用bcrypt比較密碼
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (isMatch) {
              return done(null, user)
            } else {
              return done(null, false, { message: 'Email or Password incorrect' })
            }
          })
        })
    }))

  //use facebook strategy
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['email', 'displayName']
  }, (accessToken, refreshToken, profile, done) => {
    User.findOne({ email: profile._json.email })
      .then(user => {
        if (user) {
          return done(null, user)
        } else {
          let randomPassword = Math.random().toString(32).slice(-8)
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(randomPassword, salt, (err, hash) => {
              randomPassword = hash
              const newUser = new User({
                name: profile._json.name,
                email: profile._json.email,
                password: randomPassword
              })
              newUser.save()
                .then(user => {
                  return done(null, user)
                })
                .catch(err => console.log(err))
            })
          })
        }
      })
  }))

  //session
  passport.serializeUser((user, done) => {
    return done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .exec((err, user) => {
        done(err, user)
      })
  })
}
