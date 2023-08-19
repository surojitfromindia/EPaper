import {Router} from 'express'
import {addAccountToTemplate, importAccountsToTemplate} from "../../Controllers/v1/AccountsOfTemplate.Controller.js";

const accountsOfTemplateRouter = Router();

accountsOfTemplateRouter.post("/import", importAccountsToTemplate)
accountsOfTemplateRouter.post("/", addAccountToTemplate)

export default accountsOfTemplateRouter;