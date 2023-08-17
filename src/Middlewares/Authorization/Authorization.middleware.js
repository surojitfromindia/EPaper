import {AuthorizationDao} from "../../DAO/index.js";

const permission = async (req, res, next) => {
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
        const data = await authDao.introspectToken();
        res.json(data)
    } catch (error) {
        next(new Error(error.message))
    }
}
export {
    permission
}