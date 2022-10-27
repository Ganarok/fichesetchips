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
   *             schema: { $ref: '#/definitions/privateProfileResponse' }
   *       401:
   *         description: UnAuthorized
   *         content:
   *           application/json:
   *             schema: { $ref: '#/definitions/unAuthorizedResponse' }
   */
  const response = await usersService.findProfile((req as CustomRequest).jwtPayload as JwtPayload);
  res.status(200).send({ ...response, message: 'User profile successfully found' });
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
   *             schema: { $ref: '#/definitions/publicProfileResponse' }
   *       401:
   *         description: User isn't authorized
   *         content:
   *           application/json:
   *             schema: { $ref: '#/definitions/unAuthorizedResponse' }
   *       404:
   *         description: Not Found
   *         content:
   *           application/json:
   *             schema: { $ref: '#/definitions/notFoundResponse' }
   */
  try {
    const response = await usersService.findPublicProfile(req.params.username);
    res.status(200).send({ ...response, message: 'User public profile successfully found' });
  } catch (error) {
    return res.send(getErrorMessage(error, res));
  }
})

export default router;