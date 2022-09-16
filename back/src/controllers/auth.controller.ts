import { Controller, Get, Post, Body, Request, UseGuards, HttpCode, UnauthorizedException } from '@nestjs/common';
import { ApiBody, ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/utils/guards/auth.guard';
import { AuthService } from 'src/services/auth.service';
import { LoginAuthDto, RegisterAuthDto } from 'src/utils/dto/auth.dto';
import { ResponseAuthDto } from 'src/utils/dto/auth.dto';
import { AuthSequelizeUniqueConstraintError, AuthTokenUnauthorizedException, AuthUnauthorizedException } from 'src/utils/exceptions/exceptions-auth';

@ApiTags('Authentification')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  @HttpCode(200)
  @ApiBody({ type: LoginAuthDto })
  @ApiResponse({ status: 200, description: 'The record has been successfully found.', type: ResponseAuthDto })
  @ApiResponse({ status: 401, description: 'Unauthorized', type: AuthUnauthorizedException })
  async login(@Body() body: LoginAuthDto) {
    return await this.authService.login(body)
  }

  @Post('signup')
  @ApiBody({ type: RegisterAuthDto })
  @ApiResponse({ status: 201, description: 'The record has been successfully created.', type: ResponseAuthDto })
  @ApiResponse({ status: 409, description: 'Conflict while inserting into the database.', type: AuthSequelizeUniqueConstraintError })
  async signup(@Body() body: RegisterAuthDto) {
    return await this.authService.register(body)
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Get('profile')
  @ApiResponse({ status: 200, description: 'OK', type: ResponseAuthDto })
  @ApiResponse({ status: 401, description: 'Wrong token.', type: AuthTokenUnauthorizedException })
  getProfile(@Request() req: any) {
    return req.user;
  }
}

