const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
//introduce method-override
const methodOverride = require('method-override')
const session = require('express-session')
app.use(methodOverride('_method'))

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

//設定session
app.use(session({
  secret: 'your secret key',
  resave: false,    //不 每次重新session
  saveUninitialized: true   //儲存未初始化之session
}))

//載入model
const Restaurant = require('./models/restaurantList.js')
const User = require('./models/user.js')

//introduce body-parser
app.use(bodyParser.urlencoded({ extended: true }))


app.use('/', require('./routes/home.js'))
app.use('/restaurants', require('./routes/restaurantList.js'))
//routes for users
app.use('/user', require('./routes/user.js'))


app.listen(port, () => {
  console.log(`The server is listening on http://localhost:${port}`)
})