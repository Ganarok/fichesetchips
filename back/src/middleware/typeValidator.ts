import { plainToClass, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Response, NextFunction, Request } from "express";

// extends basic request
declare module 'express-serve-static-core' {
    interface Request {
        view_instance?: any
    }
}

// Middleware to validate data, input_view must be a class type constructor
export function dataValidator(input_view: any) {
    return (req: Request, res: Response, next: NextFunction) => {
        const view_instance = plainToInstance(input_view, req.body);
        validate(view_instance, { skipMissingProperties: true }).then(errors => {
            if (errors.length > 0) {
                const validationErrors: Record<string, any> = {};
                errors.forEach(error => {
                    console.error(error)
                    const property: string = error.property;
                    validationErrors[property] = error.constraints;
                });
                res.status(400).json(validationErrors);
            } else {
                req.view_instance = view_instance;
                next();
            }
        });
    }
}
