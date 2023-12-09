import ItemUnitService from "./ItemUnit.service";
import TaxRateService from "./TaxRate.service";
import PaymentTermService from "./PaymentTerm.service";
import CurrencyService from "./Currency.service";
import OrganizationService from "../Organization.service";
import { OrganizationBasicIdType } from "../../Models/Organization/Organization.model";
import { ClientInfo } from "../../Middlewares/Authorization/Authorization.middleware";

class SettingService {
  private readonly organizationId: OrganizationBasicIdType;
  private readonly clientInfo: ClientInfo;

  constructor({ organization_id, client_info }) {
    this.organizationId = organization_id;
    this.clientInfo = client_info;
  }

  async initAllDefaultSettings(
    { organization_currency_code },
    { transaction },
  ) {
    const organization_id = this.organizationId;
    const client_info = this.clientInfo;

    // find the organization here, we may need more fields from organization
    const organizationService = new OrganizationService();
    const organization = await organizationService.getOrganizationByIdRaw({
      organization_id,
    });
    const organizationCountryCode = organization.get("countryCode");
    const organizationCurrencyCode = organization_currency_code;

    // we return this fields to update the organization
    let organizationCurrencyId: number = null;

    await ItemUnitService.initDefaultItemUnits(
      {
        organization_id,
        client_info,
        organization_country_code: organizationCountryCode,
      },
      { transaction },
    );
    await TaxRateService.initDefaultTaxRates(
      {
        organization_id,
        client_info,
        organization_country_code: organizationCountryCode,
      },
      { transaction },
    );
    await PaymentTermService.initDefaultPaymentTerms(
      { organization_id, client_info },
      { transaction },
    );

    const currencies = await CurrencyService.initDefaultCurrencies(
      {
        organization_id,
        client_info,
      },
      { transaction },
    );
    // find the currency of organization
    const organizationCurrency = currencies.find(
      (currency) => currency.get("currencyCode") === organizationCurrencyCode,
    );
    organizationCurrencyId = organizationCurrency.get("id");

    return {
      organizationCurrencyId,
    };
  }
}

export default SettingService;
export { ItemUnitService, TaxRateService, PaymentTermService };
