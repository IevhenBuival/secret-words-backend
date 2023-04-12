"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const languageSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    charset: { type: mongoose_1.Schema.Types.ObjectId, required: true },
});
exports.default = (0, mongoose_1.model)("Languages", languageSchema);
//# sourceMappingURL=language.js.map