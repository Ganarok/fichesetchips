// import users from "./users";
import { Express } from "express";
import hello from "./hello";

export const routing = (app: Express) => {
    // app.use("/users", users)
    app.use("/hello", hello);
}
