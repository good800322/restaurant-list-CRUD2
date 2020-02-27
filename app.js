const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')

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




app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .exec((err, restaurant) => {
      if (err) console.error(err)
      res.render('index', { restaurant: restaurant })
    })
})
app.get('/restaurants', (req, res) => {
  Restaurant.find()
    .lean()
    .exec((err, restaurant) => {
      if (err) console.error(err)
      res.render('index', { restaurant: restaurant })
    })
})
app.get('/restaurants/:id', (req, res) => {
  res.send('detail of the restaurant')
})
app.get('/restaurants/new', (req, res) => {
  res.send('the page for creating')
})
app.post('/restaurants/', (req, res) => {
  res.send('creating')
})
app.get('/restaurants/:id/edit', (req, res) => {
  res.send('the edit page')
})
app.post('/restaurants/:id/edit', (req, res) => {
  res.send('for edition')
})
app.post('/restaurants/:id/delete', (req, res) => {
  res.send('for delete')
})

app.listen(port, () => {
  console.log(`The server is listening on http://localhost:${port}`)
})