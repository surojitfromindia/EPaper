import { Router } from "express";
import {
  getContactAutoCompleteController,
  getItemAutoCompleteController,
} from "../../Controllers/v1/AutoComplete.Controller";

const autoCompleteRouter = Router();

autoCompleteRouter.get("/contact", getContactAutoCompleteController);
autoCompleteRouter.get("/item", getItemAutoCompleteController);
export default autoCompleteRouter;
