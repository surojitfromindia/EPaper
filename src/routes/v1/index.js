import { Router } from "express";
// middlewaress
import { authorizeClient } from "../../Middlewares/Authorization/Authorization.middleware.js";
import { organizationMember } from "../../Middlewares/Authorization/OrganizationExists.middleware.js";
import { registeredUser } from "../../Middlewares/Authorization/UserExists.middleware.js";
// routers
import organizationRouter from "./Organization.route.js";
import userRouter from "./User.route.js";
import accountsOfTemplateRoute from "./AccountsOfTemplate.route.js";
import settingsRouter from "./Settings/index.js";
import itemRouter from "./Item.route.js";

const v1Router = Router();
v1Router.use(authorizeClient); // check the validity of user/client
v1Router.use("/users", userRouter);
v1Router.use(registeredUser); // check a registered user/client is accessing the below resources.
v1Router.use("/organizations", organizationRouter);
v1Router.use(organizationMember); // check client/user access data from correction organization.
v1Router.use("/accounts_of_templates", accountsOfTemplateRoute);
v1Router.use("/items", itemRouter);
v1Router.use("/settings", settingsRouter);

export default v1Router;
