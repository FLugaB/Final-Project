const axios = require("axios");


function ResponseAxiosPost (formData) {
    let encodedKey = Buffer.from(process.env.IMAGEKIT_KEY + ":").toString("base64");
    return axiosInstance = axios({
        method: "POST",
        url: `https://upload.imagekit.io/api/v1/files/upload`,
        data: formData,
        headers: {
            ...formData.getHeaders(),
            Authorization: `Basic ${encodedKey}`,
        }
    })
}

module.exports = {ResponseAxiosPost};