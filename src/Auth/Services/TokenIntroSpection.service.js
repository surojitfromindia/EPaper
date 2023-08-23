import { CLIENT_TYPE } from "../Constants/ClientType.js";
import { NoImplementationError } from "../Errors/SeverErrors/index.js";
import { UserAuthToken } from "../Utils/UserAuthToken.js";
import { GeneralUserService } from "./index.js";

class TokenIntrospectionService {
  #clientType;
  #decodedToken;

  /**
   * Start a token introspecting service
   * @param {String} token_string
   */
  constructor(token_string) {
    // here we pass a class of token then we call decoding on that to getById the token
    const token = new UserAuthToken(token_string);
    const decodedToken = token.getNonVerifiedDecodedToken();
    this.token = token;
    this.#clientType = decodedToken.clientType;
    this.#decodedToken = decodedToken;
  }

  // verify the token return status as 'active'
  async introspect() {
    try {
      let clientDetails;
      let clientName;
      let clientEmail;
      if (this.#clientType === CLIENT_TYPE.USER) {
        this.#userTokenIntrospection();
        clientDetails = await GeneralUserService.findByUserId(
          this.#decodedToken.userId,
        );
        clientName = [
          clientDetails.firstName ?? "",
          clientDetails.middleName ?? "",
          clientDetails.lastName ?? "",
        ].join(" ");
        clientEmail = clientDetails.email;
      }
      if (this.#clientType === CLIENT_TYPE.APP) {
        this.#clientAppTokenIntrospection();
      }
      return {
        active: true,
        clientId: this.#decodedToken.userId,
        clientType: this.#clientType,
        clientName,
        clientEmail,
      };
    } catch (error) {
      return {
        active: false,
        clientId: this.#decodedToken.userId,
        clientType: this.#clientType,
      };
    }
  }

  // todo: in future we may need to perform db call.
  #userTokenIntrospection() {
    this.token.verifyToken();
  }

  #clientAppTokenIntrospection() {
    throw new NoImplementationError();
  }
}

export { TokenIntrospectionService };
