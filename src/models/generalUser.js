const db = require('../config/db')

module.exports = {
    Profile: (id) => {
        if (id) {
            return new Promise((resolve, reject) => {
                db.query(`SELECT COUNT(*) as total FROM user_privat where id=${id}`, (error, result, field) => {
                    const { total } = result[0]
                    if (total === 1) {
                        const query = `SELECT user_privat.id, users_detail.nama, users_detail.email, users_detail.image, users_detail.age, users_detail.tall, users_detail.weight, users_detail.topup FROM user_privat JOIN users_detail ON user_privat.id_users_detail=users_detail.id WHERE user_privat.id=${id}`
                        db.query(query, (error, result, field) => {
                            if (error) reject = new Error(error)
                            data = result[0]
                            resolve({ data, success: true, message: 'berhasil' })
                        })
                    }
                    else {
                        resolve({ success: false, message: 'ID not Found' })
                    }
                })
            })
        }
    },

    // updateItems: (id, name, quantity, price, id_category_detail, id_restaurant, dataImage) => {
    //     return new Promise((resolve, reject) => {
    //         db.query(`SELECT Count(*) as total FROM items where id=${id}`, (error, result, field) => {
    //             if (!error) {
    //                 const { total } = result[0]
    //                 if (total === 0) {
    //                     resolve({ success: false, message: 'Id not found' })
    //                 } else {
    //                     db.query(`UPDATE items SET name= '${name}', image='${dataImage}',quantity= ${quantity}, price= ${price}, id_category_detail= ${id_category_detail},id_restaurant=${id_restaurant} where id=${id}`, (error, result, field) => {
    //                         if (error) {
    //                             resolve({ success: false, message: 'Query False' })
    //                         } else {
    //                             resolve({ success: true, message: 'Data has been Updated' })
    //                         }
    //                     })
    //                 }
    //             }
    //         })
    //     })
    // },

    update: (id, name, email, age, tall, weight, dataImage) => {
        return new Promise((resolve, reject) => {
            var regex = /^\d+$/


            if (regex.test(age) === false) {
                resolve({ success: false, message: 'Age Harus Angka' })
                return;
            }
            else if (regex.test(tall) === false) {
                resolve({ success: false, message: 'Tall Harus Angka' })
                return;
            }
            else if (regex.test(weight) === false) {
                resolve({ success: false, message: 'Weight Harus Angka' })
                return;
            }
            else {
                db.query(`SELECT COUNT(*) as total FROM users_detail where id=${id}`, (error, result, field) => {
                    if (!error) {
                        const { total } = result[0]
                        if (total === 0) {
                            resolve({ success: false, message: 'Id not found' })
                        } else {
                            db.query(`UPDATE users_detail SET nama= '${name}', email= '${email}',  image='${dataImage}' ,age= ${age}, tall= ${tall}, weight= ${weight} where id=${id}`, (error, result, field) => {
                                if (error) {
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


    Reviews: (name) => {
        if (name) {
            return new Promise((resolve, reject) => {
                const query = `SELECT reviews.id, restaurant.restaurant, category.category, category_detail.category_detail, items.name, users_detail.nama, reviews.comment from reviews join items on reviews.id_items=items.id join users_detail on reviews.id_users_detail= users_detail.id JOIN category_detail ON category_detail.id=items.id_category_detail JOIN category ON category.id=category_detail.id_category JOIN restaurant ON items.id_restaurant=restaurant.id WHERE users_detail.nama='${name}'`
                db.query(query, (error, result, field) => {
                    if (error) reject = new Error(error)
                    data = result[0]
                    resolve({ data, success: true, message: 'berhasil' })
                })
            })
        }
    },

    getReviewsByIdItem: (id) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT reviews.id, restaurant.restaurant, category.category, category_detail.category_detail, items.name, users_detail.nama, users_detail.image, reviews.comment,reviews.id_items from reviews join items on reviews.id_items=items.id join users_detail on reviews.id_users_detail= users_detail.id JOIN category_detail ON category_detail.id=items.id_category_detail JOIN category ON category.id=category_detail.id_category JOIN restaurant ON items.id_restaurant=restaurant.id where reviews.id_items=${id}`
            db.query(query, (error, result, field) => {
                if (error) {
                    resolve({ success: false, message: 'berhasil' })
                }
                else {
                    data = result
                    resolve({ data, success: true, message: 'berhasil' })
                }
            })
        })

    },


    ReviewsAll: (params) => {
        return new Promise((resolve, reject) => {

            const { currentPage, perPage, search, sort } = params
            const condition = `
            ${search && `WHERE ${search.map(v => `${v.keys} LIKE '${v.value}%'`).join(' AND ')}`} 
            ORDER BY ${sort.keys} ${!sort.value ? 'ASC' : 'DESC'} 
            ${(currentPage && perPage) && `LIMIT ${perPage} OFFSET ${parseInt(perPage) * ((parseInt(currentPage) - 1))}`}`

            const query = `SELECT COUNT(*) as total FROM reviews ${condition.slice(0, condition.indexOf('LIMIT'))}`

            db.query(query, (error, result) => {
                if (error) {
                    resolve({ success: false, message: 'query false' })
                }
                else {
                    const { total } = result[0]

                    const query = `SELECT reviews.id, restaurant.restaurant, category.category, category_detail.category_detail, items.name, users_detail.nama, reviews.comment from reviews join items on reviews.id_items=items.id join users_detail on reviews.id_users_detail= users_detail.id JOIN category_detail ON category_detail.id=items.id_category_detail JOIN category ON category.id=category_detail.id_category JOIN restaurant ON items.id_restaurant=restaurant.id ${condition}`

                    db.query(query, (error, result, field) => {
                        if (error) reject = new Error(error)
                        data = result

                        resolve({ data, total, success: true, message: 'berhasil' })
                    })
                }
            })

        })
    },



    createR: (idUsers, comment, id_items) => {
        return new Promise((resolve, reject) => {
            var regex = /^\d+$/
            if (regex.test(id_items) === false) {
                resolve({ success: false, message: 'id_items Harus Angka' })
                return;
            }
            else {
                const query = `INSERT INTO reviews (reviews.comment, reviews.id_users_detail,reviews.id_items) VALUES('${comment}',${idUsers},${id_items}) `
                db.query(query, (error, result, field) => {
                    if (error) { resolve({ success: false, message: 'salah woi' }) }

                    else {
                        resolve({ success: true, message: 'berhasil di Comment' })
                    }
                })
            }
        })


    },

    Topup: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(*) as total FROM users_detail where id=${id}`, (error, result, field) => {
                const { total } = result[0]
                if (total === 1) {
                    const query = `SELECT user_privat.username, users_detail.email,users_detail.nama, users_detail.topup FROM user_privat JOIN users_detail ON user_privat.id_users_detail=users_detail.id WHERE users_detail.id=${id}`
                    db.query(query, (error, result, field) => {
                        data = result[0]

                        if (error) {
                            resolve({ data, success: false, message: 'tidak berhasil' })
                        }
                        else {


                            resolve({ data, success: true, message: 'berhasil' })

                        }
                    })
                }
                else {
                    resolve({ success: false, message: 'ID not Found' })
                }
            })
        })

    },


    tambahTopUp: (id, topup) => {
        console.log(id)
        return new Promise((resolve, reject) => {
            if (topup < 0) {
                resolve({ success: false, message: 'Input Top Up Tidak Boleh Negatif' })
            } else {
                if (topup == 0) {
                    resolve({ success: false, message: 'Input Top Up Tidak Boleh Nol' })
                } else {
                    db.query(`SELECT *FROM users_detail where id=${id}`, (error, result, field) => {
                        const mytopup = result[0].topup
                        const totaltopup = parseInt(mytopup) + parseInt(topup)

                        if (!error) {
                            db.query(`UPDATE users_detail set topup=${totaltopup} where id=${id}`, (error, result) => {
                                if (error) {
                                    resolve({ success: false, message: 'query False' })
                                } else {
                                    resolve({ success: true, message: 'Berhasil di topup', totaltopup })
                                }
                            })
                        }
                        else {
                            resolve({ success: false, message: 'Query False' })
                        }
                    })
                }
            }

        })

    },

    postCart: (idItems, quantity, idUsers, nameUser) => {
        return new Promise((resolve, reject) => {
            if (quantity < 1) {
                resolve({ success: false, message: ' Quantity tidak boleh kurang dari 1' })
            }
            else {
                db.query(`SELECT COUNT(*) as total FROM items where id = ${idItems}`, (error, result, field) => {
                    const { total } = result[0]

                    if (total != 1) {
                        resolve({ success: false, message: 'Id items Not Found' })
                    } else {
                        db.query(`SELECT * FROM items where id = ${idItems}`, (error, result, field) => {
                            if (error) {
                                resolve({ success: false, message: 'Query False' })
                            } else {
                                const harga = result[0].price
                                const nameItems = result[0].name
                                const totalItems = harga * quantity


                                db.query(`INSERT INTO carts(name_items, name_user, buy_quantity, result, id_items, id_users_detail) VALUES('${nameItems}', '${nameUser}', ${quantity}, ${totalItems}, ${idItems}, ${idUsers})`, (error, result, field) => {
                                    if (error) {
                                        resolve({ success: false, message: 'Query Falsee' })
                                    } else {


                                        resolve({ success: true, message: 'Berhasil ditambahkan ke Cart', items: nameItems, harga: totalItems })
                                    }
                                })
                            }
                        })

                    }

                })
            }
        })
    },


    deleteCart: (idCart) => {
        return new Promise((resolve, reject) => {
            console.log(idCart)
            db.query(`SELECT COUNT(*) as total FROM carts where id = ${idCart} && carts.transaksi=0`, (error, result, field) => {
                const { total } = result[0]
                if (total < 1) {
                    resolve({ success: false, message: 'Tidak Ada Cart' })
                } else {
                    db.query(`DELETE FROM carts where id=${idCart} `, (error, result, field) => {
                        if (error) {
                            resolve({ success: false, message: 'Query False' })
                        } else {
                            resolve({ success: true, message: 'ID: ' + idCart + ' Sudah Terhapus' })
                        }
                    })
                }
            })
        })

    },

    getCart: (idUsers) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(*) as total FROM carts where id_users_detail = ${idUsers} && carts.transaksi=0`, (error, result, field) => {
                const { total } = result[0]
                if (error) {
                    resolve({ success: false, message: 'Login terlebih dahulu' })
                } else {

                    db.query(`SELECT carts.id, carts.name_items, items.image_items, carts.buy_quantity, carts.result, carts.transaksi FROM carts JOIN items ON carts.id_items= items.id WHERE carts.id_users_detail=${idUsers} && carts.transaksi=0`, (error, result, field) => {
                        if (error) {
                            resolve({ success: false, message: 'Query False' })
                        } else {
                            const data = result

                            resolve({ success: true, message: 'Berhasil', data, total })
                        }
                    })
                }
            })
        })

    },


    ProcessCheckOut: (idCart) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM carts where id = ${idCart}`, (error, result) => {
                const buyQuantity = result[0].buy_quantity
                const harga = result[0].result
                const idUsers = result[0].id_users_detail
                const idItems = result[0].id_items
                if (error) {
                    resolve({ success: false, message: 'query error' })
                } else {
                    if (result[0].transaksi === 1) {
                        resolve({ success: false, message: 'Sudah tranksaksi' })
                    }
                    else {
                        db.query(`SELECT * FROM items where id = ${idItems}`, (error, result) => {
                            const idItems = result[0].id
                            // const priceItems = result[0].price
                            const quantity = result[0].quantity

                            if (buyQuantity > quantity) {
                                resolve({ success: false, message: 'Barangnnya Kurang' })
                            } else {
                                db.query(`SELECT * FROM users_detail where id = ${idUsers}`, (error, result, field) => {
                                    if (error) {
                                        resolve({ success: false, message: 'Query False' })
                                    } else {
                                        const topup = result[0].topup

                                        if (harga > topup) {
                                            resolve({ success: false, message: 'Saldo Kurang' })
                                        } else {
                                            const sisaTransaksi = topup - harga
                                            const sisaBarang = quantity - buyQuantity
                                            db.query(` UPDATE users_detail set topup = ${sisaTransaksi} where id = ${idUsers}`, (error, result) => {
                                                if (error) {
                                                    resolve({ success: false, message: 'query falsee' })
                                                } else {
                                                    db.query(`UPDATE items set quantity = ${sisaBarang} where id = ${idItems}`, (error, result) => {
                                                        if (error) {
                                                            resolve({ success: false, message: 'Query Salah' })
                                                        }
                                                        else {
                                                            db.query(`UPDATE carts set transaksi = 1 where id = ${idCart}`, (error, result) => {
                                                                if (!error) {
                                                                    resolve({ success: true, message: 'Berhasi transaksi', SisaTopup: sisaTransaksi })
                                                                }
                                                                else {
                                                                    resolve({ success: false, message: 'Query Slaah' })
                                                                }
                                                            })
                                                        }
                                                    })

                                                }
                                            })
                                        }
                                    }
                                })
                            }
                        })
                    }
                }
            })
        })
    },

}