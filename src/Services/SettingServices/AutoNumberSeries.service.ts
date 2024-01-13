import { AutoNumberGroupDAO } from "../../DAO";
import { ClientInfo } from "../../Middlewares/Authorization/Authorization.middleware";
import { OrganizationBasicIdType } from "../../Models/Organization/Organization.model";
import { DEFAULT_AUTO_NUMBER_SERIES } from "../../Constants/AutoNumberSeries.Constant";
import { AutoNumberDAO } from "../../DAO/AutoNumberSeries/AutoNumber.dao";
import { IAutoNumberEntityTypes } from "../../Models/AutoNumberSeries/AutoNumber.model";

class AutoNumberSeriesService {
  private readonly _organizationId: OrganizationBasicIdType;
  private readonly _userId: number;
  private readonly _autoNumberGroupDAO: AutoNumberGroupDAO;
  private _autoNumberDao: AutoNumberDAO;

  constructor({ client_info }: { client_info: ClientInfo }) {
    this._organizationId = client_info.organizationId;
    this._userId = client_info.userId;
    this._autoNumberGroupDAO = new AutoNumberGroupDAO({
      organization_id: this._organizationId,
    });
    this._autoNumberDao = new AutoNumberDAO({
      organization_id: this._organizationId,
    });
  }

  async initDefaultAutoNumber({ organization_id }, { transaction }) {
    const organizationId = organization_id;
    const userId = this._userId;
    const defaultAutoNumberGroup = {
      ...DEFAULT_AUTO_NUMBER_SERIES,
      createdBy: userId,
      organizationId: organizationId,
    };

    const autoNumberGroupDao = new AutoNumberGroupDAO({
      organization_id: organizationId,
    });
    const autoNumberDao = new AutoNumberDAO({
      organization_id: organizationId,
    });
    const createdAutoNumberGp = await autoNumberGroupDao.create(
      {
        auto_number_group: defaultAutoNumberGroup,
      },
      { transaction },
    );
    const defaultAutoNumbers = defaultAutoNumberGroup.autoNumbers.map(
      (autoNumber) => {
        return {
          ...autoNumber,
          autoNumberGroupId: createdAutoNumberGp.id,
          createdBy: userId,
          organizationId: organizationId,
        };
      },
    );
    await autoNumberDao.bulkCreate(
      {
        auto_numbers: defaultAutoNumbers,
      },
      { transaction },
    );
  }

  async getAllAutoNumberGroups() {
    return await this._autoNumberGroupDAO.getAll();
  }

  async getAutoNumberGroupById({ auto_number_group_id }) {
    return await this._autoNumberGroupDAO.get({ auto_number_group_id });
  }

  async getAutoNumberGroupsOfEntity({
    entity_type,
  }: {
    entity_type: IAutoNumberEntityTypes;
  }) {
    return await this._autoNumberGroupDAO.getOfEntity({ entity_type });
  }
}

export { AutoNumberSeriesService };
