import { RequestHandler } from "express"
import charSetModel from "../model/charset"

export const getCharSets: RequestHandler = async (req, res, next) => {
  try {
    const charsets = await charSetModel.find().exec()

    if (charsets.length > 0) res.status(200).json(charsets)
    else {
      const newcharsets = [
        await charSetModel.create({
          name: "Latin",
        }),
        await charSetModel.create({
          name: "Cyrilic",
        }),
      ]
      res.status(200).json(newcharsets)
    }
  } catch (error) {
    next(error)
  }
}
