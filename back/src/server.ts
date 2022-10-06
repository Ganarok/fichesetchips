import express from "express";
import { routing } from "./routes/routes";
const cors = require('cors');

const app = express();

const port = parseInt(process.env.PORT || "5432")
const host = process.env.HOST || "localhost"

app.use(cors())

// BEGIN swaggerUi
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
app.use('/docs', swaggerUi.serve);
app.get('/docs', swaggerUi.setup(swaggerDocument));
// END swaggerUi

routing(app);

app.listen(port, host, () => {
    console.log(`App is running here : http://${host}:${port} \nYou can find the doc here : http://${host}:${port}/docs`);
});