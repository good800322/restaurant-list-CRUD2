const express = require('express')
const Restaurant = require('../models/restaurantList.js')
const router = express.Router()

//餐廳列表
router.get('/', (req, res) => {
  res.redirect('/')
})
//取得新增餐廳頁面
router.get('/new', (req, res) => {
  res.render('new')
})
//新增餐廳
router.post('/', (req, res) => {
  const restaurant = new Restaurant(req.body)
  //console.log(restaurant)
  restaurant.save(err => {
    if (err) console.error(err)
    return res.redirect('/')
  })
})
//取得餐廳詳細資料
router.get('/:id', (req, res) => {
  Restaurant.findById(req.params.id)
    .lean()
    .exec((err, restaurant) => {
      if (err) console.error(err)
      res.render('detail', { restaurant: restaurant })
    })
})
//取得編輯頁面
router.get('/:id/edit', (req, res) => {
  Restaurant.findById(req.params.id)
    .lean()
    .exec((err, restaurant) => {
      if (err) console.error(err)
      res.render('edit', { restaurant: restaurant })
    })
})
//編輯功能
router.put('/:id/edit', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) console.error(err)
    for (let key in restaurant) {
      if (req.body[key]) {
        restaurant[key] = req.body[key]
      }
    }
    restaurant.save(err => {
      if (err) console.error(err)
      res.redirect(`/${req.params.id}`)
    })
  })
})
//刪除功能
router.delete('/:id/delete', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    // console.log(req.params.id)
    // console.log(restaurant._id)
    if (err) console.error(err)
    restaurant.remove(err => {
      if (err) console.error(err)
      return res.redirect('/')
    })
  })
})
//搜尋功能
router.get('/search', (req, res) => {
  Restaurant.find()
    .lean()
    .exec((err, restaurant) => {
      if (err) console.error(err)
      restaurant = restaurant.filter(item => item.name.toLowerCase().includes(req.body.keyword.toLowerCase()) || item.category.toLowerCase().includes(req.body.keyword.toLowerCase()))
      return res.render('index', { restaurant: restaurant })
    })
})

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