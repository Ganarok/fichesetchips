import { Response, NextFunction } from "express";
import * as usersService from "../services/users";
import User from "../database/models/users";

export const isAdmin = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: User | any = usersService.findProfile(req.body);

    user.then(function (userFound: User | any) {
      if (userFound == null) {
        res.status(500).send({ message: "User not found" });
        return;
      }

      if (userFound.user.role != "ADMIN") {
        res.status(401).send({ message: "Unauthorized" });
        return;
      }

      next();
    });
  } catch (err) {
    res.status(401).send({ message: "Unauthorized" });
  }
};
