import { Module } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UsersController } from '../controllers/users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Preference, PreferenceDocument, PreferenceSchema } from 'src/schemas/preference.schema';
import { Model } from 'mongoose';
import { CommandModule } from 'nestjs-command';
import { PreferenceSeeder } from 'src/seeders/preferences.seeder';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Preference.name, schema: PreferenceSchema }]),
    CommandModule],
  controllers: [],
  providers: [PreferenceSeeder],
  exports: [PreferenceSeeder]
})
export class PreferencesModule {}
