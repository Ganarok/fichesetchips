import express, { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { CustomRequest } from "../../middleware/authJwt";
import * as charactersService from "../../services/characters/characters"
import { getErrorMessage } from "../../utils/error-handler/getErrorMessage";

const router = express.Router();

router.get("/", async (req: Request, res) => {
  /**
   * @swagger
   * /cem/characters:
   *   get:
   *     description: Get my characters from the CavesEtMonstres universe.
   *     tags: 
   *       - Workshop
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Characters found.
   *         content:
   *           application/json:
   *             schema: { $ref: '#/definitions/getCharactersResponse' }
   *       401:
   *         description: UnAuthorized
   *         content:
   *           application/json:
   *             schema: { $ref: '#/definitions/unAuthorizedResponse' }
   */
  try {
    const response = await charactersService.findAll(((req as CustomRequest).jwtPayload as JwtPayload).id);
    res.status(200).send({ data: response, message: 'Characters successfully found' });
  } catch (error) {
    return getErrorMessage(error, res);
  }
})

router.get("/creation", async (req: Request, res) => {
  /**
   * @swagger
   * /cem/characters/creation:
   *   get:
   *     description: Get all the steps for character creation from the CavesEtMonstres universe.
   *     tags: 
   *       - Workshop
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Steps found.
   *         content:
   *           application/json:
   *             schema: { $ref: '#/definitions/characterWorkshopResponse' }
   *       401:
   *         description: UnAuthorized
   *         content:
   *           application/json:
   *             schema: { $ref: '#/definitions/unAuthorizedResponse' }
   */
  try {
    const response = await charactersService.characterCreation();
    res.status(200).send({ data: response, message: 'Steps successfully found' });
  } catch (error) {
    return getErrorMessage(error, res);
  }
})

router.post("/creation", async (req: Request, res) => {
  /**
   * @swagger
   * /cem/characters/creation:
   *   post:
   *     description: Create your character from the CavesEtMonstres universe.
   *     tags: 
   *       - Workshop
   *     requestBody:
   *       description: The character to register
   *       required: true
   *       content:
   *         application/json:
   *           schema: { $ref: '#/definitions/createCharacterRequest' }
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Character created.
   *         content:
   *           application/json:
   *             schema: { $ref: '#/definitions/getCharacterResponse' }
   *       401:
   *         description: UnAuthorized
   *         content:
   *           application/json:
   *             schema: { $ref: '#/definitions/unAuthorizedResponse' }
   */
  try {
    const response = await charactersService.create(((req as CustomRequest).jwtPayload as JwtPayload).id, req.body);
    res.status(200).send({ data: response, message: 'Character successfully created' });
  } catch (error) {
    return getErrorMessage(error, res);
  }
})

router.get("/:id", async (req: Request, res) => {
  /**
   * @swagger
   * /cem/characters/{id}:
   *   get:
   *     description: Get one character by his id.
   *     tags: 
   *       - Workshop
   *     parameters:
   *     - in: "path"
   *       name: "id"
   *       schema: { type: "string" }
   *       required: true
   *       description: "id of the character to get"
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Characters found.
   *         content:
   *           application/json:
   *             schema: { $ref: '#/definitions/getCharacterResponse' }
   *       401:
   *         description: UnAuthorized
   *         content:
   *           application/json:
   *             schema: { $ref: '#/definitions/unAuthorizedResponse' }
   */
  try {
    const response = await charactersService.findById(((req as CustomRequest).jwtPayload as JwtPayload).id, req.params.id);
    res.status(200).send({ data: response, message: 'Character successfully found' });
  } catch (error) {
    return getErrorMessage(error, res);
  }
})

export default router;