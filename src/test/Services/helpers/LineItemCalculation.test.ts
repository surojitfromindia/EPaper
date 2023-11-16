import { MathLib } from "../../../../src/Utils/MathLib/mathLib";
import { LineItemCalculation } from "../../../../src/Services/helpers/LineItemCalculation";

describe("LineItemCalculation", () => {
  const mathLib = new MathLib({
    precision: 2,
  });

  // a list of src.test and their expected results
  const cases = [
    {
      lineItem: {
        quantity: 1,
        rate: 100,
        taxPercentage: 15,
        discountPercentage: 10,
      },
      is_tax_inclusive: true,
      expected: {
        itemTotalTaxIncluded: 90,
        discountAmount: 8.7,
        taxAmount: 11.74,
        itemTotal: 78.26,
      },
    },
    {
      lineItem: {
        quantity: 2,
        rate: 120,
        taxPercentage: 15, // Fixed 15% tax rate
        discountPercentage: 10,
      },
      is_tax_inclusive: true,
      expected: {
        itemTotalTaxIncluded: 216.0,
        discountAmount: 20.87,
        taxAmount: 28.17,
        itemTotal: 187.83,
      },
    },
    {
      lineItem: {
        quantity: 1,
        rate: 100,
        taxPercentage: 15,
        discountPercentage: 10,
      },
      is_tax_inclusive: true,
      expected: {
        itemTotalTaxIncluded: 90,
        discountAmount: 8.7,
        taxAmount: 11.74,
        itemTotal: 78.26,
      },
    },
    {
      lineItem: {
        quantity: 1,
        rate: 75,
        taxPercentage: 15,
        discountPercentage: 0,
      },
      is_tax_inclusive: true,
      expected: {
        itemTotalTaxIncluded: 75,
        discountAmount: 0,
        taxAmount: 9.78,
        itemTotal: 65.22,
      },
    },
    {
      lineItem: {
        quantity: 3,
        rate: 150,
        taxPercentage: 15,
        discountPercentage: 25,
      },
      is_tax_inclusive: true,
      expected: {
        itemTotalTaxIncluded: 337.5,
        discountAmount: 97.83,
        taxAmount: 44.02,
        itemTotal: 293.47,
      },
    },
  ];

  // run multiple tests in one go using jest.each
  test.each(cases)("LineItemCalculation", ({ lineItem, expected }) => {
    const lineItemCalculation = new LineItemCalculation({
      line_item: lineItem,
      is_tax_inclusive: true,
      mathLib,
    });
    const result = lineItemCalculation
      .applyDiscount({
        discount_percentage: lineItem.discountPercentage,
      })
      .applyTaxPercentage({
        tax_percentage: lineItem.taxPercentage,
      })
      .getAmounts();
    expect(result.itemTotalTaxIncluded).toBe(expected.itemTotalTaxIncluded);
    expect(result.discountAmount).toBe(expected.discountAmount);
    expect(result.taxAmount).toBe(expected.taxAmount);
  });
});
