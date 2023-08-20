import jsonWebToken from "jsonwebtoken";
import {USER_TYPE_JWT_PRIVATE_KEY} from "../Constants/env.js";
import {InvalidAccessTokenError, MalformedDataError,} from "../Errors/APIErrors/index.js";
import {CLIENT_TYPE} from "../Constants/ClientType.js";

/**
 * Manage token generation and verification
 */
class UserAuthToken {
  #token;
  #decodeToken;
  #isTokenVerified;

  constructor(token) {
    this.#token = token;
  }

  //we return an auth token when we sign a token
  static signToken(token_payload) {
    const userDetails = {
      userId: token_payload.userId,
      email: token_payload.email,
      clientType: CLIENT_TYPE.USER,
    };
    const tokenOptions = {
      audience: "reducer.EPaper.com",
      issuer: "reducer.auth.com",
    };
    const token = jsonWebToken.sign(
      userDetails,
      USER_TYPE_JWT_PRIVATE_KEY,
      tokenOptions,
    );
    return new UserAuthToken(token);
  }

  getToken() {
    return this.#token;
  }

  // verify the given user auth token
  verifyToken() {
    // first, we try to decode the token
    this.getNonVerifiedDecodedToken();
    try {
      this.#decodeToken = jsonWebToken.verify(
        this.#token,
        USER_TYPE_JWT_PRIVATE_KEY,
      );
      this.#isTokenVerified = true;
    } catch (error) {
      throw new InvalidAccessTokenError();
    }
  }

  // get the decoded token
  getNonVerifiedDecodedToken() {
    const decodePayload = jsonWebToken.decode(this.#token);
    if (decodePayload === null) {
      throw new MalformedDataError("Token is malformed");
    }
    return decodePayload;
  }
}

export { UserAuthToken };
