const lineItemCalculation = ({
  is_tax_inclusive,
  quantity, // Q
  price, // P
  tax_percent,
  discount, // D / df (discount percent or discount flat)
  discount_type,
}) => {
  const tax_decimal = tax_percent / 100; // T

  const published_price = price * quantity; // Pb = P * Q

  let discount_flat = 0;
  let taxable_amount = 0; // after the discount is applied.
  let tax_flat = 0;
  let total_amount = 0;
  if (is_tax_inclusive) {
    const original_price = published_price / (1 + tax_decimal); // O = Pb / (1 + T)
    if (discount_type === "percentage") {
      const discount_decimal = discount / 100; // D
      discount_flat = original_price * discount_decimal; // O.D
      taxable_amount = original_price - discount_flat; // O - O.D
      tax_flat = original_price * tax_decimal * (1 - discount_decimal); // O.T.(1 - D)
      total_amount = published_price * (1 - discount_decimal); // Pb * (1 - D)
    } else {
      discount_flat = discount; // df
      taxable_amount = original_price - discount_flat; // O - df
      tax_flat = (original_price - discount_flat) * tax_decimal; // (O - df) * T
      total_amount = published_price - discount_flat * (1 + tax_decimal); // Pb - df(1+T)
    }
  } else {
    discount_flat = 0;
    if (discount_type === "percentage") {
      discount_flat = published_price * (discount / 100);
    }
    taxable_amount = published_price - discount_flat;
    tax_flat = taxable_amount * tax_decimal;
    total_amount = published_price - discount_flat + tax_flat;
  }
  return {
    discount_flat: fixDecimal(discount_flat),
    taxable_amount: fixDecimal(taxable_amount),
    tax_flat: fixDecimal(tax_flat),
    total_amount: fixDecimal(total_amount),
  };
};

module.exports = {
  lineItemCalculation,
};

const fixDecimal = (number, fix = 2) => {
  return +(Math.round(number + "e+" + fix) + "e-" + fix);
};
