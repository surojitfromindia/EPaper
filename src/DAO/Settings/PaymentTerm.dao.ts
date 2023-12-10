import { PaymentTermModel } from "../../Models";

class PaymentTermDao {
  async create({ payment_term_details }, { transaction }) {
    const paymentTerms = await PaymentTermModel.create(payment_term_details, {
      transaction,
    });
    return await PaymentTermModel.findByPk(paymentTerms.get("id"));
  }

  async get({ payment_term_id, organization_id }) {
    return await PaymentTermModel.findOne({
      where: {
        id: payment_term_id,
        organizationId: organization_id,
      },
    });
  }

  async getAll({ organization_id }) {
    return await PaymentTermModel.findAll({
      where: {
        organizationId: organization_id,
      },
      raw: false,
    });
  }

  async updatePaymentTerm(
    { payment_term_details, payment_term_id, organization_id },
    { transaction },
  ) {
    await PaymentTermModel.update(payment_term_details, {
      where: {
        id: payment_term_id,
        organizationId: organization_id,
      },
      transaction,
    });
    return await this.get({ payment_term_id, organization_id });
  }

  async createAll({ payment_term_details }, { transaction }) {
    return await PaymentTermModel.bulkCreate(payment_term_details, {
      transaction,
    });
  }

  async unsetTheCurrentDefault({ organization_id }, { transaction }) {
    return await PaymentTermModel.update(
      {
        isDefault: false,
      },
      {
        where: {
          organizationId: organization_id,
          isDefault: true,
        },
        transaction,
      },
    );
  }
}

export default Object.freeze(new PaymentTermDao());
