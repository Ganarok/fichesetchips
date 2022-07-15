import { Table, Column, Model, BeforeCreate, } from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';
import { defaultUser, ROLE } from 'src/utils/seeders/users/users.fixtures';

@Table
export class User extends Model {
    @Column({ allowNull: false, unique: true })
    username: string;

    @Column({ allowNull: false })
    password: string;

    @Column({ allowNull: false, defaultValue: defaultUser.avatar })
    avatar: string;

    @Column({ allowNull: false, defaultValue: defaultUser.role })
    role: ROLE;

    @Column({ allowNull: false, defaultValue: defaultUser.preference_id })
    preference_id: number;

    @BeforeCreate
    static async hashPassword(user: User) {
        if (user.password) {
            const salt = await bcrypt.genSalt();
            const hash = await bcrypt.hash(user.password, salt);
            user.password = hash
        }
    }
}