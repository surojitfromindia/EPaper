import http from 'http';
import {AuthServerRoot, TokenIntrospectionEndPath} from "../Constants/AuthorizationEndpoints.Constants.js";

const agent = new http.Agent({
    keepAlive: true
})

class AuthorizationDao {
    token

    constructor(token) {
        this.token = token
    }

    async introspectToken() {
        return new Promise((resolve, reject) => {
            const tokenPayload = JSON.stringify({
                token: this.token,
            })
            const req = http.request({
                agent, host: AuthServerRoot, path: TokenIntrospectionEndPath, port: 5010, method: 'POST', headers: {
                    'Content-Type': 'application/json'
                }
            }, (res) => {
                const body = []
                res.on('data', (chunk) => body.push(chunk))
                res.on('end', () => {
                    const resString = Buffer.concat(body).toString()
                    resolve(resString)
                })
            })
            req.write(tokenPayload)
            req.end();
        })
    }
}

export default AuthorizationDao
