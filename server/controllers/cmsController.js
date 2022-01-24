const { User, Profile } = require(`../models/index`);
const { sequelize } = require('../models')
const { compareHash } = require('../helpers/bycrpt')
const { getToken } = require('../helpers/jwt')

const cmsRegister = async (req, res, next) => {
    const transaction = await sequelize.transaction();

    try {
        const {  email, password, role, fullName, birthdate, gender, address, photoProfile, phoneNumber } = req.body
        const addUser = await User.create({ email, password, role }, { transaction });
        // if (!addUser) throw { name: `USER_NOT_FOUND` }

        const addProfile = await Profile.create({
            fullName,
            birthdate,
            gender,
            address,
            photoProfile,
            phoneNumber,
            UserId: addUser.id
        }, { transaction })
        await transaction.commit();
        res.status(201).json({
            id: addUser.id,
            email: addUser.email,
            fullName: addProfile.fullName
        });
    } catch (error) {
        next(error);
        await transaction.rollback()
    }
};

const cmsLogin = async (req, res, next) => {
    try {
        const {  email, password } = req.body
        if (!email || !password) {
            throw ({
                name: "BAD_REQUEST",
                message: "Email/Password is required"
            })
        }
        const findUser = await User.findOne({
            where: {
                email: email
            }
        });
        
        if (!findUser) throw { name: `USER_NOT_FOUND` }
        if (findUser.role != 'Admin') throw { name: `FORBIDDEN` }

        const verfyPass = compareHash(password, findUser.password)

        if (!verfyPass) throw { name: `USER_NOT_FOUND` }

        const payload = { id: findUser.id, email: findUser.email }

        const access_token = getToken(payload)

        res.status(200).json({access_token});
    } catch (error) {
        console.log(error)
        next(error);
    }
};

module.exports = {
    cmsRegister,
    cmsLogin
}