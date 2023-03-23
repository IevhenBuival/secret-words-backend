import { RequestHandler } from "express"
import wordsModel from "../model/words"
import usersModel from "../model/users"
import languageModel from "../model/language"
import counterModel from "../model/counter"
import createHttpError from "http-errors"
import mongoose from "mongoose"
import { assertIsDefined } from "../util/assertIsDefined"

export const getWords: RequestHandler = async (req, res, next) => {
  //const authUser = req.session.userId;
  try {
    // assertIsDefined(authUser);
    /*const words = await wordsModel.find({author:authUser}).exec();*/
    const words = await wordsModel.find().exec()

    res.status(200).json(words)
  } catch (error) {
    next(error)
  }
}

interface IUpdateWordParams {
  gameID?: string
}

export const getWord: RequestHandler = async (req, res, next) => {
  const wordID = req.params.wordID
  const authUser = req.session.userId
  try {
    assertIsDefined(authUser)
    if (!mongoose.isValidObjectId(wordID)) {
      throw createHttpError(400, "Invalid word ID")
    }
    const searchedword = await wordsModel.findById(wordID).exec()

    if (!searchedword) {
      throw createHttpError(404, "word whith id:" + wordID + " not found")
    }
    if (!searchedword.author.equals(authUser)) {
      throw createHttpError(401, "You can't access this word")
    }
    res.status(200).json(searchedword)
  } catch (error) {
    next(error)
  }
}

interface ICreateWordBody {
  title?: string
  language?: string
}

export const createWord: RequestHandler<unknown, unknown, ICreateWordBody, unknown> = async (req, res, next) => {
  const title = req.body.title?.trim()
  const language = req.body.language
  const authUser = req.session.userId

  try {
    assertIsDefined(authUser)
    if (!title) {
      throw createHttpError(400, "You mast assign title")
    }
    const isDouble = await wordsModel.findOne({ title: title, language: language }).exec()

    if (isDouble) throw createHttpError(409, "Word alrady exist")

    let existNumerator = await counterModel
      .findOne({ name: "words_" + language })
      .select("+numerator")
      .exec()

    if (!existNumerator) {
      existNumerator = await counterModel.create({
        name: "words_" + language,
        numerator: 1,
      })
    } else {
      existNumerator.numerator = existNumerator.numerator + 1

      await existNumerator.save()
    }

    const newWord = await wordsModel.create({
      author: authUser,
      title: title,
      language: language,
      number: existNumerator.numerator,
    })
    /* 201 resurse created */
    res.status(201).json(newWord)
  } catch (error) {
    next(error)
  }
}

interface IUpdateWordParams {
  wordID?: string
}
interface IUpdateWordBody {
  title?: string
  language?: string
}

export const updateWord: RequestHandler<IUpdateWordParams, unknown, IUpdateWordBody, unknown> = async (
  req,
  res,
  next
) => {
  const Id = req.params.wordID
  const newTitle = req.body.title?.trim()
  const newLanguage = req.body.language
  const authUser = req.session.userId

  try {
    assertIsDefined(authUser)
    if (!mongoose.isValidObjectId(Id)) throw createHttpError(400, "Invalid word ID")

    if (!newTitle) throw createHttpError(400, "You mast assign title")

    const searchedword = await wordsModel.findById(Id).exec()
    if (!searchedword) {
      throw createHttpError(404, "word whith id:" + Id + " not found")
    }
    /*   if(!searchedword.author.equals(authUser)) {
               throw createHttpError(401,"You can't access this word");
           }*/

    searchedword.title = newTitle
    searchedword.author = authUser

    const languageObject = await languageModel.findOne({ _id: newLanguage }).exec()
    if (!languageObject) throw createHttpError(401, "Invalid language")
    searchedword.language = languageObject._id

    const UpdatedWord = await searchedword.save()

    res.status(200).json(UpdatedWord)
  } catch (error) {
    next(error)
  }
}

export const deleteWord: RequestHandler = async (req, res, next) => {
  const Id = req.params.wordID
  const authUser = req.session.userId

  try {
    assertIsDefined(authUser)

    if (!mongoose.isValidObjectId(Id)) throw createHttpError(400, "Invalid word ID")

    const serchedWord = await wordsModel.findById(Id).exec()

    if (!serchedWord) throw createHttpError(404, "Word whith id:" + Id + " is not exist")

    const thisUser = await usersModel.findById(authUser)
    if (thisUser?.rights !== "admin") throw createHttpError(403, "You can't access this word")
    await serchedWord.remove()
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
}
