import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { fixtures } from 'src/utils/seeders/fixtures';
import { ROLE } from '../types';

export class UpdateUserDto  {

    @ApiProperty({ default: fixtures.users[0].username })
    username?: string;

    @ApiProperty({ default: fixtures.users[0].password })
    password?: string;

    @ApiProperty({ default: fixtures.users[0].avatar })
    avatar?: string;

    @ApiProperty({ default: fixtures.users[0].role})
    role?: ROLE;

    @ApiProperty({ default: fixtures.users[0].preference_id })
    preference_id?: mongoose.Types.ObjectId;
}
