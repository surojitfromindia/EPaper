import { PaymentModeModel } from "../../Models";

class PaymentModeDAO {
  private readonly _organizationId: number;

  constructor({ organization_id }) {
    this._organizationId = organization_id;
  }

  async getAll() {
    return PaymentModeModel.findAll({
      where: {
        organizationId: this._organizationId,
        status: "active",
      },
    });
  }

  async createAll({ payment_modes }, { transaction }) {
    return await PaymentModeModel.bulkCreate(payment_modes, {
      transaction,
    });
  }
}

export { PaymentModeDAO };
