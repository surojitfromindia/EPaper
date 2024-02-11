import { Router } from "express";
import * as ContactController from "../../Controllers/v1/CustomView.Controller";

const customViewRouter = Router();
customViewRouter.get("/", ContactController.getFullCustomViewController);

export default customViewRouter;
