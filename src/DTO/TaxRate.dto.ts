class TaxRateDTO {
  static toTaxRate(tax_rate) {
    return {
      tax_id: tax_rate.id,
      tax_name: tax_rate.name,
      description: tax_rate.description,
      tax_percentage: tax_rate.rate,
      tax_percentage_formatted: tax_rate.rateFormatted,
      country_code: tax_rate.countryCode,
      is_editable: tax_rate.isEditable,
      is_deletable: tax_rate.isDeletable,
    };
  }

  static toTaxRateCreate(tax_rate_body) {
    return {
      name: tax_rate_body.tax_name,
      description: tax_rate_body.description,
      taxPercentage: Number(tax_rate_body.tax_percentage ?? 0),
      countryCode: tax_rate_body.country_code,
    };
  }

  static toTaxRateUpdate(tax_rate_body) {
    return {
      name: tax_rate_body.tax_name,
      description: tax_rate_body.description,
      taxPercentage: Number(tax_rate_body.tax_percentage ?? 0),
      countryCode: tax_rate_body.country_code,
    };
  }
}

export default TaxRateDTO;
