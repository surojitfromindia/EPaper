import {Router} from 'express'
import {getAllOrganizations, registerOrganization} from '../../Controllers/v1/Organization.Controller.js';
import {permission} from "../../Middlewares/Authorization/Authorization.middleware.js";

const organizationRouter = Router();

organizationRouter.use(permission)
organizationRouter.post("/", registerOrganization).get("/", getAllOrganizations);

export default organizationRouter;