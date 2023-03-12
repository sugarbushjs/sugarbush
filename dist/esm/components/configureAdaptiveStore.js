import { __assign } from "tslib";
import { SAGA_EXTERMINATOR } from "../types/storeTypes";
// @ts-ignore
var emoji = String.fromCodePoint("0X1F3C2");
/**
 *
 * @description This creates a store that contains createDispatch. The createDispatch function
 *    creates a redux dispatch that takes a key which is used with the switchback component. All
 *    warnings are suppressed in Production environment
 *
 * @param {IAdpStoreOptions} options
 * @param { Store } store
 * @param { boolean } suppressWarnings
 */
export function configureAdaptiveStore(options) {
    var _b = options || {}, dispt = _b.dispatch, _c = _b.suppressWarnings, suppressWarnings = _c === void 0 ? false : _c;
    if (!suppressWarnings && process.env.NODE_ENV !== "production")
        console.log("".concat(emoji, " Initializing Adaptive Store"));
    var dispatch = function (key) {
        return function _hammerHead(action) {
            var _a = __assign(__assign({}, action), { key: key });
            try {
                dispt(_a);
            }
            catch (e) {
                throw new Error("".concat(emoji, " Error dispatching from createAdaptive: KEY= ").concat(key, ": Error => ").concat(e));
            }
        };
    };
    var dispatchSaga = function () {
        return function _bravo(action) {
            var _a = __assign(__assign({}, action), { key: SAGA_EXTERMINATOR });
            try {
                dispt(_a);
            }
            catch (e) {
                throw new Error("".concat(emoji, " Error dispatching Saga from createAdaptive: Error => ").concat(e));
            }
        };
    };
    return {
        dispatch: dispatch,
        dispatchSaga: dispatchSaga
    };
}
//# sourceMappingURL=configureAdaptiveStore.js.map