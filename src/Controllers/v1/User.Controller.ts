import { UserService } from "../../Services/index";
import { SuccessErrorWrapper } from "../../Utils/SuccessErrorWrapper";
import { Request } from "express";
import { UserCreatePayload } from "../../DTO/User.DTO";
import OrganizationsUsersDTO from "../../DTO/OrganizationsUsers.DTO";

let registerUser = async (req: Request) => {
  const body = req.clientInfo satisfies UserCreatePayload;
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
SuccessErrorWrapper(getAllUsers, "done", 200);

let getAnUser = async (req: Request) => {
  const userId = Number(req.params.userId);
  const user = await UserService.getUserById({
    user_id: userId,
    include_organization_details: true,
  });
  return { user };
};
const getAnUserController = SuccessErrorWrapper(getAnUser, "done", 200);

const getOrganizationsOfUser = async (req: Request) => {
  const userId = Number(req.clientInfo.userId);
  const organizations = await UserService.getOrganizationsOfUser({
    user_id: userId,
  });
  return {
    organizations: organizations.map((org) =>
      OrganizationsUsersDTO.toOrganizationsUsers(org),
    ),
  };
};
const getOrganizationsOfUserController = SuccessErrorWrapper(
  getOrganizationsOfUser,
  "done",
  200,
);

export {
  registerUserController,
  getAnUserController,
  getOrganizationsOfUserController,
};
