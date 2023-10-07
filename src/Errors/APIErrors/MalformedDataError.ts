class MalformedDataError extends Error {
  constructor(message?: string) {
    super(message ?? "Data is malformed");
  }
}

export default MalformedDataError;
