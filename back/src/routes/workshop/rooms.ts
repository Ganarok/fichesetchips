import express, { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { CustomRequest } from "../../middleware/authJwt";
import * as roomsService from "../../services/workshop/rooms"
import { getErrorMessage } from "../../utils/error-handler/getErrorMessage";

const router = express.Router();

router.get("/", async (req: Request, res) => {
    /**
     * @swagger
     * /rooms:
     *   get:
     *     description: For a given user, get the rooms created by me and not published, created by me and published, not created by me and public, not created by me and private, I'm in as a player
     *     tags: 
     *       - Rooms
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Rooms found.
     *         content:
     *           application/json:
     *             schema: { $ref: '#/definitions/getRoomsResponse' }
     *       401:
     *         description: UnAuthorized
     *         content:
     *           application/json:
     *             schema: { $ref: '#/definitions/unAuthorizedResponse' }
     */
    try {
        const response = await roomsService.findAll(((req as CustomRequest).jwtPayload as JwtPayload).username);
        res.status(200).send({ data: response, message: 'Rooms found' });
    } catch (error) {
        return getErrorMessage(error, res);
    }
})

router.get("/:room_id", async (req: Request, res) => {
    /**
     * @swagger
     * /rooms/{room_id}:
     *   get:
     *     description: Get a room.
     *     tags: 
     *       - Rooms
     *     parameters:
     *     - in: "path"
     *       name: "room_id"
     *       schema: { type: "string" }
     *       required: true
     *       description: "id of the room"
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Room found.
     *         content:
     *           application/json:
     *             schema: { $ref: '#/definitions/getRoomResponse' }
     *       401:
     *         description: UnAuthorized
     *         content:
     *           application/json:
     *             schema: { $ref: '#/definitions/unAuthorizedResponse' }
     */
    try {
        const response = await roomsService.findOne(((req as CustomRequest).jwtPayload as JwtPayload).username, req.params.room_id);
        res.status(200).send({ data: response, message: 'Room successfully found' });
    } catch (error) {
        return getErrorMessage(error, res);
    }
})

router.post("/", async (req: Request, res) => {
    /**
     * @swagger
     * /rooms/creator:
     *   post:
     *     description: Post a room.
     *     tags: 
     *       - Rooms
     *     requestBody:
     *       description: The room to create
     *       required: true
     *       content:
     *         application/json:
     *           schema: { $ref: '#/definitions/createRoomRequest' }
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Room created.
     *         content:
     *           application/json:
     *             schema: { $ref: '#/definitions/getRoomResponse' }
     *       401:
     *         description: UnAuthorized
     *         content:
     *           application/json:
     *             schema: { $ref: '#/definitions/unAuthorizedResponse' }
     */
    try {
        const response = await roomsService.create(((req as CustomRequest).jwtPayload as JwtPayload).username, req.body);
        res.status(200).send({ data: response, message: 'Room successfully created' });
    } catch (error) {
        return getErrorMessage(error, res);
    }
})

router.patch("/:room_id", async (req: Request, res) => {
    /**
     * @swagger
     * /rooms/creator/{room_id}:
     *   patch:
     *     description: A gm can put on published one of his created rooms => only if the object game is correctly set (with story_id and map_id).
     *     tags: 
     *       - Rooms
     *     parameters:
     *     - in: "path"
     *       name: "room_id"
     *       schema: { type: "string" }
     *       required: true
     *       description: "id of the room"
     *     requestBody:
     *       description: to publish or unpublish the room
     *       required: true
     *       content:
     *         application/json:
     *           schema: { type: "object", properties: { is_published: {type: boolean, default: true} } }
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Room patched.
     *         content:
     *           application/json:
     *             schema: { $ref: '#/definitions/getRoomResponse' }
     *       401:
     *         description: UnAuthorized
     *         content:
     *           application/json:
     *             schema: { $ref: '#/definitions/unAuthorizedResponse' }
     */
    try {
        const response = await roomsService.publish(((req as CustomRequest).jwtPayload as JwtPayload).username, req.body, req.params.room_id);
        res.status(200).send({ data: response, message: 'Room successfully patched' });
    } catch (error) {
        return getErrorMessage(error, res);
    }
})

router.put("/:room_id", async (req: Request, res) => {
    /**
     * @swagger
     * /rooms/creator/{room_id}:
     *   put:
     *     description: A gm can update a room.
     *     tags: 
     *       - Rooms
     *     parameters:
     *     - in: "path"
     *       name: "room_id"
     *       schema: { type: "string" }
     *       required: true
     *       description: "id of the room"
     *     requestBody:
     *       description: The room to update
     *       required: true
     *       content:
     *         application/json:
     *           schema: { $ref: '#/definitions/createRoomRequest' }
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Room patched.
     *         content:
     *           application/json:
     *             schema: { $ref: '#/definitions/getRoomResponse' }
     *       401:
     *         description: UnAuthorized
     *         content:
     *           application/json:
     *             schema: { $ref: '#/definitions/unAuthorizedResponse' }
     */
    try {
        const response = await roomsService.update(((req as CustomRequest).jwtPayload as JwtPayload).username, req.body, req.params.room_id);
        res.status(200).send({ data: response, message: 'Room successfully patched' });
    } catch (error) {
        return getErrorMessage(error, res);
    }
})

router.delete("/:room_id", async (req: Request, res) => {
    /**
     * @swagger
     * /rooms/creator/{room_id}:
     *   delete:
     *     description: Delete a room as a gm.
     *     tags: 
     *       - Rooms
     *     parameters:
     *     - in: "path"
     *       name: "room_id"
     *       schema: { type: "string" }
     *       required: true
     *       description: "id of the room"
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Room deleted.
     *         content:
     *           application/json:
     *             schema: { $ref: '#/definitions/getRoomResponse' }
     *       401:
     *         description: UnAuthorized
     *         content:
     *           application/json:
     *             schema: { $ref: '#/definitions/unAuthorizedResponse' }
     */
    try {
        const response = await roomsService.destroy(((req as CustomRequest).jwtPayload as JwtPayload).username, req.params.room_id);
        res.status(200).send({ data: response, message: 'Room successfully deleted' });
    } catch (error) {
        return getErrorMessage(error, res);
    }
})

router.patch("/:room_id/join", async (req: Request, res) => {
    /**
     * @swagger
     * /rooms/{room_id}:
     *   patch:
     *     description: A user can enter a room that he has the password / a public room.
     *     tags: 
     *       - Rooms
     *     parameters:
     *     - in: "path"
     *       name: "room_id"
     *       schema: { type: "string" }
     *       required: true
     *       description: "id of the room"
     *     requestBody:
     *       description: The password if needed
     *       content:
     *         application/json:
     *           schema: { type: "object", properties: { password: {type: string, default: ""} } }
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Room patched.
     *         content:
     *           application/json:
     *             schema: { $ref: '#/definitions/getRoomResponse' }
     *       401:
     *         description: UnAuthorized
     *         content:
     *           application/json:
     *             schema: { $ref: '#/definitions/unAuthorizedResponse' }
     */
    try {
        const response = await roomsService.publish(((req as CustomRequest).jwtPayload as JwtPayload).username, req.body, req.params.room_id);
        res.status(200).send({ data: response, message: 'Room successfully patched' });
    } catch (error) {
        return getErrorMessage(error, res);
    }
})

export default router;