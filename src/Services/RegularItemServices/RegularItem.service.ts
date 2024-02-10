import sequelize from "../../Config/DataBase.Config";
import { RegularItemDao } from "../../DAO";
import { DataNotFoundError, IntegrityErrors } from "../../Errors/APIErrors";
import { ItemUnitService } from "../index";
import { AccountIntegrity } from "../../IntegrityValidationServices";
import { ClientInfo } from "../../Middlewares/Authorization/Authorization.middleware";
import { ValidityUtil } from "../../Utils/ValidityUtil";
import { AccountsConfigRedisDAO } from "../../RedisDAO";

class RegularItemService {
  clientInfo: ClientInfo;
  utilServices: UtilServices;

  constructor({ client_info }) {
    this.clientInfo = client_info;
    this.utilServices = new UtilServices({ client_info });
  }

  async create({ item_details }) {
    const client_info = this.clientInfo;
    const organizationId = client_info.organizationId;
    const createdBy = client_info.userId;

    return await sequelize.transaction(async (t1) => {
      const newItem = await this.utilServices.fitWithDefaultValues(
        { item_details },
        { transaction: t1, is_update: false },
      );
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

  async updateAnItem({ item_id, item_details }) {
    const updatedItem = await sequelize.transaction(async (t1) => {
      const updateItemBody = await this.utilServices.fitWithDefaultValues(
        { item_details },
        { transaction: t1, is_update: true },
      );
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
}

export default RegularItemService;

class UtilServices {
  clientInfo: ClientInfo;

  constructor({ client_info }) {
    this.clientInfo = client_info;
  }

  async createItemUnitIfNotExists({ unit }, { transaction }) {
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

  async fitWithDefaultValues(
    { item_details },
    { transaction, is_update = false },
  ) {
    const item: any = {};
    Object.assign(item, item_details);
    // depending on "itemFor" we set sales/purchase values
    const itemFor = item.itemFor;

    //-----------------remove fields according to itemFor-------------------
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
    //-----------------end of removing fields according to itemFor-------------------

    //------------- units of item ----------------
    if (ValidityUtil.isNotEmpty(item.unit)) {
      item.unitId = await this.createItemUnitIfNotExists(
        { unit: item.unit },
        { transaction },
      );
    }
    //------------- end of units of item ----------------

    //-------------------set default accounts-------------------
    if (!is_update) {
      const accountConfigRedisDAO = new AccountsConfigRedisDAO();
      const accountConfigFromRedis = await accountConfigRedisDAO.get(
        this.clientInfo.organizationId,
      );
      if (
        ValidityUtil.isEmpty(item.salesAccountId) &&
        ["sales", "sales_and_purchase"].includes(itemFor)
      ) {
        item.salesAccountId = accountConfigFromRedis.defaultSalesAccountId;
      }
      if (
        ValidityUtil.isEmpty(item.purchaseAccountId) &&
        ["purchase", "sales_and_purchase"].includes(itemFor)
      ) {
        item.purchaseAccountId =
          accountConfigFromRedis.defaultPurchaseAccountId;
      }
    }
    //-----------------end of setting default accounts-------------------

    return item;
  }
}
