// here I export an express server
import Express, { json } from "express";
import v1Router from "./routes/v1/index";
import { errorHandlerMiddleware } from "./Errors/errorHandlerMiddleware";
import cookieParser from "cookie-parser";
import cors from "cors";
import "./Config/DataBase.Config";
import "./Config/Redis.Config";

const expressApp = Express();
expressApp.use(
  cors({
    origin: true,
    credentials: true,
    exposedHeaders: ["set-cookie"],
  }),
);
expressApp.use(cookieParser());
expressApp.use(json());
expressApp.use("/v1", v1Router);
expressApp.use(errorHandlerMiddleware);

export default expressApp;
