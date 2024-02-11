import {
  invoiceCustomViewEntityView,
  invoiceCustomViewSelectionColumns,
} from "./Invoice.CustomView.Constant";

const CUSTOM_VIEW = {
  entity_select_columns: {
    invoice: invoiceCustomViewSelectionColumns,
  },
  entity_views: {
    invoice: {
      default_filters: invoiceCustomViewEntityView,
    },
  },
};

export { CUSTOM_VIEW };
