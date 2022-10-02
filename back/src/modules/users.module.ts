import { Module } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UsersController } from '../controllers/users.controller';
// import { UsersSeeder } from 'src/utils/seeders/users/users.seeder';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService],//, UsersSeeder],
  exports: [UsersService]
})
export class UsersModule { }



