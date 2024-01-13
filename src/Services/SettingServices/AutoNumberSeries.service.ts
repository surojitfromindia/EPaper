import { AutoNumberGroupDAO, InvoiceDao } from "../../DAO";
import { ClientInfo } from "../../Middlewares/Authorization/Authorization.middleware";
import { OrganizationBasicIdType } from "../../Models/Organization/Organization.model";
import { DEFAULT_AUTO_NUMBER_SERIES } from "../../Constants/AutoNumberSeries.Constant";
import { AutoNumberDAO } from "../../DAO/AutoNumberSeries/AutoNumber.dao";
import { IAutoNumberEntityTypes } from "../../Models/AutoNumberSeries/AutoNumber.model";
import { AutoNumberSeriesServiceErrorMessages } from "../../Errors/APIErrors/ErrorMessages";
import CodedError from "../../Errors/APIErrors/CodedError";
import { Transaction } from "@sequelize/core";

class AutoNumberSeriesService {
  private readonly _organizationId: OrganizationBasicIdType;
  private readonly _userId: number;
  private readonly _autoNumberGroupDAO: AutoNumberGroupDAO;

  constructor({ client_info }: { client_info: ClientInfo }) {
    this._organizationId = client_info.organizationId;
    this._userId = client_info.userId;
    this._autoNumberGroupDAO = new AutoNumberGroupDAO({
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

type GenerateNextNumberProps = {
  entity_type: IAutoNumberEntityTypes;
  auto_number_group_id: number;
};
type GenerateNextNumberOptions = {
  transaction: Transaction;
};

class AutoNumberGenerationService {
  private readonly _organizationId: OrganizationBasicIdType;
  private readonly _autoNumberGroupDAO: AutoNumberGroupDAO;
  private readonly _autoNumberDAO: AutoNumberDAO;

  constructor({ client_info }: { client_info: ClientInfo }) {
    this._organizationId = client_info.organizationId;
    this._autoNumberGroupDAO = new AutoNumberGroupDAO({
      organization_id: this._organizationId,
    });
    this._autoNumberDAO = new AutoNumberDAO({
      organization_id: this._organizationId,
    });
  }

  /**
   * given an entity type if a given transaction if already exists
   * generate a new transaction number and return
   */
  async generateNextNumber(
    { entity_type, auto_number_group_id }: GenerateNextNumberProps,
    { transaction }: GenerateNextNumberOptions,
  ): Promise<string | never> {
    // get the usable number from a group
    const autoNumberGroup = await this._autoNumberGroupDAO.get({
      auto_number_group_id,
    });
    // find the correct entity type
    const autoNumber = autoNumberGroup.AutoNumbers.find(
      (autoNumber) => autoNumber.entityType === entity_type,
    );

    // get the current sequence
    const currentNumber = autoNumber.nextNumber;
    const currentPrefix = autoNumber.prefixString;
    const currentTransactionNumber = currentPrefix + currentNumber;

    // note: if even after generating the next sequence, it already exists,
    // we throw an error, because we can't handle that situation
    const currentTransactionNumberAlreadyExists = await this.#checkIfExists(
      entity_type,
      currentTransactionNumber,
    );
    if (currentTransactionNumberAlreadyExists) {
      switch (entity_type) {
        case "invoice":
          throw new CodedError(
            AutoNumberSeriesServiceErrorMessages.INVOICE_NUMBER_ALREADY_EXISTS,
          );
        case "credit_note":
          throw new CodedError(
            AutoNumberSeriesServiceErrorMessages.CREDIT_NOTE_NUMBER_ALREADY_EXISTS,
          );
        case "customer_payment":
          throw new CodedError(
            AutoNumberSeriesServiceErrorMessages.CREDIT_NOTE_NUMBER_ALREADY_EXISTS,
          );
      }
    }

    // generate the next sequence by incrementing the current sequence by 1
    const nextNumber = (parseInt(currentNumber) + 1)
      .toString()
      .padStart(autoNumber.numberZeroPad, "0");

    // update the auto number
    await this._autoNumberDAO.update(
      {
        auto_number_id: autoNumber.id,
        auto_number_details: {
          nextNumber: nextNumber,
        },
      },
      {
        transaction,
      },
    );
    return currentTransactionNumber;
  }

  async #checkIfExists(
    entity_type: IAutoNumberEntityTypes,
    transaction_number: string,
  ) {
    let exists = false;
    if (entity_type === "invoice") {
      exists = await InvoiceDao.isInvoiceNumberExists({
        organization_id: this._organizationId,
        invoice_number: transaction_number,
      });
    }
    return exists;
  }
}

export { AutoNumberSeriesService, AutoNumberGenerationService };
