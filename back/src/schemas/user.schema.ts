import { Table, Column, Model, BeforeCreate} from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';
import { defaultUser } from 'src/utils/constants/users/users.constants';
import { ROLE } from 'src/utils/types/users/users.types';
import { defaultPreference } from 'src/utils/constants/preferences/preferences.constants';
import { UUID, UUIDV4, DATE, STRING } from 'sequelize';

@Table
export class User extends Model {
    @Column({ type: UUID, defaultValue: UUIDV4, primaryKey: true })
    id: string;

    @Column({ allowNull: false, unique: true })
    username: string;

    @Column({ allowNull: false })
    password: string;

    @Column({ allowNull: false, defaultValue: defaultUser.avatar })
    avatar: string;

    @Column({ allowNull: false, defaultValue: defaultUser.role })
    role: ROLE;

    @Column({ allowNull: false, type: UUID, defaultValue: defaultPreference.id })
    preference_id: string;

    @Column({ type: DATE, allowNull: true })
    last_connection: string

    @BeforeCreate
    static async hashPassword(user: User) {
        if (user.password) {
            const salt = await bcrypt.genSalt();
            const hash = await bcrypt.hash(user.password, salt);
            user.password = hash
        }
    }
}