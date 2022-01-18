
const FormData = require("form-data")
const axios = require ('axios')

const uploadImage = async (req,res, next) => {
  try { 
    const isFileExists = req.file?.mimetype
    if (isFileExists) {
      if (req.file.mimetype.split("/")[0].toLowerCase()!== 'image') {
        throw{name: "ImageTypeWrong"}
      } 
      if (req.file.size > 255000) {
        throw{name: "imageSizeToBig"}
      }  else {
        let formData = new FormData()
        formData.append("file", req.file.buffer.toString("base64"));  
        formData.append("fileName", req.file.originalname); 
        const upload = await axios({
          method: "POST",
          url: 'https://upload.imagekit.io/api/v1/files/upload',
          data: formData,
          headers: formData.getHeaders(),
          auth: {
            username: process.env.APIKEY,
          },
        })
        req.body.imageUrl= upload.data.url,
        next()
      }
    } else {
      next ({name : "ImageUndefined"})
    }
  }
  catch(err) {
    next(err)
  }
}

module.exports = {uploadImage}