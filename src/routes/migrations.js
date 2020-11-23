const migration = require('express').Router()

migration.get('/user', (req, res) => {
    require('../migration/user')
    res.send('OK')
})

module.exports = { migration }
