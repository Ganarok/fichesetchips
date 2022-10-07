import { DataTypes, Model } from "sequelize";
import { LANGUAGES, THEMES } from "../../utils/types/preferences";
import { sequelize } from "../connection";
import User from "./users";
const { defaultPreference } = require("../seeders/fixtures/preferences")
const bcrypt = require('bcrypt');

export default class Preference extends Model {
  declare id: string;
  declare theme: THEMES;
  declare language: LANGUAGES;
}

Preference.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  theme: { type: DataTypes.STRING, allowNull: false, defaultValue: defaultPreference.theme },
  language: { type: DataTypes.STRING, allowNull: false, defaultValue: defaultPreference.language },
}, {
  sequelize,
  modelName: 'Preference'
})

Preference.hasMany(User, { foreignKey: "preference_id", onDelete: "SET DEFAULT" })