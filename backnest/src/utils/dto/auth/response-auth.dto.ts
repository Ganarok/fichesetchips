import { ApiProperty } from '@nestjs/swagger';
import { Preference } from 'src/schemas/preference.schema';
import { UpdateUserDto } from '../users/update-user.dto';

export class ResponseAuthDto  {

    @ApiProperty({ default: UpdateUserDto })
    user: UpdateUserDto;

    @ApiProperty({ default: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIwIiwiX2lkIjoiNjI5OGJhZGIxOTBjNmQ1MmFjYTFhYzA0IiwiaWF0IjoxNjU0MTgwMzY1LCJleHAiOjE2NTQxODM5NjV9.Qq-ZR_SWoSYPeAnumI6OkOcwv6o88QzcqCC0aK-AGgk" })
    access_token: string;

    @ApiProperty({ default: "3600S" })
    expires_in: string;

}