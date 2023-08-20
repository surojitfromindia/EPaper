class TaxRateDTO {
  static toTaxRate(tax_rate) {
    return {
      tax_id: tax_rate.id,
      name: tax_rate.name,
      description: tax_rate.description,
      rate: tax_rate.rate,
      country_code: tax_rate.countryCode,
    };
  }

  static toTaxRateCreate(tax_rate_body) {
    return {
      name: tax_rate_body.name,
      description: tax_rate_body.description,
      rate: Number(tax_rate_body.rate ?? 0),
      countryCode: tax_rate_body.country_code,
    };
  }

  static toTaxRateUpdate(tax_rate_body) {
    return {
      name: tax_rate_body.name,
      description: tax_rate_body.description,
      rate: Number(tax_rate_body.rate ?? 0),
      countryCode: tax_rate_body.country_code,
    };
  }
}

export default TaxRateDTO;
