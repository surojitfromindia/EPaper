import jsonWebToken from 'jsonwebtoken'
import {JWT_PRIVATE_KEY} from "../Constants/env.js";
import {InvalidAccessTokenError} from "../Errors/APIErrors/index.js";

/**
 * Manage token generation and verification
 */
class UserAuthToken {
    #token;
    #decodeToken

    constructor(token) {
        this.#token = token
    }

    //we return an auth token when we sign a token
    static signToken(token_payload) {
        const userDetails = {
            userId: token_payload.userId,
            email: token_payload.email,
        }
        const tokenOptions = {
            audience: 'reducer.EPaper.com',
            issuer: "reducer.auth.com"
        }
        const token = jsonWebToken.sign(userDetails, JWT_PRIVATE_KEY, tokenOptions)
        return new UserAuthToken(token)
    }

    getToken() {
        return this.#token
    }


    // verify the given user auth token
    verifyToken() {
        try {
            this.#decodeToken = jsonWebToken.verify(this.#token, JWT_PRIVATE_KEY)
        } catch (error) {
            throw new InvalidAccessTokenError()
        }
    }

    // get the decoded token
    getDecodedToken() {
        return this.#decodeToken
    }


}

export {
    UserAuthToken
}