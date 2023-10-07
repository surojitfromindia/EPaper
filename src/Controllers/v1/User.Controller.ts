import { UserService } from "../../Services/index";
import { SuccessErrorWrapper } from "../../Utils/SuccessErrorWrapper";
import { Request } from "express";

let registerUser = async (req: Request) => {
  const body = req.clientInfo;
  const created_user = await UserService.registerUser({ user_details: body });
  return { user: created_user };
};
const registerUserController = SuccessErrorWrapper(
  registerUser,
  "user is registered",
  201,
);

let getAllUsers = async () => {
  const users = await UserService.getAllUsers();
  return { users: users };
};
const getAllUserController = SuccessErrorWrapper(getAllUsers, "done", 200);

let getAnUser = async (req: Request) => {
  const userId = Number(req.params.userId);
  const user = await UserService.getUserById({ user_id: userId });
  return { user };
};
const getAnUserController = SuccessErrorWrapper(getAnUser, "done", 200);

export { registerUserController, getAllUserController, getAnUserController };
