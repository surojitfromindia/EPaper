import { Router } from "express";
// middlewares
import { authorizeClient } from "../../Middlewares/Authorization/Authorization.middleware";
import { organizationMember } from "../../Middlewares/Authorization/OrganizationExists.middleware";
import { registeredUser } from "../../Middlewares/Authorization/UserExists.middleware";
// routers
import organizationRouter from "./Organization.route";
import userRouter from "./User.route";
import accountsOfTemplateRoute from "./AccountsOfTemplate.route";
import settingsRouter from "./Settings/index";
import itemRouter from "./Item.route";
import accountsOfOrganizationRoute from "./AccountsOfOrganization.route";
import appStateRoute from "./AppState.route";
import invoiceRoute from "./Invoice.route";

const v1Router = Router();
v1Router.use(authorizeClient); // check the validity of user/client
v1Router.use("/users", userRouter);
v1Router.use(registeredUser); // check a registered user/client is accessing the below resources.
v1Router.use("/organizations", organizationRouter);
v1Router.use(organizationMember); // check client/user access data from correction organization.
v1Router.use("/app_state", appStateRoute);
v1Router.use("/items", itemRouter);
v1Router.use("/settings", settingsRouter);
v1Router.use("/accounts", accountsOfOrganizationRoute);
v1Router.use("/accounts_of_templates", accountsOfTemplateRoute);
v1Router.use("/invoices", invoiceRoute);

export default v1Router;
