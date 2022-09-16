import { TEXT, UUID, UUIDV4 } from 'sequelize';
import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Report extends Model {
    @Column({ type: UUID, defaultValue: UUIDV4, primaryKey: true })
    id: string;

    @Column({ type: UUID, allowNull: false })
    user_id: string;

    @Column({ type: UUID, allowNull: false })
    admin_id: string;

    @Column({ type: TEXT, allowNull: false })
    description: string;
}

