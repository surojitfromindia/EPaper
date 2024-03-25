import { InvoicePaymentModel } from "../../Models";

class InvoicePaymentDAO {
  private organization_id: number;

  constructor({ organization_id }: { organization_id: number }) {
    this.organization_id = organization_id;
  }

  async bulkCreate({ invoice_payments }, { transaction }) {
    return await InvoicePaymentModel.bulkCreate(invoice_payments, {
      transaction,
    });
  }
}

export { InvoicePaymentDAO };
