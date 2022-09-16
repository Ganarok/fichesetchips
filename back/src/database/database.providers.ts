import { Sequelize } from 'sequelize-typescript';

import { User } from 'src/schemas/user.schema';
import { Friend } from 'src/schemas/friend.schema';
import { Report } from 'src/schemas/report.schema';
import { Preference } from 'src/schemas/preference.schema';
import { Badge } from 'src/schemas/badge.schema';
import { BadgeUser } from 'src/schemas/badgeUser.schema';

import { Universe } from 'src/schemas/workshop/universe.schema';
import { Character } from 'src/schemas/workshop/character.schema';
import { Class } from 'src/schemas/workshop/class.schema';
import { Item } from 'src/schemas/workshop/item.schema';
import { Stat } from 'src/schemas/workshop/stat.schema';
import { Coin } from 'src/schemas/workshop/coin.schema';
import { Skill } from 'src/schemas/workshop/skill.schema';
import { CharacterStat } from 'src/schemas/workshop/characterStat.schema';
import { CharacterItem } from 'src/schemas/workshop/characterItem.schema';
import { CharacterCoin } from 'src/schemas/workshop/characterCoin.schema';
import { CharacterSkill } from 'src/schemas/workshop/characterSkill.schema';

import * as dotenv from 'dotenv'
dotenv.config()

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'postgres',
                host: process.env.DB_HOST || 'localhost',
                port: parseInt(process.env.DB_PORT) || 5432,
                username: process.env.DB_USER || 'postgres',
                password: process.env.DB_PASSWORD || 'postgres',
                database: process.env.DB_NAME || 'fichesetchips',
            });

            // Models Général
            sequelize.addModels([User, Preference, Friend, Badge, Report])
            sequelize.addModels([BadgeUser])

            // Models Workshop
            sequelize.addModels([Universe, Skill, Stat, Class, Item, Coin]);
            sequelize.addModels([CharacterCoin, CharacterItem, Character, CharacterStat, CharacterSkill]);

            // Relations Général
            User.hasMany(Friend, { foreignKey: "user_ask_id", onDelete: "CASCADE" })
            User.hasMany(Friend, { foreignKey: "user_answer_id", onDelete: "CASCADE" })
            User.hasMany(Report, { foreignKey: "user_id", onDelete: "CASCADE" })
            User.hasMany(Report, { foreignKey: "admin_id", onDelete: "CASCADE" })

            Preference.hasMany(User, { foreignKey: "preference_id", onDelete: "SET DEFAULT" })

            User.belongsToMany(Badge, { through: BadgeUser, foreignKey: 'badge_id' })
            Badge.belongsToMany(User, { through: BadgeUser, foreignKey: 'user_id' })

            // Relations Workshop
            User.hasMany(Character, { foreignKey: "user_id", onDelete: "CASCADE" })
            Class.hasMany(Character, { foreignKey: "class_id", onDelete: "CASCADE" })

            Universe.hasMany(Class, { foreignKey: "universe_id", onDelete: "CASCADE" })
            Universe.hasMany(Item, { foreignKey: "universe_id", onDelete: "CASCADE" })
            Universe.hasMany(Skill, { foreignKey: "universe_id", onDelete: "CASCADE" })
            Universe.hasMany(Coin, { foreignKey: "universe_id", onDelete: "CASCADE" })
            Universe.hasMany(Stat, { foreignKey: "universe_id", onDelete: "CASCADE" })

            Character.belongsToMany(Item, { through: CharacterItem, foreignKey: 'item_id' })
            Character.belongsToMany(Coin, { through: CharacterCoin, foreignKey: 'coin_id' })
            Character.belongsToMany(Skill, { through: CharacterSkill, foreignKey: 'skill_id' })
            Character.belongsToMany(Stat, { through: CharacterStat, foreignKey: 'stat_id' })

            Item.belongsToMany(Character, { through: CharacterItem, foreignKey: 'character_id' })
            Coin.belongsToMany(Character, { through: CharacterCoin, foreignKey: 'character_id' })
            Skill.belongsToMany(Character, { through: CharacterSkill, foreignKey: 'character_id' })
            Stat.belongsToMany(Character, { through: CharacterStat, foreignKey: 'character_id' })
            
            await sequelize.sync();
            return sequelize;
        },
    },
];