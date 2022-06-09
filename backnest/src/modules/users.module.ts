import { Module } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UsersController } from '../controllers/users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { UserSeeder } from 'src/seeders/users.seeder';
import { CommandModule } from 'nestjs-command';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    CommandModule],
  controllers: [UsersController],
  providers: [UsersService, UserSeeder],
  exports: [UsersService]
})
export class UsersModule { }



