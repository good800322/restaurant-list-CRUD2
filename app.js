const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

//set template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//introduce static files
app.use(express.static('public'))

//connect to mongodb
mongoose.connect('mongodb://localhost/restaurantList', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

//載入model
const Restaurant = require('./models/restaurantList.js')

//introduce body-parser
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .exec((err, restaurant) => {
      if (err) console.error(err)
      res.render('index', { restaurant: restaurant })
    })
})
//餐廳列表
app.get('/restaurants', (req, res) => {
  res.redirect('/')
})
//取得新增餐廳頁面
app.get('/restaurants/new', (req, res) => {
  res.render('new')
})
//新增餐廳
app.post('/restaurants', (req, res) => {
  const restaurant = new Restaurant(req.body)
  //console.log(restaurant)
  restaurant.save(err => {
    if (err) console.error(err)
    return res.redirect('/restaurants')
  })
})
//取得餐廳詳細資料
app.get('/restaurants/:id', (req, res) => {
  Restaurant.findById(req.params.id)
    .lean()
    .exec((err, restaurant) => {
      if (err) console.error(err)
      res.render('detail', { restaurant: restaurant })
    })
})
//取得編輯頁面
app.get('/restaurants/:id/edit', (req, res) => {
  Restaurant.findById(req.params.id)
    .lean()
    .exec((err, restaurant) => {
      if (err) console.error(err)
      res.render('edit', { restaurant: restaurant })
    })
})
//編輯功能
app.post('/restaurants/:id/edit', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) console.error(err)
    for (let key in restaurant) {
      if (req.body[key]) {
        restaurant[key] = req.body[key]
      }
    }
    restaurant.save(err => {
      if (err) console.error(err)
      res.redirect(`/restaurants/${req.params.id}`)
    })
  })
})
//刪除功能
app.post('/restaurants/:id/delete', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    // console.log(req.params.id)
    // console.log(restaurant._id)
    if (err) console.error(err)
    restaurant.remove(err => {
      if (err) console.error(err)
      return res.redirect('/restaurants')
    })
  })
})
//搜尋功能
app.post('/search', (req, res) => {
  Restaurant.find()
    .lean()
    .exec((err, restaurant) => {
      if (err) console.error(err)
      restaurant = restaurant.filter(item => item.name.toLowerCase().includes(req.body.keyword.toLowerCase()) || item.category.toLowerCase().includes(req.body.keyword.toLowerCase()))
      return res.render('search', { restaurant: restaurant })
    })
})

app.listen(port, () => {
  console.log(`The server is listening on http://localhost:${port}`)
})