import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from './auth.module';
import { PreferencesModule } from './preferences.module';
import { UsersModule } from './users.module';

@Module({
  imports: [
    DatabaseModule,
    PreferencesModule,
    UsersModule,
    AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
