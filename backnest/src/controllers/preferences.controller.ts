import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PreferencesService } from 'src/services/preferences.service';
import { CreatePreferenceDto } from 'src/utils/dto/preferences/create-preference.dto';
import { JwtAuthGuard } from 'src/utils/guards/auth.guard';

// TODO IsAdmin guard
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
@ApiTags('Preferences')
@Controller('preferences')
export class PreferencesController {
  constructor(private readonly preferencesService: PreferencesService) {}

  @Post()
  create(@Body() createPreferenceDto: CreatePreferenceDto) {
    return this.preferencesService.create(createPreferenceDto);
  }

  @Get()
  findAll() {
    return this.preferencesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.preferencesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePreferenceDto: CreatePreferenceDto) {
    return this.preferencesService.update(+id, updatePreferenceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.preferencesService.remove(+id);
  }
}
