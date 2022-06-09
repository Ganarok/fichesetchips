import { Controller, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/utils/guards/auth.guard';
import { UsersService } from '../services/users.service'

@UseGuards(JwtAuthGuard)
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
  async update_another(@Request() req: any, @Param('id') id: string) {
    return await this.usersService.update(req.user, id);
  }

  // admin only
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(id);
  }
}
