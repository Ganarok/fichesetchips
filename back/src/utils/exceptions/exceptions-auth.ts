import { ApiProperty } from "@nestjs/swagger"

export const unauthorizedException = {
    "status": 401,
    "type": "UnauthorizedException",
    "message": "Wrong login or password"
}

export const unauthorizedTokenException = {
    "status": 401,
    "type": "UnauthorizedException",
    "message": "Unauthorized"
}


export const conflictException = {
    "status": 409,
    "type": "SequelizeUniqueConstraintError",
    "message": "Validation error"
}

export const notNullViolation =
{
    "status": 409,
    "type": "SequelizeValidationError",
    "message": "notNull Violation: User.password cannot be null"
}

export class AuthUnauthorizedException {
    @ApiProperty({ default: unauthorizedException.status })
    "status": number
    @ApiProperty({ default: unauthorizedException.type })
    "type": string
    @ApiProperty({ default: unauthorizedException.message })
    "message": string
}

export class AuthSequelizeUniqueConstraintError {
    @ApiProperty({ default: conflictException.status })
    "status": number
    @ApiProperty({ default: conflictException.type })
    "type": string
    @ApiProperty({ default: conflictException.message })
    "message": string
}

export class AuthNotNullViolation {
    @ApiProperty({ default: notNullViolation.status })
    "status": number
    @ApiProperty({ default: notNullViolation.type })
    "type": string
    @ApiProperty({ default: notNullViolation.message })
    "message": string
}

export class AuthTokenUnauthorizedException {
    @ApiProperty({ default: unauthorizedTokenException.status })
    "status": number
    @ApiProperty({ default: unauthorizedTokenException.type })
    "type": string
    @ApiProperty({ default: unauthorizedTokenException.message })
    "message": string
}
