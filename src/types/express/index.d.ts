declare namespace Express {
  interface Request {
    clientInfo: import("../../Middlewares/Authorization/Authorization.middleware").ClientInfo;
  }
}
