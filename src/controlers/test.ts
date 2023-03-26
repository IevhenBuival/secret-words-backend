import { RequestHandler } from "express"

export const getTest: RequestHandler = async (req, res, next) => {
  try {
    res.end('<h1>"test server page"</h1>')
    // res.status(200).json("ok");
  } catch (error) {
    next(error)
  }
}
