import { __generator } from "tslib";
import { put } from 'redux-saga/effects';
export function sbPut(key) {
    return function (type, payload) {
        var _action;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _action = ({ type: type, payload: payload, key: key });
                    return [4 /*yield*/, put(_action)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    };
}
//# sourceMappingURL=sbPut.js.map