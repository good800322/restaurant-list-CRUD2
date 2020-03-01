const express = require('express')
const Restaurant = require('../models/restaurantList.js')
const router = express.Router()

//sorting

//原本想利用設定req.params.condition變數來當作sorting的依據，但似乎不行只能分成各個
// app.get('/restaurants/sort/:condition', (req, res) => {
//   Restaurant.find()
//     .sort({ condition: 'asc' })
//     .lean()
//     .exec((err, restaurant) => {
//       if (err) console.error(err)
//       return res.render('index', { restaurant: restaurant })
//     })
// })
router.get('/sort/name', (req, res) => {
  Restaurant.find()
    .sort({ name: 'asc' })
    .lean()
    .exec((err, restaurant) => {
      if (err) console.error(err)
      return res.render('index', { restaurant: restaurant })
    })
})
router.get('/sort/category', (req, res) => {
  Restaurant.find()
    .sort({ category: 'asc' })
    .lean()
    .exec((err, restaurant) => {
      if (err) console.error(err)
      return res.render('index', { restaurant: restaurant })
    })
})
router.get('/sort/rating', (req, res) => {
  Restaurant.find()
    .sort({ rating: 'asc' })
    .lean()
    .exec((err, restaurant) => {
      if (err) console.error(err)
      return res.render('index', { restaurant: restaurant })
    })
})


module.exports = router