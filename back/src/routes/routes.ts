import { Express } from "express";
import users from "./users";

export const routing = (app: Express) => {
    app.use("/users", users)
}
