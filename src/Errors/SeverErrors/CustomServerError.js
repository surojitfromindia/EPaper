class CustomServerError extends Error {
    constructor(message, error_code) {
        super(message);
    }
}

export default CustomServerError