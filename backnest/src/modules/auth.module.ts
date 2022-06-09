import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { configuration } from 'src/utils/configuration/default.configuration';
import { AuthController } from 'src/controllers/auth.controller';
import { AuthService } from 'src/services/auth.service';
import { JwtStrategy } from 'src/utils/strategies/jwt.strategy';
import { LocalStrategy } from 'src/utils/strategies/local.strategy';
import { UsersModule } from './users.module';

@Module({
  imports: [UsersModule, PassportModule, JwtModule.register({
    secret: configuration.jwt.secret,
    signOptions: { expiresIn: `${configuration.jwt.expiresIn}s` },
  }),],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule { }
