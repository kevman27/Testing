const generalUser = require('express').Router()

const { getProfile, getMyProfile, postCarts, updateMyProfile, getTopUp, addTopUp, getReview, getAllReviews, getCarts, deleteCart, createReviews, checkout, getReviews } = require('../controller/generalUser')





generalUser.patch('/profile', updateMyProfile)
generalUser.get('/profile', getMyProfile)
generalUser.get('/profile/:id', getProfile)
generalUser.get('/topup', getTopUp)
generalUser.post('/topup/add', addTopUp)

generalUser.get('/carts', getCarts)
generalUser.delete('/carts', deleteCart)
generalUser.post('/carts/:id', postCarts)
// generalUser.get('checkout', getCheckout)
// generalUser.get('/review', getReview)
generalUser.get('/review/:id', getReviews)
generalUser.get('/review/all', getAllReviews)
generalUser.post('/review', createReviews)
generalUser.post('/checkout', checkout)




// getMyProfile, getProfile, getTopUp, getCarts, getCheckout, getAllReviews, getReview

module.exports = {
    generalUser
}