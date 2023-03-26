import express from "express"
import * as TestController from "../controlers/test"

const router = express.Router()

router.get("/", TestController.getTest)

export default router
