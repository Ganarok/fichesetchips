import "reflect-metadata"
import { DataSource } from "typeorm"
import * as dotenv from 'dotenv'
dotenv.config()
// This datasource is used in order to create the database initially with `db:create` script
export const EmptyDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    synchronize: true,
    logging: false,
    entities: ["src/database/entities/public/*.ts"],
    migrations: [process.env.DB_MIGRATION_DIR || "src/database/migrations/*.ts"],
    subscribers: ["src/database/subscribers/*.ts"]
})