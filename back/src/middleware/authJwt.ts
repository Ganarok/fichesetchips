import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const jwtSecret = process.env.JWTSECRET || "SECRET"

export interface CustomRequest extends Request {
  jwtPayload: string | JwtPayload;
}

export const verifyToken = async (req: any, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new Error("Authentification failed: NO bearer token");
    }

    const decoded = jwt.verify(token, jwtSecret);
    (req as CustomRequest).jwtPayload = decoded;

    next();
  } catch (err) {
    res.status(401).send({ message: 'Authentification failed: wrong bearer token', error: "Unauthorized" });
  }
};