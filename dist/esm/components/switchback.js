import { __assign } from "tslib";
import { produce } from 'immer';
import { SAGA_EXTERMINATOR } from '../types/storeTypes';
// @ts-ignore
var emoji = String.fromCodePoint('0x26F7');
/**
 * @description: Switchback will call only one child reducer if a key is included
 * in the action: ({type:'SET_THEME', payload:'GEEN', key: 'SystemState'}) and
 * return a state object that containing the updated state along with the current
 * state of those reducers not processed. The key must correspond to the name
 * of the reducer within the switchback parameters (case-sensitive). If the key is not present
 * or can not be found then all reducers will be processed (same as
 * redux combinedReducers).
 *
 * @param reducers An object whose values correspond to different reducer
 *   functions that need to be combined into one. One handy way to obtain it
 *   is to use ES6 `import * as reducers` syntax. The reducers may never
 *   return undefined for any action. Instead, they should return their
 *   initial state if the state passed to them was undefined, and the current
 *   state for any unrecognized action. (official redux documentation)
 *
 * @param verbose is optional. This will output information to the
 *  console window. This is turned off in production env.
 *
 * @returns State object representing the reducers
 *
 * */
export function switchback(reducers, verbose) {
    if (verbose === void 0) { verbose = true; }
    var reducerKeys = Object.keys(reducers);
    var loggingOn = verbose && process.env.NODE_ENV !== 'production';
    return function _lowerFIS(state, action) {
        if (state === void 0) { state = {}; }
        var nextState = {};
        var id = (action === null || action === void 0 ? void 0 : action.key) || undefined;
        var runReduxCombined = false;
        /** Build state tree */
        if (!state) {
            nextState = _buildStateTree(reducers, reducerKeys, action);
            if (!nextState) {
                throw new Error("".concat(emoji, " switchback: error with null state"));
            }
            return nextState;
        }
        if (id) {
            if (loggingOn) {
                console.log("".concat(emoji, " running switchback: ").concat(action.type));
            }
            try {
                nextState = __assign({}, state);
                /**
                 * If the dispatched saga does NOT have associated reducer
                 * then just return the current store state - this comes
                 * form either the configureAdaptiveStore.dispatchSaga or
                 * adaptiveSagaDispatch
                 *  */
                if (id === SAGA_EXTERMINATOR) {
                    if (loggingOn) {
                        console.log("".concat(emoji, " SAGA Escape Hatch!!! ").concat(action.type));
                    }
                    return nextState;
                }
                var reducer_1 = reducers[id];
                if (reducer_1) {
                    nextState = produce(state, function (draftState) {
                        var nState = draftState;
                        var previousStateForKey = state[id];
                        var newState = reducer_1(previousStateForKey, action);
                        _isStateValid(newState, action, id);
                        nState[id] = newState;
                    });
                }
                else {
                    if (loggingOn) {
                        console.log("".concat(emoji, " switchback: key does not exists. Continuing with combinedReducer logic"));
                    }
                    runReduxCombined = true;
                }
            }
            catch (e) {
                var message = "key = ".concat(id, " => Error: ").concat(e.message || '');
                throw new Error("".concat(emoji, " Error within switchback: ").concat(message, " "));
            }
            if (!runReduxCombined)
                return nextState;
        }
        if (loggingOn) {
            console.log("".concat(emoji, " => running combinedReducer logic "));
        }
        for (var i = 0; i < reducerKeys.length; i++) {
            var key = reducerKeys[i];
            var reducer = reducers[key];
            if (!reducer) {
                throw new Error("Error combinedReducer logic - reducer does not exist ".concat(key));
            }
            var previousStateForKey = state[key];
            var nextStateForKey = reducer(previousStateForKey, action);
            _isStateValid(nextStateForKey, action, key);
            nextState[key] = nextStateForKey;
        }
        return nextState;
    };
}
var _isStateValid = function (nextStateForKey, action, key) {
    if (!nextStateForKey) {
        var actionType = action && action.type;
        throw new Error("".concat(emoji, " When called with an action of type ").concat(actionType ? "\"".concat(String(actionType), "\"") : '(unknown type)', ", the slice reducer for key \"").concat(key, "\" returned undefined. ") +
            "To ignore an action, you must explicitly return the previous state. " +
            "If you want this reducer to hold no value, make sure you reducers has initial state" +
            "to represent the return type. For exp, if set to null use {} instead is returning an object.");
    }
    return nextStateForKey;
};
var _buildStateTree = function (reducers, reducerKeys, action) {
    var nextState = {};
    //Build state tree
    for (var i = 0; i < reducerKeys.length; i++) {
        var key = reducerKeys[i];
        var reducer = reducers[key];
        if (!reducer) {
            throw new Error("Error combinedReducer logic - reducer does not exist ".concat(key));
        }
        var nextStateForKey = reducer({}, action);
        nextState[key] = nextStateForKey;
    }
    return nextState;
};
//# sourceMappingURL=switchback.js.map