const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const MulterStorage = upload.single('imageUrl')

module.exports = MulterStorage