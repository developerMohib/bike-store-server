"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError extends Error {
    constructor(message, statusCode, additionalData) {
        super(message);
        this.statusCode = statusCode;
        this.additionalData = additionalData;
        // Ensure that instanceof works properly
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.CustomError = CustomError;
