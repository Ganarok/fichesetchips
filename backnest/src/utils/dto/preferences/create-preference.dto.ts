import { ApiProperty } from '@nestjs/swagger';
import { LANGUAGES, THEMES } from '../types';

export class CreatePreferenceDto  {

    @ApiProperty({ default: "DEFAULT" })
    theme: THEMES;

    @ApiProperty({ default: "FRENCH" })
    language: LANGUAGES;
}
