import { Sequelize } from 'sequelize-typescript';
import { Preference } from 'src/schemas/preference.schema';
import { User } from 'src/schemas/user.schema';

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
            sequelize.addModels([User, Preference]);
            Preference.hasOne(User, {foreignKey: "preference_id", onDelete: "SET DEFAULT"})
            User.belongsTo(Preference)
            await sequelize.sync();
            return sequelize;
        },
    },
];