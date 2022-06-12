import { Table, Column, Model, BeforeCreate, } from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';
import { Factory } from "nestjs-seeder";
import { ROLE } from 'src/utils/dto/types';
import { fixtures } from 'src/utils/seeders/fixtures';

@Table
export class User extends Model {

    @Factory((faker) => faker.internet.userName())
    @Column({ allowNull: false, unique: true })
    username: string;

    @Factory('password')
    @Column({ allowNull: false })
    password: string;

    @Factory(fixtures.users[0].avatar)
    @Column({ allowNull: false, defaultValue: fixtures.users[0].avatar })
    avatar: string;

    @Factory('USER')
    @Column({ allowNull: false, defaultValue: 'USER' })
    role: ROLE;

    @Factory(1)
    @Column({ allowNull: false })
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