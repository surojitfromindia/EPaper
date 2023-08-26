import { Router } from "express";
import { addAccountToOrganization } from "../../Controllers/v1/AccountsOfOrganization.Controller.js";

const accountsOfOrganizationRouter = Router();

accountsOfOrganizationRouter.post("/", addAccountToOrganization);

export default accountsOfOrganizationRouter;
