import { DataTypes, Model } from "sequelize";
import { ROLE } from "../../utils/types/users";
import { sequelize } from "../connection";
import Preference from "./preference";
import * as bcrypt from "bcrypt"

const defaultPreferences: { [key: string]: Preference } = require("../fixtures/preferences.js")
const avatar: string = require("../fixtures/avatar.js")

export default class User extends Model {
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
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    avatar: { type: DataTypes.STRING, allowNull: false, defaultValue: avatar },
    role: {
        allowNull: false, defaultValue: "USER",
        type: DataTypes.ENUM,
        values: ["USER", "ADMIN", "SUPERADMIN"],
    },
    preference_id: { type: DataTypes.UUID, allowNull: false, defaultValue: defaultPreferences.defaultPreference.id },
    last_connection: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
}, {
    sequelize,
    modelName: 'User'
})

// DO TO HASH PASSWORD BEFORE UPDATE
User.beforeCreate(async (user: User, options) => {
    if (user.password) {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash
    }
})