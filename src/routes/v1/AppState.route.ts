import { Router } from "express";
import { getAppStateController } from "../../Controllers/v1/AppState.Controller";

const appStateRouter = Router();

appStateRouter.get("/", getAppStateController);
export default appStateRouter;
