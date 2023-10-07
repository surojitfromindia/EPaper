const INDIA_TAXES = [
  {
    name: "GST28",
    rate: 28,
    description: "GST Of 28%",
    countryCode: "IN",
    taxType: "direct_tax",
    isEditable: false,
    isDeletable: false,
  },
  {
    name: "GST18",
    rate: 18,
    description: "GST Of 18%",
    countryCode: "IN",
    taxType: "direct_tax",
    isEditable: false,
    isDeletable: false,
  },
  {
    name: "GST12",
    rate: 12,
    description: "GST Of 12%",
    countryCode: "IN",
    taxType: "direct_tax",
    isEditable: false,
    isDeletable: false,
  },
  {
    name: "GST05",
    rate: 5,
    description: "GST Of 5%",
    countryCode: "IN",
    taxType: "direct_tax",
    isEditable: false,
    isDeletable: false,
  },
];
const OTHER_COUNTRIES = [];

const TAX_DEFAULTS = {
  IN: INDIA_TAXES,
  _OTHER_: OTHER_COUNTRIES,
};

export { TAX_DEFAULTS };
