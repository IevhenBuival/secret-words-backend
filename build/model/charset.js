"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CharSetSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
});
exports.default = (0, mongoose_1.model)("CharSets", CharSetSchema);
//# sourceMappingURL=charset.js.map