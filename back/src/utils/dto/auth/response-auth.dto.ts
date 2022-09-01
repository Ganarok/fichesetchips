import { ApiProperty } from '@nestjs/swagger';
import { defaultAuthResponse } from 'src/utils/constants/auth/auth.constants';
import { defaultUser } from 'src/utils/constants/users/users.constants';
import { UserType } from 'src/utils/types/users/users.types';

export class ResponseAuthDto  {

    @ApiProperty({ default: defaultUser })
    user: UserType;

    @ApiProperty({ default: defaultAuthResponse.access_token })
    access_token: string;

    @ApiProperty({ default: defaultAuthResponse.expires_in })
    expires_in: string;

}