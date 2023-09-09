import { AuthorizationDao } from "../../DAO/index.js";
import { UserService } from "../../Services/index.js";

const authorizeClient = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const authCookie = req.cookies._ePaperCrd;
    if (authHeader === undefined && authCookie === undefined) {
      handleAuthorizationError(
        next,
        new Error("Access token missing in authorization header"),
      );
      return;
    }
    let authToken;
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
    /**
     * @type ClientInfoType
     * */
    const clientInfo = {
      ...basicClientInfo,
      userId: null,
      organizationId: null,
      userOrganizations: [],
    };
    const userDetails = await UserService.getUserByClientId({
      client_id: basicClientInfo.clientId,
      include_organization_details: true,
    });
    const userOrganizations = userDetails.organization_working_details ?? [];
    clientInfo.userOrganizations = userOrganizations;

    // find default organization
    const defaultOrganization = userOrganizations.find(
      (org) => org.is_default_organization,
    );

    clientInfo.organizationId = req?.query.organization_id
      ? Number(req.query.organization_id)
      : defaultOrganization.organization_id;
    clientInfo.userId = userDetails?.user_id ?? null;

    req.clientInfo = clientInfo;
    return next();
  } catch (error) {
    handleAuthorizationError(next, error);
  }
};

/**
 * handle authorization error.
 * @param {import('express').NextFunction} expressNext
 * @param {Error} error
 */
const handleAuthorizationError = (expressNext, error) => {
  expressNext(new Error(error.message));
};
export { authorizeClient };
