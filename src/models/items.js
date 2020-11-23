const db = require('../config/db')
const { paginationParams } = require('../pagination/pagination')

module.exports = {

    getItemsCategory: (id) => {
        if (id) {
            return new Promise((resolve, reject) => {
                const query = `SELECT COUNT(*) as total from category_detail where id=${id}`
                db.query(query, (error, result, fields) => {
                    const { total } = result[0]
                    if (total === 0) {
                        resolve({ success: false, message: 'ID not found' })
                    }
                    else {
                        const query = `SELECT items.id, items.id_category_detail, items.image_items, restaurant.restaurant, category.category, category_detail.category_detail, items.name, items.quantity, items.price, items.created_at FROM items JOIN category_detail ON category_detail.id=items.id_category_detail JOIN category ON category.id=category_detail.id_category JOIN restaurant ON items.id_restaurant=restaurant.id where items.id_category_detail=${id}`
                        db.query(query, (error, result, field) => {
                            if (error) {
                                resolve({ success: false, message: 'Query Error' })
                            }
                            else {
                                const data = result
                                console.log(data)
                                resolve({ success: true, message: 'Berhasil', data })
                            }
                        })

                    }
                })

            })
        }
        else {
            resolve({ success: false, message: 'masukkan idnya' })
        }
    },


    getItemsRestaurat: (id) => {
        if (id) {
            return new Promise((resolve, reject) => {
                const query = `SELECT COUNT(*) as total from restaurant where id=${id}`
                db.query(query, (error, result, fields) => {
                    const { total } = result[0]
                    if (total === 0) {
                        resolve({ success: false, message: 'ID not found' })
                    }
                    else {
                        const query = `SELECT items.id, items.id_restaurant, items.image_items, restaurant.restaurant, category.category, category_detail.category_detail, items.name, items.quantity, items.price, items.created_at FROM items JOIN category_detail ON category_detail.id=items.id_category_detail JOIN category ON category.id=category_detail.id_category JOIN restaurant ON items.id_restaurant=restaurant.id where items.id_restaurant=${id}`
                        db.query(query, (error, result, field) => {
                            if (error) {
                                resolve({ success: false, message: 'Query Error' })
                            }
                            else {
                                const data = result
                                console.log(data)
                                resolve({ success: true, message: 'Berhasil', data })
                            }
                        })

                    }
                })

            })
        }
        else {
            resolve({ success: false, message: 'masukkan idnya' })
        }
    },



    getAllItems: (req) => {
        const { conditions, paginate } = paginationParams(req)
        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(*) as total FROM items ${conditions}`, (error, result, field) => {
                console.log(result[0])
                const { total } = result[0]
                if (error) {
                    resolve({
                        success: false,
                        message: 'Query error'
                    })
                } else {
                    const query = `SELECT items.id, items.image_items,restaurant.restaurant, category.category, category_detail.category_detail, items.name, items.quantity, items.price, items.created_at FROM items JOIN category_detail ON category_detail.id=items.id_category_detail JOIN category ON category.id=category_detail.id_category JOIN restaurant ON items.id_restaurant=restaurant.id${conditions}  ${paginate}`
                    db.query(query, (error, result, field) => {
                        if (error) {
                            resolve({ success: false, message: 'Query Error' })

                        } else {
                            resolve({ success: true, message: 'Data Berhasil', result, total })
                        }
                    })
                }
            })

        })
    },


    createItems: (name, quantity, price, id_category_detail, id_restaurant, dataImage) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(*) as total FROM items where name = '${name}'`, (error, result, field) => {
                if (!error) {
                    const { total } = result[0]
                    if (total > 0) {
                        resolve({ success: false, message: 'Name Already exist' })
                    }
                    else {
                        console.log(dataImage)
                        db.query(`INSERT INTO items(name, image_items, quantity, price, id_category_detail, id_restaurant) Values('${name}', '${dataImage}' ,${quantity}, ${price}, ${id_category_detail}, ${id_restaurant})`, (error, result, field) => {
                            if (error) {
                                resolve({ success: false, message: 'There was an error entering data into the database ' })
                            } else {
                                resolve({ success: true, message: 'data has been added', result })
                            }
                        })
                    }
                }
            })
        })
    },


    updateItems: (id, name, quantity, price, id_category_detail, id_restaurant, dataImage) => {
        return new Promise((resolve, reject) => {

            db.query(`SELECT Count(*) as total FROM items where id = ${id} `, (error, result, field) => {
                if (!error) {
                    const { total } = result[0]
                    if (total === 0) {
                        resolve({ success: false, message: 'Id not found' })
                    } else {
                        db.query(`UPDATE items SET name = '${name}', image_items='${dataImage}' , quantity = ${quantity}, price = ${price}, id_category_detail = ${id_category_detail}, id_restaurant = ${id_restaurant} where id = ${id} `, (error, result, field) => {
                            if (error) {
                                console.log(error)

                                resolve({ success: false, message: 'Query False' })
                            } else {

                                resolve({ success: true, message: 'Data has been Updated' })
                            }
                        })
                    }
                } else {
                    resolve({ success: false, message: 'id not found' })
                }
            })
        })
    },


    deleteItemss: (id) => {
        console.log(id, + "disini")
        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(*) as total FROM items where id = ${id} `, (error, result, field) => {
                if (!error) {
                    const { total } = result[0]
                    if (total === 0) {
                        resolve({ success: false, message: 'ID not Found' })
                    } else {
                        db.query(`DELETE FROM items where id=${id} `, (error, result, field) => {
                            if (error) {
                                console.log(error)
                                resolve({ success: false, message: 'failed to delete failed due to an error in the query' })
                            } else {
                                resolve({ success: true, message: 'Data has been deleted' })
                            }
                        })
                    }
                }
            })
        })
    },
    // Drink: (id) => {
    //     if (id) {
    //         return new Promise((resolve, reject) => {
    //             const query = `SELECT menu_drink.id, restaurant.restaurant, menu_drink.drink, menu_drink.drink, menu_drink.price_drink FROM menu_drink JOIN restaurant ON menu_drink.id_restaurant = restaurant.id where menu_drink.id = ${ id } `
    //             db.query(query, (error, result, field) => {
    //                 if (error) reject = new Error(error)
    //                 resolve(result[0])
    //             })
    //         })
    //     } else {
    //         return new Promise((resolve, reject) => {
    //             const query = `SELECT menu_drink.id, restaurant.restaurant, menu_drink.drink, menu_drink.drink, menu_drink.price_drink FROM menu_drink JOIN restaurant ON menu_drink.id_restaurant = restaurant.id`
    //             db.query(query, (error, result, field) => {
    //                 if (error) reject = new Error(error)
    //                 resolve(result)

    //             })
    //         }
    //         )
    //     }
    // },

}