"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertIsDefined = void 0;
function assertIsDefined(val) {
    if (!val) {
        throw Error("Expected 'val' to be defined, but resived " + val);
    }
}
exports.assertIsDefined = assertIsDefined;
//# sourceMappingURL=assertIsDefined.js.map