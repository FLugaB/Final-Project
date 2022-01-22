const { User, Profile } = require(`../models/index`);
const { sequelize } = require('../models')
const { compareHash } = require('../helpers/bycrpt')
const { getToken } = require('../helpers/jwt')
const { Op } = require("sequelize");

const clientRegister = async (req, res, next) => {
    const transaction = await sequelize.transaction();

    try {
        const {  email, password, fullName, birthdate, gender, address, photoProfile, phoneNumber } = req.body
        const addUser = await User.create({ email, password, role: "Client",  }, { transaction });

        if (!addUser) throw { name: `USER_NOT_FOUND` }

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
        console.log(error)
        next(error);
        await transaction.rollback()
    }
};

const clientLogin = async (req, res, next) => {
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

        const verfyPass = compareHash(password, findUser.password)

        if (!verfyPass) throw { name: `USER_NOT_FOUND` }

        const payload = { id: findUser.id, email: findUser.email }

        const access_token = getToken(payload)

        res.status(200).json({access_token});
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const clientAccount = async (req, res, next) => {
    try {
        
        const findUser = await User.findOne({
            where: {
                id: req.auth.id
            },
            attributes: {
                exclude: ["updatedAt", "createdAt" ]
            },
            include: [
                {
                    model: Profile,
                    attributes: {
                        exclude: ['createdAt', `updatedAt` ]
                    },
                }, 
            ]
        });
        if (!findUser) throw { name: `FORBIDDEN` }

        res.status(200).json({findUser});
    } catch (error) {
        next(error);
    }
};

const clientUpdateAccount = async (req, res, next) => {

    const transaction = await sequelize.transaction();

    try {
        const findUser = await User.findOne({
            where: {
                id: req.auth.id
            },
            attributes: {
                exclude: ["updatedAt", "createdAt" ]
            },
            include: [
                {
                    model: Profile,
                    attributes: {
                        exclude: ['createdAt', `updatedAt`, ]
                    },
                }, 
            ]
        });

        if (!findUser) throw { name: `FORBIDDEN` }

        const {  email, password, fullName, birthdate, gender, address, photoProfile, phoneNumber } = req.body

        const updateUser = await User.update(
            { email, password  }, 
            { where: { id: findUser.id }, 
            returning: true, transaction 
        });

        const updateProfile = await Profile.update({
            fullName,
            birthdate,
            gender,
            address,
            photoProfile,
            phoneNumber,
        }, { 
            where: { 
                UserId: findUser.id 
            },
            returning: true, transaction 
        });

        const successText = "Success update profile"
        
        await transaction.commit();
        res.status(200).json({successText});
    } catch (error) {
        next(error);
        await transaction.rollback()
    }
};

const clientDoctorFetch = async (req, res, next) => {
    try {

      const findAllDoctors = await User.findAll({
        where: {
          role: 'Doctor'
        },
        attributes: {
            exclude: ['createdAt', `updatedAt`, 'password' ]
        },
        include: [
            {
                model: Profile,
                attributes: {
                    exclude: ['createdAt', `updatedAt`, ]
                }
            }, 
        ]
    })
    if (findAllDoctors.length <1) {
        console.log("maasuk sini........", findAllDoctors);
        res.status(200).json({message: "There is no Doctor"})
    } else {
        res.status(200).json(findAllDoctors)
    }
    } catch (error) {
        next(error)
    }
}

const clientDoctorDetail = async (req, res, next) => {

    try {
        const { DoctorId } = req.params
        console.log(req.params,">>>>>>>>>ini");
        if (!DoctorId) throw { name: "NOT_FOUND"}
        const findDoctorDetail = await User.findOne({
            where: {
                [Op.and]: [
                    { id: DoctorId }, 
                    { role: `Doctor` }
                ], 
            },
            attributes: {
                exclude: ['createdAt', `updatedAt`, 'password' ]
            },
            include: [
                {
                    model: Profile,
                    attributes: {
                        exclude: ['createdAt', `updatedAt`, ]
                    }
                }
            ]
        })
        if (!findDoctorDetail ) throw { name: "NOT_FOUND"}
        await res.status(200).json(findDoctorDetail)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    clientRegister,
    clientLogin,
    clientAccount,
    clientUpdateAccount,
    clientDoctorFetch,
    clientDoctorDetail
}