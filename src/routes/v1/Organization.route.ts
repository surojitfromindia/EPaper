import { Router } from "express";
import { registerOrganizationController } from "../../Controllers/v1/Organization.Controller";

const organizationRouter = Router();

organizationRouter.post("/", registerOrganizationController);
export default organizationRouter;
