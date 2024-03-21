import {
  allowedInvoiceFilters,
  allowedInvoiceSortColumns,
  defaultInvoiceFilter,
  defaultInvoiceSortColumn,
} from "./InvoiceFilter.service";
import { DEFAULT_PAGE_SIZE } from "../../Constants/Pagination.Constants";
import { ArrayUtil } from "../../Utils/ArrayUtil";
import { ValidityUtil } from "../../Utils/ValidityUtil";

type CommonQueryParsedFields = {
  limit: number;
  skip: number;
  sort_columns?: string[];
  sort_orders?: ("A" | "D")[];
};

function parseCommonQueryFields(
  query: Record<string, string>,
): CommonQueryParsedFields {
  const basic: CommonQueryParsedFields = {
    limit: DEFAULT_PAGE_SIZE,
    skip: 0,
    sort_columns: [],
    sort_orders: [],
  };
  if ("per_page" in query) {
    basic.limit = parseInt(query.per_page);
  }
  if ("page" in query) {
    let page = parseInt(query.page) <= 0 ? 1 : parseInt(query.page);
    basic.skip = (page - 1) * basic.limit;
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

function parseSortColumnQueryFields<T>(
  transaction_type: "invoice" | "item" | "contact",
  query: Record<string, string>,
): { sort_columns: T[]; sort_orders: ("A" | "D")[] } {
  let sortColumnsFromQuery = query["sort_columns"] ?? "";
  let sortOrdersFromQuery = query["sort_orders"] ?? "";

  const sortColumnsArray = sortColumnsFromQuery.split(",");
  const sortOrdersArray = sortOrdersFromQuery.split(",");

  let sort_columns: T[] = [];
  let sort_orders: ("A" | "D")[] = [];

  const pairedArray = ArrayUtil.pairArrayElements(
    sortColumnsArray,
    sortOrdersArray,
  );

  if (transaction_type === "invoice") {
    // for each pair of sort_column and sort_order
    for (const [sort_column, sort_order] of pairedArray) {
      if (
        (allowedInvoiceSortColumns as any as string[]).includes(sort_column)
      ) {
        sort_columns.push(sort_column as T);
        sort_orders.push(sort_order as "A" | "D");
      }
    }
    if (ValidityUtil.isEmpty(sort_columns)) {
      sort_columns.push(defaultInvoiceSortColumn as T);
      sort_orders.push("A");
    }
  }

  return {
    sort_columns,
    sort_orders,
  };
}

export {
  parseCommonQueryFields,
  parseFilterQueryFields,
  parseSortColumnQueryFields,
};
export type { CommonQueryParsedFields };
