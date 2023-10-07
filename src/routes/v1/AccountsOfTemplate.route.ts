import { Router } from "express";
import {
  addAccountToTemplateController,
  importAccountsToTemplateController,
} from "../../Controllers/v1/AccountsOfTemplate.Controller";

const accountsOfTemplateRouter = Router();

accountsOfTemplateRouter.post("/import", importAccountsToTemplateController);
accountsOfTemplateRouter.post("/", addAccountToTemplateController);

export default accountsOfTemplateRouter;
