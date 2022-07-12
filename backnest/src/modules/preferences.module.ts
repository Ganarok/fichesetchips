import { Module } from '@nestjs/common';
import { PreferencesController } from 'src/controllers/preferences.controller';
import { PreferencesService } from 'src/services/preferences.service';

@Module({
  controllers: [PreferencesController],
  providers: [PreferencesService]
})
export class PreferencesModule {}
