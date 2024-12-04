import {  Request, Response } from 'express';
import { CustomError } from '../utils/CustomError';

const errorHandler = (
    error: Error | CustomError,
    req: Request,
    res: Response,
): void=> {
    const message =
        error instanceof CustomError ? error.message : 'something went wrong';
    const statusCode = error instanceof CustomError ? error.statusCode : 500;
    const additionalData =
        error instanceof CustomError ? error.additionalData : null;

    res.status(statusCode).json({
        success: false,
        message,
        additionalData,
    });
};

export { errorHandler };
