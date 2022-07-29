import { Table, Column, Model } from 'sequelize-typescript';
import { UUID, INTEGER, DATE, UUIDV4 } from 'sequelize';

@Table
export class Friend extends Model {
  @Column({
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({ type: UUID, allowNull: false, unique: true })
  user_ask_id: string;

  @Column({ type: UUID, allowNull: false })
  user_answer_id: string;

  @Column({ type: INTEGER, allowNull: false, defaultValue: 0 })
  nb_games: number;
}
