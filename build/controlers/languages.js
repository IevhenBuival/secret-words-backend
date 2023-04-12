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
exports.updateLanguage = exports.createLanguage = exports.getLanguage = exports.getLanguages = void 0;
const language_1 = __importDefault(require("../model/language"));
const charset_1 = __importDefault(require("../model/charset"));
const mongoose_1 = __importDefault(require("mongoose"));
const http_errors_1 = __importDefault(require("http-errors"));
//import { assertIsDefined } from "../util/assertIsDefined";
const getLanguages = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const languages = yield language_1.default.find().exec();
        res.status(200).json(languages);
    }
    catch (error) {
        next(error);
    }
});
exports.getLanguages = getLanguages;
const getLanguage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const ID = req.params.langID;
    try {
        if (!mongoose_1.default.isValidObjectId(ID)) {
            throw (0, http_errors_1.default)(400, "Invalid word ID");
        }
        const searchedLang = yield language_1.default.findById(ID).exec();
        if (!searchedLang) {
            throw (0, http_errors_1.default)(404, "language whith id:" + ID + " not found");
        }
        res.status(200).json(searchedLang);
    }
    catch (error) {
        next(error);
    }
});
exports.getLanguage = getLanguage;
const createLanguage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const language = req.body.name;
    const charset = req.body.charset;
    try {
        if (!language) {
            throw (0, http_errors_1.default)(400, "You mast assign name to language");
        }
        const isDouble = yield language_1.default.findOne({ name: language }).exec();
        if (isDouble)
            throw (0, http_errors_1.default)(409, "Language alrady exist");
        const charSetID = yield charset_1.default.findOne({ name: charset }).exec();
        if (!charSetID)
            throw (0, http_errors_1.default)(401, "Invalid charset for language");
        const newLang = yield language_1.default.create({
            name: language,
            charset: charSetID._id,
        });
        /* 201 resurse created */
        res.status(201).json(newLang);
    }
    catch (error) {
        next(error);
    }
});
exports.createLanguage = createLanguage;
const updateLanguage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const Id = req.params.langID;
    const newName = req.body.name;
    const newCharSet = req.body.charset;
    //const authUser = req.session.userId;
    try {
        //assertIsDefined(authUser);
        if (!mongoose_1.default.isValidObjectId(Id))
            throw (0, http_errors_1.default)(400, "Invalid word ID");
        const searchedRecord = yield language_1.default.findById(Id).exec();
        if (!newName)
            throw (0, http_errors_1.default)(400, "You mast assign title");
        if (!searchedRecord) {
            throw (0, http_errors_1.default)(404, "language whith id:" + Id + " not found");
        }
        const charSetID = yield charset_1.default.findOne({ name: newCharSet }).exec();
        if (!charSetID)
            throw (0, http_errors_1.default)(401, "Invalid charset for lenguage");
        searchedRecord.name = newName;
        searchedRecord.charset = charSetID._id;
        const UpdatedLanguage = yield searchedRecord.save();
        res.status(200).json(UpdatedLanguage);
    }
    catch (error) {
        next(error);
    }
});
exports.updateLanguage = updateLanguage;
//# sourceMappingURL=languages.js.map