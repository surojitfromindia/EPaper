import sequelize from "../Config/DataBase.Config.js";
import { RegularItemDto } from "../DTO/index.js";
import { RegularItemDao } from "../DAO/index.js";
import { DataNotFoundError } from "../Errors/APIErrors/index.js";
import {
  AccountsOfOrganizationService,
  ItemUnitService,
  TaxRateService,
} from "./index.js";
import { AccountsTree } from "../Utils/AccoutsTree.js";

class RegularItemService {
  async create({ item_details, client_info }) {
    const itemDetailsFromPayload = RegularItemDto.toItemCreate(item_details);
    const createdItem = await sequelize.transaction(async (t1) => {
      const itemDetails = {
        ...itemDetailsFromPayload,
        organizationId: client_info.organizationId,
        createdBy: client_info.userId,
      };
      return await RegularItemDao.create(
        { item_details: itemDetails },
        { transaction: t1 },
      );
    });
    return RegularItemDto.toItem(createdItem);
  }

  async getAllItems({ client_info }) {
    const organizationId = client_info.organizationId;
    const items = await RegularItemDao.getAll({
      organization_id: organizationId,
    });
    return items.map((item) => RegularItemDto.toItem(item));
  }

  async getAnItem({ item_id, client_info }) {
    const organizationId = client_info.organizationId;
    const taxRate = await RegularItemDao.get({
      item_id,
      organization_id: organizationId,
    });
    if (taxRate) {
      return RegularItemDto.toItem(taxRate);
    }
    throw new DataNotFoundError();
  }

  async updateAnItem({ item_id, item_details, client_info }) {
    const taxRateDetailsFromPayload = RegularItemDto.toItemUpdate(item_details);
    const updatedItem = await sequelize.transaction(async (t1) => {
      return await RegularItemDao.updateItemDetails(
        {
          tax_rate_details: taxRateDetailsFromPayload,
          item_id,
          organization_id: client_info.organizationId,
        },
        { transaction: t1 },
      );
    });

    if (updatedItem) {
      return RegularItemDto.toItem(updatedItem);
    }
    throw new DataNotFoundError();
  }

  /**
   * @desc get edit page for item add or edit
   * @param {ClientInfoType} client_info
   * @param {number=} item_id provided an item id if fetching for edit.
   */
  async getEditPage({ client_info }) {
    // fetch all taxes
    const taxes = await TaxRateService.getAllTaxRates({ client_info });

    // fetch all units
    const itemUnits = await ItemUnitService.getAllItemUnits({ client_info });
    // fetch income accounts
    const accountsOfItem = AccountsOfOrganizationService.ofItem({
      client_info,
    });
    const {
      income_accounts_list,
      purchase_accounts_list,
      inventory_accounts_list,
    } = await accountsOfItem.getAccountsForItem();
    // fetch purchase accounts
    return {
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

export default Object.freeze(new RegularItemService());
