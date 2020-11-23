const Guest = require('express').Router()

const { getAllItems, getAllRestaurant, getAllCategory, getItemsbyIdCategory, getItemsbyIdItems, getRestaurant, getCategory, getItemsByIdResto } = require('../controller/guest')


Guest.get('/browse_items', getAllItems)
Guest.get('/browse_restaurant', getAllRestaurant)
Guest.get('/browse_category', getAllCategory)

Guest.get('/browse_items/items/:id', getItemsbyIdItems)
Guest.get('/browse_items/category/:id', getItemsbyIdCategory)
Guest.get('/browse_items/restaurant/:idResto', getItemsByIdResto)
Guest.get('/browse_restaurant/:id', getRestaurant)
Guest.get('/browse_category/:id', getCategory)


module.exports = {
    Guest
}