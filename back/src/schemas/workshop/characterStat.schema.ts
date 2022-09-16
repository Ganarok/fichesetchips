import { INTEGER } from 'sequelize';
import { UUID, UUIDV4 } from 'sequelize';
import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class CharacterStat extends Model {
    @Column({ type: UUID, defaultValue: UUIDV4 })
    character_id: string;

    @Column({ type: UUID, defaultValue: UUIDV4 })
    character_stat_id: string;

    @Column({ type: INTEGER, allowNull: false, defaultValue: 0 })
    value_max: number;
}

