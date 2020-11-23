const authPassword = require('express').Router()
const { changePassword, forgotPassword, checkUsername } = require('../controller/authPassword')

authPassword.post('/verify', checkUsername)
authPassword.post('/forgot-password', forgotPassword)
authPassword.post('/change-password', changePassword)

module.exports = {
    authPassword
}