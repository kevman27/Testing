const db = require('../config/db')
const bcrypt = require('bcryptjs')
const uuidv1 = require('uuid').v1

module.exports = {
    update: (username, password, newPassword) => {
        return new Promise((resolve, reject) => {
            console.log(newPassword)
            if (username && password) {
                db.query(`SELECT COUNT(*) as total FROM user_privat where username='${username}'`,
                    (error, results, fields) => {
                        if (error) {
                            resolve({ success: false, message: 'Username Not Found' })
                        } else {
                            db.query(`SELECT *FROM user_privat where username='${username}'`, (error, results, fields) => {
                                const dataPassword = results[0].password
                                console.log(dataPassword)
                                const compare = bcrypt.compareSync(password, dataPassword)
                                console.log(compare)

                                if (compare === false) {
                                    resolve({ success: false, message: 'password and new password false' })
                                }
                                else {
                                    const hash = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10))
                                    db.query(`UPDATE user_privat SET password='${hash}' where username='${username}'`, (error, results, fields) => {
                                        if (error) {
                                            resolve({ success: false, message: 'password and new password false' })
                                        } else {
                                            resolve({ success: true, message: 'Data has been updated' })
                                        }
                                    })
                                }

                            })
                        }
                    })
            }
        })
    },


    getVerify: (username) => {
        if (username) {
            return new Promise((resolve, reject) => {
                const query = `SELECT COUNT(*) as total FROM user_privat where username='${username}'`
                db.query(query, (error, result, field) => {
                    const { total } = result[0]
                    if (total === 0) {
                        resolve({ success: false, message: 'username: ' + username + ' tidak ditemukan' })
                    } else {
                        db.query(`SELECT *FROM user_privat where username='${username}'`, (error, result, field) => {
                            if (error) {
                                resolve({ success: false, message: 'Query False' })
                            }
                            else {
                                console.log(result)
                                verifyCode = result[0].verify
                                resolve({ success: true, message: 'username:' + username + ' is found', Code: verifyCode })
                            }
                        })

                    }
                })
            })
        }
    },

    forgot: (verify, username, newPassword, confirmPassword) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT Count(*) as total FROM user_privat where username='${username}' && verify='${verify}'`, (error, result, field) => {
                const { total } = result[0]
                if (total != 1) {
                    resolve({ success: false, message: 'Username or Code verify false' })
                }
                else {
                    db.query(`SELECT * FROM user_privat where username='${username}' && verify='${verify}'`, (error, result, field) => {
                        if (newPassword != confirmPassword) {
                            resolve({ success: false, message: 'newPassword and confirmPassword tidak sama' })
                        } else {
                            const hashPassword = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10))
                            console.log(hashPassword)
                            const verifyCode = uuidv1()
                            console.log(verifyCode)
                            db.query(`UPDATE user_privat SET password='${hashPassword}', verify='${verifyCode}' where username='${username}' && verify='${verify}'`, (error, result, field) => {
                                if (error) {
                                    resolve({ success: false, message: 'Query False' })
                                } else {
                                    resolve({ success: true, message: 'username: ' + username + 'has been updated password. Please login back' })
                                }
                            })
                        }

                    })
                }
            })
        })
    }
}