import { DATE, ENUM, Model, NOW, STRING, UUID, UUIDV4 } from "sequelize";
import { sequelize } from '../config'
import { ROLE } from "../../utils/types/users";
const bcrypt = require('bcrypt');

class User extends Model {
    declare id: string;
    declare email: string;
    declare username: string;
    declare password: string;
    declare avatar: string;
    declare role: ROLE;
    declare preference_id: string;
    declare last_connection: string;
}

User.init({
    id: { type: UUID, defaultValue: UUIDV4, primaryKey: true },
    email: { type: STRING, allowNull: false, unique: true },
    username: { type: STRING, allowNull: false, unique: true },
    password: { type: STRING, allowNull: false },
    avatar: { type: STRING, allowNull: false, defaultValue: "" },
    role: {
        allowNull: false, defaultValue: "USER",
        type: ENUM,
        values: ["USER", "ADMIN", "SUPERADMIN"],
    },
    preference_id: { type: UUID, allowNull: false, defaultValue: 1 },
    last_connection: { type: DATE, allowNull: false, defaultValue: NOW }
}, {
    sequelize,
    modelName: 'User'
})

User.beforeCreate(async (user: User, options) => {
    if (user.password) {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash
    }
})