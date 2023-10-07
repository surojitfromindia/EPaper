class CustomServerError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export default CustomServerError;
