const express = require('express')
const bodyParser = require('body-parser')

const path = require('path')
const cors = require('cors')


const { User } = require('./src/routes/user')
const { Auth } = require('./src/routes/auth')
const { Restaurant } = require('./src/routes/restaurant')
const { Items } = require('./src/routes/items')

const { category } = require('./src/routes/category')
const { Register } = require('./src/routes/register')
const { authPassword } = require('./src/routes/authPassword')

const { migration } = require('./src/routes/migrations')
const { Guest } = require('./src/routes/guest')
const { generalUser } = require('./src/routes/generalUser.js')
const { checkAuthToken } = require('./src/middlawer/AuthMiddlawer')






const app = express()

/* Middleware */

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/uploads', express.static('uploads'))
app.use(cors())

app.use('/user', checkAuthToken, User)
app.use('/restaurant', Restaurant)
app.use('/migration', migration)

app.use('/items', Items)
app.use('/auth', Auth)
app.use('/register', Register)
app.use('/category', category)
app.use('/', authPassword)
app.use('/', Guest)
app.use('/', checkAuthToken, generalUser)





app.get('/', (req, res) => {
    res.send('Server is Running')
})

app.listen(3333, () => {
    console.log('Server Running at Port 3333')
})
