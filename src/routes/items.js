const Items = require('express').Router()

const { getItemsCategory, getItemsRestaurat, addItems, updateItems, deleteItems, getAllItems } = require('../controller/items')

const { checkAuthToken } = require('../middlawer/AuthMiddlawer')
const { checkAuthPermission } = require('../middlawer/AuthPermission')

Items.delete('/', checkAuthToken, checkAuthPermission, deleteItems)


Items.patch('/:id', checkAuthToken, checkAuthPermission, updateItems)

Items.get('/', checkAuthToken, checkAuthPermission, getAllItems)
Items.get('/category/:id', checkAuthToken, checkAuthPermission, getItemsCategory)
Items.get('/restaurant/:id', checkAuthToken, checkAuthPermission, getItemsRestaurat)
// Items.get('/all/:searchItems', getItems)



Items.post('/', checkAuthToken, checkAuthPermission, addItems)




module.exports = {
    Items
}