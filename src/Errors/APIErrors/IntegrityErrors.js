class IntegrityErrors extends Error {
  constructor({ errors, message }) {
    super(message);
    this.errors = errors;
  }
}

export default IntegrityErrors;
