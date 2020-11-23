const db = require('../config/db')
const { paginationParams } = require('../pagination/pagination')

module.exports = {
    Resto: (id) => {
        if (id) {
            return new Promise((resolve, reject) => {
                const query = `SELECT *FROM restaurant where id=${id}`
                db.query(query, (error, result, field) => {
                    if (error) reject = new Error(error)
                    resolve(result[0])
                })
            })
        } else {
            return new Promise((resolve, reject) => {
                db.query(`SELECT *FROM restaurant`, (error, result, field) => {
                    if (error) reject = new Error(error)
                    resolve(result)
                })
            }
            )
        }
    },

    AllResto: (req) => {
        const { paginate, conditions } = paginationParams(req)
        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(*) as total FROM restaurant ${conditions}`, (error, result, field) => {
                if (error) {
                    resolve({ success: false, message: 'Query False' })
                } else {
                    const { total } = result[0]
                    db.query(`SELECT *FROM restaurant ${conditions}${paginate}`, (error, result, field) => {
                        if (error) {
                            resolve({ success: false, message: 'Query False' })
                        } else {
                            const data = result
                            resolve({ success: true, message: 'Data Resturant berhasil', data, total })
                        }

                    })
                }
            })
        })
    },


    create: (restaurant, description, id_admin, imageRestaurant) => {

        console.log(imageRestaurant)
        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(*) as total FROM restaurant where restaurant='${restaurant}'`, (error, result, field) => {
                if (!error) {
                    const { total } = result[0]
                    if (total > 0) {
                        console.log('woi')
                        resolve({ success: false, message: 'Restaurant Already exist' })
                    }
                    else {
                        console.log('woi1')
                        db.query(`INSERT INTO restaurant(restaurant,image_restaurant,description,id_admin) Values('${restaurant}','${imageRestaurant}', '${description}',${id_admin})`, (error, result, field) => {
                            if (error) {
                                console.log('woi2')
                                resolve({ success: false, message: 'There was an error entering data into the database ' })
                            } else {
                                resolve({ success: true, message: 'data has been added' })
                            }
                        })
                    }
                }
            })
        })
    },


    delete: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(*) as total FROM restaurant where id=${id}`, (error, result, field) => {
                if (!error) {
                    const { total } = result[0]
                    if (total === 0) {
                        resolve({ success: false, message: 'ID not Found' })
                    } else {
                        db.query(`DELETE from restaurant WHERE id =${id}`, (error, result, field) => {
                            if (error) {
                                resolve({ success: false, message: 'failed to delete failed due to an error in the query' })
                            } else {
                                resolve({ success: true, message: 'Restaurant has been deleted' })
                            }
                        })
                    }
                }
            })
        })
    },

    update: (id, restaurant, description, id_admin, imageRestaurant) => {
        return new Promise((resolve, reject) => {
            var regex = /^\d+$/

            if (regex.test(id_admin) === false) {
                resolve({ success: false, message: 'id_admin Harus Angka' })
                return;
            }
            else {
                db.query(`SELECT COUNT(*) as total FROM restaurant where id=${id}`, (error, result, field) => {
                    if (!error) {
                        const { total } = result[0]
                        if (total === 0) {
                            resolve({ success: false, message: 'Id not found' })
                        } else {
                            db.query(`UPDATE restaurant SET restaurant= '${restaurant}', image_restaurant='${imageRestaurant}' ,description= '${description}', id_admin= ${id_admin} where id=${id}`, (error, result, field) => {
                                if (error) {
                                    console.log('woi')
                                    resolve({ success: false, message: 'Query False' })
                                } else {
                                    resolve({ success: true, message: 'Data has been Updated' })
                                }
                            })
                        }
                    } else {
                        resolve({ success: false, message: 'Query False' })
                    }
                })
            }
        })

    },





}