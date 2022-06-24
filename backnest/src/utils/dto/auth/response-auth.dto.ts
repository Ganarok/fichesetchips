import { ApiProperty } from '@nestjs/swagger';
import { defaultAuthResponse } from 'src/utils/seeders/auth/auth.fixtures';
import { defaultUser, UserType } from 'src/utils/seeders/users/users.fixtures';

export class ResponseAuthDto  {

    @ApiProperty({ default: defaultUser })
    user: UserType;

    @ApiProperty({ default: defaultAuthResponse.access_token })
    access_token: string;

    @ApiProperty({ default: defaultAuthResponse.expires_in })
    expires_in: string;

}