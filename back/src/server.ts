import express from "express";
import { routing } from "./routes/routes";
const cors = require('cors');

const app = express();

const port = parseInt(process.env.PORT || "5432")
const host = process.env.HOST || "localhost"

app.use(cors())

routing(app);

app.listen(port, host, () => {
    console.log(`App is running ! Go to http://${host}:${port}`);
});