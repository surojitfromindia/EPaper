import {AuthorizationDao} from "../../DAO/index.js";

const authorizeClient = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader === undefined) {
        throw new Error('Access token missing in authorization header')
    }
    const [Schema, Token] = authHeader.split(" ");
    if (Schema !== "Bearer") {
        throw new Error("Unknown authorization schema")
    }
    if (Token === undefined) {
        throw new Error("Token not found")
    }
    const authDao = new AuthorizationDao(Token);
    try {
        const introspectionResult = await authDao.introspectToken();
        //TODO:
        // store client related info here, if available.
        // we will always have clientId, clientType in data
        // other data such as id (from Users table), default organization, if not present in request.
        const basicClientInfo = {
            clientId: introspectionResult.clientId,
            clientEmail: introspectionResult.clientEmail,
            clientType: introspectionResult.clientType,
            clientName: introspectionResult.clientName,
        }
        req.clientInfo = {
            ...basicClientInfo
        };
        return next()
    } catch (error) {
        next(new Error(error.message))
    }
}
export {
    authorizeClient
}