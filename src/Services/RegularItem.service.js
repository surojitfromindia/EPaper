import sequelize from "../Config/DataBase.Config.js";
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
    const organizationId = client_info.organizationId;
    const createdBy = client_info.userId;
    const newItem = this.#formatItemBody({ item_details });
    return await sequelize.transaction(async (t1) => {
      const itemDetails = {
        ...newItem,
        organizationId,
        createdBy,
      };
      return await RegularItemDao.create(
        { item_details: itemDetails },
        { transaction: t1 },
      );
    });
  }

  async getAllItems({ client_info }) {
    const organizationId = client_info.organizationId;
    return await RegularItemDao.getAll({
      organization_id: organizationId,
    });
  }

  async getAnItem({ item_id, client_info }) {
    const organizationId = client_info.organizationId;
    const item = await RegularItemDao.get({
      item_id,
      organization_id: organizationId,
    });
    if (item) {
      return item;
    }
    throw new DataNotFoundError();
  }

  async updateAnItem({ item_id, item_details, client_info }) {
    const updateItemBody = this.#formatItemBody({ item_details });
    const updatedItem = await sequelize.transaction(async (t1) => {
      return await RegularItemDao.updateItemDetails(
        {
          item_details: updateItemBody,
          item_id,
          organization_id: client_info.organizationId,
        },
        { transaction: t1 },
      );
    });

    if (updatedItem) {
      return updatedItem;
    }
    throw new DataNotFoundError();
  }

  /**
   * @desc get edit page for item add or edit
   * @param {object} param0
   * @param {ClientInfoType} param0.client_info
   * @param {number=} param0.item_id provided an item id if fetching for edit.
   */
  async getEditPage({ client_info, item_id }) {
    let itemDetails = null;
    let taxes;
    let itemUnits;
    if (item_id) {
      itemDetails = await this.getAnItem({
        item_id,
        client_info,
      });
    }
    // fetch all taxes
    taxes = await TaxRateService.getAllTaxRates({ client_info });
    // fetch all units
    itemUnits = await ItemUnitService.getAllItemUnits({ client_info });
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

  #formatItemBody({ item_details }) {
    const item = {};
    Object.assign(item, item_details);
    // depending on "itemFor" we set sales/purchase values
    const itemFor = item.itemFor;
    if (itemFor !== "sales_and_purchase" && itemFor !== "sales") {
      item.sellingPrice = 0;
      item.sellingDescription = "";
      item.salesAccountId = null;
    }
    if (itemFor !== "sales_and_purchase" && itemFor !== "purchase") {
      item.purchasePrice = 0;
      item.purchaseDescription = "";
      item.purchaseAccountId = null;
    }
    return item;
  }
}

export default Object.freeze(new RegularItemService());
