
class AppError extends Error{

    constructor(statusCode, message){

        super()
        this.statusCode= statusCode
        this.message= message
        this.status= `${statusCode}`.startsWith('4') ? 'Error' :'Fail'
        Error.captureStackTrace(this, this.constructor)
        
    }
} 

module.exports = { AppError }

