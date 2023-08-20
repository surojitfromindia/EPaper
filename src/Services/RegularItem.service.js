import sequelize from "../Config/DataBase.Config.js";
import { RegularItemDto } from "../DTO/index.js";
import { RegularItemDao } from "../DAO/index.js";
import { DataNotFoundError } from "../Errors/APIErrors/index.js";

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
    const item = await RegularItemDao.updateItemDetails({
      tax_rate_details: taxRateDetailsFromPayload,
      item_id,
      organization_id: client_info.organizationId,
    });
    if (item) {
      return RegularItemDto.toItem(item);
    }
    throw new DataNotFoundError();
  }
}

export default Object.freeze(new RegularItemService());
