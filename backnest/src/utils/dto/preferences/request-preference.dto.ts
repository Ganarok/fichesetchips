import { ApiProperty } from '@nestjs/swagger';
import { defaultPreference, LANGUAGES, THEMES } from 'src/utils/seeders/preferences/preferences.fixtures';

export class CreatePreferenceDto {

    @ApiProperty({ default: defaultPreference.theme })
    theme: THEMES;

    @ApiProperty({ default: defaultPreference.language })
    language: LANGUAGES;
}
