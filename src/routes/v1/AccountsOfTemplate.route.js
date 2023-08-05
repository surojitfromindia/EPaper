import {Router} from 'express'
import {
    createAccountOfTemplate,
    importAccountsForTemplate
} from "../../Controllers/v1/AccountsOfTemplate.Controller.js";

const accountsOfTemplateRouter = Router();

accountsOfTemplateRouter.post("/import", importAccountsForTemplate)
accountsOfTemplateRouter.post("/", createAccountOfTemplate)

export default accountsOfTemplateRouter;