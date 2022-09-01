import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { AuthModule } from './auth.module';
import { PreferencesModule } from './preferences.module';
import { UsersModule } from './users.module';

@Module({
  imports: [
    DatabaseModule,
    PreferencesModule,
    UsersModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
