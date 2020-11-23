// const resFood = require('../models/resFood')

// const getFood = async (req, res) => {
//     const { id } = req.params
//     const data = await resFood.Food(id)
//     if (data) {
//         res.send({
//             success: true,
//             data
//         })
//     } else {
//         res.send({
//             success: false,
//             msg: 'error'
//         })
//     }
// }

// const getAllFood = async (req, res) => {
//     const data = await resFood.Food()
//     if (data) {
//         res.send({
//             success: true,
//             data
//         })
//     } else {
//         res.send({
//             success: false,
//             msg: 'error'
//         })
//     }
// }
// module.exports = {
//     getFood,
//     getAllFood
// }