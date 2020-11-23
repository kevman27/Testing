const processItems = require('../models/items')
const { paginate } = require('../pagination/pagination')
const uploads = require('../multer/multer')

const getItemsCategory = async (req, res) => {
    const { id } = req.params
    const { success, message, data } = await processItems.getItemsCategory(id)
    try {
        if (success) {
            res.send({
                success: true,
                message,
                data
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


const getItemsRestaurat = async (req, res) => {
    const { id } = req.params
    const { success, message, data } = await processItems.getItemsRestaurat(id)
    try {
        if (success) {
            res.send({
                success: true,
                message,
                data
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


const getAllItems = async (req, res) => {
    const { success, message, result, total } = await processItems.getAllItems(req)
    const pagination = paginate(req, 'items', total)
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
                msg: 'error'
            })
        }
    } catch (error) {
        success,
            message
    }
}


const addItems = async (req, res) => {
    try {
        await uploads(req, res, 'images')

        req.body.images = '/uploads/' + req.file.filename
        const imageRestaurant = req.body.images
        const { name, quantity, price, id_category_detail, id_restaurant } = req.body
        const { success, message, field } = await processItems.createItems(name, quantity, price, id_category_detail, id_restaurant, imageRestaurant)
        console.log(success)

        if (success) {
            res.send({
                success: true,
                message
            })
        } else {
            res.send({
                success: false,
                message
            })
        }
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
}

const updateItems = async (req, res) => {
    try {
        await uploads(req, res, 'images')
        if (!req.file) {
            throw new Error('tidak ada gambar')
        }

        req.body.images = '/uploads/' + req.file.filename

        const dataImage = req.body.images

        const { id } = req.params

        const { name, quantity, price, id_category_detail, id_restaurant } = req.body
        const { success, message } = await processItems.updateItems(id, name, quantity, price, id_category_detail, id_restaurant, dataImage)

        console.log(success)
        if (success) {
            res.send({
                success: true,
                message
            })
        } else {
            res.send({
                success: false,
                message: 'Field tidak boleh kosong'
            })
        }
    } catch (error) {
        console.log('error', error)
        res.send({
            success: false,
            message: error.message
        })

    }
}

const deleteItems = async (req, res) => {
    const { id } = req.body
    console.log(id)
    const { success, message } = await processItems.deleteItemss(id)
    if (success) {
        res.send({
            success: true,
            message
        })
    } else {
        res.send({
            success: false,
            message
        })
    }
}

module.exports = {
    getItemsCategory,
    getItemsRestaurat,
    getAllItems,
    addItems,
    updateItems,
    deleteItems
}