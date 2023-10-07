import { NextFunction, Request, Response } from "express";

const registeredUser = (req: Request, _res: Response, next: NextFunction) => {
  const clientInfo = req.clientInfo;
  const userId = clientInfo.userId;
  if (!userId) {
    return next(new Error("User does not exists"));
  }
  next();
};
export { registeredUser };
