
const { verifyToken } = require(`../helpers/jwt`);
const { User } = require(`../models/index`)

const authentication = async (req, res, next) => {
    try {
        const { access_token } = req.headers

        console.log(access_token,`INI DI AUTH`)

        if(!access_token) throw { name: "NO_TOKEN" }

        console.log(`LOLOS GAK SIH?`)

        const payload = verifyToken(access_token)

        if(!payload || payload.length < 1) throw { name: "INVALID_TOKEN" }

        const findUser = await User.findByPk(payload.id)

        if(!findUser) throw { name: "INVALID_TOKEN" }

        console.log(`LOLOOOOOOOOOOOOS =========================`)

        req.user = {  email: findUser.email }

        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
    
}

const authorization = async (req, res, next) => {
    try {
        
        const { email } = req.user

        const findUser = await User.findOne({
            where: {
                email: email
            }
        })

        req.auth = {
            id: findUser.id,
            role: findUser.role
        }

        if(!findUser) throw { name: "FORBIDDEN" }

        next();

    } catch (error) {
        
        next(error);

    }
    
}

const authorizationCMS = async (req, res, next) => {
    try {
        if(req.auth.role != "Admin") throw { name: "FORBIDDEN" }

        next();

    } catch (error) {
        
        next(error);

    }
    
}

module.exports = {
    authentication,
    authorization,
    authorizationCMS
}