const category = require('express').Router()

const { getCategory, getAllCategory, deleteCategory, createCategory, updateCategory } = require('../controller/category')
const { checkAuthToken } = require('../middlawer/AuthMiddlawer')
const { checkAuthPermission } = require('../middlawer/AuthPermission')


category.get('/', checkAuthToken, checkAuthPermission, getAllCategory)
// category.get('/food/:searchFood', getFood)
category.get('/:id', checkAuthToken, checkAuthPermission, getCategory)
category.post('/', checkAuthToken, checkAuthPermission, createCategory)
category.patch('/', checkAuthToken, checkAuthPermission, updateCategory)
category.delete('/:id', checkAuthToken, checkAuthPermission, deleteCategory)

module.exports = {
    category
}