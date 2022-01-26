const { default: axios } = require("axios");
const FormData = require("form-data");

const UploadImage = async (req, res, next) => {
    try {
        if (req.file == undefined) {
            next()
        } else {
            
            let typeFile = req.file.mimetype
            if (!typeFile.includes('image')) {
                throw { name: "Unsopported File Type"}
            }
            
            let formData = new FormData();
            let encodedImage = req.file.buffer.toString("base64");
            formData.append("file", encodedImage);
            formData.append("fileName", req.file.originalname);

            let encodedKey = Buffer.from(process.env.IMAGEKIT_KEY + ":").toString("base64");

            const {data} = await axios.post ("https://upload.imagekit.io/api/v1/files/upload", formData, {
                headers: {
                    ...formData.getHeaders(),
                    Authorization: `Basic ${encodedKey}`,
                }
            })
            
            req.body.photoProfile = data.url;
            next();

        }
    } catch (err) {
        next(err)
    }
};

module.exports = UploadImage