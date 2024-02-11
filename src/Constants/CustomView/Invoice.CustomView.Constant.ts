const invoiceCustomViewSelectionColumns = [
  // date
  {
    default_filter_order: 1,
    is_mandatory: true,
    is_editable: true,
    is_default_select_column: true,
    is_sortable: true,
    value: "Date",
    key: "date",
    alias: ["invoice_date"],
  },
  // invoice number
  {
    default_filter_order: 2,
    is_mandatory: true,
    is_editable: true,
    is_default_select_column: true,
    is_sortable: true,
    value: "Invoice number",
    key: "invoice_number",
    alias: [],
  },

  // reference number
  {
    default_filter_order: 3,
    is_mandatory: false,
    is_editable: true,
    is_default_select_column: true,
    is_sortable: true,
    value: "Reference number",
    key: "reference_number",
    alias: [],
  },
  // order number
  {
    default_filter_order: 4,
    is_mandatory: false,
    is_editable: true,
    is_default_select_column: true,
    is_sortable: true,
    value: "Order number",
    key: "order_number",
    alias: [],
  },
  // contact
  {
    default_filter_order: 5,
    is_mandatory: true,
    is_editable: true,
    is_default_select_column: true,
    is_sortable: true,
    value: "Customer_name",
    key: "contact_name",
    alias: [],
  },
  // status
  {
    default_filter_order: 6,
    is_mandatory: true,
    is_editable: true,
    is_default_select_column: true,
    is_sortable: false,
    value: "Status",
    key: "status",
    alias: [],
  },
  // due date
  {
    default_filter_order: 7,
    is_mandatory: true,
    is_editable: true,
    is_default_select_column: true,
    is_sortable: true,
    value: "Due date",
    key: "due_date",
    alias: [],
  },
  // balance
  {
    default_filter_order: 8,
    is_mandatory: true,
    is_editable: true,
    is_default_select_column: true,
    is_sortable: true,
    value: "Balance",
    key: "balance",
    alias: ["balance", "bcy_balance"],
  },
  // total
  {
    default_filter_order: 9,
    is_mandatory: true,
    is_editable: true,
    is_default_select_column: true,
    is_sortable: true,
    value: "Total",
    key: "total",
    alias: ["total", "bcy_total"],
  },
  // "due days"
  {
    default_filter_order: 10,
    is_mandatory: true,
    is_editable: true,
    is_default_select_column: true,
    is_sortable: true,
    value: "Due days",
    key: "due_days",
    alias: [],
  },
  // sub total
  {
    default_filter_order: 11,
    is_mandatory: true,
    is_editable: true,
    is_default_select_column: true,
    is_sortable: true,
    value: "Sub total",
    key: "sub_total",
    alias: ["sub_total", "bcy_sub_total"],
  },
];

const invoiceCustomViewEntityView = [
  {
    empty_msg: "No invoices found",
    key: "all",
    title: "All Invoices",
    is_default: true,
    status: "active",
    value: "Status.All",
  },
  // draft
  {
    empty_msg: "No draft invoices found",
    key: "draft",
    title: "Draft",
    is_default: false,
    status: "active",
    value: "Status.Draft",
  },
  // overdue
  {
    empty_msg: "No overdue invoices found",
    key: "overdue",
    title: "Overdue",
    is_default: false,
    status: "active",
    value: "Status.Overdue",
  },
];

export { invoiceCustomViewSelectionColumns, invoiceCustomViewEntityView };
