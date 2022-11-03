import { Response, NextFunction, Request } from "express";
import * as usersService from "../services/users";
import { JwtPayload } from "jsonwebtoken";
import { CustomRequest } from "../middleware/authJwt";
import { User } from "../database/entities/User";

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: User | any = await usersService.findProfile(
      ((req as CustomRequest).jwtPayload as JwtPayload).username
    );

    if (user == null) {
      res.status(404).send({ message: "User not found", error: "Not Found" });
      return;
    }

    if (user.user.role != "ADMIN" && user.user.role != "SUPERADMIN") {
      res.status(401).send({ message: 'Authentification failed: ADMIN ONLY', error: "Unauthorized" });
      return;
    }

    next();
  } catch (err) {
    res.status(401).send({ message: 'Authentification failed: wrong bearer token', error: "Unauthorized" });
  }
};
