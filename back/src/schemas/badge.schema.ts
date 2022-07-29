import { Table, Column, Model } from 'sequelize-typescript';
import { UUID, UUIDV4, STRING, TEXT } from 'sequelize';

@Table
export class Badge extends Model {
  @Column({
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({ type: STRING, allowNull: false, unique: true })
  name: string;

  @Column({ type: STRING, allowNull: false })
  image: string;

  @Column({ type: TEXT, allowNull: false })
  description: string;
}
