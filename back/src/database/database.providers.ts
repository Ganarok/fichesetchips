import { Sequelize } from 'sequelize-typescript';
import { Preference } from 'src/schemas/preference.schema';
import { User } from 'src/schemas/user.schema';

import * as dotenv from 'dotenv'
import { Friends } from 'src/schemas/friends.schema';
import { Badge } from 'src/schemas/badge.schema';
import { BadgeUser } from 'src/schemas/badgeUser.schema';
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
            sequelize.addModels([User, Preference, Friends, Badge, BadgeUser]);
            Preference.hasOne(User, {foreignKey: "preference_id", onDelete: "SET DEFAULT"})
            User.hasMany(Friends, {foreignKey: "user_ask_id", onDelete: "CASCADE"})
            User.hasMany(Friends, {foreignKey: "user_answer_id", onDelete: "CASCADE"})
            Badge.belongsToMany(User, { through: BadgeUser, foreignKey: 'user_id' })
            User.belongsToMany(Badge, { through: BadgeUser, foreignKey: 'badge_id' })
            await sequelize.sync();
            return sequelize;
        },
    },
];