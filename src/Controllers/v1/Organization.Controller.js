import { OrganizationService } from "../../Services/index.js";
import { SuccessErrorWrapper } from "../../Utils/SuccessErrorWrapper.js";

let registerOrganization = async (req) => {
  const body = req.body;
  const client_info = req.clientInfo;
  const organization = await OrganizationService.registerOrganization({
    organization_details: body,
    client_info,
  });
  return { organization };
};
registerOrganization = SuccessErrorWrapper(registerOrganization, 201);

export { registerOrganization };
