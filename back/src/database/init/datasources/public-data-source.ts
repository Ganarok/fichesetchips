import "reflect-metadata"
import { DataSource } from "typeorm"
import * as dotenv from 'dotenv'
dotenv.config()

export const PublicDataSource = new DataSource({
    type: "postgres",
    schema: "public",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DB_NAME || "fichesetchips",
    synchronize: true,
    logging: false,
    entities: ["src/database/entities/public/characters/*.ts", "src/database/entities/public/workshop/*.ts", "src/database/entities/public/*.ts"],
    migrations: [process.env.DB_MIGRATION_DIR || "src/database/migrations/*.ts"],
    subscribers: ["src/database/subscribers/*.ts", "src/database/subscribers/characters/*.ts"]
})