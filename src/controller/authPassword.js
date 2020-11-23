const processAuthPassword = require('../models/authPassword')
// password=kevman137
const changePassword = async (req, res) => {
    const { username, password, newPassword } = req.body
    const { success, message } = await processAuthPassword.update(username, password, newPassword)
    try {
        if (success) {
            res.send({
                success: true,
                message
            })
        }
        else {
            res.send({
                success: false,
                message: 'Password not Updated'
            })
        }
    } catch (error) {
        res.send({
            success: false,
            message
        })
    }
}

const checkUsername = async (req, res) => {
    const { username } = req.body
    const { success, message, Code } = await processAuthPassword.getVerify(username)
    try {
        if (success) {
            res.send({
                success: true,
                message,
                Code
            })
        }
        else {
            res.send({
                success: false,
                message
            })
        }
    } catch (error) {
        res.send({
            success: false,
            message
        })
    }
}


const forgotPassword = async (req, res) => {
    const { verify, username, newPassword, confirmPassword } = req.body
    const { success, message } = await processAuthPassword.forgot(verify, username, newPassword, confirmPassword)
    try {
        if (success) {
            res.send({
                success: true,
                message,
            })
        }
        else {
            res.send({
                success: false,
                message
            })
        }
    } catch (error) {
        res.send({
            success: false,
            message
        })
    }
}

module.exports = {
    changePassword,
    forgotPassword,
    checkUsername
}