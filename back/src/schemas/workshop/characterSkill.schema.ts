import { Table, Column, Model } from 'sequelize-typescript';
import { UUID } from 'sequelize';
import { INTEGER } from 'sequelize';

@Table
export class CharacterSkill extends Model {
  @Column({ type: UUID, allowNull: false })
  character_id: string;

  @Column({ type: UUID, allowNull: false })
  skill_id: string;

  @Column({ type: INTEGER, allowNull: false })
  value: number;
}
