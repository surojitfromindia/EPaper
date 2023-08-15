import {NoImplementationError} from "./SeverErrors/index.js";
import {DataNotFoundError, UserCredentialMismatchError} from "./APIErrors/index.js";

const errorHandlerMiddleware = (error, req, res) => {
    let httpErrorCode = 500;
    let httpErrorMessage = "something went wrong"
    if (error instanceof NoImplementationError) {
        httpErrorCode = 500;
        httpErrorMessage = error.message
    } else if (error instanceof DataNotFoundError) {
        httpErrorCode = 404;
        httpErrorMessage = error.message
    } else if (error instanceof UserCredentialMismatchError) {
        httpErrorCode = 403
        httpErrorMessage = error.message
    }
    res.status(httpErrorCode).json({
        success: false,
        message: httpErrorMessage
    })

}
export {
    errorHandlerMiddleware
}