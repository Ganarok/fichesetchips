import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { defaultUser } from 'src/utils/constants/users.constants';
import { defaultAuthResponse } from '../constants/auth.constants';
import { UserType } from '../types/users.types';

export class LoginAuthDto  {
    @ApiProperty({ default: defaultUser.username })
    username: string;

    @ApiProperty({ default: defaultUser.password })
    password: string;
}

export class PayloadAuthDto  {

    @ApiProperty({ default: defaultUser.id })
    id: string;

    @ApiProperty({ default: defaultUser.username })
    username: string;

    @ApiProperty({ default: defaultUser.email })
    email: string;
}

export class RegisterAuthDto {

    @ApiProperty({ default: defaultUser.username })
    username: string;

    @ApiProperty({ default: defaultUser.email })
    email: string;

    @ApiProperty({ default: defaultUser.password })
    password: string;

    @ApiProperty({ default: defaultUser.avatar })
    avatar?: string;

    @ApiProperty({ default: defaultUser.preference_id })
    preference_id?: number;
}

export class ResponseAuthDto  {

    @ApiProperty({ default: defaultUser })
    user: UserType;

    @ApiProperty({ default: defaultAuthResponse.access_token })
    access_token: string;

    @ApiProperty({ default: defaultAuthResponse.expires_in })
    expires_in: string;

}