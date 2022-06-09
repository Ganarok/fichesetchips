import { Controller, Get, Post, Body, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { LoginAuthDto } from 'src/dto/auth/login-auth.dto';
import { RegisterAuthDto } from 'src/dto/auth/register-auth.dto';
import { JwtAuthGuard } from 'src/guards/auth.guard';
import { AuthService } from 'src/services/auth.service';

@ApiTags('Authentification')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @ApiBody({ type: LoginAuthDto })
  @Post('login')
  async login(@Body() body: LoginAuthDto) {
    return await this.authService.login(body);
  }

  @ApiBody({ type: RegisterAuthDto })
  @Post('signup')
  async signup(@Body() body: RegisterAuthDto) {
    return await this.authService.register(body);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}

