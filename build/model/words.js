"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const wordSchema = new mongoose_1.Schema({
    title: { type: String, required: true, unique: true },
    language: { type: mongoose_1.Schema.Types.ObjectId },
    author: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    number: { type: Number }
}, {
    timestamps: true
});
exports.default = (0, mongoose_1.model)("Word", wordSchema);
//# sourceMappingURL=words.js.map