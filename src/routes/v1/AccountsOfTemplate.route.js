import {Router} from 'express'
import {createAccountOfTemplate} from "../../Controllers/v1/AccountsOfTemplate.Controller.js";

const accountsOfTemplateRouter = Router();

accountsOfTemplateRouter.post("/", createAccountOfTemplate)

export default accountsOfTemplateRouter;