import { __assign } from "tslib";
import { SAGA_EXTERMINATOR } from '../types/storeTypes';
// @ts-ignore
var emoji = String.fromCodePoint("0X1F6A1");
export function adaptiveSagaDispatch(options) {
    var _dispatch = (options || {}).dispatch;
    return function _fis(action) {
        try {
            var _action = __assign(__assign({}, action), { key: SAGA_EXTERMINATOR });
            _dispatch(_action);
        }
        catch (e) {
            console.error("".concat(emoji, " error in AdaptiveDispatch: ").concat(e));
        }
    };
}
//# sourceMappingURL=adaptiveSagaDispatch.js.map