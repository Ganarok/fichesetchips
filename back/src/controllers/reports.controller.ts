import { Controller, Get, Patch, Post, Delete, Param, Body } from '@nestjs/common';

@Controller('reports')
export class ReportsController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Patch()
  async update_me(@Request() req: any, @Body() updateUser: UpdateUserDto) {
    return await this.usersService.update(req.user, updateUser);
  }

  @Get(':id')
  async update_another(
    @Param('id') id: string,
    @Body() updateUser: UpdateUserDto,
  ) {
    return await this.usersService.updateAsAnAdmin(updateUser, +id);
  }

  @Get(':id')
  async update_another(
    @Param('id') id: string,
    @Body() updateUser: UpdateUserDto,
  ) {
    return await this.usersService.updateAsAnAdmin(updateUser, +id);
  }

  @Patch(':id')
  async update_another(
    @Param('id') id: string,
    @Body() updateUser: UpdateUserDto,
  ) {
    return await this.usersService.updateAsAnAdmin(updateUser, +id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Post()
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
