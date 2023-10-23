const PAYMENT_TERMS = [
  {
    name: "Net 15",
    paymentTerm: 15,
    isDefault: false,
    interval: "regular",
  },
  {
    name: "Net 30",
    paymentTerm: 30,
    isDefault: false,
    interval: "regular",
  },
  {
    name: "Net 45",
    paymentTerm: 45,
    isDefault: false,
    interval: "regular",
  },
  {
    name: "Net 60",
    paymentTerm: 60,
    isDefault: false,
    interval: "regular",
  },
  {
    name: "End of Month",
    paymentTerm: 0,
    isDefault: false,
    interval: "end_of_month",
  },
  {
    name: "End of Next Month",
    paymentTerm: 1,
    isDefault: false,
    interval: "end_of_month",
  },
  {
    name: "Due on Receipt",
    paymentTerm: 0,
    isDefault: true,
    interval: "end_of_day",
  },
];

export { PAYMENT_TERMS };
