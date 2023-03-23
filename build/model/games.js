"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const gameSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    language: { type: mongoose_1.Schema.Types.ObjectId },
    author: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    state: { type: String }
}, {
    timestamps: true
});
exports.default = (0, mongoose_1.model)("Game", gameSchema);
//# sourceMappingURL=games.js.map