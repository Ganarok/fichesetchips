import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { Preference } from 'src/schemas/preference.schema';
import { fixtures } from 'src/utils/seeders/fixtures';

export class CreateUserDto  {

    @ApiProperty({ default: fixtures.users[0].username })
    username: string;

    @ApiProperty({ default: fixtures.users[0].password })
    password: string;

    @ApiProperty({ default: fixtures.users[0].avatar })
    avatar?: string;

    @ApiProperty({ default: fixtures.users[0].preference_id })
    preference_id?: mongoose.Types.ObjectId;
}
