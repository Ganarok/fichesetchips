import express, { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { CustomRequest } from "../../middleware/authJwt";
import * as storiesService from "../../services/workshop/stories"
import { getErrorMessage } from "../../utils/error-handler/getErrorMessage";

const router = express.Router();

router.get("/", async (req: Request, res) => {
    /**
     * @swagger
     * /stories:
     *   get:
     *     description: Get my created stories.
     *     tags: 
     *       - Stories
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Stories found.
     *         content:
     *           application/json:
     *             schema: { $ref: '#/definitions/getStoriesResponse' }
     *       401:
     *         description: UnAuthorized
     *         content:
     *           application/json:
     *             schema: { $ref: '#/definitions/unAuthorizedResponse' }
     */
    try {
        const response = await storiesService.find(((req as CustomRequest).jwtPayload as JwtPayload).username);
        res.status(200).send({ data: response, message: 'Stories successfully found' });
    } catch (error) {
        return getErrorMessage(error, res);
    }
})

router.get("/:story_id", async (req: Request, res) => {
    /**
     * @swagger
     * /stories/{story_id}:
     *   get:
     *     description: Get a story.
     *     tags: 
     *       - Stories
     *     parameters:
     *     - in: "path"
     *       name: "story_id"
     *       schema: { type: "string" }
     *       required: true
     *       description: "id of the story"
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Story found.
     *         content:
     *           application/json:
     *             schema: { $ref: '#/definitions/getStoryResponse' }
     *       401:
     *         description: UnAuthorized
     *         content:
     *           application/json:
     *             schema: { $ref: '#/definitions/unAuthorizedResponse' }
     */
    try {
        const response = await storiesService.findOne(((req as CustomRequest).jwtPayload as JwtPayload).username, req.params.story_id);
        res.status(200).send({ data: response, message: 'Story successfully found' });
    } catch (error) {
        return getErrorMessage(error, res);
    }
})

router.post("/", async (req: Request, res) => {
    /**
     * @swagger
     * /stories:
     *   post:
     *     description: Post a story.
     *     tags: 
     *       - Stories
     *     requestBody:
     *       description: The story to create
     *       required: true
     *       content:
     *         application/json:
     *           schema: { $ref: '#/definitions/createStoryRequest' }
     *     parameters: 
     *       - in: query
     *         name: title
     *         schema:
     *           type: sting
     *           description: The title of your file
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Story created.
     *         content:
     *           application/json:
     *             schema: { $ref: '#/definitions/getStoryResponse' }
     *       401:
     *         description: UnAuthorized
     *         content:
     *           application/json:
     *             schema: { $ref: '#/definitions/unAuthorizedResponse' }
     */
    try {
        if (req.body && req.query.title) {
            const arrayBuffer = Buffer.from(req.body);
            const response = await storiesService.create(((req as CustomRequest).jwtPayload as JwtPayload).username, { file: arrayBuffer, title: req.query.title as string });
            res.status(200).send({ data: response, message: 'Story successfully created' });
        } else {
            const e = Error("Wrong params")
            e.name = "Unexpected parameters"
            throw e
        }
    } catch (error) {
        return getErrorMessage(error, res);
    }
})

router.patch("/:story_id", async (req: Request, res) => {
    /**
     * @swagger
     * /stories/{story_id}:
     *   patch:
     *     description: Patch a story.
     *     tags: 
     *       - Stories
     *     parameters:
     *     - in: "path"
     *       name: "story_id"
     *       schema: { type: "string" }
     *       required: true
     *       description: "id of the story"
     *     requestBody:
     *       description: The story to create
     *       required: true
     *       content:
     *         application/json:
     *           schema: { $ref: '#/definitions/createStoryRequest' }
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Story patched.
     *         content:
     *           application/json:
     *             schema: { $ref: '#/definitions/getStoryResponse' }
     *       401:
     *         description: UnAuthorized
     *         content:
     *           application/json:
     *             schema: { $ref: '#/definitions/unAuthorizedResponse' }
     */
    try {
        const response = await storiesService.update(((req as CustomRequest).jwtPayload as JwtPayload).username, req.body, req.params.story_id);
        res.status(200).send({ data: response, message: 'Story successfully patched' });
    } catch (error) {
        return getErrorMessage(error, res);
    }
})

router.delete("/:story_id", async (req: Request, res) => {
    /**
     * @swagger
     * /stories/{story_id}:
     *   delete:
     *     description: Delete a story.
     *     tags: 
     *       - Stories
     *     parameters:
     *     - in: "path"
     *       name: "story_id"
     *       schema: { type: "string" }
     *       required: true
     *       description: "id of the story"
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Story deleted.
     *         content:
     *           application/json:
     *             schema: { $ref: '#/definitions/getStoryResponse' }
     *       401:
     *         description: UnAuthorized
     *         content:
     *           application/json:
     *             schema: { $ref: '#/definitions/unAuthorizedResponse' }
     */
    try {
        const response = await storiesService.destroy(((req as CustomRequest).jwtPayload as JwtPayload).username, req.params.story_id);
        res.status(200).send({ data: response, message: 'Story successfully deleted' });
    } catch (error) {
        return getErrorMessage(error, res);
    }
})

export default router;