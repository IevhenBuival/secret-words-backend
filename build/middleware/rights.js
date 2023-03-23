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
exports.requiresRights = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const users_1 = __importDefault(require("../model/users"));
const requiresRights = (req, res, next) => {
    function CheckRights() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.session.userId) {
                    const user = yield users_1.default.findById(req.session.userId).select("+rights").exec();
                    if (user && (user.rights === 'admin')) {
                        next();
                    }
                    else {
                        next((0, http_errors_1.default)(401, "User not have rights"));
                    }
                }
                else {
                    next((0, http_errors_1.default)(401, "User not authentificated"));
                }
            }
            catch (error) {
                console.error(error);
                next((0, http_errors_1.default)(401, "Unknown user"));
            }
        });
    }
    CheckRights();
};
exports.requiresRights = requiresRights;
//# sourceMappingURL=rights.js.map