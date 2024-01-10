import { AutoNumberGroupDAO } from "../../DAO/index";
import { ClientInfo } from "../../Middlewares/Authorization/Authorization.middleware";
import { OrganizationBasicIdType } from "../../Models/Organization/Organization.model";
import { DEFAULT_AUTO_NUMBER_SERIES } from "../../Constants/AutoNumberSeries.Constant";
import { AutoNumberDAO } from "../../DAO/AutoNumberSeries/AutoNumber.dao";

class AutoNumberGroupService {
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
}

export { AutoNumberGroupService };
