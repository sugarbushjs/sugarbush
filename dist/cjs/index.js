'use strict';

var immer = require('immer');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

// @ts-ignore
var emoji$3 = String.fromCodePoint('0X1F6A1');
function adaptiveDispatch(options) {
    var _a = options || {}, _dispatch = _a.dispatch, _key = _a.key, _b = _a.verbose, _verbose = _b === void 0 ? true : _b;
    var loggingOn = _verbose && "development" !== 'production';
    return function _fis(action) {
        try {
            if (loggingOn) {
                console.log("".concat(emoji$3, " adaptiveDispatch: ").concat(_key));
            }
            var _action = __assign(__assign({}, action), { key: _key });
            _dispatch(_action);
        }
        catch (e) {
            console.error("".concat(emoji$3, " error in AdaptiveDispatch: ").concat(e));
        }
    };
}

var SAGA_EXTERMINATOR = '@@sb-saga!';

// @ts-ignore
var emoji$2 = String.fromCodePoint('0X1F6A1');
function adaptiveSagaDispatch(options) {
    var _a = options || {}, _dispatch = _a.dispatch, _b = _a.verbose, _verbose = _b === void 0 ? true : _b;
    var loggingOn = _verbose && "development" !== 'production';
    return function _fis(action) {
        try {
            if (loggingOn) {
                console.log("".concat(emoji$2, " adaptiveSagaDispatch"));
            }
            var _action = __assign(__assign({}, action), { key: SAGA_EXTERMINATOR });
            _dispatch(_action);
        }
        catch (e) {
            console.error("".concat(emoji$2, " error in AdaptiveDispatch: ").concat(e));
        }
    };
}

// @ts-ignore
var emoji$1 = String.fromCodePoint('0x26F7');
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
function switchback(reducers, verbose) {
    if (verbose === void 0) { verbose = true; }
    var reducerKeys = Object.keys(reducers);
    var loggingOn = verbose && "development" !== 'production';
    return function _lowerFIS(state, action) {
        if (state === void 0) { state = {}; }
        var nextState = {};
        var id = (action === null || action === void 0 ? void 0 : action.key) || undefined;
        var runReduxCombined = false;
        /** Build state tree */
        if (!state) {
            nextState = _buildStateTree(reducers, reducerKeys, action);
            if (!nextState) {
                throw new Error("".concat(emoji$1, " switchback: error with null state"));
            }
            return nextState;
        }
        if (id) {
            if (loggingOn) {
                console.log("".concat(emoji$1, " running switchback: ").concat(action.type));
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
                        console.log("".concat(emoji$1, " SAGA Escape Hatch!!! ").concat(action.type));
                    }
                    return nextState;
                }
                var reducer_1 = reducers[id];
                if (reducer_1) {
                    nextState = immer.produce(state, function (draftState) {
                        var nState = draftState;
                        var previousStateForKey = state[id];
                        var newState = reducer_1(previousStateForKey, action);
                        _isStateValid(newState, action, id);
                        nState[id] = newState;
                    });
                }
                else {
                    if (loggingOn) {
                        console.log("".concat(emoji$1, " switchback: key does not exists. Continuing with combinedReducer logic"));
                    }
                    runReduxCombined = true;
                }
            }
            catch (e) {
                var message = "key = ".concat(id, " => Error: ").concat(e.message || '');
                throw new Error("".concat(emoji$1, " Error within switchback: ").concat(message, " "));
            }
            if (!runReduxCombined)
                return nextState;
        }
        if (loggingOn) {
            console.log("".concat(emoji$1, " => running combinedReducer logic "));
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
        throw new Error("".concat(emoji$1, " When called with an action of type ").concat(actionType ? "\"".concat(String(actionType), "\"") : '(unknown type)', ", the slice reducer for key \"").concat(key, "\" returned undefined. ") +
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

// @ts-ignore
var emoji = String.fromCodePoint('0X1F3C2');
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
function configureAdaptiveStore(options) {
    var _dispatch = (options || {}).dispatch;
    var dispatch = function (key) {
        return function _hammerHead(action) {
            var _a = __assign(__assign({}, action), { key: key });
            try {
                _dispatch(_a);
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
                _dispatch(_a);
            }
            catch (e) {
                throw new Error("".concat(emoji, " Error dispatching Saga from createAdaptive: Error => ").concat(e));
            }
        };
    };
    return {
        dispatch: dispatch,
        dispatchSaga: dispatchSaga,
    };
}

exports.adaptiveDispatch = adaptiveDispatch;
exports.adaptiveSagaDispatch = adaptiveSagaDispatch;
exports.configureAdaptiveStore = configureAdaptiveStore;
exports.switchback = switchback;
//# sourceMappingURL=index.js.map
