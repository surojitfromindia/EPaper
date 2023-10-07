import { Router } from "express";
import {
  addAccountToOrganizationController,
  deleteAccountController,
  deleteAccountsController,
  getAccountController,
  getAccountEditPageController,
  getAllAccountsController,
} from "../../Controllers/v1/AccountsOfOrganization.Controller";

const accountsOfOrganizationRouter = Router();

accountsOfOrganizationRouter
  .post("/", addAccountToOrganizationController)
  .get("/", getAllAccountsController)
  .get("/edit_page", getAccountEditPageController)
  .delete("/", deleteAccountsController)
  .delete("/:id", deleteAccountController)
  .get("/:id", getAccountController);

export default accountsOfOrganizationRouter;
