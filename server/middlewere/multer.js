
const multer  = require('multer')

const storage = multer.memoryStorage()
const upload = multer({ 
    storage: storage,
})

const UploadHandler = upload.single('photoProfile')

module.exports = UploadHandler