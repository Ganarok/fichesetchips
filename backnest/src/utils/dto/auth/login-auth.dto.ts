import { ApiProperty } from '@nestjs/swagger';
import { fixtures } from 'src/utils/seeders/fixtures';

export class LoginAuthDto  {

    @ApiProperty({ default: fixtures.users[0].username })
    username: string;

    @ApiProperty({ default: "password" })
    password: string;
}
