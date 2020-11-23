const db = require('../config/db')

module.exports = {
    get: (id, params) => {
        if (id) {
            return new Promise((resolve, reject) => {
                const query = `SELECT category_detail.id, category.category ,category_detail.image_category_detail, category_detail.category_detail FROM category_detail JOIN category ON category_detail.id_category=category.id WHERE category_detail.id=${id}`
                db.query(query, (error, result, field) => {
                    console.log(query)
                    if (error) reject = new Error(error)
                    resolve(result[0])
                })
            })
        } else {
            console.log('woi')
            const { currentPage, perPage, search, sort } = params
            const condition = `
            ${search && `WHERE ${search.map(v => `${v.keys} LIKE '${v.value}%'`).join(' AND ')}`} 
            ORDER BY ${sort.keys} ${!sort.value ? 'ASC' : 'DESC'} 
            ${(currentPage && perPage) && `LIMIT ${perPage} OFFSET ${parseInt(perPage) * ((parseInt(currentPage) - 1))}`}`

            return new Promise((resolve, reject) => {
                db.query(`SELECT category_detail.id, category.category , category_detail.image_category_detail, category_detail.category_detail FROM category_detail JOIN category ON category_detail.id_category=category.id ${condition}`, (error, result, field) => {
                    if (error) reject = new Error(error)
                    resolve(result)
                })
            }
            )
        }
    },


    getAll: (params) => {
        const { currentPage, perPage, search, sort } = params
        const condition = `
        ${search && `WHERE ${search.map(v => `${v.keys} LIKE '${v.value}%'`).join(' AND ')}`} 
            ORDER BY ${sort.keys} ${!sort.value ? 'ASC' : 'DESC'} 
            ${(currentPage && perPage) && `LIMIT ${perPage} OFFSET ${parseInt(perPage) * ((parseInt(currentPage) - 1))}`}`

        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(*) as total from category_detail  JOIN category ON category_detail.id_category=category.id`, (error, result) => {
                const { total } = result[0]
                db.query(`SELECT category_detail.id, category.category, category_detail.image_category_detail, category_detail.category_detail FROM category_detail JOIN category ON category_detail.id_category=category.id ${condition}`, (error, result, field) => {
                    if (error) {
                        console.log('woi')
                    }

                    else {
                        console.log(total)
                        resolve({ result, total })
                    }

                })
            }
            )
        })

    },


    create: (category_detail, id_category, dataImage) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(*) as total FROM category_detail where category_detail='${category_detail}'`, (error, result, field) => {
                if (!error) {
                    const { total } = result[0]
                    if (total > 0) {
                        resolve({ success: false, message: 'Category Already exist' })
                    }
                    else {
                        db.query(`INSERT INTO category_detail(category_detail, image_category_detail ,id_category) Values('${category_detail}', '${dataImage}' ,${id_category})`, (error, result, field) => {
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

    update: (id, category, id_category, dataImage) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(*) as total FROM category_detail where id=${id}`, (error, result, field) => {
                if (!error) {
                    const { total } = result[0]
                    if (total === 0) {
                        console.log(total)
                        resolve({ success: false, message: 'Id not found' })
                    } else {
                        db.query(`UPDATE category_detail SET category_detail= '${category}', image_category_detail='${dataImage}' ,id_category= ${id_category} where id=${id}`, (error, result, field) => {
                            if (error) {
                                resolve({ success: false, message: 'Query False' })
                            } else {
                                resolve({ success: true, message: 'Data has been Updated' })
                            }
                        })
                    }
                } else {
                    resolve({ success: false, message: 'Category name Found' })
                }
            })
        })
    },

    delete: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(*) as total FROM category_detail where id=${id}`, (error, result, field) => {
                if (!error) {
                    const { total } = result[0]
                    if (total === 0) {
                        resolve({ success: false, message: 'ID not Found' })
                    } else {
                        db.query(`Delete FROM category_detail where id=${id}`, (error, result, field) => {
                            if (error) {
                                resolve({ success: false, message: 'Failed to delete failed due to an error in the query' })
                            } else {
                                resolve({ success: true, message: 'Data has been deleted' })
                            }
                        })
                    }
                }
            })
        })
    },


}