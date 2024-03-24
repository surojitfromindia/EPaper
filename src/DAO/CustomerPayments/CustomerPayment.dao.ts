import { CustomerPaymentModel } from "../../Models";
import { ValidityUtil } from "../../Utils/ValidityUtil";

class CustomerPaymentDAO {
  private organization_id: number;

  constructor({ organization_id }: { organization_id: number }) {
    this.organization_id = organization_id;
  }

  async create({ customer_payment_details }, { transaction }) {
    return await CustomerPaymentModel.create(customer_payment_details, {
      transaction,
    });
  }

  async isPaymentNumberExists({ organization_id, payment_number }) {
    const payment = await CustomerPaymentModel.findOne({
      where: {
        organizationId: organization_id,
        paymentNumber: payment_number,
      },
      attributes: ["id", "paymentNumber"],
    });
    return ValidityUtil.isNotEmpty(payment);
  }
}

export { CustomerPaymentDAO };
