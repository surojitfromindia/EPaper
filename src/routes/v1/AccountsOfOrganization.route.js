import { Router } from "express";
import {
  addAccountToOrganization,
  getAllAccounts,
} from "../../Controllers/v1/AccountsOfOrganization.Controller.js";

const accountsOfOrganizationRouter = Router();

accountsOfOrganizationRouter
  .post("/", addAccountToOrganization)
  .get("/", getAllAccounts);

export default accountsOfOrganizationRouter;
