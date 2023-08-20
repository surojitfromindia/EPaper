import http from "http";
import {
  AuthServerRoot,
  TokenIntrospectionEndPath,
} from "../Constants/AuthorizationEndpoints.Constants.js";

const agent = new http.Agent({
  keepAlive: true,
});

class AuthorizationDao {
  token;

  constructor(token) {
    this.token = token;
  }

  async introspectToken() {
    return new Promise((resolve, reject) => {
      const tokenPayload = JSON.stringify({
        token: this.token,
      });
      const req = http.request(
        {
          agent,
          host: AuthServerRoot,
          path: TokenIntrospectionEndPath,
          port: 5010,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
        (res) => {
          const body = [];
          res.on("data", (chunk) => body.push(chunk));
          res.on("end", () => {
            const resString = Buffer.concat(body).toString();
            const resJSON = JSON.parse(resString);
            if (res.statusCode < 200 || res.statusCode > 299) {
              return reject(new Error(resJSON.message));
            }
            // todo: need a dto here.
            resolve({
              clientId: resJSON.clientId,
              active: resJSON.active,
              clientType: resJSON.clientType,
              clientName: resJSON.clientName,
              clientEmail: resJSON.clientEmail,
            });
          });
        },
      );
      req.on("error", (error) => {
        reject(error.message);
      });
      req.write(tokenPayload);
      req.end();
    });
  }
}

export default AuthorizationDao;
