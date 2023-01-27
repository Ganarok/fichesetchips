import express, { Request } from "express";
import * as universesService from "../services/universes"
import { getErrorMessage } from "../utils/error-handler/getErrorMessage";

const router = express.Router();

router.get("", async (req: Request, res) => {
    /**
     * @swagger
     * /universes:
     *   get:
     *     description: Get all available universes.
     *     tags: 
     *       - Universes
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Universe found.
     *         content:
     *           application/json:
     *             schema: { $ref: '#/definitions/getUniversesResponse' }
     *       401:
     *         description: UnAuthorized
     *         content:
     *           application/json:
     *             schema: { $ref: '#/definitions/unAuthorizedResponse' }
     */
  try {
    const response = await universesService.findAll();
    res.status(200).send({ ...response, message: 'Universes successfully found' });
  } catch (error) {
    return getErrorMessage(error, res);
  }
})

export default router;