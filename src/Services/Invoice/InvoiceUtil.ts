import { InvoicePaymentTermDao, PaymentTermDao } from "../../DAO";
import { DateUtil } from "../../Utils/DateUtil";

type CalculateDueDateProps = {
  issue_date: Date;
  payment_term_id: number;
  organization_id: number;
};

export class InvoiceUtil {
  static async calculateDueDate({
    issue_date,
    payment_term_id,
    organization_id,
  }: CalculateDueDateProps) {
    if (payment_term_id === -1) {
      return { due_date: issue_date, payment_term_details: null };
    }
    const paymentTerm = await PaymentTermDao.get({
      payment_term_id,
      organization_id,
    });
    // depending to "interval" type if regular just use regular calculation
    const interval = paymentTerm.interval;
    const pt = paymentTerm.paymentTerm;
    const dateCalculator = DateUtil.Calculator(issue_date);
    let date: Date;
    switch (interval) {
      case "regular": {
        date = dateCalculator.addDays(pt).getDate();
        break;
      }
      case "end_of_month": {
        date = dateCalculator.endOfFewMonths(pt).getDate();
        break;
      }
      case "end_of_day": {
        date = dateCalculator.endOfCurrentDay().getDate();
        break;
      }
    }
    return { due_date: date, payment_term_details: paymentTerm };
  }

  static async createInvoicePaymentTerm(
    { payment_term_details },
    { transaction },
  ) {
    if (payment_term_details === null)
      return {
        id: -1,
      };
    return await InvoicePaymentTermDao.create(
      {
        term_details: {
          originPaymentTermId: payment_term_details.id,
          name: payment_term_details.name,
          interval: payment_term_details.interval,
          paymentTerm: payment_term_details.paymentTerm,
        },
      },
      {
        transaction,
      },
    );
  }
}
