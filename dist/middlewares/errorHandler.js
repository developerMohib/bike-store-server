"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const CustomError_1 = require("../utils/CustomError");
const errorHandler = (error, req, res, next) => {
    const message = error instanceof CustomError_1.CustomError ? error.message : 'something went wrong';
    const statusCode = error instanceof CustomError_1.CustomError ? error.statusCode : 500;
    const additionalData = error instanceof CustomError_1.CustomError ? error.additionalData : null;
    // Extract validation error details, if any
    const errorDetails = error.name === "ValidationError"
        ? error.errors
        : null;
    res.status(statusCode).json({
        success: false,
        // message: error.message || "Something went wrong",
        message,
        additionalData,
        error: {
            name: error.name,
            details: errorDetails || null,
        },
    });
};
exports.errorHandler = errorHandler;
