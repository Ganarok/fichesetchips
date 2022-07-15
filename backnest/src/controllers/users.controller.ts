import { Controller, Patch, Param, Delete, UseGuards, Request, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from 'src/utils/dto/users/update-user.dto';
import { JwtAuthGuard } from 'src/utils/guards/auth.guard';
import { UsersService } from '../services/users.service'

@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch()
  async update_me(@Request() req: any) {
    return await this.usersService.update(req.user);
  }

  // admin only
  @Patch(':id')
  async update_another(@Param('id') id: string, @Body() updateUser: UpdateUserDto) {
    return await this.usersService.updateAsAnAdmin(updateUser, +id);
  }

  // admin only
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(id);
  }
}
