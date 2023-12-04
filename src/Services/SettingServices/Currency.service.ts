import { CurrencyDAO } from "../../DAO/index";
import { DEFAULT_CURRENCIES } from "../../Constants/Currency.Constant";

class CurrencyService {
  async getAllCurrencies({ client_info }) {
    const organizationId = client_info.organizationId;
    return await CurrencyDAO.getAll({
      organization_id: organizationId,
    });
  }

  async initDefaultCurrencies(
    { client_info, organization_id },
    { transaction },
  ) {
    const organizationId = organization_id;
    const userId = client_info.userId;
    let currencies = DEFAULT_CURRENCIES;
    if (DEFAULT_CURRENCIES) {
      currencies = DEFAULT_CURRENCIES.map((currency) => ({
        ...currency,
        organizationId,
        createdBy: userId,
      }));
    }
    return await CurrencyDAO.createAll(
      {
        currency_details: currencies,
      },
      { transaction },
    );
  }
}

export default Object.freeze(new CurrencyService());
