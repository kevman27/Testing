const processGuest = require('../models/guest')
const { paginate } = require('../pagination/pagination')

const getItemsbyIdCategory = async (req, res) => {
    const { id } = req.params
    const data = await processGuest.ItemsbyIdCategory(id)
    if (data) {
        res.send({
            success: true,
            data
        })
    } else {
        res.send({
            success: false,
            msg: 'error'
        })
    }
}


const getItemsbyIdItems = async (req, res) => {
    const { id } = req.params
    const data = await processGuest.ItemsbyIdItems(id)
    if (data) {
        res.send({
            success: true,
            data
        })
    } else {
        res.send({
            success: false,
            msg: 'error'
        })
    }
}

const getItemsByIdResto = async (req, res) => {
    const { idResto } = req.params
    const data = await processGuest.ItemsByRestaurant(idResto)
    if (data) {
        res.send({
            success: true,
            data
        })
    } else {
        res.send({
            success: false,
            msg: 'error'
        })
    }
}


const getRestaurant = async (req, res) => {
    const { id } = req.params
    const data = await processGuest.Restaurant(id)
    if (data) {
        res.send({
            success: true,
            data
        })
    } else {
        res.send({
            success: false,
            msg: 'error'
        })
    }
}




const getCategory = async (req, res) => {
    const { id } = req.params
    const data = await processGuest.Category(id)
    if (data) {
        res.send({
            success: true,
            data
        })
    } else {
        res.send({
            success: false,
            msg: 'error'
        })
    }
}

const getAllCategory = async (req, res) => {
    const { success, message, result, total } = await processGuest.getAllCategory(req)
    const pagination = paginate(req, 'browse_category', total)
    console.log(pagination)
    try {
        if (result) {
            res.send({
                success,
                result,
                pagination
            })
        } else {
            res.send({
                success,
                message
            })
        }
    } catch (error) {
        res.send({
            success: false,
            message
        })
    }
}

const getAllItems = async (req, res) => {
    const { success, message, result, total } = await processGuest.AllItems(req)
    const pagination = paginate(req, 'browse_items', total)
    try {
        if (success) {
            res.send({
                success,
                result,
                message,
                pagination
            })
        } else {
            res.send({
                success,
                message
            })
        }
    } catch (error) {
        res.send({

        })
    }
}

const getAllRestaurant = async (req, res) => {

    const { success, message, result, total } = await processGuest.AllRestaurant(req)
    const pagination = paginate(req, 'browse_restaurant', total)
    try {
        if (success) {
            res.send({
                success: true,
                message,
                result,
                pagination
            })
        } else {
            res.send({
                success: false,
                message
            })
        }
    } catch (error) {
        success,
            message
    }
}



module.exports = {
    getRestaurant,
    getCategory,
    getAllRestaurant,
    getAllItems,
    getAllCategory,
    getItemsbyIdCategory,
    getItemsByIdResto,
    getItemsbyIdItems
}