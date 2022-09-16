import { Table, Column, Model } from 'sequelize-typescript';
import { UUID, UUIDV4, DATE, INTEGER } from 'sequelize';

@Table
export class CharacterCoin extends Model {
  @Column({ type: UUID, allowNull: false })
  character_id: string;

  @Column({ type: UUID, allowNull: false })
  coin_id: string;

  @Column({ type: INTEGER, allowNull: false, defaultValue: 0 })
  value: number;
}
