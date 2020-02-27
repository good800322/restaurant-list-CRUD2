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
  res.redirect('/restaurants')
})
app.get('/restaurants', (req, res) => {
  Restaurant.find()
    .lean()
    .exec((err, restaurant) => {
      if (err) console.error(err)
      res.render('index', { restaurant: restaurant })
    })
})
app.get('/restaurants/new', (req, res) => {
  res.render('new')
})

app.post('/restaurants', (req, res) => {
  const restaurant = new Restaurant(req.body)
  restaurant.save(err => {
    if (err) console.error(err)
    return res.redirect('/restaurants')
  })

})

app.get('/restaurants/:id', (req, res) => {
  Restaurant.findById(req.params.id)
    .lean()
    .exec((err, restaurant) => {
      if (err) console.error(err)
      res.render('detail', { restaurant: restaurant })
    })
})
app.get('/restaurants/:id/edit', (req, res) => {
  Restaurant.findById(req.params.id)
    .lean()
    .exec((err, restaurant) => {
      if (err) console.error(err)
      res.render('edit', { restaurant: restaurant })
    })
})
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
app.post('/restaurants/:id/delete', (req, res) => {
  res.send('for delete')
})

app.listen(port, () => {
  console.log(`The server is listening on http://localhost:${port}`)
})