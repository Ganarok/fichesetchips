import { Express } from "express";
import users from "./users";
import auth from "./auth";
import friends from "./friends";
import characters from "./cem/characters";
import universes from "./universes";
import { verifyToken } from "../middleware/authJwt";

export const routing = (app: Express) => {
    app.use("/users", verifyToken, users)
    app.use("/friends", verifyToken, friends)
    app.use("/auth", auth)
    app.use("/cem/characters", verifyToken, characters)
    app.use("/universes", verifyToken, universes)
}
