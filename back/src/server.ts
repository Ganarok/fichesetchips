import express from "express"
import bodyParser from "body-parser"
import cors from "cors"

import * as swaggerUi from "swagger-ui-express"

import { routing } from "./routes/routes"
import { config as swaggerDefinition } from "./utils/swagger/config"

import * as dotenv from 'dotenv'
dotenv.config()

const app = express();

const port = parseInt(process.env.PORT || "9000")
const host = process.env.HOST || "localhost"

// swaggerJSDoc
const swaggerJSDoc = require('swagger-jsdoc');

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