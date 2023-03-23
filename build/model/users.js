"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    email: { type: String, required: true, select: false },
    rights: { type: String, required: true }
});
exports.default = (0, mongoose_1.model)("User", UserSchema);
//# sourceMappingURL=users.js.map