// here I export an express server
import Express, { json } from "express";
import v1Router from "./routes/v1/index.js";
import { errorHandlerMiddleware } from "./Errors/errorHandlerMiddleware.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const expressApp = Express();
expressApp.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    exposedHeaders: ["set-cookie"],
  }),
);
expressApp.use(cookieParser());
expressApp.use(json());
expressApp.use("/v1", v1Router);
expressApp.use(errorHandlerMiddleware);

export default expressApp;
