import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Error } from 'mongoose';
import ValidationError = Error.ValidationError;

@Catch(ValidationError)
export class ValidationErrorFilter implements ExceptionFilter {

  catch(exception: ValidationError, host: ArgumentsHost): any {

    const ctx = host.switchToHttp(),
      response = ctx.getResponse();

    return response.status(400).json({
      statusCode: 400,
      createdBy: 'ValidationErrorFilter',
      errorMessages: Object.keys(exception.errors).map(key => `${exception.errors[key].kind} ${exception.errors[key].path}`),
    });
  }
}
