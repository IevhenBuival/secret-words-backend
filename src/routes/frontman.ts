import express from "express"
import * as ManController from "../controlers/frontman"
//import path from "path"

const router = express.Router()
//router.use(express.static(path.resolve(__dirname, "../client")))

router.get("/", ManController.getFrontman)

export default router
