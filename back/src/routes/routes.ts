import { Express } from "express";
import users from "./users";
import auth from "./auth";
import reports from "./reports";
import { verifyToken } from "../middleware/authJwt";

export const routing = (app: Express) => {
  app.use("/users", verifyToken, users);
  app.use("/auth", auth);
  app.use("/reports", verifyToken, reports);
};
