import { Factory } from 'nestjs-seeder';
import { UUID, UUIDV4 } from 'sequelize';
import { Table, Column, Model } from 'sequelize-typescript';
import { defaultPreference } from 'src/utils/constants/preferences.constants';
import { LANGUAGES, THEMES } from 'src/utils/types/preferences.types';

@Table
export class Preference extends Model {
    @Column({ type: UUID, defaultValue: UUIDV4, primaryKey: true })
    id: string;

    @Column({ allowNull: false, defaultValue: defaultPreference.theme })
    theme: THEMES;

    @Column({ allowNull: false, defaultValue: defaultPreference.language })
    language: LANGUAGES;
}
