import express from "express";
import * as authService from "../services/auth"
import { LoginRequest, RegisterRequest } from "../utils/types/auth";
const router = express.Router();

router.post("/login", async (req, res, next) => {
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
    const body: LoginRequest = req.body
    try {
        res.send(await authService.login(body))
    } catch(err) {
        next(err)
    }
})

router.post("/register", async (req, res) => {
    /*
      #swagger.tags = ["Authentification"]
      #swagger.description = 'Register a user'
    */
    const body: RegisterRequest = req.body
    return res.send(await authService.register(body))
})

export default router;