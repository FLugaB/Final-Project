

const errorLog = (err, req, res, next) => {

    let code = 500
    let message = "Internal server error"

    if ( err.name === `SequelizeUniqueConstraintError` || 
         err.name === `SequelizeValidationError` ) {
         code = 400
         message = err.errors[0].message
    } else if (err.name === `BAD_REQUEST`) {
        code = 400
        message = err.message
    } else if ( err.name === `USER_NOT_FOUND`) {
        code = 401
        message = "Invalid email/password"
    } else if ( err.name === `NO_TOKEN` || 
                err.name === `INVALID_TOKEN ` ||
                err.name === `JsonWebTokenError`){
        code = 401
        message = "Invalid token"
    } else if ( err.name === `FORBIDDEN`){
        code = 403
        message = "Invalid access"
    } else if ( err.name === `Product_not_found`){
        code = 401
        message = "Product not found"
    }
    console.log(message, "mesadasd");
    res.status(code).json({message})

}

module.exports = errorLog