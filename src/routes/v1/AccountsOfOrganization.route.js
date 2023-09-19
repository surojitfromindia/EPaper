import { Router } from "express";
import {
  addAccountToOrganization,
  deleteAccount,
  deleteAccounts,
  getAccount,
  getAccountEditPage,
  getAllAccounts,
} from "../../Controllers/v1/AccountsOfOrganization.Controller.js";

const accountsOfOrganizationRouter = Router();

accountsOfOrganizationRouter
  .post("/", addAccountToOrganization)
  .get("/", getAllAccounts)
  .get("/edit_page", getAccountEditPage)
  .delete("/", deleteAccounts)
  .delete("/:id", deleteAccount)
  .get("/:id", getAccount);

export default accountsOfOrganizationRouter;
