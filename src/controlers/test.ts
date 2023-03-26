import { RequestHandler } from "express"
import env from "../util/validateEnv"
const port = env.PORT || 666

const strcon = env.MONGO_CONECTION_STRING || "ups"

export const getTest: RequestHandler = async (req, res, next) => {
  try {
    res.end(`<h1>"test server page on port:${port}" and ${strcon}</h1>`)
    // res.status(200).json("ok");
  } catch (error) {
    next(error)
  }
}
