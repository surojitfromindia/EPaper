import { Router } from "express";
import {
  addAccountToOrganization,
  getAccountEditPage,
  getAllAccounts,
} from "../../Controllers/v1/AccountsOfOrganization.Controller.js";

const accountsOfOrganizationRouter = Router();

accountsOfOrganizationRouter
  .post("/", addAccountToOrganization)
  .get("/", getAllAccounts)
  .get("/edit_page", getAccountEditPage);

export default accountsOfOrganizationRouter;
