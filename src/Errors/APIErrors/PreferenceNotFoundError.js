class PreferenceNotFoundError extends Error {
  constructor(message) {
    super(message ?? "preference data not found");
  }
}

export default PreferenceNotFoundError;
