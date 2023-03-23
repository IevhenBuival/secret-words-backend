"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGame = exports.getGame = exports.getGames = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const mongoose_1 = __importDefault(require("mongoose"));
const games_1 = __importDefault(require("../model/games"));
const session_1 = __importDefault(require("../model/session"));
const assertIsDefined_1 = require("../util/assertIsDefined");
const getGames = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const games = yield games_1.default.find().exec();
        res.status(200).json(games);
    }
    catch (error) {
        next(error);
    }
});
exports.getGames = getGames;
const getGame = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const gameId = req.params.gameId;
    const authUser = req.session.userId;
    try {
        (0, assertIsDefined_1.assertIsDefined)(authUser);
        if (!mongoose_1.default.isValidObjectId(gameId)) {
            throw (0, http_errors_1.default)(400, "Invalid game ID");
        }
        const searchedgame = yield games_1.default.findById(gameId).exec();
        if (!searchedgame) {
            throw (0, http_errors_1.default)(404, "Game whith id:" + gameId + " not found");
        }
        const searhedSession = yield session_1.default.findOne({ user: authUser, game: searchedgame._id });
        if (!searhedSession) {
            throw (0, http_errors_1.default)(401, "You can't access this game, go to game lobby and try from there");
        }
        res.status(200).json(searhedSession);
    }
    catch (error) {
        next(error);
    }
});
exports.getGame = getGame;
const createGame = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const title = (_a = req.body.title) === null || _a === void 0 ? void 0 : _a.trim();
    const language = req.body.language;
    const authUser = req.session.userId;
    try {
        (0, assertIsDefined_1.assertIsDefined)(authUser);
        if (!title) {
            throw (0, http_errors_1.default)(400, "You mast assign title");
        }
        const newGame = yield games_1.default.create({
            author: authUser,
            title: title,
            language: language,
        });
        const newSession = yield session_1.default.create({
            user: authUser,
            game: newGame._id,
            state: "active",
        });
        res.status(201).json(newSession);
    }
    catch (error) {
        next(error);
    }
});
exports.createGame = createGame;
//# sourceMappingURL=games.js.map