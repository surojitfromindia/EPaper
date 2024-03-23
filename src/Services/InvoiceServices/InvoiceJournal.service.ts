import { InvoiceJournalCreatableRequired } from "../../Models/Invoice/InvoiceJournal.model";
import { InvoiceJournalDAO } from "../../DAO";
import { AccountsConfigRedisDAO } from "../../RedisDAO";
import { ValidityUtil } from "../../Utils/ValidityUtil";
import ld from "lodash";
import { AccountConfigRedisType } from "../../RedisModels/AccountConfig.Redis.Model";
import { InvoiceLineItemCreatable } from "../../Models/Invoice/InvoiceLineItems.model";

class InvoiceJournalService {
  private readonly organization_id: number;

  constructor({ organization_id }) {
    this.organization_id = organization_id;
  }

  async getCreatableCalculation({ invoice_id, contact_id }) {
    return InvoiceJournalCalculation.init({
      organization_id: this.organization_id,
      invoice_id,
      contact_id,
    });
  }
}

export { InvoiceJournalService };

class InvoiceJournalCalculation {
  private readonly organization_id: number;
  private readonly invoice_id: number;
  private readonly contact_id: number;
  private readonly journalDao: InvoiceJournalDAO;
  private readonly accountConfigFromRedis: AccountConfigRedisType;

  private constructor({
    organization_id,
    invoice_id,
    contact_id,
    accountConfigFromRedis,
  }) {
    this.organization_id = organization_id;
    this.invoice_id = invoice_id;
    this.contact_id = contact_id;
    this.accountConfigFromRedis = accountConfigFromRedis;
    this.journalDao = new InvoiceJournalDAO({ organization_id });
  }

  static async init({ organization_id, invoice_id, contact_id }) {
    const accountConfigRedisDAO = new AccountsConfigRedisDAO();
    const accountConfigFromRedis =
      await accountConfigRedisDAO.get(organization_id);
    return new InvoiceJournalCalculation({
      organization_id,
      invoice_id,
      contact_id,
      accountConfigFromRedis,
    });
  }

  async create(
    {
      line_items,
    }: {
      line_items: InvoiceLineItemCreatable[];
    },
    { transaction },
  ): Promise<boolean> {
    const accountConfigFromRedis = this.accountConfigFromRedis;
    const taxAccountId = accountConfigFromRedis.defaultTaxAccountId;
    const discountAccountId = accountConfigFromRedis.defaultDiscountAccountId;
    const salesAccountId = accountConfigFromRedis.defaultSalesAccountId;

    const newJournalLines = [];
    for (const line_item of line_items) {
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
    return true;
  }

  async update(
    {
      invoice_id,
      line_items_to_be_created,
      line_items_to_be_updated,
      line_items_id_to_delete,
    },
    { transaction },
  ): Promise<boolean> {
    const journalDao = new InvoiceJournalDAO({
      organization_id: this.organization_id,
    });
    const existingJournalLines = await journalDao.getByInvoiceId({
      invoice_id,
    });
    const existingJournalLinesIndexed = ld.groupBy(
      existingJournalLines,
      "lineItemId",
    );

    /*
      update.
      note: during update we check if the updatable line has some missing amount like 0 tax
      or 0 discount, then we need to remove the journal line.
     */
    const updatableJournalLines: InvoiceJournalCreatableRequired[] = [];
    const deletableJournalLines: {
      line_item_id: number;
      account_slugs: ("discount_account" | "tax_account")[];
    }[] = [];
    const salesAccountId = this.accountConfigFromRedis.defaultSalesAccountId;
    const taxAccountId = this.accountConfigFromRedis.defaultTaxAccountId;
    const discountAccountId =
      this.accountConfigFromRedis.defaultDiscountAccountId;

    for (const line_item of line_items_to_be_updated) {
      const removeAccountSlugs: ("discount_account" | "tax_account")[] = [];

      const previousJournalLines = existingJournalLinesIndexed[line_item.id];

      // find existing journal lines by account slug
      const discountJournalLine = previousJournalLines.find(
        (journalLine) => journalLine.accountSlug === "discount_account",
      );
      const taxJournalLine = previousJournalLines.find(
        (journalLine) => journalLine.accountSlug === "tax_account",
      );
      const itemJournalLine = previousJournalLines.find(
        (journalLine) => journalLine.accountSlug === "item_account",
      );
      const salesJournalLine = previousJournalLines.find(
        (journalLine) => journalLine.accountSlug === "sales_account",
      );

      if (line_item.discountAmount === 0) {
        if (discountJournalLine) {
          removeAccountSlugs.push("discount_account");
        }
      } else {
        const item_discount_account: InvoiceJournalCreatableRequired = {
          id: discountJournalLine?.id,
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
        updatableJournalLines.push(item_discount_account);
      }

      // if tax is missing, then remove the tax journal line. or update.
      if (line_item.taxAmount === 0) {
        if (taxJournalLine) {
          removeAccountSlugs.push("tax_account");
        }
      } else {
        const item_tax_account: InvoiceJournalCreatableRequired = {
          id: taxJournalLine?.id,
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
        updatableJournalLines.push(item_tax_account);
      }

      // update the "item_account" and "sales_account"
      const sales_account: InvoiceJournalCreatableRequired = {
        id: salesJournalLine?.id,
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
      const item_account: InvoiceJournalCreatableRequired = {
        id: itemJournalLine?.id,
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
      updatableJournalLines.push(sales_account);
      updatableJournalLines.push(item_account);

      if (ValidityUtil.isNotEmpty(removeAccountSlugs)) {
        deletableJournalLines.push({
          line_item_id: line_item.id,
          account_slugs: removeAccountSlugs,
        });
      }
    }

    // update the journal lines.
    if (ValidityUtil.isNotEmpty(updatableJournalLines)) {
      await journalDao.bulkUpdateByInvoice(
        {
          journal_lines: updatableJournalLines,
        },
        { transaction },
      );
    }
    // remove unnecessary journal lines.
    if (ValidityUtil.isNotEmpty(deletableJournalLines)) {
      await journalDao.bulkDeleteByLineItemIdAndSlugs(
        {
          id_and_slugs: deletableJournalLines,
        },
        {
          transaction,
        },
      );
    }
    // remove the journal lines that are not in the invoice.
    if (ValidityUtil.isNotEmpty(line_items_id_to_delete)) {
      await journalDao.bulkDeleteByLineItemIds(
        { line_item_ids: line_items_id_to_delete },
        { transaction },
      );
    }
    // create the journal lines are newly added to the invoice.
    if (ValidityUtil.isNotEmpty(line_items_to_be_created)) {
      await this.create(
        { line_items: line_items_to_be_created },
        { transaction },
      );
    }

    return true;
  }

  /**
   * @description Delete all the journal lines by invoice id.
   */
  async delete({ invoice_id }, { transaction }): Promise<boolean> {
    await this.journalDao.bulkDeleteByInvoiceId(
      { invoice_id },
      { transaction },
    );
    return true;
  }
}
