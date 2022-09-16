import { Table, Column, Model, BeforeCreate } from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';
import { defaultUser } from 'src/utils/constants/users.constants';
import { ROLE } from 'src/utils/types/users.types';
import { defaultPreference } from 'src/utils/constants/preferences.constants';
import { UUID, UUIDV4, DATE, STRING, NOW, ENUM } from 'sequelize';

@Table
export class User extends Model {
    @Column({ type: UUID, defaultValue: UUIDV4, primaryKey: true })
    id: string;

    @Column({ allowNull: false, unique: true })
    email: string;

    @Column({ allowNull: false, unique: true })
    username: string;

    @Column({ allowNull: false })
    password: string;

    @Column({ allowNull: false, defaultValue: defaultUser.avatar })
    avatar: string;

    @Column({
        allowNull: false, defaultValue: defaultUser.role,
        type: ENUM,
        values: ["USER", "ADMIN", "SUPERADMIN"],
    })
    role: ROLE;

    @Column({ allowNull: false, type: UUID, defaultValue: defaultPreference.id })
    preference_id: string;

    @Column({ type: DATE, allowNull: false, defaultValue: NOW })
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