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
exports.updateUser = exports.getUsers = exports.login = exports.signUp = exports.logout = exports.getAuthUsers = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const users_1 = __importDefault(require("../model/users"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = __importDefault(require("mongoose"));
const getAuthUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_1.default.findById(req.session.userId).select("+email");
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.getAuthUsers = getAuthUsers;
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    req.session.destroy(error => {
        if (error)
            next(error);
        else
            res.sendStatus(200);
    });
});
exports.logout = logout;
const signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const usrname = req.body.username;
    const email = req.body.email;
    const passwordRaw = req.body.password;
    try {
        if (!usrname || !passwordRaw)
            throw (0, http_errors_1.default)(400, "Parametrs mising");
        const isDoubleUser = yield users_1.default.findOne({ username: usrname }).exec();
        if (isDoubleUser)
            throw (0, http_errors_1.default)(409, "Username alrady taken. Please choose another or click to forget password link");
        const passwordHashed = yield bcrypt_1.default.hash(passwordRaw, 10);
        const newUser = yield users_1.default.create({
            username: usrname,
            email: email,
            password: passwordHashed,
            rights: 'user',
        });
        req.session.userId = newUser._id;
        res.status(201).json(newUser);
    }
    catch (error) {
        next(error);
    }
});
exports.signUp = signUp;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const usrname = req.body.username;
    const passwordRaw = req.body.password;
    try {
        if (!usrname || !passwordRaw)
            throw (0, http_errors_1.default)(400, "Login parameters missing");
        const user = yield users_1.default.findOne({ username: usrname }).select("+password +email").exec();
        if (!user)
            throw (0, http_errors_1.default)(401, "Invalid credentials");
        const passwordMatch = yield bcrypt_1.default.compare(passwordRaw, user.password);
        if (!passwordMatch)
            throw (0, http_errors_1.default)(401, "Invalid credentials");
        req.session.userId = user._id;
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield users_1.default.find().select('+email').exec();
        res.status(200).json(users);
    }
    catch (error) {
        next(error);
    }
});
exports.getUsers = getUsers;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const Id = req.params.userID;
    const newEmail = req.body.email;
    const newRights = req.body.rights;
    const newPassword = req.body.password;
    try {
        if (!mongoose_1.default.isValidObjectId(Id))
            throw (0, http_errors_1.default)(400, "Invalid user ID:" + Id);
        const searchedRecord = yield users_1.default.findById(Id).exec();
        if (!searchedRecord) {
            throw (0, http_errors_1.default)(404, "user whith id:" + Id + " not found");
        }
        if (newEmail)
            searchedRecord.email = newEmail;
        if (newRights)
            searchedRecord.rights = newRights;
        if (newPassword) {
            const passwordHashed = yield bcrypt_1.default.hash(newPassword, 10);
            searchedRecord.password = passwordHashed;
        }
        /* searchedword.language = newLanguage;*/
        const UpdatedWord = yield searchedRecord.save();
        res.status(200).json(UpdatedWord);
    }
    catch (error) {
        next(error);
    }
});
exports.updateUser = updateUser;
//# sourceMappingURL=users.js.map