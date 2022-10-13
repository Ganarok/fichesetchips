import express from "express";
import { JwtPayload } from "jsonwebtoken";
import { auth, CustomRequest } from "../middleware/authJwt";
import * as authService from "../services/auth"
import * as usersService from "../services/users"
import { getErrorMessage } from "../utils/error-handler/getErrorMessage";
import { LoginRequest, RegisterRequest } from "../utils/types/auth";
const router = express.Router();

router.post("/login", async (req, res) => {
    /*
      #swagger.tags = ["Authentification"]
      #swagger.description = 'Login as a user'
      #swagger.parameters['user'] = {
                "name": "Login Body",
                in: 'body',
                description: 'The user that want to login',
                schema: { $ref: '#/definitions/loginRequest' }
        }
    */
    try {
        const response = await authService.login(req.body);
        res.status(200).send({ ...response, message: "User succesfully logged" });
    } catch (error) {
        return res.status(500).send(getErrorMessage(error));
    }
})

router.post("/register", async (req, res) => {
    /*
      #swagger.tags = ["Authentification"]
      #swagger.description = 'Register a user'
      #swagger.parameters['user'] = {
                "name": "Register Body",
                in: 'body',
                description: 'The user that want to register',
                schema: { $ref: '#/definitions/registerRequest' }
        }
    */
    try {
        const response = await authService.register(req.body);
        res.status(200).send({ ...response, message: 'User successfully registered' });
    } catch (error) {
        return res.status(500).send(getErrorMessage(error));
    }
})

router.get("/profile", auth, async (req, res) => {
    /*
      #swagger.tags = ["Authentification"]
      #swagger.description = 'Get the profile of a user'
      #swagger.security = { bearerAuth: [] }
    */
    try {
        const response = await usersService.findOne((req as CustomRequest).jwtPayload as JwtPayload);
        res.status(200).send({ ...response, message: 'User profile successfully found' });
    } catch (error) {
        return res.status(500).send(getErrorMessage(error));
    }
})

export default router;