import express from "express";
import { JwtPayload } from "jsonwebtoken";
import { CustomRequest } from "../middleware/authJwt";
import * as usersService from "../services/users"
import { getErrorMessage } from "../utils/error-handler/getErrorMessage";

const router = express.Router();

router.get("/profile", async (req, res) => {
  /**
   * @swagger
   * /users/profile:
   *   get:
   *     description: Get my profile.
   *     tags: 
   *       - Users
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Private profile found.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   */
  try {
    const response = await usersService.findProfile((req as CustomRequest).jwtPayload as JwtPayload);
    res.status(200).send({ ...response, message: 'User profile successfully found' });
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
})
router.get("/profile/:username", async (req, res) => {
  /**
   * @swagger
   * /users/profile/{username}:
   *   get:
   *     description: Get the public profile of a dedicated user.
   *     tags: 
   *       - Users
   *     parameters:
   *     - in: "path"
   *       name: "username"
   *       schema: { type: "string" }
   *       required: true
   *       description: "username of the user to get"
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Public profile found.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   */
  try {
    const response = await usersService.findPublicProfile(req.params.username);
    res.status(200).send({ ...response, message: 'User public profile successfully found' });
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
})

export default router;