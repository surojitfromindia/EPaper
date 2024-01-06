import { ICodedError } from "./ErrorMessages";

class CodedError extends Error {
  constructor(coded_error: ICodedError) {
    super(coded_error.message);
  }
}

export default CodedError;
