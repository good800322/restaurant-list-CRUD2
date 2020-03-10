const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurantList', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
const Restaurant = require('../restaurantList.js')
const User = require('../User.js')
const restaurantList = require('../../restaurant.json')
const userList = require('../../users.json')
const bcrypt = require('bcryptjs')

db.on('error', () => {
  console.log('mongodb error!')
})

//參考同學的做法，先設立一個陣列儲存user資料
//但雜湊過後的資料無法存入，不知道有沒有什麼解決辦法可以讓經過函式改變過後的參數傳至函式外
db.once('open', () => {
  const users = []
  console.log('mongodb connected')
  userList.forEach(user => {
    const newUser = new User(user)
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        newUser.password = hash
        newUser.save()
      })
    })
    users.push(newUser)
  })
  for (let i = 0; i < 3; i++) {
    restaurantList[i]['userId'] = users[0]._id
    Restaurant.create(restaurantList[i])
  }
  for (let i = 3; i < 6; i++) {
    restaurantList[i]['userId'] = users[1]._id
    Restaurant.create(restaurantList[i])
  }
  console.log('done')
})