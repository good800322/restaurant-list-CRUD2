const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurantList', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
const Restaurant = require('../restaurantList.js')
const restaurantList = require('../../restaurant.json')

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected')
  console.log(...restaurantList.results)
  Restaurant.create(...restaurantList.results)
  console.log('done')
})