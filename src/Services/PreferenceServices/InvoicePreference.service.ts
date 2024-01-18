import { PREFERENCE_DEFAULTS } from "../../Constants/Preference.Constant";
import { ClientInfo } from "../../Middlewares/Authorization/Authorization.middleware";
import { OrganizationBasicIdType } from "../../Models/Organization/Organization.model";
import { InvoicePreferenceDAO } from "../../DAO/Preference/InvoicePreference.dao";
import { AutoNumberSeriesService } from "../SettingServices/AutoNumberSeries.service";
import { InvoicePreferenceModelType } from "../../Models/Preference/InvoicePreferencesModel";
import { AutoNumberGroupsModel } from "../../Models";

interface InvoicePreference {
  is_auto_number_enabled: InvoicePreferenceModelType["isAutoNumberEnabled"];
  auto_number_groups: AutoNumberGroupsModel[];
  default_auto_number_group: AutoNumberGroupsModel;
}

class InvoicePreferenceService {
  private readonly _clientInfo: ClientInfo;
  private readonly _organizationId: OrganizationBasicIdType;
  private _invoicePreferenceDAO: InvoicePreferenceDAO;

  constructor({ client_info }) {
    this._clientInfo = client_info;
    this._organizationId = client_info.organizationId;
    this._invoicePreferenceDAO = new InvoicePreferenceDAO({
      organization_id: this._organizationId,
    });
  }

  static async create({ organization_id }, { transaction }) {
    const invoicePreferenceDAO = new InvoicePreferenceDAO({ organization_id });

    const invoicePreference = PREFERENCE_DEFAULTS.INVOICE_PREFERENCE;
    const newInvoicePreference = {
      ...invoicePreference,
      organizationId: organization_id,
    };
    await invoicePreferenceDAO.create(
      {
        preference_details: newInvoicePreference,
      },
      { transaction },
    );
    return true;
  }

  async get(): Promise<InvoicePreference> {
    const preference = await this._invoicePreferenceDAO.get();
    const autoNumberSeriesService = new AutoNumberSeriesService({
      client_info: this._clientInfo,
    });
    const autoNumberGroups =
      await autoNumberSeriesService.getAutoNumberGroupsOfEntity({
        entity_type: "invoice",
      });
    const defaultAutoNumberGroup = autoNumberGroups.find((gp) => gp.isDefault);
    return {
      is_auto_number_enabled: preference.isAutoNumberEnabled,
      auto_number_groups: autoNumberGroups,
      default_auto_number_group: defaultAutoNumberGroup,
    };
  }
}

export { InvoicePreferenceService };
