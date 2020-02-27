const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurantList', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
const Restaurant = require('../restaurantList.js')

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected')

  for (let i = 0; i < 10; i++) {
    Restaurant.create({
      name: 'name' + i,
      name_en: 'name_en' + i,
      category: 'category' + i,
      image: 'image' + i,
      location: 'location' + i,
      phone: 'phone' + i,
      google_map: 'google_map' + i,
      rating: i,
      description: 'description' + i
    })
  }
  console.log('done')
})