import { Table, Column, Model } from 'sequelize-typescript';
import { UUID, UUIDV4, DATE } from 'sequelize';

@Table
export class BadgeUser extends Model {
  @Column({ type: UUID, allowNull: false })
  user_id: string;

  @Column({ type: UUID, allowNull: false })
  badge_id: string;
}
