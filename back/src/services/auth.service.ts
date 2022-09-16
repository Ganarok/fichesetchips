import { ForbiddenException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { LoginAuthDto, PayloadAuthDto, RegisterAuthDto } from 'src/utils/dto/auth/request-auth.dto';
import { ResponseAuthDto } from 'src/utils/dto/auth/response-auth.dto';
import { unauthorizedException } from 'src/utils/exceptions/auth/exceptions-auth';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(username: string, pass: string): Promise<any | null> {
        const user = await this.usersService.findOne(username);
        if (user && await bcrypt.compare(pass, user.password)) {
            return true
        } else {
            return false
        }
    }

    async login(user: LoginAuthDto): Promise<ResponseAuthDto> {
        const isValid = await this.validateUser(user.username, user.password)
        if (isValid) {
            const real_user = await this.usersService.findOne(user.username)
            const payload: PayloadAuthDto = { username: real_user.username, id: real_user.id, email: real_user.email }
            return {
                user: real_user,
                access_token: this.jwtService.sign(payload),
                expires_in: (process.env.expiresIn || '3600s')
            };
        } else {
            throw new UnauthorizedException(unauthorizedException.message);
        }
    }

    async register(user: RegisterAuthDto): Promise<ResponseAuthDto> {
        const new_user = await this.usersService.create(user)
        const payload: PayloadAuthDto = { username: new_user.username, id: new_user.id, email: new_user.email };
        return {
            user: new_user,
            access_token: this.jwtService.sign(payload),
            expires_in: (process.env.expiresIn || '3600s')
        }
    }
}