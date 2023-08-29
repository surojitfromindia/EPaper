import { Router } from "express";
import { getAppState } from "../../Controllers/v1/AppState.Controller.js";

const appStateRouter = Router();

appStateRouter.post("/", getAppState);
export default appStateRouter;
