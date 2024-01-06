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

export { CodedErrorMessages };
export type { ICodedError };
