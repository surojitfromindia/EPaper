import sequelize from "../../Config/DataBase.Config";
import { PaymentTermDao } from "../../DAO/index";
import { PAYMENT_TERMS } from "../../Constants/PaymentTerms.Constant";
import { DataNotFoundError } from "../../Errors/APIErrors";

class PaymentTermService {
  async create({ payment_term_details, client_info }) {
    const paymentTermDetailsFromPayload = payment_term_details;
    return await sequelize.transaction(async (t1) => {
      const paymentTermDetails = {
        ...paymentTermDetailsFromPayload,
        organizationId: client_info.organizationId,
        createdBy: client_info.userId,
      };
      // check if this payment term is marked as default (isDefault = true)
      if (paymentTermDetails.isDefault) {
        await PaymentTermDao.unsetTheCurrentDefault(
          {
            organization_id: client_info.organizationId,
          },
          {
            transaction: t1,
          },
        );
      }
      return await PaymentTermDao.create(
        { payment_term_details: paymentTermDetails },
        { transaction: t1 },
      );
    });
  }

  async getAPaymentTerm({ payment_term_id, client_info }) {
    const organizationId = client_info.organizationId;
    const paymentTerm = await PaymentTermDao.get({
      payment_term_id,
      organization_id: organizationId,
    });
    if (paymentTerm) {
      return paymentTerm;
    }
    throw new DataNotFoundError();
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

  async updateAPaymentTerm({
    payment_term_id,
    payment_term_details,
    client_info,
  }) {
    const paymentTermDetailsFromPayload = payment_term_details;
    const updatedPaymentTerm = await sequelize.transaction(async (t1) => {
      if (paymentTermDetailsFromPayload.isDefault) {
        // check if this payment term is marked as default (isDefault = true)
        await PaymentTermDao.unsetTheCurrentDefault(
          {
            organization_id: client_info.organizationId,
          },
          {
            transaction: t1,
          },
        );
      }

      return await PaymentTermDao.updatePaymentTerm(
        {
          payment_term_details: paymentTermDetailsFromPayload,
          payment_term_id,
          organization_id: client_info.organizationId,
        },
        { transaction: t1 },
      );
    });

    if (updatedPaymentTerm) {
      return updatedPaymentTerm;
    }
    throw new DataNotFoundError();
  }
}

export default Object.freeze(new PaymentTermService());
