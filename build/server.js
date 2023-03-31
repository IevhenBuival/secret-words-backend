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
const app_1 = __importDefault(require("./app"));
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const validateEnv_1 = __importDefault(require("./util/validateEnv"));
const apptest_1 = __importDefault(require("./apptest"));
const port = validateEnv_1.default.PORT || 80;
mongoose_1.default.set("strictQuery", true);
main().catch((err) => console.log("main catch:" + err));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield new Promise((resolve, reject) => {
                resolve(mongoose_1.default.connect(validateEnv_1.default.MONGO_CONECTION_STRING, undefined).then(() => {
                    app_1.default.listen(port, function () {
                        console.log(`start on ${port} port with mongoose`);
                    });
                    console.info(`Connected to database`);
                }, (error) => {
                    throw Error(`Connection error: ${error.stack}`);
                }));
                reject(new Error("ups"));
            });
        }
        catch (_a) {
            throw new Error("throw uncaughtException mondo db");
        }
    });
}
process.on("uncaughtException", (err) => {
    console.log(err, "UE");
    apptest_1.default.listen(port, function () {
        console.log(`start on ${port} port without mongoose`);
    });
});
//# sourceMappingURL=server.js.map