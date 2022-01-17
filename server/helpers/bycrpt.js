const bcrypt = require(`bcryptjs`)

const hashPass = (val) => {
    return bcrypt.hashSync(val, Number(process.env.HASH_SALT));
}

const compareHash = (val, hashData) => {
    return bcrypt.compareSync(val, hashData);
}

module.exports = {
    hashPass,
    compareHash
}