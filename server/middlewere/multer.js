
const multer  = require('multer')

const storage = multer.memoryStorage()
const upload = multer({ 
    storage: storage,
})
// console.log(multer);

const UploadHandler = upload.single('photoProfile')

module.exports = UploadHandler