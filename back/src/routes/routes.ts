import { Express } from "express";
import users from "./users";
import auth from "./auth";
import friends from "./friends";
import characters from "./cem/characters";
import universes from "./universes";
import games from "./games";
// import players from "./players";
import stories from "./workshop/stories";
import maps from "./workshop/maps";
import { verifyToken } from "../middleware/authJwt";
import rooms from "./workshop/rooms";

export const routing = (app: Express) => {
    app.use("/users", verifyToken, users)
    app.use("/friends", verifyToken, friends)
    app.use("/auth", auth)
    app.use("/cem/characters", verifyToken, characters)
    app.use("/universes", verifyToken, universes)
    app.use("/stories", verifyToken, stories)
    app.use("/maps", verifyToken, maps)
    app.use("/rooms", verifyToken, rooms)
    app.use("/games", verifyToken, games)
    // app.use("/players", verifyToken, players)
}
