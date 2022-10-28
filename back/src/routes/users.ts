import express, { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { CustomRequest } from "../middleware/authJwt";
import { isAdmin } from "../middleware/isAdmin";
import * as usersService from "../services/users"
import { getErrorMessage } from "../utils/error-handler/getErrorMessage";

const router = express.Router();

router.get("/profile", async (req: Request, res) => {
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
  try {
    const response = await usersService.findProfile(((req as CustomRequest).jwtPayload as JwtPayload).username);
    res.status(200).send({ ...response, message: 'User profile successfully found' });
  } catch (error) {
    return getErrorMessage(error, res);
  }
})

router.get("/profile/:username", async (req: Request, res) => {
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
    const user_who_asked = await usersService.findProfile(((req as CustomRequest).jwtPayload as JwtPayload).username);
    const user_we_want = await usersService.findProfile(req.params.username);
    const user_we_want_public_profile = await usersService.findPublicProfile(req.params.username);
    if (user_we_want.user.role == "SUPERADMIN") {
      res.status(401).send({ message: 'You cannot see the profile of this User', error: "Unauthorized" });
    } else if (user_we_want.user.role == "ADMIN" && user_who_asked.user.role == "SUPERADMIN") {
      res.status(200).send({ ...user_we_want, message: 'User private profile successfully found' });
    } else if (user_we_want.user.role == "ADMIN" && user_who_asked.user.role == "ADMIN") {
      res.status(200).send({ ...user_we_want_public_profile, message: 'User public profile successfully found' });
    } else if (user_we_want.user.role == "USER" && (user_who_asked.user.role == "SUPERADMIN" || user_who_asked.user.role == "ADMIN")) {
      res.status(200).send({ ...user_we_want, message: 'User private profile successfully found' });
    } else if (user_we_want.user.role == "USER" && user_who_asked.user.role == "USER") {
      res.status(200).send({ ...user_we_want_public_profile, message: 'User public profile successfully found' });
    } else {
      res.status(401).send({ message: 'You cannot see the profile of this User', error: "Unauthorized" });
    }
  } catch (error) {
    return getErrorMessage(error, res);
  }
})

router.patch("/", async (req: Request, res) => {
    /**
     * @swagger
     * /users:
     *   patch:
     *     description: Update my profile.
     *     tags: 
     *       - Users
     *     requestBody:
     *       description: The updates to do to the User
     *       required: true
     *       content:
     *         application/json:
     *           schema: { $ref: '#/definitions/updateUserRequest' }
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: User succesfully updated.
     *         content:
     *           application/json:
     *             schema: { $ref: '#/definitions/privateProfileResponse' }
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
    const response = await usersService.update(((req as CustomRequest).jwtPayload as JwtPayload).username, req.body);
    res.status(200).send({ ...response, message: 'User succesfully updated' });
  } catch (error) {
    return getErrorMessage(error, res);
  }
})

router.patch("/:username", isAdmin, async (req: Request, res) => {
    /**
     * @swagger
     * /users/{username}:
     *   patch:
     *     description: Update the profile of a user.
     *     tags: 
     *       - Users
     *     parameters:
     *     - in: "path"
     *       name: "username"
     *       schema: { type: "string" }
     *       required: true
     *       description: "username of the user to update"
     *     requestBody:
     *       description: The updates to do to the User
     *       required: true
     *       content:
     *         application/json:
     *           schema: { $ref: '#/definitions/updateUserRequest' }
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: User succesfully updated.
     *         content:
     *           application/json:
     *             schema: { $ref: '#/definitions/privateProfileResponse' }
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
    const { user } = await usersService.findProfile(req.params.username);
    if (user.role == "SUPERADMIN") {
      res.status(401).send({ message: 'You cannot update a SUPERADMIN', error: "Unauthorized" });
    } else if (user.role == "ADMIN") {
      const { user } = await usersService.findProfile(((req as CustomRequest).jwtPayload as JwtPayload).username);
      if (user.role != "SUPERADMIN") {
        res.status(401).send({ message: 'You cannot update an ADMIN', error: "Unauthorized" });
      } else {
        const response = await usersService.update(req.params.username, req.body);
        res.status(200).send({ ...response, message: 'User succesfully updated' });
      }
    } else {
      const response = await usersService.update(req.params.username, req.body);
      res.status(200).send({ ...response, message: 'User succesfully updated' });
    }
  } catch (error) {
    return getErrorMessage(error, res);
  }
})

router.delete("/", async (req: Request, res) => {
    /**
     * @swagger
     * /users:
     *   delete:
     *     description: Delete my profile.
     *     tags: 
     *       - Users
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: User succesfully deleted.
     *         content:
     *           application/json:
     *             schema: { $ref: '#/definitions/privateProfileResponse' }
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
    const response = await usersService.destroy(((req as CustomRequest).jwtPayload as JwtPayload).username);
    res.status(200).send({ ...response, message: 'User succesfully deleted' });
  } catch (error) {
    return getErrorMessage(error, res);
  }
})

router.delete("/:username", isAdmin, async (req: Request, res) => {
    /**
     * @swagger
     * /users/{username}:
     *   delete:
     *     description: Delete the profile of a user.
     *     tags: 
     *       - Users
     *     parameters:
     *     - in: "path"
     *       name: "username"
     *       schema: { type: "string" }
     *       required: true
     *       description: "username of the user to update"
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: User succesfully deleted.
     *         content:
     *           application/json:
     *             schema: { $ref: '#/definitions/privateProfileResponse' }
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
    const { user } = await usersService.findProfile(req.params.username);
    if (user.role == "SUPERADMIN") {
      res.status(401).send({ message: 'You are not authorized to deleted this user', error: "Unauthorized" });
    } else if (user.role == "ADMIN") {
      const { user } = await usersService.findProfile(((req as CustomRequest).jwtPayload as JwtPayload).username);
      if (user.role != "SUPERADMIN") {
        res.status(401).send({ message: 'You are not authorized to deleted this user', error: "Unauthorized" });
      } else {
        const response = await usersService.destroy(req.params.username);
        res.status(200).send({ ...response, message: 'User succesfully deleted' });
      }
    } else {
      const response = await usersService.destroy(req.params.username);
      res.status(200).send({ ...response, message: 'User succesfully deleted' });
    }
  } catch (error) {
    return getErrorMessage(error, res);
  }
})

export default router;