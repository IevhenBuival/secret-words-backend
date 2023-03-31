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
exports.getTest = void 0;
const validateEnv_1 = __importDefault(require("../util/validateEnv"));
const port = validateEnv_1.default.PORT || 666;
const strcon = validateEnv_1.default.MONGO_CONECTION_STRING || "ups";
const getTest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.end(`<h1>"test server page on port:${port}" </h1>`);
        // res.status(200).json("ok");
    }
    catch (error) {
        next(error);
    }
});
exports.getTest = getTest;
//# sourceMappingURL=test.js.map