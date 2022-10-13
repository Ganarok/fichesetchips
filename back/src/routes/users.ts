import express from "express";
import { JwtPayload } from "jsonwebtoken";
import { CustomRequest } from "../middleware/authJwt";
import * as usersService from "../services/users"
import { getErrorMessage } from "../utils/error-handler/getErrorMessage";

const router = express.Router();

router.get("/profile", async (req, res) => {
  /*
    #swagger.tags = ["Users"]
    #swagger.description = 'Get his profile'
    #swagger.security = { bearerAuth: [] }
  */
  try {
    const response = await usersService.findProfile((req as CustomRequest).jwtPayload as JwtPayload);
    res.status(200).send({ ...response, message: 'User profile successfully found' });
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
})
router.get("/profile/:username", async (req, res) => {
  /*
    #swagger.tags = ["Users"]
    #swagger.description = 'Get the public profile of a dedicated user'
    #swagger.parameters = {
        in: "path",
        name: "username",
        schema: { type: "string" },
        required: true,
        description: "username of the user to get"
      }
    #swagger.security = { bearerAuth: [] }
  */
  try {
    const response = await usersService.findPublicProfile(req.params.username);
    res.status(200).send({ ...response, message: 'User profile successfully found' });
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
})

export default router;