const contentImageValidate = (req) => {
  if (!req.body.name) {
    throw { name: "VALIDATE_NAME_FILE"}
  }
  if (!req.body.description) {
    throw { name: "VALIDATE_CONTENT_FILE"}
  }
  if (req.file.size > 255000){
    throw { name: "NOT_ALLOWED_SIZE_FILE" }
  }
  if (req.file.mimetype !== 'image/png' && req.file.mimetype !== 'image/jpg' && req.file.mimetype !== 'image/jpeg') {
    throw { name: "NOT_ALLOWED_TYPE_FILE" }
  }
}


module.exports = {
  contentImageValidate
}