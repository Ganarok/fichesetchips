import { Express } from "express";
import users from "./users";
import auth from "./auth";

export const routing = (app: Express) => {
    app.use("/users", users)
    app.use("/auth", auth)
}
