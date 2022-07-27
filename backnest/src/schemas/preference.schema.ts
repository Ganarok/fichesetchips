import { Factory } from 'nestjs-seeder';
import { Table, Column, Model } from 'sequelize-typescript';
import { defaultPreference, LANGUAGES, THEMES } from 'src/utils/seeders/preferences/preferences.fixtures';

@Table
export class Preference extends Model {

    @Column({ allowNull: false, defaultValue: defaultPreference.theme })
    theme: THEMES;

    @Column({ allowNull: false, defaultValue: defaultPreference.language })
    language: LANGUAGES;
}
