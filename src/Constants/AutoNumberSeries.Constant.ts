const DEFAULT_AUTO_NUMBER_SERIES = {
  name: "Default number series",
  isDefault: true,
  isActive: true,
  autoNumbers: [
    {
      entityType: "invoice",
      prefixString: "INV-",
      nextNumber: "0001",
      numberZeroPad: 3,
    },
    {
      entityType: "credit_note",
      prefixString: "CN-",
      nextNumber: "0001",
      numberZeroPad: 3,
    },
    {
      entityType: "customer_payment",
      prefixString: "CP-",
      nextNumber: "0001",
      numberZeroPad: 3,
    },
  ],
};
export { DEFAULT_AUTO_NUMBER_SERIES };
