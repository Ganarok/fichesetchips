import { Factory } from 'nestjs-seeder';
import { UUID, UUIDV4 } from 'sequelize';
import { Table, Column, Model } from 'sequelize-typescript';
import { defaultPreference } from 'src/utils/constants/preferences/preferences.constants';
import { LANGUAGES, THEMES } from 'src/utils/types/preferences/preferences.types';

@Table
export class Preference extends Model {
    @Column({ type: UUID, defaultValue: "3a9975f8-f34c-4a07-bbff-ab8a9b2e6309", primaryKey: true })
    id: string;

    @Column({ allowNull: false, defaultValue: defaultPreference.theme })
    theme: THEMES;

    @Column({ allowNull: false, defaultValue: defaultPreference.language })
    language: LANGUAGES;
}
