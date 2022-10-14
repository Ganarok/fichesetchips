import { Sequelize, Options } from "sequelize";

import * as dotenv from 'dotenv'
dotenv.config()

function connectToDatabase(): Sequelize {
    console.log(process.env.DB_HOST, process.env.DB_PORT, process.env.DB_USER, process.env.DB_PASSWORD, process.env.DB_NAME)
    if (process.env.DB_HOST && process.env.DB_PORT && process.env.DB_USER && process.env.DB_PASSWORD && process.env.DB_NAME) {

        const options: Options = { dialect: "postgres", host: process.env.DB_HOST, port: parseInt(process.env.DB_PORT), username: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_NAME }

        const sequelize = new Sequelize(options);

        sequelize.authenticate()

        return sequelize

    } else {
        throw new Error("DB_HOST or DB_PORT or DB_USER or DB_PASSWORD or DB_NAME is not defined")
    }
}

export const sequelize = connectToDatabase()
