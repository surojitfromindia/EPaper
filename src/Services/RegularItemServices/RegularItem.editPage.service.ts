import { ClientInfo } from "../../Middlewares/Authorization/Authorization.middleware";
import {
  ItemUnitService,
  TaxRateService,
} from "../SettingServices/Setting.service";
import { AccountsOfOrganizationService } from "../index";
import { AccountsTree } from "../../Utils/AccoutsTree";
import RegularItemService from "./RegularItem.service";

class RegularItemEditPageService {
  private readonly clientInfo: ClientInfo;

  constructor({ client_info }: { client_info: ClientInfo }) {
    this.clientInfo = client_info;
  }

  async getEditPage({ item_id }: { item_id?: number | undefined }) {
    let itemDetails = null;
    let taxes: any[];
    let itemUnits: any[];

    if (item_id) {
      const itemService = new RegularItemService({
        client_info: this.clientInfo,
      });
      itemDetails = await itemService.getAnItem({
        item_id,
      });
    }
    // fetch all taxes
    taxes = await TaxRateService.getAllTaxRates({
      client_info: this.clientInfo,
    });

    // fetch all units
    itemUnits = await ItemUnitService.getAllItemUnits({
      client_info: this.clientInfo,
    });
    // fetch income accounts
    const accountsOfItem = AccountsOfOrganizationService.ofItem({
      client_info: this.clientInfo,
    });
    const {
      income_accounts_list,
      purchase_accounts_list,
      inventory_accounts_list,
    } = await accountsOfItem.getAccountsForItem();
    // fetch purchase accounts
    return {
      item_details: itemDetails,
      taxes,
      units: itemUnits,
      income_accounts_list: AccountsTree.createTreeOfOrganizationAccountsAsDTO({
        accounts: income_accounts_list,
      }).flatArrayFromTreeAsDTO(),
      purchase_accounts_list:
        AccountsTree.createTreeOfOrganizationAccountsAsDTO({
          accounts: purchase_accounts_list,
        }).flatArrayFromTreeAsDTO(),
      inventory_accounts_list:
        AccountsTree.createTreeOfOrganizationAccountsAsDTO({
          accounts: inventory_accounts_list,
        }).flatArrayFromTreeAsDTO(),
    };
  }
}

export { RegularItemEditPageService };
