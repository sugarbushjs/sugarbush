"use strict";
exports.__esModule = true;
exports.adaptiveSagaDispatch = void 0;
var tslib_1 = require("tslib");
var storeTypes_1 = require("../types/storeTypes");
// @ts-ignore
var emoji = String.fromCodePoint("0X1F6A1");
function adaptiveSagaDispatch(options) {
    var _dispatch = (options || {}).dispatch;
    return function _fis(action) {
        try {
            var _action = tslib_1.__assign(tslib_1.__assign({}, action), { key: storeTypes_1.SAGA_EXTERMINATOR });
            _dispatch(_action);
        }
        catch (e) {
            console.error("".concat(emoji, " error in AdaptiveDispatch: ").concat(e));
        }
    };
}
exports.adaptiveSagaDispatch = adaptiveSagaDispatch;
//# sourceMappingURL=adaptiveSagaDispatch.js.map