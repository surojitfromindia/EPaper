import { Router } from "express";
import {
  getAnUserController,
  getOrganizationsOfUserController,
  registerUserController,
} from "../../Controllers/v1/User.Controller";

const userRouter = Router();

userRouter
  .post("/", registerUserController)
  .get("/organizations", getOrganizationsOfUserController)
  .get("/", getAnUserController);

export default userRouter;
