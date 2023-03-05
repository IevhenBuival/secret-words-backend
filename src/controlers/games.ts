import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import gamesModel from "../model/games";
import sessionsModel from "../model/session";
import { assertIsDefined } from "../util/assertIsDefined";

export const getGames: RequestHandler = async (req, res, next) => {
    try {
        const games = await gamesModel.find().exec();
        res.status(200).json(games);
    } catch (error) {
        next(error);
    }
}

interface IGameParams {
    gameId?: string,
}

export const getGame: RequestHandler<IGameParams, unknown, unknown, unknown> = async (req, res, next) => {
    const gameId = req.params.gameId;
    const authUser = req.session.userId;

    try {
        assertIsDefined(authUser);
        if (!mongoose.isValidObjectId(gameId)) {
            throw createHttpError(400, "Invalid game ID")
        }
        const searchedgame = await gamesModel.findById(gameId).exec();

        if (!searchedgame) {
            throw createHttpError(404, "Game whith id:" + gameId + " not found");
        }
        const searhedSession = await sessionsModel.findOne({ user: authUser, game: searchedgame._id });

        if (!searhedSession) {
            throw createHttpError(401, "You can't access this game, go to game lobby and try from there");
        }
        res.status(200).json(searhedSession);
    } catch (error) {
        next(error);
    }
};


interface ICreateGameBody {
    title?: string,
    language?: string,
}

export const createGame: RequestHandler<unknown, unknown, ICreateGameBody, unknown> = async (req, res, next) => {
    const title = req.body.title?.trim();
    const language = req.body.language;
    const authUser = req.session.userId;

    try {
        assertIsDefined(authUser);
        if (!title) {
            throw createHttpError(400, "You mast assign title");
        }

        const newGame = await gamesModel.create({
            author: authUser,
            title: title,
            language: language,
        });

        const newSession = await sessionsModel.create({
            user: authUser,
            game: newGame._id,
            state: "active",
        });

        res.status(201).json(newSession);
        
    } catch (error) {
        next(error)
    }
};


