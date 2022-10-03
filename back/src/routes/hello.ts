import express from "express";
import HelloWorld from "../services/hello";

const router = express.Router();

router.get("/", (req, res) => 
{
    res.send(HelloWorld())
})

export default router;