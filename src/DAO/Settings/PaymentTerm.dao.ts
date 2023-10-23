import { PaymentTerms } from "../../Models";

class PaymentTermDao {
  async create({ payment_term_details }, { transaction }) {
    const paymentTerms = await PaymentTerms.create(payment_term_details, {
      transaction,
    });
    return await PaymentTerms.findByPk(paymentTerms.get("id"));
  }

  async get({ payment_term_id, organization_id }) {
    return await PaymentTerms.findOne({
      where: {
        id: payment_term_id,
        organizationId: organization_id,
      },
    });
  }

  async getAll({ organization_id }) {
    return await PaymentTerms.findAll({
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
    await PaymentTerms.update(payment_term_details, {
      where: {
        id: payment_term_id,
        organizationId: organization_id,
      },
      transaction,
    });
    return await this.get({ payment_term_id, organization_id });
  }

  async createAll({ payment_term_details }, { transaction }) {
    return await PaymentTerms.bulkCreate(payment_term_details, {
      transaction,
    });
  }
}

export default Object.freeze(new PaymentTermDao());
