import express from "express";
import * as usersService from "../services/users"

const router = express.Router();

router.get("/", async (req, res) => {
  /*
    #swagger.tags = ["Users"]
    #swagger.description = 'Get a user' */

  res.send(await usersService.create({
    username: "user1",
    email: "user1@email.com",
    password: "password"
  }))
})

export default router;