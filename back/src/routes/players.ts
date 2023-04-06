import express, { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { CustomRequest } from "../middleware/authJwt";
import * as playerService from "../services/players"
import { getErrorMessage } from "../utils/error-handler/getErrorMessage";
import { dataValidator } from "../middleware/typeValidator";
import { SetPlayer } from "../utils/types/players";

const router = express.Router();

router.patch("/:player_id", dataValidator(SetPlayer), async (req: Request, res) => {
    /**
     * @swagger
     * /players/{player_id}:
     *   patch:
     *     description: Set a character to a player
     *     tags: 
     *       - Players
     *     parameters:
     *     - in: "path"
     *       name: "player_id"
     *       schema: { type: "string" }
     *       required: true
     *       description: "id of the player"
     *     requestBody:
     *       description: The character_id we want to link to the player.
     *       required: true
     *       content:
     *         application/json:
     *           schema: { $ref: '#/definitions/updatePlayerRequest' }
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Player updated.
     *         content:
     *           application/json:
     *             schema: { $ref: '#/definitions/getPlayerResponse' }
     *       401:
     *         description: UnAuthorized
     *         content:
     *           application/json:
     *             schema: { $ref: '#/definitions/unAuthorizedResponse' }
     */
    try {
        const response = await playerService.update(((req as CustomRequest).jwtPayload as JwtPayload).username, req.view_instance, req.params.player_id);
        res.status(200).send({ data: response, message: 'Player successfully patched' });
    } catch (error) {
        return getErrorMessage(error, res);
    }
})

export default router;