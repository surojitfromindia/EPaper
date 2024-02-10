import { CustomViewEntitySelectColumnType } from "../../MongodbModels/CustomView.model";

const invoiceCustomViewSelectionColumns: CustomViewEntitySelectColumnType[] = [
  {
    default_filter_order: 1,
    is_mandatory: true,
    is_editable: true,
    is_default_select_column: true,
    is_sortable: true,
    value: "Issue date",
    key: "issue_date",
  },
  {
    default_filter_order: 2,
    is_mandatory: true,
    is_editable: true,
    is_default_select_column: true,
    is_sortable: true,
    value: "Invoice number",
    key: "invoice_number",
  },
];
