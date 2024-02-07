// here I handle business logic
import { OrganizationDao, OrganizationsUsersDao } from "../DAO/index";
import { OrganizationDTO } from "../DTO/index";
import sequelize from "../Config/DataBase.Config";
import AccountsOfOrganizationService from "./AccountsOfOrganization.service";
import { PreferenceService, SettingService } from "./index";

class OrganizationService {
  /**
   * Create a new organization.
   */
  async registerOrganization({ organization_details, client_info }) {
    const createdBy = client_info.userId;
    const newOrganization: any =
      OrganizationDTO.toOrganizationCreate(organization_details);
    newOrganization.createdBy = createdBy;
    return await sequelize.transaction(async (t1) => {
      // create an organization with basic fields
      const organizationBasic = await OrganizationDao.create(
        {
          organization_details: newOrganization,
        },
        { transaction: t1 },
      );
      const organizationId = organizationBasic.get("id");
      const sector = organizationBasic.get("sector");
      const countryCode = organizationBasic.get("countryCode");

      // after creating an organization, check if the client has any previous organization,
      // if not, we are setting this organization as default for this client.
      const isFirstOrganization = client_info.userOrganizations.length === 0;

      // save organization-user association, this user will be considered as admin
      const organizationUserDetails = {
        jobStatus: "working",
        status: "active",
        userId: createdBy,
        roleId: "admin",
        organizationId: organizationBasic.get("id"),
        isDefaultOrganization: isFirstOrganization, // we are saving this fields as a three-column composite key
      };
      await OrganizationsUsersDao.create(
        {
          organization_user_details: organizationUserDetails,
        },
        { transaction: t1 },
      );

      // create a copy of accounts
      await AccountsOfOrganizationService.copyAccountsFromTemplateToOrganization(
        {
          organization_id: organizationId,
          country_code: countryCode,
          sector,
          client_info,
        },
        { transaction: t1 },
      );

      // also create default preferences of organization
      await PreferenceService.initAllDefaultPreferences(
        { organization_id: organizationId },
        { transaction: t1 },
      );

      // also create predefined fields
      const settingsService = new SettingService({
        organization_id: organizationId,
        client_info,
      });
      const { organizationCurrencyId } =
        await settingsService.initAllDefaultSettings(
          {
            organization_currency_code: newOrganization.currencyCode,
          },
          {
            transaction: t1,
          },
        );
      // set currency_id of organization
      organizationBasic.set("currencyId", organizationCurrencyId);
      await organizationBasic.save({ transaction: t1 });

      return this.getOrganizationById({ organization_id: organizationId });
    });
  }

  async getOrganizationByIdRaw({ organization_id }) {
    return await OrganizationDao.getOrganizationByIdRaw({ organization_id });
  }

  async getOrganizationById({ organization_id }) {
    return await OrganizationDao.getOrganizationById({
      organization_id,
    });
  }
}

export default OrganizationService;
