import express from "express";
import { routing } from "./routes/routes";
import bodyParser from "body-parser"
import cors from "cors"
import * as swaggerUi from "swagger-ui-express"
import { definitions } from "./utils/swagger/definitions";
const app = express();

const port = parseInt(process.env.PORT || "5432")
const host = process.env.HOST || "localhost"

// swaggerJSDoc
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
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

const options = {
    swaggerDefinition,
    apis: ['src/routes/users.ts', 'src/routes/auth.ts'],
};

const swaggerSpec = swaggerJSDoc(options)

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
// end swaggerJSDoc

app.use(cors())
app.use(bodyParser.json());

routing(app);

app.listen(port, host, () => {
    console.log(`App is running here : http://${host}:${port} \nYou can find the doc here : http://${host}:${port}/docs`);
});