const Register = require('../models/register')
const bcrypt = require('bcryptjs')




const registerUser = async (req, res) => {

  const { name, username, password, email, } = req.body
  const encryptedPassword = bcrypt.hashSync(password)
  console.log('woi')


  const { success, message } = await Register.register(name, username, encryptedPassword, email)
  try {
    if (success) {
      res.send({ success: true, message: 'Register has been created!' })
    } else {
      res.send({ success: false, message })
    }
  } catch (error) {
    res.send({ success: false, message })
  }
}

module.exports = {
  registerUser
}