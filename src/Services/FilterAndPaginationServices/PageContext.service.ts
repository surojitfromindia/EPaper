import { InvoiceFilterBy } from "./InvoiceFilter.service";

type PageContextFor = "invoice" | "item" | "contact";
type SortOrder = "A" | "D";

interface PageContextServiceProps {
  limit: number;
  skip: number;
  current_count: number;
}

interface PageContext {
  per_page: number;
  page: number;
  report_name: string;
}

interface PageContextSingleFilter {
  filter_by: string;
}

interface PageContextSort {
  sort_column: string;
  sort_order: SortOrder;
}

interface InvoicePageContext
  extends PageContext,
    PageContextSingleFilter,
    PageContextSort {
  report_name: "Invoices";
}

interface InvoicePageContextProps {
  sort_column: string;
  sort_order: SortOrder;
  filter_by: InvoiceFilterBy;
}

interface ItemPageContext
  extends PageContext,
    PageContextSingleFilter,
    PageContextSort {
  report_name: "Items";
}

interface ItemPageContextProps {
  sort_column: string;
  sort_order: SortOrder;
}

class PageContextService {
  readonly per_page: number;
  readonly page: number;
  readonly current_count: number = 0;

  private record_count: number = 0;

  private readonly basic_page_context: {
    per_page: number;
    page: number;
    has_more_page: boolean;
  } = {
    per_page: 0,
    page: 0,
    has_more_page: false,
  };

  constructor({ limit, skip, current_count }: PageContextServiceProps) {
    this.per_page = limit;
    this.page = parseInt((skip / limit + 1).toString());
    this.current_count = current_count;
    this.basic_page_context = {
      per_page: this.per_page,
      page: this.page,
      has_more_page: false,
    };
  }

  recordCount(count: number) {
    this.record_count = count;
    // update has_more_page
    this.basic_page_context.has_more_page =
      this.record_count > this.per_page * this.page;
    return this;
  }

  get<T extends PageContextFor>(context_for: T) {
    // In JavaScript and TypeScript, the value of this inside a method depends on how the method is called.
    // If a method is called as a property of an object, this will be set to the object.
    // However, if a method is called as a standalone function, this will be undefined.
    // In your case, the #forInvoice method is a private method, and it seems like you're trying to call it as a standalone function in the get method.
    // This is why this is undefined inside #forInvoice.
    if (context_for === "invoice") {
      return this.#forInvoice.bind(this);
    }
    if (context_for === "item") {
      return this.#forItem.bind(this);
    }
  }

  #forInvoice({
    sort_column = "",
    sort_order = "D",
    filter_by = "Status.All",
  }: InvoicePageContextProps): InvoicePageContext {
    return {
      ...this.basic_page_context,
      report_name: "Invoices",
      filter_by: filter_by,
      sort_column: sort_column,
      sort_order: sort_order,
    };
  }

  #forItem({
    sort_column = "",
    sort_order = "D",
  }: ItemPageContextProps): ItemPageContext {
    return {
      ...this.basic_page_context,
      report_name: "Items",
      filter_by: "",
      sort_column: sort_column,
      sort_order: sort_order,
    };
  }
}

export { PageContextService };
