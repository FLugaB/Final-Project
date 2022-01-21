const FormData = require('form-data')
const axios = require('axios')
const { contentImageValidate } = require('../helpers/imagekit')

const ImageKit_API = async (req, res, next) => {
  try {
    if(req.file) {
      let name = req.body.name
      contentImageValidate(req)
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
      
      const response = await instance({
        method: "POST",
        url: "files/upload",
        data: form,
        headers: {
          ...form.getHeaders()
        }
      })
      req.body.imageUrl = response.data.url
    }
    next()
  } catch (err) {
    next(err)
  }
}

module.exports = ImageKit_API