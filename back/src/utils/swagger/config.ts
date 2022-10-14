import { definitions } from "./definitions";
import * as dotenv from 'dotenv'
dotenv.config()

const port = parseInt(process.env.PORT || "9000")
const host = process.env.HOST || "localhost"

export const config = {
    openapi: '3.0.0',
    info: {
        title: "Fiches&Chips",
        description: "API REST du projet Fiches&Chips",
        version: '1.0.0',
        license: {
            name: 'Licensed Under MIT',
            url: 'https://spdx.org/licenses/MIT.html',
        },
        contact: {
            name: 'JSONPlaceholder',
            url: 'https://jsonplaceholder.typicode.com',
        },
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                description: 'Enter JWT token',
                name: 'JWT',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                value: "Bearer <JWT token here>"
            }
        },
    },
    servers: [
        {
            url: `http://${host}:${port}`,
            description: 'Development server',
        },
        {
            url: `http://localhost:${port}`,
            description: 'Local server',
        },
    ],
    tags: [
        {
            name: "Authentification",
            description: "Everything needed in order to authentificate"
        },
        {
            name: "Users",
            description: "Everything about the users"
        }
    ],
    definitions: definitions
};