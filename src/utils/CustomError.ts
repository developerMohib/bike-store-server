// custom error interface for throwing error

class CustomError extends Error {
    statusCode: number;
    additionalData?: string;

    constructor(message: string, statusCode: number, additionalData: string) {
        super(message);
        this.statusCode = statusCode;
        this.additionalData = additionalData;

        // Ensure that instanceof works properly
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

interface IError {
    message: string;
}
export { CustomError ,IError};
