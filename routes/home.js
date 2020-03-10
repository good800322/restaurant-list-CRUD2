const express = require('express')
const Restaurant = require('../models/restaurantList.js')
const router = express.Router()
// 載入 auth middleware 裡的 authenticated 方法
const { authenticated } = require('../config/auth')


router.get('/', authenticated, (req, res) => {
  Restaurant.find({ userId: req.user._id })
    .lean()
    .exec((err, restaurant) => {
      if (err) console.error(err)
      res.render('index', { restaurant: restaurant })
    })
})

module.exports = router