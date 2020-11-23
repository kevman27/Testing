const Restaurant = require('express').Router()
const { getResto, getAllResto, updateRestaurant, deleteRestaurant, createRestaurant } = require('../controller/restaurant')
const { checkAuthToken } = require('../middlawer/AuthMiddlawer')
const { checkAuthPermission } = require('../middlawer/AuthPermission')

Restaurant.get('/:id', checkAuthToken, checkAuthPermission, getResto)
Restaurant.get('/', checkAuthToken, checkAuthPermission, getAllResto)

Restaurant.post('/', checkAuthToken, checkAuthPermission, createRestaurant)
Restaurant.patch('/:id', checkAuthToken, checkAuthPermission, updateRestaurant)
Restaurant.delete('/:id', checkAuthToken, checkAuthPermission, deleteRestaurant)


module.exports = {
    Restaurant
}

