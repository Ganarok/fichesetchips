import express, { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { CustomRequest } from "../middleware/authJwt";
import * as gamesService from "../services/games"
import { getErrorMessage } from "../utils/error-handler/getErrorMessage";
import { GameStatus } from "../database/entities/public/Game";

const router = express.Router();

router.put("/:game_id", async (req: Request, res) => {
    /**
     * @swagger
     * /games/{game_id}:
     *   put:
     *     description: A gm can update a game.
     *     tags: 
     *       - Games
     *     parameters:
     *     - in: "path"
     *       name: "game_id"
     *       schema: { type: "string" }
     *       required: true
     *       description: "id of the game"
     *     requestBody:
     *       description: The game to update
     *       required: true
     *       content:
     *         application/json:
     *           schema: { $ref: '#/definitions/updateGameRequest' }
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Game updated.
     *         content:
     *           application/json:
     *             schema: { $ref: '#/definitions/getGameResponse' }
     *       401:
     *         description: UnAuthorized
     *         content:
     *           application/json:
     *             schema: { $ref: '#/definitions/unAuthorizedResponse' }
     */
    try {
        const response = await gamesService.update(((req as CustomRequest).jwtPayload as JwtPayload).username, req.body, req.params.game_id);
        res.status(200).send({ data: response, message: 'Game successfully patched' });
    } catch (error) {
        return getErrorMessage(error, res);
    }
})

export default router;