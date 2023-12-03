const SUPPORTED_CURRENCIES = {
  AED: {
    currencyName: "United Arab Emirates Dirham",
    currencyCode: "AED",
    currencySymbol: "د.إ",
  },
  AUD: {
    currencyName: "Australian Dollar",
    currencyCode: "AUD",
    currencySymbol: "A$",
  },
  BRL: {
    currencyName: "Brazilian Real",
    currencyCode: "BRL",
    currencySymbol: "R$",
  },
  CAD: {
    currencyName: "Canadian Dollar",
    currencyCode: "CAD",
    currencySymbol: "CA$",
  },
  CHF: {
    currencyName: "Swiss Franc",
    currencyCode: "CHF",
    currencySymbol: "CHF",
  },
  CNY: {
    currencyName: "Chinese Yuan",
    currencyCode: "CNY",
    currencySymbol: "¥",
  },
  EUR: {
    currencyName: "Euro",
    currencyCode: "EUR",
    currencySymbol: "€",
  },
  GBP: {
    currencyName: "British Pound Sterling",
    currencyCode: "GBP",
    currencySymbol: "£",
  },
  HKD: {
    currencyName: "Hong Kong Dollar",
    currencyCode: "HKD",
    currencySymbol: "HK$",
  },
  INR: {
    currencyName: "Indian Rupee",
    currencyCode: "INR",
    currencySymbol: "₹",
  },
  JPY: {
    currencyName: "Japanese Yen",
    currencyCode: "JPY",
    currencySymbol: "¥",
  },
  MXN: {
    currencyName: "Mexican Peso",
    currencyCode: "MXN",
    currencySymbol: "Mex$",
  },
  NOK: {
    currencyName: "Norwegian Krone",
    currencyCode: "NOK",
    currencySymbol: "kr",
  },
  NZD: {
    currencyName: "New Zealand Dollar",
    currencyCode: "NZD",
    currencySymbol: "NZ$",
  },
  RUB: {
    currencyName: "Russian Ruble",
    currencyCode: "RUB",
    currencySymbol: "₽",
  },
  SAR: {
    currencyName: "Saudi Riyal",
    currencyCode: "SAR",
    currencySymbol: "﷼",
  },
  SEK: {
    currencyName: "Swedish Krona",
    currencyCode: "SEK",
    currencySymbol: "kr",
  },
  SGD: {
    currencyName: "Singapore Dollar",
    currencyCode: "SGD",
    currencySymbol: "S$",
  },
  TRY: {
    currencyName: "Turkish Lira",
    currencyCode: "TRY",
    currencySymbol: "₺",
  },
  USD: {
    currencyName: "United States Dollar",
    currencyCode: "USD",
    currencySymbol: "$",
  },
  ZAR: {
    currencyName: "South African Rand",
    currencyCode: "ZAR",
    currencySymbol: "R",
  },
};

const DEFAULT_CURRENCIES = [
  SUPPORTED_CURRENCIES.AED,
  SUPPORTED_CURRENCIES.AUD,
  SUPPORTED_CURRENCIES.BRL,
  SUPPORTED_CURRENCIES.CAD,
  SUPPORTED_CURRENCIES.CHF,
  SUPPORTED_CURRENCIES.CNY,
  SUPPORTED_CURRENCIES.EUR,
  SUPPORTED_CURRENCIES.GBP,
  SUPPORTED_CURRENCIES.HKD,
  SUPPORTED_CURRENCIES.INR,
  SUPPORTED_CURRENCIES.JPY,
  SUPPORTED_CURRENCIES.MXN,
  SUPPORTED_CURRENCIES.NOK,
  SUPPORTED_CURRENCIES.NZD,
  SUPPORTED_CURRENCIES.RUB,
  SUPPORTED_CURRENCIES.SAR,
  SUPPORTED_CURRENCIES.SEK,
  SUPPORTED_CURRENCIES.SGD,
  SUPPORTED_CURRENCIES.TRY,
  SUPPORTED_CURRENCIES.USD,
  SUPPORTED_CURRENCIES.ZAR,
];

export { SUPPORTED_CURRENCIES, DEFAULT_CURRENCIES };
