import {
  Includeable,
  Lock,
  Op,
  OrderItem,
  QueryTypes,
  sql,
  Transaction,
} from "@sequelize/core";
import {
  AccountsOfOrganization,
  Contacts,
  CurrencyModel,
  Invoice,
  InvoiceLineItem,
  InvoicePaymentModel,
  InvoicePaymentTerm,
  TaxRates,
} from "../../Models";
import {
  InvoiceColumnNamesRaw,
  InvoiceCreatable,
  InvoiceIdType,
  InvoiceTableName,
} from "../../Models/Invoice/Invoices.model";
import { AllowArray } from "@sequelize/core/_non-semver-use-at-your-own-risk_/utils/types.d.ts";
import { OrganizationBasicIdType } from "../../Models/Organization/Organization.model";
import { ValidityUtil } from "../../Utils/ValidityUtil";
import sequelize from "../../Config/DataBase.Config";
import {
  InvoicePaymentsColumnNamesRaw,
  InvoicePaymentsTableName,
} from "../../Models/CustomerPayment/InvoicePayment.model";

const INVOICE_CONTACT_DEFAULT_ATTRIBUTES = ["contactName"];
const INVOICE_LINE_ITEM_DEFAULT_ATTRIBUTES = [
  "id",
  "name",
  "description",
  "unit",
  "itemId",
  "productType",
  "accountId",
  "taxId",
  "unitId",
  "rate",
  "quantity",
  "discountPercentage",
  "discountAmount",
  "taxPercentage",
  "taxAmount",
  "itemTotal",
  "itemTotalTaxIncluded",
];
const INVOICE_CURRENCY_DEFAULT_ATTRIBUTES = [
  "id",
  "currencySymbol",
  "currencyCode",
];

type GetByIdFullOptions = {
  invoice_id: InvoiceIdType;
  organization_id: number;
  include_line_items?: boolean;
};

type GetByIdOptions = Pick<
  GetByIdFullOptions,
  "invoice_id" | "organization_id"
>;

type InvoiceUpdateProps = {
  invoice_id: InvoiceIdType;
  organization_id: OrganizationBasicIdType;
  invoice_details: InvoiceCreatable;
};

type InvoiceCreateProps = {
  invoice_details: InvoiceCreatable;
};

type InvoiceListProps = {
  organization_id: OrganizationBasicIdType;
  skip: number;
};

class InvoiceDao {
  async create(
    { invoice_details }: InvoiceCreateProps,
    {
      transaction,
    }: {
      transaction: Transaction;
    },
  ) {
    return await Invoice.create(
      { ...invoice_details, syncStatus: "notSynced" },
      {
        transaction,
      },
    );
  }

  async getAllDAO({ organization_id, skip }: InvoiceListProps) {
    return new InvoiceGetAllDAO({ organization_id, skip });
  }

  async update(
    { invoice_id, organization_id, invoice_details }: InvoiceUpdateProps,
    {
      transaction,
    }: {
      transaction: Transaction;
    },
  ) {
    await Invoice.update(
      { ...invoice_details, syncStatus: "notSynced" },
      {
        where: {
          id: invoice_id,
          organizationId: organization_id,
          status: "active",
        },
        transaction,
      },
    );
    return this.getByIdWithLineItems({ invoice_id, organization_id });
  }

  async getByIdWithLineItems({ invoice_id, organization_id }: GetByIdOptions) {
    return this.getInvoiceByIdRaw({
      invoice_id,
      organization_id,
      include_line_items: true,
    });
  }

  async isInvoiceNumberExists({ organization_id, invoice_number }) {
    const invoice = await Invoice.findOne({
      where: {
        organizationId: organization_id,
        invoiceNumber: invoice_number,
      },
      attributes: ["id", "invoiceNumber"],
    });
    return ValidityUtil.isNotEmpty(invoice);
  }

  async getLatestAppliedAmountForUpdate(
    { invoice_id, organization_id },
    { transaction },
  ) {
    // todo: need a work around here.
    const lock_rows_query = await InvoicePaymentModel.findAll({
      where: {
        invoiceId: invoice_id,
        organizationId: organization_id,
        status: "active",
      },
      attributes: ["id"],
      lock: Lock.UPDATE,
      transaction,
    });
    const query_string = sql`
      select ${idn(
        InvoicePaymentsColumnNamesRaw.invoiceId,
      )}         as invoice_id,
             sum(${idn(
               InvoicePaymentsColumnNamesRaw.appliedAmount,
             )}) as total_applied_amount,
             sum(${idn(
               InvoicePaymentsColumnNamesRaw.bcyAppliedAmount,
             )}) as bcy_total_applied_amount
      from ${idn(InvoicePaymentsTableName)}
      where ${idn(InvoicePaymentsColumnNamesRaw.invoiceId)} = ${invoice_id}
        and ${idn(
          InvoicePaymentsColumnNamesRaw.organizationId,
        )} = ${organization_id}
        and ${idn(InvoicePaymentsColumnNamesRaw.status)} = 'active'
      group by ${idn(InvoicePaymentsColumnNamesRaw.invoiceId)}
    `;
    const raw_data = (await sequelize.query(query_string, {
      raw: true,
      transaction,
      type: QueryTypes.SELECT,
    })) as any[];
    if (ValidityUtil.isEmpty(raw_data)) {
      return {
        total_applied_amount: 0,
        bcy_total_applied_amount: 0,
      };
    }
    return {
      total_applied_amount: Number(raw_data[0].total_applied_amount) as number,
      bcy_total_applied_amount: Number(
        raw_data[0].bcy_total_applied_amount,
      ) as number,
    };
  }

  async updateBalance(
    { invoice_id, organization_id, balance, bcy_balance, payment_status },
    { transaction },
  ) {
    return await Invoice.update(
      {
        balance,
        bcyBalance: bcy_balance,
        paymentStatus: payment_status,
      },
      {
        where: {
          organizationId: organization_id,
          id: invoice_id,
          status: "active",
        },
        transaction,
      },
    );
  }

  async getInvoiceByIdRaw({
    invoice_id,
    organization_id,
    include_line_items,
  }: GetByIdFullOptions) {
    const includeAssociations: AllowArray<Includeable> = [
      {
        model: Contacts,
        as: "Contact",
        attributes: INVOICE_CONTACT_DEFAULT_ATTRIBUTES,
      },
      {
        model: InvoicePaymentTerm,
        as: "InvoicePaymentTerm",
      },
      {
        model: CurrencyModel,
        as: "Currency",
        attributes: INVOICE_CURRENCY_DEFAULT_ATTRIBUTES,
      },
    ];
    let order: OrderItem[] = [];
    if (include_line_items) {
      order.push([
        {
          model: InvoiceLineItem,
          as: "LineItems",
        },
        "id",
      ]);

      includeAssociations.push({
        model: InvoiceLineItem,
        as: "LineItems",
        attributes: INVOICE_LINE_ITEM_DEFAULT_ATTRIBUTES,
        include: [
          {
            model: AccountsOfOrganization,
            as: "Account",
            attributes: ["name", "code"],
          },
          {
            model: TaxRates,
            as: "Tax",
            attributes: ["name", "rate"],
          },
        ],
      });
    }

    return await Invoice.findOne({
      where: {
        organizationId: organization_id,
        id: invoice_id,
        status: "active",
      },
      include: includeAssociations,
      order,
    });
  }
}

export default Object.freeze(new InvoiceDao());

class InvoiceGetAllDAO {
  private readonly _organizationId: OrganizationBasicIdType;

  private readonly skip: number;
  private readonly query: Record<string, any> = {
    status: "active",
  };
  private order: [string, "DESC" | "ASC"][] = [
    ["issue_date", "DESC"],
    ["id", "DESC"],
  ];
  private limit: number;

  private isDataFetched: boolean = false;
  private _filterInvoicesAndExtra: Invoice[] = [];

  constructor({ organization_id, skip }) {
    this._organizationId = organization_id;
    this.skip = skip;
    this.query = {
      organizationId: organization_id,
    };
  }

  applyLimit(limit: number) {
    this.limit = limit;
    return this;
  }

  applyFilterBy(filter_by: string) {
    switch (filter_by) {
      case "Status.All": {
        break;
      }
      case "Status.Draft": {
        this.query.transactionStatus = "draft";
        break;
      }
      case "Status.Sent": {
        this.query.transactionStatus = "sent";
        break;
      }
      case "Status.Overdue":
        {
          this.query.transactionStatus = "sent";
          this.query.paymentStatus = {
            [Op.in]: ["not_paid", "partial_paid"],
          };
          // and due date is less than today
          this.query.dueDate = {
            [Op.lt]: new Date(),
          };
        }
        break;
      default: {
        this.query.status = "active";
      }
    }
    return this;
  }

  applySortBy(sort_column: string, sort_order: "DESC" | "ASC") {
    this.order = [
      [sort_column, sort_order],
      ["id", "DESC"],
    ];
    return this;
  }

  ofContacts(contactIds: number[]) {
    this.query.contactId = {
      [Op.in]: contactIds,
    };
    return this;
  }

  ofInvoiceIds(invoiceIds: number[]) {
    this.query.id = {
      [Op.in]: invoiceIds,
    };
    return this;
  }

  async hasMore() {
    if (this.isDataFetched) {
      return this._filterInvoicesAndExtra.length > this.limit;
    }
    // if data is not fetched yet
    this.getAll().then(this.hasMore);
  }

  async getAll() {
    let filterInvoicesAndExtra: Invoice[] = [];
    if (this.isDataFetched) {
      filterInvoicesAndExtra = [...this._filterInvoicesAndExtra];
    } else {
      const findAllQ: any = {
        where: this.query,
        include: [
          {
            model: Contacts,
            as: "Contact",
            attributes: INVOICE_CONTACT_DEFAULT_ATTRIBUTES,
          },
          {
            model: CurrencyModel,
            as: "Currency",
            attributes: INVOICE_CURRENCY_DEFAULT_ATTRIBUTES,
          },
        ],
        order: this.order,
        offset: this.skip,
      };
      if (ValidityUtil.isNotEmpty(this.limit)) {
        findAllQ.limit = this.limit + 1;
      }
      filterInvoicesAndExtra = await Invoice.findAll(findAllQ);

      this.isDataFetched = true;
      this._filterInvoicesAndExtra = [...filterInvoicesAndExtra];
    }

    // remove the last element from the array and return the rest
    // if the length of the array is greater than the limit
    if (filterInvoicesAndExtra.length > this.limit) {
      filterInvoicesAndExtra.pop();
    }
    return filterInvoicesAndExtra;
  }
}

class InvoiceDashboardDAO {
  private readonly _organizationId: number;

  constructor({ organization_id }: { organization_id: number }) {
    this._organizationId = organization_id;
  }

  async getDueOverview() {
    // need to get due today
    // due within 30 days
    // total overdue
    const query_string = sql`
      SELECT COALESCE(SUM(CASE WHEN ${idn(
        InvoiceColumnNamesRaw.dueDate,
      )} = CURRENT_DATE THEN ${idn(
        InvoiceColumnNamesRaw.bcyBalance,
      )} ELSE 0 END), 0)        AS due_today,
             COALESCE(SUM(CASE
                            WHEN ${idn(
                              InvoiceColumnNamesRaw.dueDate,
                            )} >= CURRENT_DATE AND ${idn(
                              InvoiceColumnNamesRaw.dueDate,
                            )} <= CURRENT_DATE + INTERVAL '30 days'
                              THEN ${idn(InvoiceColumnNamesRaw.bcyBalance)}
                            ELSE 0 END),
                      0)        AS due_within_30_days,
             COALESCE(SUM(CASE WHEN ${idn(
               InvoiceColumnNamesRaw.dueDate,
             )} < CURRENT_DATE THEN ${idn(
               InvoiceColumnNamesRaw.bcyBalance,
             )} ELSE 0 END), 0) AS total_overdue,

             SUM(${idn(
               InvoiceColumnNamesRaw.bcyBalance,
             )})                AS total_outstanding
      FROM ${idn(InvoiceTableName)}
      where ${idn(InvoiceColumnNamesRaw.organizationId)} = ${
        this._organizationId
      }
        AND ${idn(InvoiceColumnNamesRaw.status)} = 'active'
        AND ${idn(InvoiceColumnNamesRaw.transactionStatus)} = 'sent'
    `;
    const raw_data = (await sequelize.query(query_string, {
      type: QueryTypes.SELECT,
    })) as any[];
    return {
      due_today: raw_data[0].due_today as string,
      due_within_30_days: raw_data[0].due_within_30_days as string,
      total_overdue: raw_data[0].total_overdue as string,
      total_outstanding: raw_data[0].total_outstanding as string,
    };
  }
}

export { InvoiceGetAllDAO, InvoiceDashboardDAO };

const idn = (v: string) => sql.identifier(v);
