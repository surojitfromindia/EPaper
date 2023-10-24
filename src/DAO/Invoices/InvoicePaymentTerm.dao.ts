import { InvoicePaymentTerm } from "../../Models";

class InvoicePaymentTermDao {
  async create({ term_details }, { transaction }) {
    const paymentTerms = await InvoicePaymentTerm.create(term_details, {
      transaction,
    });
    return await InvoicePaymentTerm.findByPk(paymentTerms.get("id"));
  }

  async get({ term_details }) {
    return await InvoicePaymentTerm.findOne({
      where: {
        id: term_details,
      },
    });
  }

  async updateInvoicePaymentTerm({ term_details, term_id }, { transaction }) {
    await InvoicePaymentTerm.update(term_details, {
      where: {
        id: term_id,
      },
      transaction,
    });
    return await this.get({ term_details });
  }
}

export default Object.freeze(new InvoicePaymentTermDao());
