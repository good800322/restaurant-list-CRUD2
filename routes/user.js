const express = require('express')
const router = express.Router()

//register page
router.get('/register', (req, res) => {
  res.send('this is registration page')
})

//register
router.post('/register', (req, res) => {
  res.send('for registration')
})

//login page
router.get('/login', (req, res) => {
  res.send('this is login page')
})

//login
router.post('/login', (req, res) => {
  res.send('for login')
})

//logout
router.get('/logout', (req, res) => {
  res.send('this is logout page')
})

module.exports = router