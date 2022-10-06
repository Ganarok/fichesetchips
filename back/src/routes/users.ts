import express from "express";
import * as UserService from "../services/users"
const router = express.Router();

router.get("/user", async (req, res) => {
    res.send(await UserService.createUser())
})

export default router;