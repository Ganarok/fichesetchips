import { ApiProperty } from '@nestjs/swagger';

export class LoginAuthDto  {

    @ApiProperty({ default: "user0" })
    username: string;

    @ApiProperty({ default: "password" })
    password: string;
}
