import { ApiProperty } from '@nestjs/swagger';
import { fixtures } from 'src/utils/seeders/fixtures';

export class RegisterAuthDto {

    @ApiProperty({ default: fixtures.users[0].username })
    username: string;

    @ApiProperty({ default: "password" })
    password: string;

    @ApiProperty({ default: fixtures.users[0].avatar })
    avatar?: string;

    @ApiProperty({ default: fixtures.users[0].preference_id })
    preference_id?: number;
}
