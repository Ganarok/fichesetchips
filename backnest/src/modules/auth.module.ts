import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from 'src/controllers/auth.controller';
import { AuthService } from 'src/services/auth.service';
import { JwtStrategy } from 'src/utils/strategies/jwt.strategy';
import { LocalStrategy } from 'src/utils/strategies/local.strategy';
import { UsersModule } from './users.module';

import * as dotenv from 'dotenv'
dotenv.config()

@Module({
  imports: [UsersModule, PassportModule, JwtModule.register({
    secret: process.env.JWTSECRET || 'secret',
    signOptions: { expiresIn: `${process.env.expiresIn || '3600'}s` },
  }),],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule { }
