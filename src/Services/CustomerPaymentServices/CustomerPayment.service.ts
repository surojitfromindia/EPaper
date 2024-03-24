import { ClientInfo } from "../../Middlewares/Authorization/Authorization.middleware";
import { CustomerPaymentDTO } from "../../DTO";
import InvoiceDao from "../../DAO/Invoices/Invoice.dao";
import sequelize from "../../Config/DataBase.Config";
import { MathLib } from "../../Utils/MathLib/mathLib";
import { ExchangeGainLoss } from "../helpers/ExchangeGainLoss";
import { Transaction } from "@sequelize/core";
import { ValidityUtil } from "../../Utils/ValidityUtil";
import { AutoNumberGenerationService } from "../SettingServices/AutoNumberSeries.service";
import CodedError from "../../Errors/APIErrors/CodedError";
import { CustomerPaymentServiceErrorMessages } from "../../Errors/APIErrors/ErrorMessages";
import { CustomerPaymentDAO } from "../../DAO";
import { CustomerPaymentCreatable } from "../../Models/CustomerPayment/CustomerPayment.model";

class CustomerPaymentService {
  private readonly _organizationId: number;
  private readonly _clientInfo: ClientInfo;
  private readonly _customerPaymentDAO: CustomerPaymentDAO;

  constructor({ client_info }: { client_info: ClientInfo }) {
    this._organizationId = client_info.organizationId;
    this._clientInfo = client_info;
    this._customerPaymentDAO = new CustomerPaymentDAO({
      organization_id: this._organizationId,
    });
  }

  async create({ customer_payment_details }) {
    const userId = this._clientInfo.userId;
    const organizationId = this._organizationId;

    const newCustomerPayment = CustomerPaymentDTO.toCustomerPaymentCreate({
      customer_payment: customer_payment_details,
    });

    // -- data are taken from payload
    const contactId = newCustomerPayment.contactId;
    const paymentExchangeRate = newCustomerPayment.exchangeRate ?? 1;
    const applyToInvoices = newCustomerPayment.invoices;
    const applyToInvoicesIds = applyToInvoices.map(
      (invoice) => invoice.invoiceId,
    );
    // -- end of data taken from payload
    /*
     for each of the invoices, we first must ensure we are not overpaying
     for any invoice.
     if there is an excess for an invoice, we save it
     as unused credit in the payment
    */
    const invoiceGetAllDAO = await InvoiceDao.getAllDAO({
      organization_id: organizationId,
      skip: 0,
    });
    const sentInvoices = await invoiceGetAllDAO
      .ofContacts([contactId])
      .applyFilterBy("Status.Sent")
      .ofInvoiceIds(applyToInvoicesIds)
      .getAll();
    return await sequelize.transaction(async (t1) => {
      // generate payment number
      const paymentNumber = await this.#paymentNumberValidityAndGeneration(
        newCustomerPayment.paymentNumber,
        newCustomerPayment.autoNumberGroupId,
        t1,
      );

      // for each invoice we might need exchange rate and latest due of the invoice.
      const invoiceIdAndBalanceRecord: {
        [invoiceId: number]: {
          invoice_id: number;
          prev_applied_amount: number;
          prev_applied_amount_bcy: number;
          applicable_amount: number;
          applicable_amount_bcy: number;
          exchange_gain_loss: number;
          new_balance: number;
          new_balance_bcy: number;
        };
      } = {};
      // note actually how much of the payment is used to pay the invoices
      let usedCreditOfPayment = 0;
      let totalExchangeGainLoss = 0;

      for await (const invoice of applyToInvoices) {
        // check if the invoice is sent
        const sentInvoice = sentInvoices.find(
          (sentInvoice) => sentInvoice.id === invoice.invoiceId,
        );
        if (!sentInvoice) {
          continue;
        }
        // otherwise continue
        const newAppliedAmount = invoice.amountApplied;
        const invoiceTotal = sentInvoice.total;
        const invoiceExchangeRate = sentInvoice.exchangeRate;

        // --- get the latest balance of the invoice
        const latestBalanceOfInvoice =
          await InvoiceDao.getLatestBalanceForUpdate(
            {
              invoice_id: invoice.invoiceId,
              organization_id: organizationId,
            },
            {
              transaction: t1,
            },
          );
        const prevAppliedAmount = MathLib.parseNumber(
          latestBalanceOfInvoice.total_applied_amount,
        );
        const preBcyAppliedAmount = MathLib.parseNumber(
          latestBalanceOfInvoice.total_bcy_applied_amount,
        );
        // --- end of getting the latest balance of the invoice

        // --- note: applicable amount is the amount that we can apply to the invoice
        const applicableAmount = Math.min(
          invoiceTotal - prevAppliedAmount,
          newAppliedAmount,
        );
        usedCreditOfPayment += applicableAmount;
        // --- end of calculating the applicable amount

        // --- calculate the exchange gain loss
        const bcyExchangeGainLoss = ExchangeGainLoss.calculateExchangeGainLoss({
          amount: applicableAmount,
          new_exchange_rate: paymentExchangeRate,
          old_exchange_rate: invoiceExchangeRate,
        });
        totalExchangeGainLoss += bcyExchangeGainLoss;
        // --- end of calculating the exchange gain loss

        // --- calculate the new balance of the invoice
        const newInvoiceBalance =
          invoiceTotal - (prevAppliedAmount + applicableAmount);
        const newInvoiceBalanceBcy = newInvoiceBalance * invoiceExchangeRate;
        // --- end of calculating the new balance of the invoice

        // update the "invoiceIdAndBalanceRecord"
        invoiceIdAndBalanceRecord[invoice.invoiceId] = {
          invoice_id: invoice.invoiceId,
          prev_applied_amount: prevAppliedAmount,
          prev_applied_amount_bcy: preBcyAppliedAmount,
          applicable_amount: applicableAmount,
          applicable_amount_bcy: applicableAmount * paymentExchangeRate,
          exchange_gain_loss: bcyExchangeGainLoss,
          new_balance: newInvoiceBalance,
          new_balance_bcy: newInvoiceBalanceBcy,
        };
      }

      // unused credit of payment is the amount that is not used to pay the invoices
      const unusedCreditOfPayment =
        newCustomerPayment.amount - usedCreditOfPayment;
      if (unusedCreditOfPayment < 0) {
        throw new CodedError(
          CustomerPaymentServiceErrorMessages.NEGATIVE_UNUSED_CREDIT_OF_PAYMENT,
        );
      }

      const customerPaymentBody: CustomerPaymentCreatable = {
        accountId: newCustomerPayment.accountId,
        amount: newCustomerPayment.amount,
        autoNumberGroupId: newCustomerPayment.autoNumberGroupId,
        bankCharges: newCustomerPayment.bankCharges,
        bcyAmount: newCustomerPayment.amount * paymentExchangeRate,
        bcyBankCharges: newCustomerPayment.bankCharges * paymentExchangeRate,
        unusedAmount: unusedCreditOfPayment,
        bcyUnusedAmount: unusedCreditOfPayment * paymentExchangeRate,
        contactId: newCustomerPayment.contactId,
        createdBy: userId,
        currencyId: newCustomerPayment.currencyId,
        exchangeRate: paymentExchangeRate,
        issueDate: newCustomerPayment.issueDate,
        notes: newCustomerPayment.notes,
        organizationId: organizationId,
        paymentModeId: newCustomerPayment.paymentModeId,
        paymentNumber: paymentNumber,
        referenceNumber: newCustomerPayment.referenceNumber,
      };

      console.log("exchange gain loss", totalExchangeGainLoss);
      console.log("customerPaymentBody", customerPaymentBody);

      throw new Error("Not implemented");
    });
  }

  async #paymentNumberValidityAndGeneration(
    given_number: string | null,
    auto_number_group_id: number,
    transaction: Transaction,
  ): Promise<string | never> {
    if (ValidityUtil.isEmpty(given_number)) {
      const autoNumberGenerationService = new AutoNumberGenerationService({
        client_info: this._clientInfo,
      });
      return await autoNumberGenerationService.generateNextNumber(
        {
          auto_number_group_id: auto_number_group_id,
          entity_type: "customer_payment",
        },
        {
          transaction,
        },
      );
    } else {
      // check if invoice number is already present
      const result = await this._customerPaymentDAO.isPaymentNumberExists({
        payment_number: given_number,
        organization_id: this._organizationId,
      });
      if (result) {
        throw new CodedError(
          CustomerPaymentServiceErrorMessages.CUSTOMER_PAYMENT_NUMBER_ALREADY_EXISTS,
        );
      }
      return given_number;
    }
  }
}

export { CustomerPaymentService };
