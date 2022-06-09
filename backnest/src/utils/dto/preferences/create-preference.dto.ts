import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { Preference } from 'src/schemas/preference.schema';
import { LANGUAGES, THEMES } from '../types';

export class CreatePreferenceDto  {

    @ApiProperty({ default: "DEFAULT" })
    theme: THEMES;

    @ApiProperty({ default: "FRENCH" })
    language: LANGUAGES;
}
