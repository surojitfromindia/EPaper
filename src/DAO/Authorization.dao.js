import http from "http";
import {
  AUTH_SERVER_ENDPOINT,
  AUTH_SERVER_HOST,
} from "../Constants/AuthorizationEndpoints.Constants.js";
import axios from "axios";

const agent = new http.Agent({
  keepAlive: true,
});

class AuthorizationDao {
  token;

  constructor(token) {
    this.token = token;
  }

  async introspectToken() {
    const tokenPayload = {
      token: this.token,
    };
    const axiosResponse = await axios
      .create({
        baseURL: AUTH_SERVER_HOST,
      })
      .post(AUTH_SERVER_ENDPOINT, tokenPayload);
    const resJSON = axiosResponse.data;
    return {
      clientId: resJSON.clientId,
      active: resJSON.active,
      clientType: resJSON.clientType,
      clientName: resJSON.clientName,
      clientEmail: resJSON.clientEmail,
    };
  }
}

export default AuthorizationDao;
