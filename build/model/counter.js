"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const NumeratorsSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    numerator: { type: Number, required: true },
});
exports.default = (0, mongoose_1.model)("Numerators", NumeratorsSchema);
//# sourceMappingURL=counter.js.map