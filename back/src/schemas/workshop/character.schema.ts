import { Table, Column, Model } from 'sequelize-typescript';
import { defaultUser } from 'src/utils/constants/users.constants';
import { UUID, UUIDV4, TEXT, INTEGER } from 'sequelize';

@Table
export class Character extends Model {
    @Column({ type: UUID, defaultValue: UUIDV4, primaryKey: true })
    id: string;

    @Column({ allowNull: false })
    first_name: string;

    @Column({ allowNull: false })
    last_name: string;

    @Column({ allowNull: false, type: UUID })
    class_id: string;

    // TODO default character avatar
    @Column({ allowNull: false, defaultValue: defaultUser.avatar })
    avatar: string;

    @Column({ type: TEXT, allowNull: false, defaultValue: "" })
    description: string;

    @Column({ allowNull: false, type: UUID })
    character_stats_id: string;

    @Column({ allowNull: false, type: UUID })
    user_id: string;

    @Column({ type: INTEGER, defaultValue: 0, allowNull: false })
    games_played: number;

    @Column({ type: INTEGER, defaultValue: 0, allowNull: false })
    experience_points: number;

    @Column({ type: INTEGER, defaultValue: 1, allowNull: false })
    level: number;
}