import { CurrencyType } from "../Models/Currency/Currency.model";

class CurrencyDTO {
  static toCurrency(currency: CurrencyType) {
    return {
      currency_id: currency.id,
      currency_name: currency.currencyName,
      currency_code: currency.currencyCode,
      currency_symbol: currency.currencySymbol,
    };
  }
}

export { CurrencyDTO };
