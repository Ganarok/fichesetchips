import { Factory } from 'nestjs-seeder';
import { Table, Column, Model } from 'sequelize-typescript';
import { LANGUAGES, THEMES } from 'src/utils/dto/types';

@Table
export class Preference extends Model {

    @Factory('DEFAULT')
    @Column({ allowNull: false, defaultValue: "DEFAULT" })
    theme: THEMES;

    @Factory('FRENCH')
    @Column({ allowNull: false, defaultValue: "FRENCH" })
    language: LANGUAGES;
}
