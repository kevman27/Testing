const db = require('../config/db')
const { paginationParams } = require('../pagination/pagination')


module.exports = {
    ItemsbyIdItems: (id) => {
        if (id) {
            return new Promise((resolve, reject) => {
                const query = `SELECT items.id, items.image_items, restaurant.restaurant, category.category, category_detail.category_detail, items.name, items.quantity, items.price, items.created_at FROM items JOIN category_detail ON category_detail.id=items.id_category_detail JOIN category ON category.id=category_detail.id_category JOIN restaurant ON items.id_restaurant=restaurant.id where items.id=${id}`
                db.query(query, (error, result, field) => {
                    if (error) reject = new Error(error)
                    resolve(result[0])
                })
            })
        } else {
            resolve(false)
        }
    },

    ItemsbyIdCategory: (id) => {
        if (id) {
            return new Promise((resolve, reject) => {
                const query = `SELECT items.id, items.id_category_detail , items.image_items, restaurant.restaurant, category.category, category_detail.category_detail, items.name, items.quantity, items.price, items.created_at FROM items JOIN category_detail ON category_detail.id=items.id_category_detail JOIN category ON category.id=category_detail.id_category JOIN restaurant ON items.id_restaurant=restaurant.id where items.id_category_detail=${id}`
                db.query(query, (error, result, field) => {
                    if (error) reject = new Error(error)
                    resolve(result)
                })
            })
        } else {
            resolve(false)
        }
    },


    ItemsByRestaurant: (idResto) => {
        if (idResto) {
            return new Promise((resolve, reject) => {
                const query = `SELECT items.id, items.id_restaurant ,items.image_items, restaurant.restaurant, category.category, category_detail.category_detail, items.name, items.quantity, items.price, items.created_at FROM items JOIN category_detail ON category_detail.id=items.id_category_detail JOIN category ON category.id=category_detail.id_category JOIN restaurant ON items.id_restaurant=restaurant.id where items.id_restaurant=${idResto}`
                db.query(query, (error, result, field) => {
                    if (error) reject = new Error(error)
                    resolve(result)
                })
            })
        } else {
            resolve(false)
        }
    },

    Restaurant: (id) => {
        if (id) {
            return new Promise((resolve, reject) => {
                const query = `SELECT id,image_restaurant,restaurant, description, created_at FROM restaurant where id=${id}`
                db.query(query, (error, result, field) => {
                    if (error) reject = new Error(error)
                    resolve(result[0])
                })
            })
        } else {
            resolve(error)
        }
    },

    AllItems: (req) => {
        const { conditions, paginate } = paginationParams(req)
        return new Promise((resolve, reject) => {

            db.query(`SELECT COUNT(*) as total FROM items ${conditions}`, (error, result, field) => {
                if (error) {
                    resolve({ success: false, message: 'gagal' })
                }
                else {
                    const { total } = result[0]
                    db.query(`SELECT items.id, items.image_items, restaurant.restaurant, category.category, category_detail.category_detail, items.name, items.quantity, items.price, items.created_at FROM items JOIN category_detail ON category_detail.id=items.id_category_detail JOIN category ON category.id=category_detail.id_category JOIN restaurant ON items.id_restaurant=restaurant.id ${conditions} ${paginate}`, (error, result) => {
                        if (error) {
                            resolve({ success: false, message: 'Query False' })
                        } else {
                            resolve({ success: true, message: 'berhasil', result, total })
                        }

                    })

                }
            })
        })
    },

    AllRestaurant: (req) => {
        const { conditions, paginate } = paginationParams(req)
        return new Promise((resolve, reject) => {

            db.query(`SELECT COUNT(*) as total FROM restaurant ${conditions}`, (error, result, field) => {
                if (error) {
                    resolve({ success: false, message: 'gagal' })
                }
                else {
                    const { total } = result[0]
                    db.query(`SELECT id, image_restaurant,restaurant, description, created_at FROM restaurant ${conditions}${paginate}`, (error, result) => {
                        if (error) {
                            resolve({ success: false, message: 'Query False' })
                        } else {
                            resolve({ success: true, message: 'berhasil', result, total })
                        }

                    })

                }
            })
        })
    },

    Category: (id) => {
        if (id) {
            return new Promise((resolve, reject) => {
                const query = `SELECT category_detail.id, category.category, category_detail.category_detail FROM category_detail JOIN category ON category_detail.id_category=category.id WHERE category_detail.id=${id}`
                db.query(query, (error, result, field) => {
                    if (error) reject = new Error(error)
                    resolve(result[0])
                })
            })
        } else {
        }
    },


    getAllCategory: (req) => {
        const { conditions, paginate } = paginationParams(req)
        if (req) {
            return new Promise((resolve, reject) => {
                const query = `SELECT COUNT(*) as total from category_detail ${conditions}`
                console.log(query)

                db.query(query, (error, result, field) => {
                    if (error) {
                        resolve({ success: false, message: 'Query False' })
                    } else {
                        const { total } = result[0]
                        const query = `SELECT category_detail.id, category.category, category_detail.category_detail,category_detail.image_category_detail FROM category_detail JOIN category ON category_detail.id_category=category.id ${conditions} ${paginate}`
                        db.query(query, (error, result, field) => {
                            if (error) {
                                resolve({ success: false, message: 'Query Error' })
                            } else {
                                resolve({ success: true, message: 'Berhasil', result, total })
                            }
                        })
                    }
                })
            })
        } else {


        }
    },



}