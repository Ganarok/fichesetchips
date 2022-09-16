import { Controller, Patch, Param, Delete, UseGuards, Request, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from 'src/utils/dto/users.dto';
import { JwtAuthGuard } from 'src/utils/guards/auth.guard';
import { isAdminGuard } from 'src/utils/guards/isAdmin.guard';
import { UsersService } from '../services/users.service'


@ApiTags('Users')
@ApiBearerAuth('JWT-auth')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async update_me(@Request() req: any, @Body() updateUser: UpdateUserDto) {
    return await this.usersService.update(req.user, updateUser);
  }

  @UseGuards(isAdminGuard)
  @Patch(':id')
  async update_another(@Param('id') id: string, @Body() updateUser: UpdateUserDto) {
    return await this.usersService.updateAsAnAdmin(updateUser, +id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async remove_me(@Request() req) {
    return await this.usersService.remove(req.user);
  }

  @UseGuards(isAdminGuard)
  @Delete(':id')
  async remove_another(@Param('id') id: string) {
    return await this.usersService.removeAsAnAdmin(+id);
  }
}
