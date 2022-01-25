const FormData = require("form-data");
const {ResponseAxiosPost} = require("../apis/axios.js");

const UploadImage = async (req, res, next) => {
    // console.log(req.body,`ini reqbody`);
    try {

        if (req.file == undefined) {
            next()
        } else {
            console.log("imagekit area field", req.file);
            
            let typeFile = req.file.mimetype
            // console.log(typeFile);
            if (!typeFile.includes('image')) {
                // console.log(object);
                throw { name: "Unsopported File Type"}
            }
            // console.log(req.file, "<<<<<");
            
            let formData = new FormData();
            let encodedImage = req.file.buffer.toString("base64");
            formData.append("file", encodedImage);
            formData.append("fileName", req.file.originalname);
            
            const response = await ResponseAxiosPost(formData)
            // console.log(response, "this is from response")
            req.body.photoProfile = response.data.url;
            next();

        }
    } catch (err) {
        next(err)
    }
};

module.exports = UploadImage