import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { LoginAuthDto } from 'src/utils/dto/auth/login-auth.dto';
import { PayloadAuthDto } from 'src/utils/dto/auth/payload-auth.dto';
import { ResponseAuthDto } from 'src/utils/dto/auth/response-auth.dto';
import { RegisterAuthDto } from 'src/utils/dto/auth/register-auth.dto';
import { User } from 'src/schemas/user.schema';

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
            const payload: PayloadAuthDto = { username: real_user.username, _id: real_user._id }
            return {
                user: {
                    avatar: real_user.avatar,
                    ...payload
                },
                access_token: this.jwtService.sign(payload),
                expires_in: (process.env.expiresIn || '3600s')
            };
        } else {
            throw new HttpException('Wrong login or password', HttpStatus.NOT_FOUND);
        }
    }

    async register(user: RegisterAuthDto): Promise<ResponseAuthDto> {
        await this.usersService.create(user)
        const new_user = await this.usersService.findOne(user.username)
        const payload: PayloadAuthDto = { username: new_user.username, _id: new_user._id };
        return {
            user: {
                avatar: new_user.avatar,
                preference: new_user.preference,
                ...payload
            },
            access_token: this.jwtService.sign(payload),
            expires_in: (process.env.expiresIn || '3600s')
        }
    }
}