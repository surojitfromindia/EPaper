const ITEM_PREFERENCE = {
  quantityPrecision: 2,
  isItemNameDuplicationEnabled: true,
};

const GENERAL_PREFERENCE = {
  salesTaxType: "entity_level",
  taxRoundingType: "item_level",
  discountType: "no_discount",
  isDiscountBeforeTax: true,
};

const FEATURES_PREFERENCE = {
  isMultipleAutoNumberSeriesEnable: false,
  isMultipleBranchesEnable: false,
  isMultipleBranchesActive: false,
};

const INVOICE_PREFERENCE = {
  isAutoNumberEnabled: true,
};
const CUSTOMER_PAYMENT_PREFERENCE = {
  isAutoNumberEnabled: true,
};

const PREFERENCE_DEFAULTS = {
  ITEM_PREFERENCE,
  GENERAL_PREFERENCE,
  FEATURES_PREFERENCE,
  INVOICE_PREFERENCE,
  CUSTOMER_PAYMENT_PREFERENCE,
};
export { PREFERENCE_DEFAULTS };
