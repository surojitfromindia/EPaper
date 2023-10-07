class IntegrityErrors extends Error {
  errors: Error[];

  constructor({ errors, message }: { errors: Error[]; message?: string }) {
    super(message);
    this.errors = errors;
  }
}

export default IntegrityErrors;
