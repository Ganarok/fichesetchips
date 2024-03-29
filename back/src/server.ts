import express from "express";
import bodyParser from "body-parser"
import cors from "cors"
import { routing } from "./routes/routes"
import { configSwagger } from "./utils/swagger/config"
import * as dotenv from 'dotenv'
import { Server } from 'socket.io'
import { createServer } from 'http'
import initSockets from "./sockets/index"
import { databaseConnection } from "./database/init/connection";
import fs from "fs";
const https = require("https");
const morgan = require('morgan')

dotenv.config();
const app = express();
app.use(morgan('combined'))
app.set("db_connexion", false)
databaseConnection()
    .then(() => {
        httpServer.emit("dbConnected")
    })

const port = parseInt(process.env.PORT || "9000")
const host = process.env.HOST || "localhost"

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.raw({ type: 'application/octet-stream', limit: '10mb' }));

configSwagger(app)
routing(app);

let httpServer = createServer(app)
if (process.env.NODE_ENV && process.env.NODE_ENV === "production") {
    httpServer = https.createServer({
            key: fs.readFileSync("privkey.pem").toString(),
            cert: fs.readFileSync("fullchain.pem").toString()
        },app)
}
const io = new Server(httpServer, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"]
    }
})
const ioRooms = io.of('/rooms')

httpServer.on('dbConnected', () => {
    httpServer.listen(port, host, () => {
        console.log(`App is running here : http://${host}:${port} \nYou can find the doc here : http://${host}:${port}/docs`);
    })

    initSockets(ioRooms)
})

export default httpServer