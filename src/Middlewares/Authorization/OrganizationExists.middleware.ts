import { NextFunction, Request, Response } from "express";
import CodedError from "../../Errors/APIErrors/CodedError";
import { CodedErrorMessages } from "../../Errors/APIErrors/ErrorMessages";
import { ValidityUtil } from "../../Utils/ValidityUtil";

const organizationMember = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // we check if organization id exists in clientInfo
  const clientInfo = req.clientInfo;
  const organizationId = clientInfo.organizationId; // if organization id not provided via a query,

  // fall back to default
  const userOrganizations = clientInfo.userOrganizations;

  // todo: return success with a code that mark that user does not have any organization.
  if (ValidityUtil.isEmpty(userOrganizations)) {
    return res.status(200).json({
      success: true,
      message: CodedErrorMessages.ORGANIZATIONS_EMPTY.message,
      code: CodedErrorMessages.ORGANIZATIONS_EMPTY.code,
      data: {
        app_state: {
          no_organization: true,
          organizations: [],
        },
      },
    });
  }

  if (!organizationId) {
    return next(new CodedError(CodedErrorMessages.ORGANIZATION_NOT_FOUND));
  }
  // search inside active organization.
  const isOrganizationActive = userOrganizations.some(
    (info) => info.organization_id === organizationId,
  );
  if (!isOrganizationActive) {
    return next(new Error("Not part of this organization"));
  }
  return next();
};
export { organizationMember };
