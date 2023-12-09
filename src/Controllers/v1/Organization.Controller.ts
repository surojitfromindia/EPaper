import { OrganizationService } from "../../Services/index";
import { SuccessErrorWrapper } from "../../Utils/SuccessErrorWrapper";
import { Request } from "express";
import { OrganizationDTO } from "../../DTO";

const registerOrganization = async (req: Request) => {
  const body = req.body;
  const client_info = req.clientInfo;
  const organizationService = new OrganizationService();
  const createdOrganization = await organizationService.registerOrganization({
    organization_details: body,
    client_info,
  });
  return { organization: OrganizationDTO.toOrganization(createdOrganization) };
};
const registerOrganizationController = SuccessErrorWrapper(
  registerOrganization,
  "organization created",
  201,
);

export { registerOrganizationController };
