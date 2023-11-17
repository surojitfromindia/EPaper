import { Router } from "express";
import { getContactAutoCompleteController } from "../../Controllers/v1/AutoComplete.Controller";

const autoCompleteRouter = Router();

autoCompleteRouter.get("/contact", getContactAutoCompleteController);
export default autoCompleteRouter;
