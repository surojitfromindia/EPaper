import { Router } from "express";
import { getAppState } from "../../Controllers/v1/AppState.Controller.js";

const appStateRouter = Router();

appStateRouter.get("/", getAppState);
export default appStateRouter;
