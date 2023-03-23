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
exports.deleteWord = exports.updateWord = exports.createWord = exports.getWord = exports.getWords = void 0;
const words_1 = __importDefault(require("../model/words"));
const users_1 = __importDefault(require("../model/users"));
const language_1 = __importDefault(require("../model/language"));
const counter_1 = __importDefault(require("../model/counter"));
const http_errors_1 = __importDefault(require("http-errors"));
const mongoose_1 = __importDefault(require("mongoose"));
const assertIsDefined_1 = require("../util/assertIsDefined");
const getWords = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //const authUser = req.session.userId;
    try {
        // assertIsDefined(authUser);
        /*const words = await wordsModel.find({author:authUser}).exec();*/
        const words = yield words_1.default.find().exec();
        res.status(200).json(words);
    }
    catch (error) {
        next(error);
    }
});
exports.getWords = getWords;
const getWord = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const wordID = req.params.wordID;
    const authUser = req.session.userId;
    try {
        (0, assertIsDefined_1.assertIsDefined)(authUser);
        if (!mongoose_1.default.isValidObjectId(wordID)) {
            throw (0, http_errors_1.default)(400, "Invalid word ID");
        }
        const searchedword = yield words_1.default.findById(wordID).exec();
        if (!searchedword) {
            throw (0, http_errors_1.default)(404, "word whith id:" + wordID + " not found");
        }
        if (!searchedword.author.equals(authUser)) {
            throw (0, http_errors_1.default)(401, "You can't access this word");
        }
        res.status(200).json(searchedword);
    }
    catch (error) {
        next(error);
    }
});
exports.getWord = getWord;
const createWord = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const title = (_a = req.body.title) === null || _a === void 0 ? void 0 : _a.trim();
    const language = req.body.language;
    const authUser = req.session.userId;
    try {
        (0, assertIsDefined_1.assertIsDefined)(authUser);
        if (!title) {
            throw (0, http_errors_1.default)(400, "You mast assign title");
        }
        const isDouble = yield words_1.default.findOne({ title: title, language: language }).exec();
        if (isDouble)
            throw (0, http_errors_1.default)(409, "Word alrady exist");
        let existNumerator = yield counter_1.default
            .findOne({ name: "words_" + language })
            .select("+numerator")
            .exec();
        if (!existNumerator) {
            existNumerator = yield counter_1.default.create({
                name: "words_" + language,
                numerator: 1,
            });
        }
        else {
            existNumerator.numerator = existNumerator.numerator + 1;
            yield existNumerator.save();
        }
        const newWord = yield words_1.default.create({
            author: authUser,
            title: title,
            language: language,
            number: existNumerator.numerator,
        });
        /* 201 resurse created */
        res.status(201).json(newWord);
    }
    catch (error) {
        next(error);
    }
});
exports.createWord = createWord;
const updateWord = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const Id = req.params.wordID;
    const newTitle = (_b = req.body.title) === null || _b === void 0 ? void 0 : _b.trim();
    const newLanguage = req.body.language;
    const authUser = req.session.userId;
    try {
        (0, assertIsDefined_1.assertIsDefined)(authUser);
        if (!mongoose_1.default.isValidObjectId(Id))
            throw (0, http_errors_1.default)(400, "Invalid word ID");
        if (!newTitle)
            throw (0, http_errors_1.default)(400, "You mast assign title");
        const searchedword = yield words_1.default.findById(Id).exec();
        if (!searchedword) {
            throw (0, http_errors_1.default)(404, "word whith id:" + Id + " not found");
        }
        /*   if(!searchedword.author.equals(authUser)) {
                   throw createHttpError(401,"You can't access this word");
               }*/
        searchedword.title = newTitle;
        searchedword.author = authUser;
        const languageObject = yield language_1.default.findOne({ _id: newLanguage }).exec();
        if (!languageObject)
            throw (0, http_errors_1.default)(401, "Invalid language");
        searchedword.language = languageObject._id;
        const UpdatedWord = yield searchedword.save();
        res.status(200).json(UpdatedWord);
    }
    catch (error) {
        next(error);
    }
});
exports.updateWord = updateWord;
const deleteWord = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const Id = req.params.wordID;
    const authUser = req.session.userId;
    try {
        (0, assertIsDefined_1.assertIsDefined)(authUser);
        if (!mongoose_1.default.isValidObjectId(Id))
            throw (0, http_errors_1.default)(400, "Invalid word ID");
        const serchedWord = yield words_1.default.findById(Id).exec();
        if (!serchedWord)
            throw (0, http_errors_1.default)(404, "Word whith id:" + Id + " is not exist");
        const thisUser = yield users_1.default.findById(authUser);
        if ((thisUser === null || thisUser === void 0 ? void 0 : thisUser.rights) !== "admin")
            throw (0, http_errors_1.default)(403, "You can't access this word");
        yield serchedWord.remove();
        res.sendStatus(204);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteWord = deleteWord;
//# sourceMappingURL=words.js.map