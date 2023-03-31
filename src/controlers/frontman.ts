import { RequestHandler } from "express"
import path from "path"

//import { assertIsDefined } from "../util/assertIsDefined";

export const getFrontman: RequestHandler = async (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, "../client", "index.html"))
  } catch (error) {
    next(error)
  }
}
