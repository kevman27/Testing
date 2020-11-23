const multer = require('multer')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + '.' + file.mimetype.split('/')[1])
    }
})
const validMimeType = ['png', 'jpg', 'jpeg']
const uploadMulter = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 2
    },
    fileFilter: (req, file, cb) => {
        if (!validMimeType.includes(file.mimetype.split('/')[1])) {
            console.log('wois')
            return cb(new Error('Wrong File Type'))
        } else {
            return cb(null, true)
        }
    }
})

const uploads = (req, res, namaFile) => {
    return new Promise((resolve, reject) => {
        uploadMulter.single(namaFile)(req, res, error => {
            if (error) {
                console.log(error)
                reject(new Error(error))
            }
            return resolve({ success: true, message: 'berhasil yoi' })
        })
    })
}

module.exports = uploads