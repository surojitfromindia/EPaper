interface ICodedError {
  message: string;
  code: string;
}

const CodedErrorMessages = {
  ORGANIZATION_NOT_FOUND: {
    message: "Organization does not exists",
    code: "1",
  },
  ORGANIZATION_NOT_PART_OF: {
    message: "Not part of this organization",
    code: "2",
  },
  ORGANIZATIONS_EMPTY: {
    message: "User does not have any organization",
    code: "3",
  },
};
const AutoNumberSeriesServiceErrorMessages = {
  AUTO_NUMBER_GROUP_NOT_FOUND: {
    message: "Auto number group not found",
    code: "AUTO_NUMBER_GROUP.1",
  },
  AUTO_NUMBER_GROUP_NOT_PART_OF: {
    message: "Not part of this auto number group",
    code: "AUTO_NUMBER_GROUP.2",
  },
  AUTO_NUMBER_GROUPS_EMPTY: {
    message: "User does not have any auto number group",
    code: "AUTO_NUMBER_GROUP.3",
  },
  INVOICE_NUMBER_ALREADY_EXISTS: {
    message: "Invoice number already exists",
    code: "AUTO_NUMBER_GROUP.4",
  },
  CREDIT_NOTE_NUMBER_ALREADY_EXISTS: {
    message: "Credit note number already exists",
    code: "AUTO_NUMBER_GROUP.5",
  },
  CUSTOMER_PAYMENT_NUMBER_ALREADY_EXISTS: {
    message: "Customer payment number already exists",
    code: "AUTO_NUMBER_GROUP.6",
  },
};

const InvoiceServiceErrorMessages = {
  INVOICE_NUMBER_ALREADY_EXISTS: {
    message: "Invoice number already exists",
    code: "INVOICE.1",
  },
};

export {
  CodedErrorMessages,
  AutoNumberSeriesServiceErrorMessages,
  InvoiceServiceErrorMessages,
};
export type { ICodedError };
