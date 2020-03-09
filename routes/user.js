const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/user.js')
const passport = require('passport')

//register page
router.get('/register', (req, res) => {
  res.render('registration')
})

//register
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body //(Object Destructuring Assignment
  User.findOne({ email: email })
    .then(user => {
      if (user) {
        console.log('User already exists')
        res.render('registration', {
          email,
          name,
          password,
          password2
        })
      } else {
        const newUser = new User({
          email,
          name,
          password
        })
        newUser.save()
          .then(user => {
            res.redirect('/')
          })
          .catch(err => console.log(err))
      }
    })
})

//login page
router.get('/login', (req, res) => {
  res.render('login')
})


//login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/user/login'
  })(req, res, next)
})

//logout
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/user/login')
})

module.exports = router