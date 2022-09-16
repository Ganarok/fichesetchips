import { TEXT, UUID, UUIDV4 } from 'sequelize';
import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Skill extends Model {
    @Column({ type: UUID, defaultValue: UUIDV4, primaryKey: true })
    id: string;

    @Column({ type: UUID, allowNull: false })
    universe_id: string;

    @Column({ allowNull: false })
    name: string;

    @Column({ allowNull: false })
    ticker: string;

    @Column({ type: TEXT, allowNull: false, defaultValue: "" })
    description: string;
}

