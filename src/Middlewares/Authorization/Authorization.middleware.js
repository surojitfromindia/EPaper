import { AuthorizationDao } from "../../DAO/index.js";
import { UserService } from "../../Services/index.js";

const authorizeClient = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const authCookie = req.cookies._ePaperCrd;
  if (authHeader === undefined && authCookie === undefined) {
    throw new Error("Access token missing in authorization header");
  }
  let authToken;
  if (authHeader) {
    const [Schema, Token] = authHeader.split(" ");
    if (Schema !== "Bearer") {
      throw new Error("Unknown authorization schema");
    }
    if (Token === undefined) {
      throw new Error("Token not found");
    }
    authToken = Token;
  } else if (authCookie) {
    authToken = authCookie;
  }
  const authDao = new AuthorizationDao(authToken);
  try {
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
    next(new Error(error.message));
  }
};
export { authorizeClient };
