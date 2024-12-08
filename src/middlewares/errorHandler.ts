/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../utils/CustomError';

const errorHandler = (
    error: Error | CustomError,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const message =
        error instanceof CustomError ? error.message : 'something went wrong';
    const statusCode = error instanceof CustomError ? error.statusCode : 500;
    const additionalData =
        error instanceof CustomError ? error.additionalData : null;

    // Extract validation error details, if any
    const errorDetails =
        error.name === 'ValidationError' ? (error as any).errors : null;

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

export { errorHandler };
