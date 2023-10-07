import { OrganizationService } from "../../Services/index";
import { SuccessErrorWrapper } from "../../Utils/SuccessErrorWrapper";
import { Request } from "express";

const registerOrganization = async (req: Request) => {
  const body = req.body;
  const client_info = req.clientInfo;
  const organization = await OrganizationService.registerOrganization({
    organization_details: body,
    client_info,
  });
  return { organization };
};
const registerOrganizationController = SuccessErrorWrapper(
  registerOrganization,
  "organization created",
  201,
);

export { registerOrganizationController };
