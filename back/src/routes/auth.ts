import express from "express";
import { JwtPayload } from "jsonwebtoken";
import { verifyToken, CustomRequest } from "../middleware/authJwt";
import * as authService from "../services/auth"
import * as usersService from "../services/users"
import { getErrorMessage } from "../utils/error-handler/getErrorMessage";
import { LoginRequest, RegisterRequest } from "../utils/types/auth";
const router = express.Router();

router.post("/login", async (req, res) => {
    /**
     * @swagger
     * /auth/login:
     *   post:
     *     description: Login as a user
     *     tags: 
     *       - Authentification
     *     requestBody:
     *       description: The user that wants to login
     *       required: true
     *       content:
     *         application/json:
     *           schema: { $ref: '#/definitions/loginRequest' }
     *     responses:
     *       200:
     *         description: User logged.
     *         content:
     *           application/json:
     *             schema: { $ref: '#/definitions/authResponse' }
     *       404:
     *         description: Not Found
     *         content:
     *           application/json:
     *             schema: { $ref: '#/definitions/notFoundResponse' }
     */
    try {
        const response = await authService.login(req.body);
        res.status(200).send({ ...response, message: "User succesfully authenticate" });
    } catch (error) {
        return getErrorMessage(error, res);
    }
})

router.post("/register", async (req, res) => {
    /**
     * @swagger
     * /auth/register:
     *   post:
     *     description: Register a user
     *     tags: 
     *       - Authentification
     *     requestBody:
     *       description: The user that wants to register
     *       required: true
     *       content:
     *         application/json:
     *           schema: { $ref: '#/definitions/registerRequest' }
     *     responses:
     *       200:
     *         description: User registered.
     *         content:
     *           application/json:
     *             schema: { $ref: '#/definitions/authResponse' }
     *       409:
     *         description: Database conflict
     *         content:
     *           application/json:
     *             schema: { $ref: '#/definitions/conflictResponse' }
     */
    try {
        const response = await authService.register(req.body);
        res.status(200).send({ ...response, message: 'User successfully authenticate' });
    } catch (error) {
        return getErrorMessage(error, res);
    }
})

export default router;