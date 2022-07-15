import { Controller, Patch, Param, Delete, UseGuards, Request, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from 'src/utils/dto/users/request-user.dto';
import { JwtAuthGuard } from 'src/utils/guards/auth.guard';
import { UsersService } from '../services/users.service'


@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Patch()
  async update_me(@Request() req: any, @Body() updateUser: UpdateUserDto) {
    return await this.usersService.update(req.user, updateUser);
  }

  // @UseGuards(IsAdmin)
  // @ApiBearerAuth('JWT-auth')
  @Patch(':id')
  async update_another(@Param('id') id: string, @Body() updateUser: UpdateUserDto) {
    return await this.usersService.updateAsAnAdmin(updateUser, +id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Delete()
  async remove_me(@Request() req) {
    return await this.usersService.remove(req.user);
  }

  // @UseGuards(IsAdmin)
  // @ApiBearerAuth('JWT-auth')
  @Delete(':id')
  async remove_another(@Param('id') id: string) {
    return await this.usersService.removeAsAnAdmin(+id);
  }
}
