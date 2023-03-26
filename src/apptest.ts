import testRoutes from "./routes/test"
import express from "express"
import "dotenv/config"

export const apptest = express()

apptest.use("/", testRoutes)

export default apptest
