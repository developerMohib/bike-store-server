// custom error interface for throwing error
class CustomError extends Error {
    public statusCode: number;
    public additionalData?: string;
    public validationErrors?: string;

    constructor(
        message: string,
        statusCode: number = 500,
        additionalData?: string,
        validationErrors?: string
    ) {
        super(message);
        this.statusCode = statusCode;
        this.additionalData = additionalData;
        this.validationErrors = validationErrors;
    }
}

interface IError {
    message: string;
}
export { CustomError, IError };
