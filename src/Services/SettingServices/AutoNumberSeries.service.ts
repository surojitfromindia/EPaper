import { AutoNumberGroupDAO, CurrencyDAO } from "../../DAO/index";
import { DEFAULT_CURRENCIES } from "../../Constants/Currency.Constant";
import { ClientInfo } from "../../Middlewares/Authorization/Authorization.middleware";
import { OrganizationBasicIdType } from "../../Models/Organization/Organization.model";

class CurrencyService {
  private _clientInfo: ClientInfo;
  private readonly _organizationId: OrganizationBasicIdType;
  private readonly _userId: number;
  private readonly _autoNumberGroupDAO: AutoNumberGroupDAO;

  constructor({ client_info }: { client_info: ClientInfo }) {
    this._clientInfo = client_info;
    this._organizationId = client_info.organizationId;
    this._userId = client_info.userId;
    this._autoNumberGroupDAO = new AutoNumberGroupDAO({
      organization_id: this._organizationId,
    });
  }

  async getAllAutoNumberGroups() {
    return await this._autoNumberGroupDAO.getAll();
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
    return await CurrencyDAO.createAll(
      {
        currency_details: currencies,
      },
      { transaction },
    );
  }
}

export default CurrencyService;
