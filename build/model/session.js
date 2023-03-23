"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const sessionSchema = new mongoose_1.Schema({
    game: { type: mongoose_1.Schema.Types.ObjectId },
    user: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    state: { type: String }
}, {
    timestamps: true
});
exports.default = (0, mongoose_1.model)("Session", sessionSchema);
//# sourceMappingURL=session.js.map