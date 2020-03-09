//passport
const express = require('express')
const mongoose = require('mongoose')
const User = require('../models/user.js')
const LocalStrategy = require('passport-local').Strategy


module.exports = passport => {
  //strategy
  passport.use(
    new LocalStrategy({ usernameField: email }, (email, password, done) => {
      User.findOne({ email: email })
        .then(user => {
          if (!user) {
            return done(null, false, { message: 'The email is not registered' })
          }
          if (user.password != password) {
            return done(null, false, { message: 'Email or Password incorrect' })
          }
          return done(null, user)
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
