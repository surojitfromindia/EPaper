const OTHER_COUNTRIES = [
  {
    name: "BOX",
    unit: "box",
  },
  {
    name: "Centimeter",
    unit: "cm",
  },
  {
    name: "Meter",
    unit: "m",
  },
  {
    name: "Feet",
    unit: "ft",
  },
  {
    name: "Gram",
    unit: "g",
  },
  {
    name: "Kilogram",
    unit: "kg",
  },
  {
    name: "Other",
    unit: "oth",
  },
  {
    name: "Pieces",
    unit: "pcs",
  },
  {
    name: "Dozen",
    unit: "dz",
  },
];

const INDIA_UNITS = [...OTHER_COUNTRIES];
const UNITS_DEFAULTS = {
  IN: INDIA_UNITS,
  _OTHER_: OTHER_COUNTRIES,
};

export { UNITS_DEFAULTS };
