/**
 * Default value for item preference
 * @type ItemPrefernceType
 */
const ITEM_PREFERENCE = {
  quantityPrecision: 2,
  isItemNameDuplicationEnabled: true,
};

const GENERAL_PREFERENCE = {
  salesTaxType: "entity_level",
  taxRoundingType: "item_level",
  discountType: "no_discount",
  isDiscountBeforeTax: false,
};

const PREFERENCE_DEFAULTS = {
  ITEM_PREFERENCE,
  GENERAL_PREFERENCE,
};
export { PREFERENCE_DEFAULTS };
