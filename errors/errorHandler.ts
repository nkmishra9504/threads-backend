import { NextFunction, Request, Response } from 'express';

export const handleError = (error: any, req: Request, res: Response, next: NextFunction) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || false;
    return res.status(error.statusCode).json({
        status: error.status,
        key: error.key,
        message: error.message || "Internal Server Error",
    });
}