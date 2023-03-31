"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const words_1 = __importDefault(require("./routes/words"));
const users_1 = __importDefault(require("./routes/users"));
const languages_1 = __importDefault(require("./routes/languages"));
const http_errors_1 = __importStar(require("http-errors"));
const express_session_1 = __importDefault(require("express-session"));
const validateEnv_1 = __importDefault(require("./util/validateEnv"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const auth_1 = require("./middleware/auth");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    secret: validateEnv_1.default.SESSION_SECRED,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000,
    },
    rolling: true,
    store: connect_mongo_1.default.create({
        mongoUrl: validateEnv_1.default.MONGO_CONECTION_STRING,
    }) || undefined,
}));
const clidir = path_1.default.join(__dirname, "../client");
//app.use(express.static(path.resolve(__dirname, "client")))
app.use(express_1.default.static(clidir));
app.get("/", (req, res) => {
    res.sendFile(`${clidir}/index.html`);
});
app.use("/api/user", users_1.default);
app.use("/api/words", auth_1.requiresAuth, words_1.default);
app.use("/api/lang", auth_1.requiresAuth, languages_1.default);
app.use((req, res, next) => {
    next((0, http_errors_1.default)(404, "Endpoint not found"));
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error, req, res, next) => {
    console.error(error);
    let errorMsg = "An uknown error occurred";
    let statusCode = 500;
    /* if (error instanceof Error)  errorMsg = error.message;*/
    if ((0, http_errors_1.isHttpError)(error)) {
        statusCode = error.status;
        errorMsg = error.message;
    }
    res.status(statusCode).json({
        error: errorMsg,
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map