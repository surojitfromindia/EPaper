// @ts-ignore
const { lineItemCalculation } = require("../../js_play/TaxCalculation");
describe("TaxCalculation", () => {
  const cases = [
    {
      lineItem: {
        quantity: 1,
        price: 100,
        tax_percent: 15,
        discount: 10,
        discount_type: "percentage",
      },
      is_tax_inclusive: true,
      expected: {
        discount_flat: 8.7,
        taxable_amount: 78.26,
        tax_flat: 11.74,
        total_amount: 90,
      },
    },
    {
      lineItem: {
        quantity: 657.896,
        price: 8.745,
        tax_percent: 15,
        discount: 10,
        discount_type: "percentage",
      },
      is_tax_inclusive: true,
      expected: {
        discount_flat: 500.29,
        taxable_amount: 4502.58,
        tax_flat: 675.39,
        total_amount: 5177.97,
      },
    },
    {
      lineItem: {
        quantity: 657.896,
        price: 8.745,
        tax_percent: 15,
        discount: 10,
        discount_type: "flat",
      },
      is_tax_inclusive: true,
      expected: {
        discount_flat: 10,
        taxable_amount: 4992.87,
        tax_flat: 748.93,
        total_amount: 5741.8,
      },
    },
    {
      lineItem: {
        quantity: 5,
        price: 300,
        tax_percent: 15,
        discount: 15,
        discount_type: "percentage",
      },
      is_tax_inclusive: true,
      expected: {
        discount_flat: 195.65,
        taxable_amount: 1108.7,
        tax_flat: 166.3,
        total_amount: 1275.0,
      },
    },

    // exclusive
    {
      lineItem: {
        quantity: 5666,
        price: 1.334,
        tax_percent: 15,
        discount: 10,
        discount_type: "percentage",
      },
      is_tax_inclusive: false,
      expected: {
        discount_flat: 755.84,
        taxable_amount: 6802.6,
        tax_flat: 1020.39,
        total_amount: 7822.99,
      },
    },
  ];
  test.each(cases)(
    "lineItemCalculation(%o, %o)",
    ({ lineItem, expected, is_tax_inclusive }) => {
      const result = lineItemCalculation({
        ...lineItem,
        is_tax_inclusive,
      });
      expect(result.discount_flat).toEqual(expected.discount_flat);
      expect(result.taxable_amount).toEqual(expected.taxable_amount);
      expect(result.tax_flat).toEqual(expected.tax_flat);
      expect(result.total_amount).toEqual(expected.total_amount);
    },
  );
});
