import { Catch, InternalServerErrorException, ExceptionFilter, ArgumentsHost, HttpException, HttpStatus } from "@nestjs/common";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: InternalServerErrorException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        let status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        /**
         * @description Exception json response
         * @param message
         */
        const responseMessage = (type, message) => {

            if (type == "SequelizeUniqueConstraintError") {
                status = 409 //Conflict
            } else if (type == "SequelizeValidationError") {
                status = 409
            }

            response.status(status).json({
                status: status,
                type: type,
                message: message
            });
        };

        responseMessage(exception.name, exception.message)
    }
}