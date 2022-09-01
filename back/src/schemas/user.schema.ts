import { Table, Column, Model, BeforeCreate} from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';
import { defaultUser } from 'src/utils/constants/users/users.constants';
import { ROLE } from 'src/utils/types/users/users.types';
import { UUID, UUIDV4 } from 'sequelize';

@Table
export class User extends Model {
    @Column({ type: UUID, defaultValue: "edf1dc34-3534-4cd7-85cf-a9488f1279f9", primaryKey: true })
    id: string;

    @Column({ allowNull: false, unique: true })
    username: string;

    @Column({ allowNull: false })
    password: string;

    @Column({ allowNull: false, defaultValue: defaultUser.avatar })
    avatar: string;

    @Column({ allowNull: false, defaultValue: defaultUser.role })
    role: ROLE;

    @Column({ allowNull: false, type: UUID, defaultValue: "3a9975f8-f34c-4a07-bbff-ab8a9b2e6309" })
    preference_id: string;

    @BeforeCreate
    static async hashPassword(user: User) {
        if (user.password) {
            const salt = await bcrypt.genSalt();
            const hash = await bcrypt.hash(user.password, salt);
            user.password = hash
        }
    }
}