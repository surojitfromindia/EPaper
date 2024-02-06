import sequelize from "../Config/DataBase.Config";
import { RegularItemDao } from "../DAO/index";
import { DataNotFoundError, IntegrityErrors } from "../Errors/APIErrors/index";
import {
  AccountsOfOrganizationService,
  ItemUnitService,
  TaxRateService,
} from "./index";
import { AccountsTree } from "../Utils/AccoutsTree";
import { AccountIntegrity } from "../IntegrityValidationServices/index";
import { ClientInfo } from "../Middlewares/Authorization/Authorization.middleware";
import {
  AutoCompleteBasicType,
  IAutoCompleteAble,
} from "./AutoComplete.service";

type ItemAutoCompleteType = AutoCompleteBasicType & {
  name: string;
  sellingPrice: number;
  purchasePrice: number;
};

class RegularItemService implements IAutoCompleteAble<ItemAutoCompleteType> {
  clientInfo: ClientInfo;

  constructor({ client_info }) {
    this.clientInfo = client_info;
  }

  async create({ item_details }) {
    const client_info = this.clientInfo;
    const organizationId = client_info.organizationId;
    const createdBy = client_info.userId;
    const newItem = this.#formatItemBody({ item_details });
    const accountIntegrity = new AccountIntegrity({
      client_info,
    });
    const { errors, valid: areAccountsValid } =
      await accountIntegrity.checkForItemAccounts({
        sales_account_id: newItem.salesAccountId,
        purchase_account_id: newItem.purchaseAccountId,
      });
    if (!areAccountsValid) {
      throw new IntegrityErrors({
        message: "some item accounts are not valid",
        errors,
      });
    }
    return await sequelize.transaction(async (t1) => {
      const itemDetails = {
        ...newItem,
        organizationId,
        createdBy,
      };
      itemDetails.unitId = await this.#createItemUnitIfNotExists(
        { unit: itemDetails.unit },
        { transaction: t1 },
      );

      return await RegularItemDao.create(
        { item_details: itemDetails },
        { transaction: t1 },
      );
    });
  }

  async getAllItems() {
    const organizationId = this.clientInfo.organizationId;
    return await RegularItemDao.getAll({
      organization_id: organizationId,
    });
  }

  async getAnItem({ item_id }) {
    const organizationId = this.clientInfo.organizationId;
    const item = await RegularItemDao.get({
      item_id,
      organization_id: organizationId,
    });
    if (item) {
      return item;
    }
    throw new DataNotFoundError();
  }

  async updateAnItem({ item_id, item_details }) {
    const updateItemBody = this.#formatItemBody({ item_details });
    const accountIntegrity = new AccountIntegrity({
      client_info: this.clientInfo,
    });
    const { errors, valid: areAccountsValid } =
      await accountIntegrity.checkForItemAccounts({
        sales_account_id: updateItemBody.salesAccountId,
        purchase_account_id: updateItemBody.purchaseAccountId,
      });
    if (!areAccountsValid) {
      throw new IntegrityErrors({
        message: "some item accounts are not valid",
        errors,
      });
    }
    const updatedItem = await sequelize.transaction(async (t1) => {
      updateItemBody.unitId = await this.#createItemUnitIfNotExists(
        { unit: updateItemBody.unit },
        { transaction: t1 },
      );

      return await RegularItemDao.updateItemDetails(
        {
          item_details: updateItemBody,
          item_id,
          organization_id: this.clientInfo.organizationId,
        },
        { transaction: t1 },
      );
    });

    if (updatedItem) {
      return updatedItem;
    }
    throw new DataNotFoundError();
  }

  async getEditPage({
    item_id,
  }: {
    client_info: ClientInfo;
    item_id?: number | undefined;
  }) {
    let itemDetails = null;
    let taxes: any[];
    let itemUnits: any[];
    if (item_id) {
      itemDetails = await this.getAnItem({
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

  #formatItemBody({ item_details }): any {
    const item: any = {};
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

  async #createItemUnitIfNotExists({ unit }, { transaction }) {
    if (!unit) {
      return null;
    }
    const unitDetails = await ItemUnitService.getItemUnitByUnit({
      client_info: this.clientInfo,
      unit,
    });
    if (unitDetails) {
      return unitDetails.id;
    }
    // else create a new unit
    const newItemUnit = {
      unit,
      organizationId: this.clientInfo.organizationId,
      createdBy: this.clientInfo.userId,
    };
    const createdItemUnit = await ItemUnitService.createWithTransaction(
      {
        client_info: this.clientInfo,

        item_unit_details: newItemUnit,
      },
      { transaction },
    );
    return createdItemUnit.id;
  }

  async fetchEntries({
    organization_id,
    search_text,
    search_option,
    limit_and_offset,
  }): Promise<Array<ItemAutoCompleteType>> {
    const { limit, offset } = limit_and_offset;

    const itemFor = [];
    switch (search_option.item_for) {
      case "sales":
        itemFor.push("sales", "sales_and_purchase");
        break;
      case "purchase":
        itemFor.push("purchase", "sales_and_purchase");
        break;
      default:
        itemFor.push("sales", "purchase", "sales_and_purchase");
    }

    const items = await RegularItemDao.getItemsAutoComplete({
      organization_id: organization_id,
      skip: offset,
      next: limit,
      item_name: search_text,
      item_for: itemFor,
    });

    return items.map((item) => ({
      id: item.id as number,
      text: item.name as string,
      name: item.name,
      purchasePrice: item.purchasePrice,
      sellingPrice: item.sellingPrice,
    }));
  }
}

export default RegularItemService;
export type { ItemAutoCompleteType };
