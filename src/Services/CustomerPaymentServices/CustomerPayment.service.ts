import { ClientInfo } from "../../Middlewares/Authorization/Authorization.middleware";
import { CustomerPaymentDTO } from "../../DTO";
import InvoiceDao from "../../DAO/Invoices/Invoice.dao";
import sequelize from "../../Config/DataBase.Config";
import { MathLib } from "../../Utils/MathLib/mathLib";
import { ExchangeGainLoss } from "../helpers/ExchangeGainLoss";
import { Transaction } from "@sequelize/core";
import { ValidityUtil } from "../../Utils/ValidityUtil";
import CodedError from "../../Errors/APIErrors/CodedError";
import { CustomerPaymentServiceErrorMessages } from "../../Errors/APIErrors/ErrorMessages";
import { CustomerPaymentDAO, InvoicePaymentDAO } from "../../DAO";
import { CustomerPaymentCreatable } from "../../Models/CustomerPayment/CustomerPayment.model";
import { InvoicePaymentCreatable } from "../../Models/CustomerPayment/InvoicePayment.model";
import {
  AutoNumberGenerationService,
  ContactService,
  InvoiceService,
} from "../index";

class CustomerPaymentService {
  private readonly _organizationId: number;
  private readonly _clientInfo: ClientInfo;
  private readonly _customerPaymentDAO: CustomerPaymentDAO;
  private readonly _invoicePaymentDAO: InvoicePaymentDAO;

  constructor({ client_info }: { client_info: ClientInfo }) {
    this._organizationId = client_info.organizationId;
    this._clientInfo = client_info;
    this._customerPaymentDAO = new CustomerPaymentDAO({
      organization_id: this._organizationId,
    });
    this._invoicePaymentDAO = new InvoicePaymentDAO({
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
    const paymentDate = newCustomerPayment.issueDate;
    const paymentExchangeRate = newCustomerPayment.exchangeRate ?? 1;
    const applyToInvoices = newCustomerPayment.invoices;
    const applyToInvoicesIds = applyToInvoices.map(
      (invoice) => invoice.invoiceId,
    );
    const paymentCurrencyId = newCustomerPayment.currencyId;
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
        invoice_id: number;
        prev_applied_amount: number;
        prev_applied_amount_bcy: number;
        applicable_amount: number;
        applicable_amount_bcy: number;
        exchange_gain_loss: number;
        new_balance: number;
        new_balance_bcy: number;
        total: number;
      }[] = [];
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
          await InvoiceDao.getLatestAppliedAmountForUpdate(
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
          latestBalanceOfInvoice.bcy_total_applied_amount,
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
        invoiceIdAndBalanceRecord.push({
          invoice_id: invoice.invoiceId,
          prev_applied_amount: prevAppliedAmount,
          prev_applied_amount_bcy: preBcyAppliedAmount,
          applicable_amount: applicableAmount,
          applicable_amount_bcy: applicableAmount * paymentExchangeRate,
          exchange_gain_loss: bcyExchangeGainLoss,
          new_balance: newInvoiceBalance,
          new_balance_bcy: newInvoiceBalanceBcy,
          total: invoiceTotal,
        });
      }

      // unused credit of payment is the amount not used to pay the invoices
      const unusedCreditOfPayment =
        newCustomerPayment.amount - usedCreditOfPayment;
      const bcyUnusedCreditOfPayment =
        unusedCreditOfPayment * paymentExchangeRate;
      const bcyUsedCreditOfPayment = usedCreditOfPayment * paymentExchangeRate;
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
        bcyUnusedAmount: bcyUnusedCreditOfPayment,
        contactId: newCustomerPayment.contactId,
        currencyId: newCustomerPayment.currencyId,
        exchangeRate: paymentExchangeRate,
        issueDate: newCustomerPayment.issueDate,
        notes: newCustomerPayment.notes,
        paymentModeId: newCustomerPayment.paymentModeId,
        paymentNumber: paymentNumber,
        referenceNumber: newCustomerPayment.referenceNumber,
        createdBy: userId,
        organizationId: organizationId,
      };

      const createdPayment = await this._customerPaymentDAO.create(
        {
          customer_payment_details: customerPaymentBody,
        },
        {
          transaction: t1,
        },
      );

      // todo: ------ need to work on this
      const paymentType =
        invoiceIdAndBalanceRecord.length > 1
          ? "invoice_payment"
          : "customer_payment";

      // --- create the invoice payments lines
      const invoicePaymentsLine: InvoicePaymentCreatable[] = [];
      for (const inv of invoiceIdAndBalanceRecord) {
        const invPayment: InvoicePaymentCreatable = {
          appliedAmount: inv.applicable_amount,
          bcyAppliedAmount: inv.applicable_amount_bcy,
          applyDate: paymentDate,
          bcyExchangeGainLoss: inv.exchange_gain_loss,
          invoiceId: inv.invoice_id,
          organizationId: organizationId,
          paymentId: createdPayment.id,
          paymentType: paymentType,
        };
        invoicePaymentsLine.push(invPayment);
      }
      await this._invoicePaymentDAO.bulkCreate(
        {
          invoice_payments: invoicePaymentsLine,
        },
        {
          transaction: t1,
        },
      );
      // --- update balance of each invoice
      const invoiceService = new InvoiceService({
        client_info: this._clientInfo,
      });
      for await (const inv of invoiceIdAndBalanceRecord) {
        await invoiceService.updateInvoiceBalance(
          {
            invoice_id: inv.invoice_id,
            new_balance: inv.new_balance,
            new_balance_bcy: inv.new_balance_bcy,
            total: inv.total,
          },
          {
            transaction: t1,
          },
        );
      }
      // --- end of updating the balance of each invoice

      // --- update the contact balance
      const contactService = new ContactService({
        client_info: this._clientInfo,
      });
      await contactService.updateBalanceOnPaymentCreate(
        {
          contact_id: contactId,
          currency_id: paymentCurrencyId,
          unused_payment_amount: unusedCreditOfPayment,
          unused_payment_amount_bcy: bcyUnusedCreditOfPayment,
          used_payment_amount: usedCreditOfPayment,
          used_payment_amount_bcy: bcyUsedCreditOfPayment,
        },
        {
          transaction: t1,
        },
      );
      // --- end of updating the contact balance

      return true;
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
