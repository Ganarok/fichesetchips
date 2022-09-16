import { TEXT, UUID, UUIDV4 } from 'sequelize';
import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Universe extends Model {
    @Column({ type: UUID, defaultValue: UUIDV4, primaryKey: true })
    id: string;

    @Column({ allowNull: false })
    name: string;

    @Column({ type: TEXT, allowNull: false, defaultValue: "" })
    description: string;
}

