import express from "express";
// import * as cors from 'cors'
import { routing } from "./routes/routes";

const app = express();
const port = process.env.PORT || 3000;

// app.use(cors())

routing(app);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});