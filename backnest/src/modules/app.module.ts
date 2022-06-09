import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { configuration } from 'src/utils/configuration/default.configuration';

import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { AuthModule } from './auth.module';
import { PreferencesModule } from './preferences.module';
import { UsersModule } from './users.module';

@Module({
  imports: [
    MongooseModule.forRoot(configuration.database.mongooseConnectionUrl),
    PreferencesModule,
    UsersModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
