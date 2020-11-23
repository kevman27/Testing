const processCategory = require('../models/category')
const qs = require('qs')
const upload = require('../multer/multer')

const getCategory = async (req, res) => {
    const { id } = req.params
    const data = await processCategory.get(id)
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
    const params = {
        currentPage: req.query.page || 1,
        perPage: req.query.limit || 5,
        search: req.query.search || '',
        sort: req.query.sort || { keys: 'id', value: 0 }
    }
    if (req.query.search) {
        const key = Object.keys(params.search)
        params.search = key.map((v, i) => (

            { keys: key[i], value: req.query.search[key[i]] }
        ))
    }

    const sortkey = Object.keys(params.sort)
    if (req.query.sort) {
        params.sort = sortkey.map((v, i) => (
            { keys: sortkey[i], value: req.query.sort[sortkey[i]] }
        ))
    }

    const { result, total } = await processCategory.getAll(params)
    const { query } = req
    console.log(query)

    if (!query.page) {
        query.page = '1'
    }
    const totalPages = Math.ceil(total / parseInt(params.perPage))
    query.page = parseInt(query.page) + 1
    const nextPage = (parseInt(params.currentPage) < totalPages ? process.env.APP_URL.concat('category?').concat(qs.stringify(req.query)) : null)

    query.page = parseInt(query.page) - 2
    const previousPage = (parseInt(params.currentPage) > 1 ? process.env.APP_URL.concat('category?').concat(qs.stringify(req.query)) : null)

    const pagination = {
        currentPage: parseInt(params.currentPage),
        nextPage,
        previousPage,
        totalPages,
        perPage: parseInt(params.perPage),
        totalEntries: total
    }
    if (result) {
        res.send({
            success: true,
            result,
            pagination
        })
    } else {
        res.send({
            success: false,
            msg: 'error'
        })
    }
}

const createCategory = async (req, res) => {
    await upload(req, res, 'images')
    req.body.images = '/uploads/' + req.file.filename
    const dataImage = req.body.images
    console.log(dataImage)

    const { category_detail, id_category } = req.body
    const { success, message } = await processCategory.create(category_detail, id_category, dataImage)
    try {
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
        res.send({ success: false, msg: message })
    }
}

const updateCategory = async (req, res) => {
    await upload(req, res, 'images')
    req.body.images = '/uploads/' + req.file.filename
    const dataImage = req.body.images



    const { id, category_detail, id_category } = req.body
    const { success, message } = await processCategory.update(id, category_detail, id_category, dataImage)
    console.log(success)
    try {
        if (success) {
            res.send({
                success: true,
                message: 'Succes Update Data Category'
            })
        } else {
            res.send({
                success: false,
                message
            })
        }
    } catch (error) {
        res.send({ success: false, message })
    }
}

const deleteCategory = async (req, res) => {
    const { id } = req.params
    const { success, message } = await processCategory.delete(id)
    try {
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
        res.send({ success: false, message })
    }
}


module.exports = {
    getCategory,
    getAllCategory,
    createCategory,
    updateCategory,
    deleteCategory
}