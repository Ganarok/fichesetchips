import { ApiProperty } from '@nestjs/swagger';
import { Preference } from 'src/schemas/preference.schema';
import { ROLE } from 'src/utils/types';

export class RegisterAuthDto {

    @ApiProperty({ default: "user0" })
    username: string;

    @ApiProperty({ default: "password" })
    password: string;

    @ApiProperty({ default: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/OOjs_UI_icon_userAvatar.svg/1200px-OOjs_UI_icon_userAvatar.svg.png" })
    avatar?: string;

    @ApiProperty()
    preference?: Preference;
}
