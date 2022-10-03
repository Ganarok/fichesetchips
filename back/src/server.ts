import express from "express";
import { routing } from "./routes/routes";
import connectToDatabase from "./databases/config";
import 'dotenv/config'

const app = express();
const port = process.env.PORT || 3000;

routing(app);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

const sequelize = connectToDatabase();