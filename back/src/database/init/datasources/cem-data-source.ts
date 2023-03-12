import "reflect-metadata"
import { DataSource } from "typeorm"
import * as dotenv from 'dotenv'
dotenv.config()

export const CEMDataSource = new DataSource({
    type: "postgres",
    schema: "cem",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DB_NAME || "fichesetchips",
    synchronize: true,
    logging: false,
    entities: ["src/database/entities/cem/characters/*.ts", "src/database/entities/cem/*.ts"],
    migrations: [process.env.DB_MIGRATION_DIR || "src/database/migrations/*.ts"],
    subscribers: ["src/database/subscribers/cem/*.ts"]
})