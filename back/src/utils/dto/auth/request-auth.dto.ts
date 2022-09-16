import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { defaultUser } from 'src/utils/constants/users/users.constants';

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
