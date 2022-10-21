import { Response, NextFunction } from "express";
import * as usersService from "../services/users";
import { JwtPayload } from "jsonwebtoken";
import { CustomRequest } from "../middleware/authJwt";
import { User } from "../database/entities/User";

export const isAdmin = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: User | any = await usersService.findProfile(
      (req as CustomRequest).jwtPayload as JwtPayload
    );

    if (user == null) {
      res.status(500).send({ message: "User not found" });
      return;
    }

    if (user.user.role != "ADMIN") {
      res.status(401).send({ message: "Unauthorized" });
      return;
    }

    next();
  } catch (err) {
    res.status(401).send({ message: "Unauthorized" });
  }
};
