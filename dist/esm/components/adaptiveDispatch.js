import { __assign } from "tslib";
// @ts-ignore
var emoji = String.fromCodePoint("0X1F6A1");
export function adaptiveDispatch(options) {
    var _a = options || {}, _dispatch = _a.dispatch, _key = _a.key, _b = _a.suppressLogging, _logging = _b === void 0 ? false : _b;
    var loggingOn = process.env.NODE_ENV !== "production";
    if (!_key && loggingOn) {
        console.log("".concat(emoji, " AdaptiveDispatch: key was not provided "));
    }
    return function _fis(action) {
        try {
            var _action = __assign(__assign({}, action), { key: _key });
            _dispatch(_action);
        }
        catch (e) {
            console.error("".concat(emoji, " error in AdaptiveDispatch: ").concat(e));
        }
    };
}
//# sourceMappingURL=adaptiveDispatch.js.map