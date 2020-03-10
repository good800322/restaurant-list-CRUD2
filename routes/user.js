const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/user.js')
const passport = require('passport')
const bcrypt = require('bcryptjs')

//register page
router.get('/register', (req, res) => {
  res.render('registration')
})

//register
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body //(Object Destructuring Assignment
  // 加入錯誤訊息提示
  let errors = []

  if (!name || !email || !password || !password2) {
    errors.push({ message: '所有欄位都是必填' })
  }

  if (password !== password2) {
    errors.push({ message: '密碼輸入錯誤' })
  }
  if (errors.length > 0) {
    res.render('registration', {
      errors,
      name,
      email,
      password,
      password2
    })
  } else {
    User.findOne({ email: email })
      .then(user => {
        if (user) {
          errors.push({ message: '這個 Email 已經註冊過了' })
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
          //使用bcrypt
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err
              newUser.password = hash

              newUser.save()
                .then(user => {
                  res.redirect('/')
                })
                .catch(err => console.log(err))
            })
          })
        }
      })
  }
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
  req.flash('success_msg', '你已經成功登出')
  req.logout()
  res.redirect('/user/login')
})

module.exports = router