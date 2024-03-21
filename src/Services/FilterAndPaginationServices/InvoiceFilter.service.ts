import {
  CommonQueryParsedFields,
  parseCommonQueryFields,
  parseFilterQueryFields,
  parseSortColumnQueryFields,
} from "./commonParse";

const allowedInvoiceFilters = [
  "Status.All",
  "Status.Draft",
  "Status.Overdue",
] as const;
const defaultInvoiceFilter = "Status.All";
type InvoiceFilterBy = (typeof allowedInvoiceFilters)[number];

const allowedInvoiceSortColumns = [
  "invoice_number",
  "issue_date",
  "due_date",
  "total_amount",
] as const;
const defaultInvoiceSortColumn = "issue_date";
type InvoiceSortColumn = (typeof allowedInvoiceSortColumns)[number];

interface InvoiceGetAllQueryParsedFields extends CommonQueryParsedFields {
  filter_by: InvoiceFilterBy;
  sort_columns: InvoiceSortColumn[];
  sort_orders: ("A" | "D")[];
}

class InvoiceFilterService {
  static parseQuery(
    query: Record<string, string>,
  ): InvoiceGetAllQueryParsedFields {
    const common_parsed = parseCommonQueryFields(query);
    const filter_by = parseFilterQueryFields<InvoiceFilterBy>("invoice", query);
    const { sort_columns, sort_orders } =
      parseSortColumnQueryFields<InvoiceSortColumn>("invoice", query);
    return {
      ...common_parsed,
      filter_by,
      sort_columns,
      sort_orders,
    };
  }
}

export {
  InvoiceFilterService,
  allowedInvoiceFilters,
  defaultInvoiceFilter,
  defaultInvoiceSortColumn,
  allowedInvoiceSortColumns,
};
export type { InvoiceFilterBy, InvoiceGetAllQueryParsedFields };
