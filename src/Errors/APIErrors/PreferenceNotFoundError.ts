class PreferenceNotFoundError extends Error {
  constructor(message?: string) {
    super(message ?? "preference data not found");
  }
}

export default PreferenceNotFoundError;
