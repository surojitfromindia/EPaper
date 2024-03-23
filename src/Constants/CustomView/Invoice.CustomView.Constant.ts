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
    align: "left",
  },
  // invoice number
  {
    default_filter_order: 2,
    is_mandatory: true,
    is_editable: true,
    is_default_select_column: true,
    is_sortable: true,
    value: "InvoiceServices#",
    key: "invoice_number",
    alias: [],
    align: "left",
  },
  // due date
  {
    default_filter_order: 3,
    is_mandatory: true,
    is_editable: true,
    is_default_select_column: true,
    is_sortable: true,
    value: "Due date",
    key: "due_date",
    alias: [],
    align: "left",
  },
  // status
  {
    default_filter_order: 4,
    is_mandatory: true,
    is_editable: true,
    is_default_select_column: true,
    is_sortable: false,
    value: "Status",
    key: "status",
    alias: [],
    align: "left",
  },
  // contact
  {
    default_filter_order: 5,
    is_mandatory: true,
    is_editable: true,
    is_default_select_column: true,
    is_sortable: true,
    value: "Customer name",
    key: "contact_name",
    alias: [],
    align: "left",
  },
  // total
  {
    default_filter_order: 6,
    is_mandatory: true,
    is_editable: true,
    is_default_select_column: true,
    is_sortable: true,
    value: "Total",
    key: "total",
    alias: ["total"],
    align: "right",
  },
  // balance
  {
    default_filter_order: 7,
    is_mandatory: true,
    is_editable: true,
    is_default_select_column: true,
    is_sortable: true,
    value: "Balance due",
    key: "balance",
    alias: ["balance"],
    align: "right",
  },

  // non-selected column
  // reference number
  {
    default_filter_order: -1,
    is_mandatory: false,
    is_editable: true,
    is_default_select_column: true,
    is_sortable: true,
    value: "Reference#",
    key: "reference_number",
    alias: [],
    align: "left",
  },
  // order number
  {
    default_filter_order: -1,
    is_mandatory: false,
    is_editable: true,
    is_default_select_column: true,
    is_sortable: true,
    value: "Order#",
    key: "order_number",
    alias: [],
    align: "left",
  },

  // "due days"
  {
    default_filter_order: -1,
    is_mandatory: true,
    is_editable: true,
    is_default_select_column: true,
    is_sortable: true,
    value: "Due days",
    key: "due_days",
    alias: [],
    align: "right",
  },
  // sub total
  {
    default_filter_order: -1,
    is_mandatory: true,
    is_editable: true,
    is_default_select_column: true,
    is_sortable: true,
    value: "Sub total",
    key: "sub_total",
    alias: ["sub_total"],
    align: "right",
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
