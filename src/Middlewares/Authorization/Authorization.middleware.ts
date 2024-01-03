import { AuthorizationDao } from "../../DAO/index";
import { UserService } from "../../Services/index";
import { NextFunction, Request, Response } from "express";
import { ToUserDTO } from "../../DTO/User.DTO";
import { DataNotFoundError } from "../../Errors/APIErrors";
import { ValidityUtil } from "../../Utils/ValidityUtil";

interface ClientInfo {
  userId: number | null;
  organizationId?: number | null;
  userOrganizations: any[];
  clientId: string;
  clientName: string;
  clientType: string;
  clientEmail: string;
}

const authorizeClient = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;
    const authCookie = req.cookies["_ePaperCrd"];
    if (authHeader === undefined && authCookie === undefined) {
      handleAuthorizationError(
        next,
        new Error("Access token missing in authorization header"),
      );
      return;
    }
    let authToken: string = "";
    if (authHeader) {
      const [Schema, Token] = authHeader.split(" ");
      if (Schema !== "Bearer") {
        handleAuthorizationError(
          next,
          new Error("Unknown authorization schema"),
        );
        return;
      }
      if (Token === undefined) {
        handleAuthorizationError(next, new Error("Token not found"));
        return;
      }
      authToken = Token;
    } else if (authCookie) {
      authToken = authCookie;
    }
    const authDao = new AuthorizationDao(authToken);
    const introspectionResult = await authDao.introspectToken();
    const basicClientInfo = {
      clientId: introspectionResult.clientId,
      clientEmail: introspectionResult.clientEmail,
      clientType: introspectionResult.clientType,
      clientName: introspectionResult.clientName,
    };
    // try to find user information
    const clientInfo: ClientInfo = {
      ...basicClientInfo,
      userId: null,
      organizationId: null,
      userOrganizations: [],
    };

    let userDetails: ToUserDTO;
    try {
      userDetails = await UserService.getUserByClientId({
        client_id: basicClientInfo.clientId,
        include_organization_details: true,
      });
    } catch (error) {
      if (error instanceof DataNotFoundError) {
        // user is registered but not for this application
        await UserService.registerUser({
          user_details: {
            clientEmail: basicClientInfo.clientEmail,
            clientId: basicClientInfo.clientId,
            clientName: basicClientInfo.clientName,
          },
        });
        userDetails = await UserService.getUserByClientId({
          client_id: basicClientInfo.clientId,
          include_organization_details: true,
        });
      }
    }

    const userOrganizations = userDetails.user_organizations ?? [];
    clientInfo.userOrganizations = userOrganizations;

    // find default organization
    const defaultOrganization = userOrganizations.find(
      (org) => org.is_default_organization,
    );
    const organizationFromQuery = req?.query.organization_id;

    if (
      ValidityUtil.isNotEmpty(defaultOrganization) ||
      ValidityUtil.isNotEmpty(organizationFromQuery)
    ) {
      clientInfo.organizationId = req?.query.organization_id
        ? Number(organizationFromQuery)
        : defaultOrganization.organization_id;
    }
    clientInfo.userId = userDetails?.user_id ?? null;

    req.clientInfo = clientInfo;
    return next();
  } catch (error: any) {
    handleAuthorizationError(next, error);
  }
};

/**
 * handle authorization error.
 * @param {import('express').NextFunction} expressNext
 * @param {Error} error
 */
const handleAuthorizationError = (expressNext: NextFunction, error: Error) => {
  expressNext(new Error(error.message));
};
export { authorizeClient };
export type { ClientInfo };
