const FormData = require('form-data')
const axios = require('axios')
const { imageProfileValidation } = require('../helpers/imagekit')

const ImageKit_API = async (req, res, next) => {
  try {
    if(req.file) {
      let name = req.file.originalname
      let imageFile = req.file.buffer.toString("base64")
      let form = new FormData()
      form.append("fileName", name)
      form.append("file", imageFile)
      const instance = axios.create({
        baseURL: process.env.BASE_URL_IMAGEKIT,
        auth: {
          username: process.env.IMAGEKIT_KEY
        }
      })
      const response = await instance.post('files/upload', form,{
        headers:   form.getHeaders()
        
      })
      req.body.photoProfile = response.data.url
    }
    next()
  } catch (err) {
    console.log(err, "ini error");
    next(err)
  }
}

module.exports = ImageKit_API