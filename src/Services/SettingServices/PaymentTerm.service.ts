import sequelize from "../../Config/DataBase.Config";
import { PaymentTermDao } from "../../DAO/index";
import { PAYMENT_TERMS } from "../../Constants/PaymentTerms.Constant";

class PaymentTermService {
  async create({ payment_term_details, client_info }) {
    const paymentTermDetailsFromPayload = payment_term_details;
    return await sequelize.transaction(async (t1) => {
      const paymentTermDetails = {
        ...paymentTermDetailsFromPayload,
        organizationId: client_info.organizationId,
        createdBy: client_info.userId,
      };
      return await PaymentTermDao.create(
        { payment_term_details: paymentTermDetails },
        { transaction: t1 },
      );
    });
  }

  async getAllPaymentTerms({ client_info }) {
    const organizationId = client_info.organizationId;
    return await PaymentTermDao.getAll({
      organization_id: organizationId,
    });
  }

  async initDefaultPaymentTerms(
    { client_info, organization_id },
    { transaction },
  ) {
    const organizationId = organization_id;
    const userId = client_info.userId;
    const paymentTerms = PAYMENT_TERMS.map((pt) => ({
      ...pt,
      organizationId,
      createdBy: userId,
    }));

    return await PaymentTermDao.createAll(
      {
        payment_term_details: paymentTerms,
      },
      { transaction },
    );
  }
}

export default Object.freeze(new PaymentTermService());
