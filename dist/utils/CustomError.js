"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
// custom error interface for throwing error
class CustomError extends Error {
    constructor(message, statusCode = 500, additionalData, validationErrors) {
        super(message);
        this.statusCode = statusCode;
        this.additionalData = additionalData;
        this.validationErrors = validationErrors;
    }
}
exports.CustomError = CustomError;
