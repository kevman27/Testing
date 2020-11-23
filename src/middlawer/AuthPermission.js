const jwt = require('jsonwebtoken')
require('dotenv').config()

function checkAuthPermission(req, res, next) {
    try {
        if (req.auth.class_user === 'Admin' || req.auth.class_user === 'SuperAdmin') {
            next()
        } else {
            res.send({
                success: false,
                msg: 'You not have permissionYou are not an admin or superadmin'
            })
        }
    } catch (e) {
        res.send({
            success: false,
            msg: 'You not have permission'
        })
    }
}

module.exports = {
    checkAuthPermission
}



// const checkPermission = (auth, role) => {
//     return new Promise((resolve, reject) => {
//         if (auth) {
//             db.query(`SELECT is_${role}${role === 'admin' ? ',is_superadmin' : ''} FROM users WHERE username='${auth.username}'`,
//                 (err, results, fields) => {
//                     if (err || !(results[1].length > 0)) {
//                         console.log(err)
//                         reject(new Error(err || 'Your Account Has Been Deleted'))
//                     } else {
//                         resolve(results[1][0][`is_${role}`] || (role === 'admin' ? results[1][0].is_superadmin : 0))
//                     }
//                 })
//         } else {
//             resolve(false)
//         }
//     })
// }