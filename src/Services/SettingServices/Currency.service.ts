import { CurrencyDAO } from "../../DAO/index";
import { DEFAULT_CURRENCIES } from "../../Constants/Currency.Constant";
import { ClientInfo } from "../../Middlewares/Authorization/Authorization.middleware";
import { OrganizationBasicIdType } from "../../Models/Organization/Organization.model";

class CurrencyService {
  private readonly _organizationId: OrganizationBasicIdType;
  private readonly _userId: number;
  private _currencyDAO: Readonly<typeof CurrencyDAO>;

  constructor({ client_info }: { client_info: ClientInfo }) {
    this._userId = client_info.userId;
    this._organizationId = client_info.organizationId;
    this._currencyDAO = CurrencyDAO;
  }

  async getAllCurrencies() {
    return await CurrencyDAO.getAll({
      organization_id: this._organizationId,
    });
  }

  async initDefaultCurrencies({ organization_id }, { transaction }) {
    const organizationId = organization_id;
    const userId = this._userId;
    let currencies = DEFAULT_CURRENCIES;
    if (DEFAULT_CURRENCIES) {
      currencies = DEFAULT_CURRENCIES.map((currency) => ({
        ...currency,
        organizationId,
        createdBy: userId,
      }));
    }
    return await this._currencyDAO.createAll(
      {
        currency_details: currencies,
      },
      { transaction },
    );
  }
}

export default CurrencyService;
