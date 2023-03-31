import "dotenv/config"
import express, { NextFunction, Request, Response } from "express"
import morgan from "morgan"
import wordsRoutes from "./routes/words"
import userRoutes from "./routes/users"

import langRoutes from "./routes/languages"
import createHttpError, { isHttpError } from "http-errors"
import session from "express-session"
import env from "./util/validateEnv"
import MongoStore from "connect-mongo"
import { requiresAuth } from "./middleware/auth"
import path from "path"

const app = express()

app.use(morgan("dev"))

app.use(express.json())

app.use(
  session({
    secret: env.SESSION_SECRED,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
    rolling: true,
    store:
      MongoStore.create({
        mongoUrl: env.MONGO_CONECTION_STRING,
      }) || undefined,
  })
)
const clidir = path.join(__dirname, "../client")

//app.use(express.static(path.resolve(__dirname, "client")))
app.use(express.static(clidir))
app.get("/", (req, res) => {
  res.sendFile(`${clidir}/index.html`)
})

app.use("/api/user", userRoutes)
app.use("/api/words", requiresAuth, wordsRoutes)
app.use("/api/lang", requiresAuth, langRoutes)

app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found"))
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error)
  let errorMsg = "An uknown error occurred"
  let statusCode = 500
  /* if (error instanceof Error)  errorMsg = error.message;*/
  if (isHttpError(error)) {
    statusCode = error.status
    errorMsg = error.message
  }
  res.status(statusCode).json({
    error: errorMsg,
  })
})

export default app
