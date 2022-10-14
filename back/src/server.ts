import express from "express";
import bodyParser from "body-parser"
import cors from "cors"
import { routing } from "./routes/routes"
import { configSwagger } from "./utils/swagger/config"
import * as dotenv from 'dotenv'
dotenv.config()

const app = express();

const port = parseInt(process.env.PORT || "9000")
const host = process.env.HOST || "localhost"

app.use(cors())
app.use(bodyParser.json());

configSwagger(app)

routing(app);

app.listen(port, host, () => {
    console.log(`App is running here : http://${host}:${port} \nYou can find the doc here : http://${host}:${port}/docs`);
});