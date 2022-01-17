

const errorLog = (err, req, res, next) => {

    let code = 500
    let message = "Internal server error"

    if ( err.name === `SequelizeUniqueConstraintError` || 
         err.name === `SequelizeValidationError` ) {
         code = 400
         message = err.errors[0].message
    } else if (err.name === `JsonWebTokenError`) {
         code = 401
         message = message = err.errors[0].message
    } else if ( err.name === `USER_NOT_FOUND`) {
        code = 401
        message = "Invalid email/password"
    } 

    res.status(code).json({message})

}

module.exports = errorLog