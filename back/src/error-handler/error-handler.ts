import { Request, Response, NextFunction } from 'express';
import { ErrorCode } from './error-code';
import { ErrorException } from './error-exception';
import { ErrorModel } from './error-model';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ErrorException) {
        res.json({ code: err.name, status: err.status, message: err.message })
        // res.status(err.status).send({ code: err.name, status: err.status, message: err.message });
    } else {
        res.status(500).send({ code: ErrorCode.UnknownError, status: 500, message: "Internal server error" } as ErrorModel);
    }
};