import * as dotenv from 'dotenv'
dotenv.config()

if (!process.env.DB_USERNAME || !process.env.DB_PASSWORD || !process.env.DB_NAME || !process.env.PORT || !process.env.expiresIn || !process.env.JWTSECRET) {
    console.log("Failed to get .env variables")
}
const username = process.env.DB_USERNAME || "username"
const password = process.env.DB_PASSWORD || "password"
const database = process.env.DB_NAME || "database"
const port = parseInt(process.env.PORT) || 3000

export const configuration = {
    port: port,
    database: {
        mongooseConnectionUrl: `mongodb+srv://${username}:${password}@ficheschips.qgyrk.mongodb.net/${database}?retryWrites=true&w=majority`
    },
    jwt: {
        secret: process.env.JWTSECRET || 'secret',
        expiresIn: process.env.expiresIn || '3600'
    }
}


