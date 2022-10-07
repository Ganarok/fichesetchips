import express from "express";
import * as authService from "../services/auth"
import { LoginRequest, RegisterRequest } from "../utils/types/auth";
const router = express.Router();

router.post("/login", async (req, res) => {
    /*
      #swagger.tags = ["Authentification"]
      #swagger.description = 'Login as a user'
    */
    const body : LoginRequest = req.body
    res.send(await authService.login(body))
})

router.post("/register", async (req, res) => {
    /*
      #swagger.tags = ["Authentification"]
      #swagger.description = 'Register a user'
    */
    const body : RegisterRequest = req.body
    res.send(await authService.register(body))
})

export default router;