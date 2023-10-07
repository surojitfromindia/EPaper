import { NextFunction, Request, Response } from "express";

const errorHandlerMiddleware = (
  error: any,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  let httpErrorCode = 404;
  let httpErrorMessage = "something went wrong";
  const errors = error?.errors ?? [];
  res.status(httpErrorCode).json({
    success: false,
    message: error.message ?? httpErrorMessage,
    type: error.constructor.name,
    errors,
  });
};
export { errorHandlerMiddleware };
