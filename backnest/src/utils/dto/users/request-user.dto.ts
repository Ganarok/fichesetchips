import { ApiProperty } from '@nestjs/swagger';
import { defaultUser, ROLE } from 'src/utils/seeders/users/users.fixtures';

export class CreateUserDto {

    @ApiProperty({ default: defaultUser.username })
    username: string;

    @ApiProperty({ default: defaultUser.password })
    password: string;

    @ApiProperty({ default: defaultUser.avatar })
    avatar?: string;

    @ApiProperty({ default: defaultUser.preference_id })
    preference_id?: number;
}

export class UpdateUserDto extends CreateUserDto { }

export class UpdateRoleUserDto {
    @ApiProperty({ default: defaultUser.role })
    role?: ROLE;
}
