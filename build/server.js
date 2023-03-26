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
const mongoose_1 = __importDefault(require("mongoose"));
const validateEnv_1 = __importDefault(require("./util/validateEnv"));
const port = validateEnv_1.default.PORT || 80;
function Server() {
    return __awaiter(this, void 0, void 0, function* () {
        mongoose_1.default.set("strictQuery", true);
        console.log("starrt");
        const mconnect = yield mongoose_1.default.connect(validateEnv_1.default.MONGO_CONECTION_STRING, undefined);
        console.log("end");
        /*
        mconnect.then(() => {
          app.listen(port, function () {
            console.log(`start on ${port} port with mongoose`)
          })
        })
      
        mconnect.catch(function (error) {
          apptest.listen(port, function () {
            console.log(`start on ${port} port without mongoose`)
          })
        })*/
        /* .then(() => {
              mongoosestate = "Mongoose connected"
            })
            .catch((err) => {
              throw Error(err)
            })*/
    });
}
Server();
//# sourceMappingURL=server.js.map