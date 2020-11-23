const db = require('../config/db')

module.exports = {
  create: (name, username, password, email, ) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT COUNT(*) as total FROM user_privat WHERE username = '${username}' LIMIT 1`,
        (error, results, fields) => {
          if (!error) {
            const { total } = results[0]
            if (total !== 0) {
              resolve({ success: false, message: 'Username already used. Please fill in the email again' })
            } else {
              {
                db.query(`SELECT COUNT(*) as total FROM users_detail WHERE email = '${email}' LIMIT 1`,
                  (error, results, fields) => {
                    if (!error) {
                      const { total } = results[0]
                      if (total !== 0) {
                        resolve({ success: false, message: 'Email already used. Please fill in the email again ' })
                      } else {
                        // const hashpassword = bcrypt.hashSync('${password}', salt) '${hashpassword}'
                        db.query(`INSERT INTO users_detail(nama, email) VALUES('${name}','${email}')`,
                          (error, result, fields) => {
                            if (error) {
                              resolve(false)
                            } else {
                              db.query(`SELECT COUNT(*) as total FROM users_detail WHERE email = '${email}' LIMIT 1 `,
                                (error, results, fields) => {
                                  if (!error) {
                                    console.log('woi7')
                                    db.query(`select max(id) as id from users_detail`, (error, results, fields) => {
                                      if (error) {
                                        resolve(false)
                                      } else {

                                        const maxId = results[0].id
                                        console.log(maxId)
                                        db.query(`INSERT INTO user_privat(username, password, id_users_detail, id_user_class) VALUES('${username}','${password}',${maxId},4)`, (error, results, fields) => {
                                          if (!error) {
                                            resolve(true)
                                          }
                                        })
                                      }
                                    })
                                  }
                                }
                              )
                            }

                          })
                      }
                    } else {
                      reject(new Error(error))
                    }
                  })
              }
            }
          }
        }
      )
    })
  },

  get: (id) => {
    if (id) {
      return new Promise((resolve, reject) => {
        const query = `SELECT user_privat.id, user_privat.username, users_detail.nama, users_detail.image, users_detail.email, user_class.class_user, user_privat.created_at FROM user_privat JOIN users_detail ON user_privat.id_users_detail=users_detail.id JOIN user_class ON user_privat.id_user_class=user_class.id WHERE user_privat.id=${id}`
        db.query(query, (error, result, field) => {
          if (error) reject = new Error(error)
          resolve(result[0])
        })
      })
    } else {
      return new Promise((resolve, reject) => {
        db.query(`SELECT user_privat.id, user_privat.username, users_detail.nama, users_detail.image, users_detail.email, user_class.class_user, user_privat.created_at FROM user_privat JOIN users_detail ON user_privat.id_users_detail=users_detail.id JOIN user_class ON user_privat.id_user_class=user_class.id`, (error, result, field) => {
          if (error) reject = new Error(error)
          resolve(result)
        })
      }
      )
    }
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT COUNT(*) as total FROM user_privat where id=${id}`, (error, result, field) => {
        if (!error) {
          const { total } = result[0]
          if (total === 0) {
            resolve({ success: false, message: 'ID not Found' })
          } else {
            db.query(`DELETE user_privat, users_detail FROM user_privat JOIN users_detail ON user_privat.id_users_detail = users_detail.id WHERE user_privat.id =${id}`, (error, result, field) => {
              if (error) {
                console.log(error)
                resolve({ success: false, message: 'failed to delete failed due to an error in the query' })
              } else {
                resolve({ success: true, message: 'User has been deleted' })
              }
            })
          }
        }
      })
    })
  },

  update: (id, classUser) => {
    console.log(id)
    console.log(classUser)
    return new Promise((resolve, reject) => {
      if (classUser === null) {
        resolve({ success: false, message: 'ClassUser tidak boleh kosong' })
      }
      else {
        db.query(`SELECT COUNT(*) as total from user_privat where id=${id}`, (error, result) => {
          const { total } = result[0]
          if (error) {
            resolve({ success: false, message: 'Query False' })
          }
          else if (total < 1 || total > 1)
            resolve({ success: false, message: 'ID tidak ditemukan' })

          else {
            db.query(`UPDATE user_privat SET id_user_class=${classUser} where id=${id}`, (error, result) => {
              if (error) {
                console.log(error)
                resolve({ success: false, message: 'Query False' })
              } else {
                resolve({ success: true, message: 'User dengan ID: ' + id + ' Sudah TerUpdate' })
              }

            })

          }

        })
      }
    })
  }

}

