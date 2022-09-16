import { TEXT, UUID, UUIDV4 } from 'sequelize';
import { Table, Column, Model } from 'sequelize-typescript';
import { defaultUser } from 'src/utils/constants/users.constants';

@Table
export class Item extends Model {
    @Column({ type: UUID, defaultValue: UUIDV4, primaryKey: true })
    id: string;

    @Column({ type: UUID, allowNull: false })
    universe_id: string;

    @Column({ allowNull: false })
    name: string;

    @Column({ type: TEXT, allowNull: false, defaultValue: "" })
    description: string;

    // TODO : change to item avatar
    @Column({ allowNull: false, defaultValue: defaultUser.avatar })
    avatar: string;
}

