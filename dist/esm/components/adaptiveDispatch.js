import { __assign } from "tslib";
// @ts-ignore
var emoji = String.fromCodePoint('0X1F6A1');
export function adaptiveDispatch(options) {
    var _a = options || {}, _dispatch = _a.dispatch, _key = _a.key, _b = _a.verbose, _verbose = _b === void 0 ? true : _b;
    var loggingOn = _verbose && process.env.NODE_ENV !== 'production';
    return function _fis(action) {
        try {
            if (loggingOn) {
                console.log("".concat(emoji, " adaptiveDispatch: ").concat(_key));
            }
            var _action = __assign(__assign({}, action), { key: _key });
            _dispatch(_action);
        }
        catch (e) {
            console.error("".concat(emoji, " error in AdaptiveDispatch: ").concat(e));
        }
    };
}
//# sourceMappingURL=adaptiveDispatch.js.map