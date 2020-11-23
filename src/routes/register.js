const Register = require('express').Router()
const { registerUser } = require('../controller/register')

Register.post('/', registerUser)

module.exports = { Register }