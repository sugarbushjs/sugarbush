"use strict";
exports.__esModule = true;
exports.spPut = void 0;
var tslib_1 = require("tslib");
var effects_1 = require("redux-saga/effects");
function spPut(key) {
    return function (type, payload) {
        var _action;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _action = ({ type: type, payload: payload, key: key });
                    return [4 /*yield*/, (0, effects_1.put)(_action)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    };
}
exports.spPut = spPut;
//# sourceMappingURL=spPut.js.map