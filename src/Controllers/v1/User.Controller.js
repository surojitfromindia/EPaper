import { UserService } from "../../Services/index.js";
import { SuccessErrorWrapper } from "../../Utils/SuccessErrorWrapper.js";

let registerUser = async (req) => {
  const body = req.clientInfo;
  const created_user = await UserService.registerUser({ user_details: body });
  return { user: created_user };
};
registerUser = SuccessErrorWrapper(registerUser, 201);

let getAllUsers = async () => {
  const users = await UserService.getAllUsers();
  return { users: users };
};
getAllUsers = SuccessErrorWrapper(getAllUsers, 200);

let getAnUser = async (req) => {
  const userId = Number(req.params.userId);
  const user = await UserService.getUserById({ user_id: userId });
  return { user };
};
getAnUser = SuccessErrorWrapper(getAnUser, 200);

export { registerUser, getAllUsers, getAnUser };
