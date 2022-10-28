import express, { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { CustomRequest } from "../middleware/authJwt";
import * as friendsService from "../services/friends"
import { getErrorMessage } from "../utils/error-handler/getErrorMessage";
const router = express.Router();

router.get("/", async (req, res) => {
    /**
     * @swagger
     * /friends:
     *   get:
     *     description: Get all his/her friends
     *     tags: 
     *       - Friends
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Friends found.
     *         content:
     *           application/json:
     *             schema: { $ref: '#/definitions/friendsResponse' }
     *       404:
     *         description: Not Found
     *         content:
     *           application/json:
     *             schema: { $ref: '#/definitions/notFoundResponse' }
     *       401:
     *         description: UnAuthorized
     *         content:
     *           application/json:
     *             schema: { $ref: '#/definitions/unAuthorizedResponse' }
     */
    try {
        const response = await friendsService.findMyFriends(((req as CustomRequest).jwtPayload as JwtPayload).username);
        res.status(200).send({ ...response, message: "Friends succesfully found" });
    } catch (error) {
        return getErrorMessage(error, res);
    }
})

router.get("/pending/requested", async (req, res) => {
    /**
     * @swagger
     * /friends/pending/requested:
     *   get:
     *     description: Get all my pending requested friends
     *     tags: 
     *       - Friends
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Friends found.
     *         content:
     *           application/json:
     *             schema: { $ref: '#/definitions/friendsPendingResponse' }
     *       404:
     *         description: Not Found
     *         content:
     *           application/json:
     *             schema: { $ref: '#/definitions/notFoundResponse' }
     *       401:
     *         description: UnAuthorized
     *         content:
     *           application/json:
     *             schema: { $ref: '#/definitions/unAuthorizedResponse' }
     */
    try {
        const response = await friendsService.findPendingRequestedFriendsFromAUser(((req as CustomRequest).jwtPayload as JwtPayload).id);
        res.status(200).send({ ...response, message: "Friends succesfully found" });
    } catch (error) {
        return getErrorMessage(error, res);
    }
})

router.get("/pending/approval", async (req, res) => {
    /**
     * @swagger
     * /friends/pending/approval:
     *   get:
     *     description: Get all my pending approval
     *     tags: 
     *       - Friends
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Friends found.
     *         content:
     *           application/json:
     *             schema: { $ref: '#/definitions/friendsPendingResponse' }
     *       404:
     *         description: Not Found
     *         content:
     *           application/json:
     *             schema: { $ref: '#/definitions/notFoundResponse' }
     *       401:
     *         description: UnAuthorized
     *         content:
     *           application/json:
     *             schema: { $ref: '#/definitions/unAuthorizedResponse' }
     */
    try {
        const response = await friendsService.findPendingapprovalFriendsFromAUser(((req as CustomRequest).jwtPayload as JwtPayload).id);
        res.status(200).send({ ...response, message: "Friends succesfully found" });
    } catch (error) {
        return getErrorMessage(error, res);
    }
})

router.get("/:username", async (req: Request, res) => {
    /**
     * @swagger
     * /friends/{username}:
     *   get:
     *     description: Get all friends of a user
     *     tags: 
     *       - Friends
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *     - in: "path"
     *       name: "username"
     *       schema: { type: "string" }
     *       required: true
     *       description: "username of the user to get friends for"
     *     responses:
     *       200:
     *         description: Friends found.
     *         content:
     *           application/json:
     *             schema: { $ref: '#/definitions/friendsResponse' }
     *       404:
     *         description: Not Found
     *         content:
     *           application/json:
     *             schema: { $ref: '#/definitions/notFoundResponse' }
     *       401:
     *         description: UnAuthorized
     *         content:
     *           application/json:
     *             schema: { $ref: '#/definitions/unAuthorizedResponse' }
     */
    try {
        const response = await friendsService.findFriendsFromAUser(req.params.username);
        res.status(200).send({ ...response, message: "Friends succesfully found" });
    } catch (error) {
        return getErrorMessage(error, res);
    }
})


router.post("/", async (req, res) => {
    /**
     * @swagger
     * /friends:
     *   post:
     *     description: Ask a user to be friend
     *     tags: 
     *       - Friends
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       description: The user that will be ask for friendship
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties: 
     *               username:
     *                 type: string
     *                 default: user
     *     responses:
     *       200:
     *         description: Friend asked.
     *         content:
     *           application/json:
     *             schema: { $ref: '#/definitions/friendsResponse' }
     *       404:
     *         description: Not Found
     *         content:
     *           application/json:
     *             schema: { $ref: '#/definitions/notFoundResponse' }
     *       401:
     *         description: UnAuthorized
     *         content:
     *           application/json:
     *             schema: { $ref: '#/definitions/unAuthorizedResponse' }
     *       409:
     *         description: Database conflict
     *         content:
     *           application/json:
     *             schema: { $ref: '#/definitions/conflictResponse' }
     */
    try {
        const response = await friendsService.askAFriend(((req as CustomRequest).jwtPayload as JwtPayload).id, req.body.username);
        res.status(200).send({ ...response, message: 'Friend successfully asked' });
    } catch (error) {
        return getErrorMessage(error, res);
    }
})

router.patch("/:username", async (req: Request, res) => {
    /**
     * @swagger
     * /friends/{username}:
     *   patch:
     *     description: Accept a friendship
     *     tags: 
     *       - Friends
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       description: The user that will be ask for friendship
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties: 
     *               accepted:
     *                 type: boolean
     *                 default: "true"
     *     parameters:
     *     - in: "path"
     *       name: "username"
     *       schema: { type: "string" }
     *       required: true
     *       description: "username of the user to accept friendship"
     *     responses:
     *       200:
     *         description: Friends found.
     *         content:
     *           application/json:
     *             schema: { $ref: '#/definitions/friendsResponse' }
     *       404:
     *         description: Not Found
     *         content:
     *           application/json:
     *             schema: { $ref: '#/definitions/notFoundResponse' }
     *       401:
     *         description: UnAuthorized
     *         content:
     *           application/json:
     *             schema: { $ref: '#/definitions/unAuthorizedResponse' }
     */
    try {
        if (Object.keys(req.body).every(elem => ["accepted"].includes(elem)) == false || req.body.hasOwnProperty("accepted") == false || (typeof req.body.accepted != "boolean")) {
            throw new Error("Unexpected parameters")
        }
        const response = await friendsService.updateFriend(((req as CustomRequest).jwtPayload as JwtPayload).id, req.params.username, req.body.accepted);
        res.status(200).send({ ...response, message: "Friends succesfully updated" });
    } catch (error) {
        return getErrorMessage(error, res);
    }
})

router.delete("/:username", async (req: Request, res) => {
    /**
     * @swagger
     * /friends/{username}:
     *   delete:
     *     description: Delete a friend
     *     tags: 
     *       - Friends
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *     - in: "path"
     *       name: "username"
     *       schema: { type: "string" }
     *       required: true
     *       description: "username of the user to get friends for"
     *     responses:
     *       200:
     *         description: Friends found.
     *         content:
     *           application/json:
     *             schema: { $ref: '#/definitions/friendsResponse' }
     *       404:
     *         description: Not Found
     *         content:
     *           application/json:
     *             schema: { $ref: '#/definitions/notFoundResponse' }
     *       401:
     *         description: UnAuthorized
     *         content:
     *           application/json:
     *             schema: { $ref: '#/definitions/unAuthorizedResponse' }
     */
    try {
        const response = await friendsService.deleteFriend(((req as CustomRequest).jwtPayload as JwtPayload).id, req.params.username);
        res.status(200).send({ ...response, message: "Friends succesfully deleted" });
    } catch (error) {
        return getErrorMessage(error, res);
    }
})

export default router;
