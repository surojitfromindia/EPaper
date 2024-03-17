import {
  allowedInvoiceFilters,
  defaultInvoiceFilter,
} from "./InvoiceFilter.service";

type CommonQueryParsedFields = {
  limit: number;
  skip: number;
  sort_column?: string;
  sort_order?: "A" | "D";
};

function parseCommonQueryFields(
  query: Record<string, string>,
): CommonQueryParsedFields {
  const basic: CommonQueryParsedFields = {
    limit: 200,
    skip: 1,
    sort_column: undefined,
    sort_order: undefined,
  };
  if ("per_page" in query) {
    basic.limit = Number(query.per_page);
  }
  if ("page" in query) {
    basic.skip = (Number(query.page) - 1) * basic.limit;
  }
  if ("sort_column" in query) {
    basic.sort_column = query.sort_column;
  }
  if ("sort_order" in query) {
    const sort_order = query.sort_order;
    if (sort_order === "A" || sort_order === "D") {
      basic.sort_order = sort_order;
    }
  }
  return basic;
}

function parseFilterQueryFields<T>(
  transaction_type: "invoice" | "item" | "contact",
  query: Record<string, string>,
): T {
  const filterByFromQuery = query["filter_by"];
  let filterBy: T;
  if (transaction_type === "invoice") {
    if (
      (allowedInvoiceFilters as any as string[]).includes(filterByFromQuery)
    ) {
      filterBy = filterByFromQuery as T;
    } else {
      filterBy = defaultInvoiceFilter as T;
    }
  }

  return filterBy;
}

export { parseCommonQueryFields, parseFilterQueryFields };
export type { CommonQueryParsedFields };
