import {
  CommonQueryParsedFields,
  parseCommonQueryFields,
  parseFilterQueryFields,
} from "./commonParse";

const allowedInvoiceFilters = [
  "Status.All",
  "Status.Draft",
  "Status.Overdue",
] as const;
const defaultInvoiceFilter = "Status.All";
type InvoiceFilterBy = (typeof allowedInvoiceFilters)[number];

interface InvoiceGetAllQueryParsedFields extends CommonQueryParsedFields {
  filter_by: InvoiceFilterBy;
}

class InvoiceFilterService {
  static parseQuery(
    query: Record<string, string>,
  ): InvoiceGetAllQueryParsedFields {
    const common_parsed = parseCommonQueryFields(query);
    const filter_by = parseFilterQueryFields<InvoiceFilterBy>("invoice", query);
    return {
      ...common_parsed,
      filter_by,
    };
  }
}

export { InvoiceFilterService, allowedInvoiceFilters, defaultInvoiceFilter };
export type { InvoiceFilterBy, InvoiceGetAllQueryParsedFields };
