const express = require('express')
const router = express.Router()
const passport = require('passport')

//為取的授權許可之路由
router.get('/facebook',
  passport.authenticate('facebook', { scope: ['email', 'public_profile'] }))

//取得authorization grant後redirect
router.get('/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/user/login'
  }))

module.exports = router