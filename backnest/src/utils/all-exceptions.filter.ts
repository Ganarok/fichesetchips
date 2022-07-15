import { Catch, InternalServerErrorException, ExceptionFilter, ArgumentsHost, HttpException, HttpStatus } from "@nestjs/common";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: InternalServerErrorException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        /**
         * @description Exception json response
         * @param message
         */
        const responseMessage = (type, message) => {
            response.status(status).json({
                statusCode: status,
                createdBy: type,
                errorMessages: [message]
            });
        };

        responseMessage(exception.name, exception.message)
    }
}