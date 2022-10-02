import { ApiProperty } from '@nestjs/swagger';
import { defaultPreference } from 'src/utils/constants/preferences/preferences.constants';
import { LANGUAGES, THEMES } from 'src/utils/types/preferences/preferences.types';

export class CreatePreferenceDto {

    @ApiProperty({ default: defaultPreference.theme })
    theme: THEMES;

    @ApiProperty({ default: defaultPreference.language })
    language: LANGUAGES;
}
