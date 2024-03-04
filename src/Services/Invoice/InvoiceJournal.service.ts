import { InvoiceLineItem } from "../../Models";
import { InvoiceJournalCreatableRequired } from "../../Models/Invoice/InvoiceJournal.model";
import { InvoiceJournalDAO } from "../../DAO";
import { AccountsConfigRedisDAO } from "../../RedisDAO";

class InvoiceJournalCalculationFactory {
  private readonly organization_id: number;
  private readonly invoice_id: number;
  private readonly contact_id: number;
  private readonly line_items: InvoiceLineItem[];

  constructor({ organization_id, invoice_id, contact_id, line_items }) {
    this.organization_id = organization_id;
    this.invoice_id = invoice_id;
    this.contact_id = contact_id;
    this.line_items = line_items;
  }

  async create({ transaction }) {
    const accountConfigRedisDAO = new AccountsConfigRedisDAO();
    const accountConfigFromRedis = await accountConfigRedisDAO.get(
      this.organization_id,
    );
    const taxAccountId = accountConfigFromRedis.defaultTaxAccountId;
    const discountAccountId = accountConfigFromRedis.defaultDiscountAccountId;
    const salesAccountId = accountConfigFromRedis.defaultSalesAccountId;

    const newJournalLines = [];
    for (const line_item of this.line_items) {
      // debit
      const sales_account: InvoiceJournalCreatableRequired = {
        invoiceId: this.invoice_id,
        contactId: this.contact_id,
        organizationId: this.organization_id,
        lineItemId: line_item.id,
        accountId: salesAccountId,
        accountSlug: "sales_account",
        debit: line_item.itemTotalTaxIncluded,
        credit: 0,
        bcyDebit: line_item.bcyItemTotalTaxIncluded,
        bcyCredit: 0,
      };
      newJournalLines.push(sales_account);
      // if the discount is present / debit
      if (line_item.discountAmount > 0) {
        const item_discount_account: InvoiceJournalCreatableRequired = {
          invoiceId: this.invoice_id,
          contactId: this.contact_id,
          organizationId: this.organization_id,
          lineItemId: line_item.id,
          accountId: discountAccountId,
          accountSlug: "discount_account",
          debit: line_item.discountAmount,
          credit: 0,
          bcyDebit: line_item.bcyDiscountAmount,
          bcyCredit: 0,
        };
        newJournalLines.push(item_discount_account);
      }

      // credit
      const item_account: InvoiceJournalCreatableRequired = {
        invoiceId: this.invoice_id,
        contactId: this.contact_id,
        organizationId: this.organization_id,
        lineItemId: line_item.id,
        accountId: line_item.accountId,
        accountSlug: "item_account",
        debit: 0,
        credit: line_item.itemTotal + line_item.discountAmount,
        bcyDebit: 0,
        bcyCredit: line_item.bcyItemTotal + line_item.bcyDiscountAmount,
      };
      newJournalLines.push(item_account);

      // if tax is present / credit
      if (line_item.taxAmount > 0) {
        const item_tax_account: InvoiceJournalCreatableRequired = {
          invoiceId: this.invoice_id,
          contactId: this.contact_id,
          organizationId: this.organization_id,
          lineItemId: line_item.id,
          accountId: taxAccountId,
          accountSlug: "tax_account",
          debit: 0,
          credit: line_item.taxAmount,
          bcyDebit: 0,
          bcyCredit: line_item.bcyTaxAmount,
        };
        newJournalLines.push(item_tax_account);
      }
    }

    const journalDao = new InvoiceJournalDAO({
      organization_id: this.organization_id,
    });
    await journalDao.bulkCreate(
      { journal_line: newJournalLines },
      {
        transaction,
      },
    );
  }

  async update({ old_line_items }) {}
}

class InvoiceJournalService {
  private readonly organization_id: number;

  constructor({ organization_id }) {
    this.organization_id = organization_id;
  }

  getCreatableCalculation({ line_items, invoice_id, contact_id }) {
    return new InvoiceJournalCalculationFactory({
      organization_id: this.organization_id,
      invoice_id,
      contact_id,
      line_items,
    });
  }
}

export { InvoiceJournalService };
