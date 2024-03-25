import { PREFERENCE_DEFAULTS } from "../../Constants/Preference.Constant";
import { ClientInfo } from "../../Middlewares/Authorization/Authorization.middleware";
import { OrganizationBasicIdType } from "../../Models/Organization/Organization.model";
import { AutoNumberSeriesService } from "../SettingServices/AutoNumberSeries.service";
import { AutoNumberGroupsModel } from "../../Models";
import sequelize from "../../Config/DataBase.Config";
import { CustomerPaymentPreferenceModelType } from "../../Models/Preference/CustomerPaymentPreferences.model";
import { CustomerPaymentPreferenceDAO } from "../../DAO";

interface CustomerPaymentPreference {
  is_auto_number_enabled: CustomerPaymentPreferenceModelType["isAutoNumberEnabled"];
  auto_number_groups: AutoNumberGroupsModel[];
  default_auto_number_group: AutoNumberGroupsModel;
}

class CustomerPaymentPreferenceService {
  private readonly _clientInfo: ClientInfo;
  private readonly _organizationId: OrganizationBasicIdType;
  private _customerPaymentPreferenceDAO: CustomerPaymentPreferenceDAO;

  constructor({ client_info }) {
    this._clientInfo = client_info;
    this._organizationId = client_info.organizationId;
    this._customerPaymentPreferenceDAO = new CustomerPaymentPreferenceDAO({
      organization_id: this._organizationId,
    });
  }

  static async create({ organization_id }, { transaction }) {
    const preferenceDAO = new CustomerPaymentPreferenceDAO({
      organization_id,
    });

    const preference = PREFERENCE_DEFAULTS.CUSTOMER_PAYMENT_PREFERENCE;
    const newPreference = {
      ...preference,
      organizationId: organization_id,
    };
    await preferenceDAO.create(
      {
        preference_details: newPreference,
      },
      { transaction },
    );
    return true;
  }

  async get(): Promise<CustomerPaymentPreference> {
    const preference = await this._customerPaymentPreferenceDAO.get();
    const autoNumberSeriesService = new AutoNumberSeriesService({
      client_info: this._clientInfo,
    });
    const autoNumberGroups =
      await autoNumberSeriesService.getAutoNumberGroupsOfEntity({
        entity_type: "customer_payment",
      });
    const defaultAutoNumberGroup = autoNumberGroups.find((gp) => gp.isDefault);
    return {
      is_auto_number_enabled: preference.isAutoNumberEnabled,
      auto_number_groups: autoNumberGroups,
      default_auto_number_group: defaultAutoNumberGroup,
    };
  }

  async updateAutoNumber({ update_payload }) {
    const isAutoNumberEnabled = update_payload.isAutoNumberEnabled;
    await sequelize.transaction(async (t1) => {
      await this._customerPaymentPreferenceDAO.update(
        {
          preference_details: {
            isAutoNumberEnabled,
          },
        },
        { transaction: t1 },
      );
    });
    return this.get();
  }
}

export { CustomerPaymentPreferenceService };
