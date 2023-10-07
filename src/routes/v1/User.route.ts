import { Router } from "express";
import {
  getAnUserController,
  registerUserController,
} from "../../Controllers/v1/User.Controller";

const userRouter = Router();

userRouter
  .post("/", registerUserController)
  .get("/:userId", getAnUserController);

export default userRouter;
