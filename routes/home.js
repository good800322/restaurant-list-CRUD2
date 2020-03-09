const express = require('express')
const Restaurant = require('../models/restaurantList.js')
const router = express.Router()


router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .exec((err, restaurant) => {
      if (err) console.error(err)
      res.render('index', { restaurant: restaurant })
    })
})

module.exports = router