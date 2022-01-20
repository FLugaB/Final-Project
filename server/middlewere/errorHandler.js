

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
    } else if (err.name === `JsonWebTokenError`) {
        code = 401
        message = err.errors[0].message
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
    } else if ( err.name === `Product_not_found`) {
        code = 404
        message = "Product not found"
    } else if ( err.name === `Order_not_found`){
        code = 401
        message = "Order not found"
    } else if ( err.name === `VALIDATE_NAME_FILE`){
        code = 400
        message = "Name of File Cannot be Empty"
    } else if ( err.name === `VALIDATE_CONTENT_FILE`){
        code = 400
        message = "Description of FIle Cannot be Empty"
    } else if ( err.name === `NOT_ALLOWED_SIZE_FILE`){
        code = 413
        message = "File Size Maximal 255kb"
    } else if ( err.name === `NOT_ALLOWED_TYPE_FILE`){
        code = 413
        message = "File Type have to Image Type (png, jpg, jpeg)"
    } else if ( err.name === `NOT_FOUND`) {
        code = 404
        message = "Not Found"
    } else if ( err.name === 'PLEASE_PAY_FIRST'){
        code = 400
        message = "If you just pay, please wait for a momment, else pay the ticket first before u could use it"
    }

    res.status(code).json({message})

}

module.exports = errorLog