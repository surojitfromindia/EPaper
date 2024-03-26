const PAYMENT_MODES = [
  {
    name: "Cash",
    isDefault: true,
    systemName: "cash",
  },
  {
    name: "Check",
    isDefault: false,
    systemName: "check",
  },
  {
    name: "Credit card",
    isDefault: false,
    systemName: "credit_card",
  },
  {
    name: "Bank transfer",
    isDefault: false,
    systemName: "bank_transfer",
  },
  {
    name: "Bank remittance",
    isDefault: false,
    systemName: "bank_remittance",
  },
];
export { PAYMENT_MODES };
