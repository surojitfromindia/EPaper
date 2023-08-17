const errorHandlerMiddleware = (error, req, res, _next) => {
    let httpErrorCode = 500;
    let httpErrorMessage = "something went wrong"
    res.status(httpErrorCode).json({
        success: false,
        message: error.message,
        type: error.constructor.name
    })

}
export {
    errorHandlerMiddleware
}