"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apptest = void 0;
const test_1 = __importDefault(require("./routes/test"));
const express_1 = __importDefault(require("express"));
require("dotenv/config");
exports.apptest = (0, express_1.default)();
exports.apptest.use("/", test_1.default);
exports.default = exports.apptest;
//# sourceMappingURL=apptest.js.map