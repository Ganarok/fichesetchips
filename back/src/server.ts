import express from "express";
import { routing } from "./routes/routes";
import bodyParser from "body-parser"
import cors from "cors"
import * as swaggerUi from "swagger-ui-express"
import * as swaggerDocument from "./utils/swagger/swagger.json"
const app = express();

const port = parseInt(process.env.PORT || "5432")
const host = process.env.HOST || "localhost"

app.use(cors())
app.use(bodyParser.json());

// BEGIN swaggerUi
app.use('/docs', swaggerUi.serve);
app.get('/docs', swaggerUi.setup(swaggerDocument));
// END swaggerUi

routing(app);

app.listen(port, host, () => {
    console.log(`App is running here : http://${host}:${port} \nYou can find the doc here : http://${host}:${port}/docs`);
});