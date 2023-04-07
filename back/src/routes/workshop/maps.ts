import express, { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { CustomRequest } from "../../middleware/authJwt";
import * as mapsService from "../../services/workshop/maps"
import { getErrorMessage } from "../../utils/error-handler/getErrorMessage";

const router = express.Router();

router.get("/", async (req: Request, res) => {
    /**
     * @swagger
     * /maps:
     *   get:
     *     description: Get my created maps.
     *     tags: 
     *       - Maps
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Maps found.
     *         content:
     *           application/json:
     *             schema: { $ref: '#/definitions/getMapsResponse' }
     *       401:
     *         description: UnAuthorized
     *         content:
     *           application/json:
     *             schema: { $ref: '#/definitions/unAuthorizedResponse' }
     */
    try {
        const response = await mapsService.find(((req as CustomRequest).jwtPayload as JwtPayload).username);
        res.status(200).send({ data: response, message: 'Maps successfully found' });
    } catch (error) {
        return getErrorMessage(error, res);
    }
})

router.get("/:map_id", async (req: Request, res) => {
    /**
     * @swagger
     * /maps/{map_id}:
     *   get:
     *     description: Get a map.
     *     tags: 
     *       - Maps
     *     parameters:
     *     - in: "path"
     *       name: "map_id"
     *       schema: { type: "string" }
     *       required: true
     *       description: "id of the map"
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Map found.
     *         content:
     *           application/json:
     *             schema: { $ref: '#/definitions/getMapResponse' }
     *       401:
     *         description: UnAuthorized
     *         content:
     *           application/json:
     *             schema: { $ref: '#/definitions/unAuthorizedResponse' }
     */
    try {
        const response = await mapsService.findOne(((req as CustomRequest).jwtPayload as JwtPayload).username, req.params.map_id);
        res.status(200).send({ data: response, message: 'Map successfully found' });
    } catch (error) {
        return getErrorMessage(error, res);
    }
})

// router.post("/asset", async (req: Request, res) => {
//     /**
//      * @swagger
//      * /maps/asset:
//      *   post:
//      *     description: Post an asset.
//      *     tags: 
//      *       - Maps
//      *     requestBody:
//      *       description: The asset to create
//      *       required: true
//      *       content:
//      *         application/octet-stream
//      *     parameters: 
//      *       - in: query
//      *         name: name
//      *         schema:
//      *           type: sting
//      *           description: The name of your asset
//      *       - in: query
//      *         name: map_id
//      *         schema:
//      *           type: sting
//      *           description: The map_id
//      *     security:
//      *       - bearerAuth: []
//      *     responses:
//      *       200:
//      *         description: asset created.
//      *         content:
//      *           application/json:
//      *             schema: { $ref: '#/definitions/assetCreationRes' }
//      *       401:
//      *         description: UnAuthorized
//      *         content:
//      *           application/json:
//      *             schema: { $ref: '#/definitions/unAuthorizedResponse' }
//      */
//     try {
//         const response = await mapsService.createAsset(((req as CustomRequest).jwtPayload as JwtPayload).username, req.body, { map_id: req.query.map_id as string, name: req.query.name as string });
//         res.status(200).send({ data: response, message: 'asset successfully created' });
//     } catch (error) {
//         return getErrorMessage(error, res);
//     }
// })

router.post("/", async (req: Request, res) => {
    /**
     * @swagger
     * /maps:
     *   post:
     *     description: Post a map.
     *     tags: 
     *       - Maps
     *     requestBody:
     *       description: The map to create
     *       required: true
     *       content:
     *         application/json:
     *           schema: { $ref: '#/definitions/createMapsRequest' }
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Map created.
     *         content:
     *           application/json:
     *             schema: { $ref: '#/definitions/getMapResponse' }
     *       401:
     *         description: UnAuthorized
     *         content:
     *           application/json:
     *             schema: { $ref: '#/definitions/unAuthorizedResponse' }
     */
    try {
        const response = await mapsService.create(((req as CustomRequest).jwtPayload as JwtPayload).username, req.body);
        res.status(200).send({ data: response, message: 'Map successfully created' });
    } catch (error) {
        return getErrorMessage(error, res);
    }
})

router.patch("/:map_id", async (req: Request, res) => {
    /**
     * @swagger
     * /maps/{map_id}:
     *   patch:
     *     description: Patch a map.
     *     tags: 
     *       - Maps
     *     parameters:
     *     - in: "path"
     *       name: "map_id"
     *       schema: { type: "string" }
     *       required: true
     *       description: "id of the map"
     *     requestBody:
     *       description: The map to create
     *       required: true
     *       content:
     *         application/json:
     *           schema: { $ref: '#/definitions/createMapsRequest' }
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Map patched.
     *         content:
     *           application/json:
     *             schema: { $ref: '#/definitions/getMapResponse' }
     *       401:
     *         description: UnAuthorized
     *         content:
     *           application/json:
     *             schema: { $ref: '#/definitions/unAuthorizedResponse' }
     */
    try {
        const response = await mapsService.update(((req as CustomRequest).jwtPayload as JwtPayload).username, req.body, req.params.map_id);
        res.status(200).send({ data: response, message: 'Map successfully patched' });
    } catch (error) {
        return getErrorMessage(error, res);
    }
})

router.delete("/:map_id", async (req: Request, res) => {
    /**
     * @swagger
     * /maps/{map_id}:
     *   delete:
     *     description: Delete a map.
     *     tags: 
     *       - Maps
     *     parameters:
     *     - in: "path"
     *       name: "map_id"
     *       schema: { type: "string" }
     *       required: true
     *       description: "id of the map"
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Map deleted.
     *         content:
     *           application/json:
     *             schema: { $ref: '#/definitions/getMapResponse' }
     *       401:
     *         description: UnAuthorized
     *         content:
     *           application/json:
     *             schema: { $ref: '#/definitions/unAuthorizedResponse' }
     */
    try {
        const response = await mapsService.destroy(((req as CustomRequest).jwtPayload as JwtPayload).username, req.params.map_id);
        res.status(200).send({ data: response, message: 'Map successfully deleted' });
    } catch (error) {
        return getErrorMessage(error, res);
    }
})

export default router;