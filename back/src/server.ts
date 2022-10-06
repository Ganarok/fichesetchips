import express from "express";
// const cors = require('cors');
import { routing } from "./routes/routes";

const app = express();

function getPort() {
    if (process.env.PORT) return parseInt(process.env.PORT)
    else return 3000
}
function getHost() {
    if (process.env.HOST) return process.env.HOST
    else return "localhost"
}

const port = getPort()
const host = getHost()

// app.use(cors())

routing(app);

app.listen(port, host, () => {
    console.log(`App is running ! Go to http://${host}:${port}`);
});