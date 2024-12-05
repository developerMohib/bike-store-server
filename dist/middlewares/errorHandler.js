"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const CustomError_1 = require("../utils/CustomError");
const errorHandler = (error, req, res) => {
    const message = error instanceof CustomError_1.CustomError ? error.message : 'something went wrong';
    const statusCode = error instanceof CustomError_1.CustomError ? error.statusCode : 500;
    const additionalData = error instanceof CustomError_1.CustomError ? error.additionalData : null;
    res.status(statusCode).json({
        success: false,
        message,
        additionalData,
    });
};
exports.errorHandler = errorHandler;
