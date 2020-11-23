const processResto = require('../models/restaurant')
const { paginate } = require('../pagination/pagination')
const upload = require('../multer/multer')

const getResto = async (req, res) => {
    const { id } = req.params
    const data = await processResto.Resto(id)
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

const getAllResto = async (req, res) => {

    const { success, message, data, total } = await processResto.AllResto(req)
    const pagination = paginate(req, 'restaurant', total)
    console.log(paginate)
    console.log(pagination)
    try {
        if (success) {
            res.send({
                success: true,
                message,
                data,
                pagination
            })
        } else {
            req.send({
                success: false,
                msg: 'error'
            })
        }
    } catch (error) {
        success, message
    }
}


const createRestaurant = async (req, res) => {
    try {
        await upload(req, res, 'images')

        req.body.images = '/uploads/' + req.file.filename
        const imageRestaurant = req.body.images
        const { restaurant, description, id_admin } = req.body

        const { success, message } = await processResto.create(restaurant, description, id_admin, imageRestaurant)


        if (success) {
            res.send({ success: true, msg: 'Restaurant has been created!' })
        } else {
            res.send({ success: false, message })
        }
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
}

const updateRestaurant = async (req, res) => {
    await upload(req, res, 'images')

    req.body.images = '/uploads/' + req.file.filename
    const imageRestaurant = req.body.images
    const { id } = req.params
    const { restaurant, description, id_admin } = req.body
    try {
        const { success, message } = await processResto.update(id, restaurant, description, id_admin, imageRestaurant)
        console.log(success)
        if (success) {
            res.send({ success: true, msg: 'Restorant has ' + restaurant + ' been updated!' })
        } else {
            res.send({ success: false, message })
        }
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
}

const deleteRestaurant = async (req, res) => {
    const { id } = req.params
    try {
        const { success, message } = await processResto.delete(id)
        console.log(success)
        if (success) {
            res.send({ success: true, msg: 'Restorant has been deleted!' })
        } else {
            res.send({ success: false, message })
        }
    } catch (error) {
        res.send({ success: false, message })
    }
}




module.exports = {
    getResto,
    getAllResto,
    createRestaurant,
    deleteRestaurant,
    updateRestaurant
}