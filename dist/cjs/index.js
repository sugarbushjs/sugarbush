'use strict';

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
var emoji$2 = String.fromCodePoint('0X1F6A1');
function adaptiveDispatch(options) {
    var _a = options || {}, _dispatch = _a.dispatch, _key = _a.key, _b = _a.verbose, _verbose = _b === void 0 ? true : _b;
    var loggingOn = _verbose && "development" !== 'production';
    return function _fis(action) {
        try {
            if (loggingOn) {
                console.log("".concat(emoji$2, " adaptiveDispatch: ").concat(_key));
            }
            var _action = __assign(__assign({}, action), { key: _key });
            _dispatch(_action);
        }
        catch (e) {
            console.error("".concat(emoji$2, " error in AdaptiveDispatch: ").concat(e));
        }
    };
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

function n(n) {
  for (var r = arguments.length, t = Array(r > 1 ? r - 1 : 0), e = 1; e < r; e++) t[e - 1] = arguments[e];
  {
    var i = Y[n],
      o = i ? "function" == typeof i ? i.apply(null, t) : i : "unknown error nr: " + n;
    throw Error("[Immer] " + o);
  }
}
function r(n) {
  return !!n && !!n[Q];
}
function t(n) {
  var r;
  return !!n && (function (n) {
    if (!n || "object" != _typeof(n)) return !1;
    var r = Object.getPrototypeOf(n);
    if (null === r) return !0;
    var t = Object.hasOwnProperty.call(r, "constructor") && r.constructor;
    return t === Object || "function" == typeof t && Function.toString.call(t) === Z;
  }(n) || Array.isArray(n) || !!n[L] || !!(null === (r = n.constructor) || void 0 === r ? void 0 : r[L]) || s(n) || v(n));
}
function i(n, r, t) {
  void 0 === t && (t = !1), 0 === o(n) ? (t ? Object.keys : nn)(n).forEach(function (e) {
    t && "symbol" == _typeof(e) || r(e, n[e], n);
  }) : n.forEach(function (t, e) {
    return r(e, t, n);
  });
}
function o(n) {
  var r = n[Q];
  return r ? r.i > 3 ? r.i - 4 : r.i : Array.isArray(n) ? 1 : s(n) ? 2 : v(n) ? 3 : 0;
}
function u(n, r) {
  return 2 === o(n) ? n.has(r) : Object.prototype.hasOwnProperty.call(n, r);
}
function a(n, r) {
  return 2 === o(n) ? n.get(r) : n[r];
}
function f(n, r, t) {
  var e = o(n);
  2 === e ? n.set(r, t) : 3 === e ? n.add(t) : n[r] = t;
}
function c(n, r) {
  return n === r ? 0 !== n || 1 / n == 1 / r : n != n && r != r;
}
function s(n) {
  return X && n instanceof Map;
}
function v(n) {
  return q && n instanceof Set;
}
function p(n) {
  return n.o || n.t;
}
function l(n) {
  if (Array.isArray(n)) return Array.prototype.slice.call(n);
  var r = rn(n);
  delete r[Q];
  for (var t = nn(r), e = 0; e < t.length; e++) {
    var i = t[e],
      o = r[i];
    !1 === o.writable && (o.writable = !0, o.configurable = !0), (o.get || o.set) && (r[i] = {
      configurable: !0,
      writable: !0,
      enumerable: o.enumerable,
      value: n[i]
    });
  }
  return Object.create(Object.getPrototypeOf(n), r);
}
function d(n, e) {
  return void 0 === e && (e = !1), y(n) || r(n) || !t(n) || (o(n) > 1 && (n.set = n.add = n.clear = n["delete"] = h), Object.freeze(n), e && i(n, function (n, r) {
    return d(r, !0);
  }, !0)), n;
}
function h() {
  n(2);
}
function y(n) {
  return null == n || "object" != _typeof(n) || Object.isFrozen(n);
}
function b(r) {
  var t = tn[r];
  return t || n(18, r), t;
}
function _() {
  return U || n(0), U;
}
function j(n, r) {
  r && (b("Patches"), n.u = [], n.s = [], n.v = r);
}
function O(n) {
  g(n), n.p.forEach(S), n.p = null;
}
function g(n) {
  n === U && (U = n.l);
}
function w(n) {
  return U = {
    p: [],
    l: U,
    h: n,
    m: !0,
    _: 0
  };
}
function S(n) {
  var r = n[Q];
  0 === r.i || 1 === r.i ? r.j() : r.O = !0;
}
function P(r, e) {
  e._ = e.p.length;
  var i = e.p[0],
    o = void 0 !== r && r !== i;
  return e.h.g || b("ES5").S(e, r, o), o ? (i[Q].P && (O(e), n(4)), t(r) && (r = M(e, r), e.l || x(e, r)), e.u && b("Patches").M(i[Q].t, r, e.u, e.s)) : r = M(e, i, []), O(e), e.u && e.v(e.u, e.s), r !== H ? r : void 0;
}
function M(n, r, t) {
  if (y(r)) return r;
  var e = r[Q];
  if (!e) return i(r, function (i, o) {
    return A(n, e, r, i, o, t);
  }, !0), r;
  if (e.A !== n) return r;
  if (!e.P) return x(n, e.t, !0), e.t;
  if (!e.I) {
    e.I = !0, e.A._--;
    var o = 4 === e.i || 5 === e.i ? e.o = l(e.k) : e.o,
      u = o,
      a = !1;
    3 === e.i && (u = new Set(o), o.clear(), a = !0), i(u, function (r, i) {
      return A(n, e, o, r, i, t, a);
    }), x(n, o, !1), t && n.u && b("Patches").N(e, t, n.u, n.s);
  }
  return e.o;
}
function A(e, i, o, a, c, s, v) {
  if (c === o && n(5), r(c)) {
    var p = M(e, c, s && i && 3 !== i.i && !u(i.R, a) ? s.concat(a) : void 0);
    if (f(o, a, p), !r(p)) return;
    e.m = !1;
  } else v && o.add(c);
  if (t(c) && !y(c)) {
    if (!e.h.D && e._ < 1) return;
    M(e, c), i && i.A.l || x(e, c);
  }
}
function x(n, r, t) {
  void 0 === t && (t = !1), !n.l && n.h.D && n.m && d(r, t);
}
function z(n, r) {
  var t = n[Q];
  return (t ? p(t) : n)[r];
}
function I(n, r) {
  if (r in n) for (var t = Object.getPrototypeOf(n); t;) {
    var e = Object.getOwnPropertyDescriptor(t, r);
    if (e) return e;
    t = Object.getPrototypeOf(t);
  }
}
function k(n) {
  n.P || (n.P = !0, n.l && k(n.l));
}
function E(n) {
  n.o || (n.o = l(n.t));
}
function N(n, r, t) {
  var e = s(r) ? b("MapSet").F(r, t) : v(r) ? b("MapSet").T(r, t) : n.g ? function (n, r) {
    var t = Array.isArray(n),
      e = {
        i: t ? 1 : 0,
        A: r ? r.A : _(),
        P: !1,
        I: !1,
        R: {},
        l: r,
        t: n,
        k: null,
        o: null,
        j: null,
        C: !1
      },
      i = e,
      o = en;
    t && (i = [e], o = on);
    var u = Proxy.revocable(i, o),
      a = u.revoke,
      f = u.proxy;
    return e.k = f, e.j = a, f;
  }(r, t) : b("ES5").J(r, t);
  return (t ? t.A : _()).p.push(e), e;
}
function R(e) {
  return r(e) || n(22, e), function n(r) {
    if (!t(r)) return r;
    var e,
      u = r[Q],
      c = o(r);
    if (u) {
      if (!u.P && (u.i < 4 || !b("ES5").K(u))) return u.t;
      u.I = !0, e = D(r, c), u.I = !1;
    } else e = D(r, c);
    return i(e, function (r, t) {
      u && a(u.t, r) === t || f(e, r, n(t));
    }), 3 === c ? new Set(e) : e;
  }(e);
}
function D(n, r) {
  switch (r) {
    case 2:
      return new Map(n);
    case 3:
      return Array.from(n);
  }
  return l(n);
}
var G,
  U,
  W = "undefined" != typeof Symbol && "symbol" == _typeof(Symbol("x")),
  X = "undefined" != typeof Map,
  q = "undefined" != typeof Set,
  B = "undefined" != typeof Proxy && void 0 !== Proxy.revocable && "undefined" != typeof Reflect,
  H = W ? Symbol["for"]("immer-nothing") : ((G = {})["immer-nothing"] = !0, G),
  L = W ? Symbol["for"]("immer-draftable") : "__$immer_draftable",
  Q = W ? Symbol["for"]("immer-state") : "__$immer_state",
  Y = {
    0: "Illegal state",
    1: "Immer drafts cannot have computed properties",
    2: "This object has been frozen and should not be mutated",
    3: function _(n) {
      return "Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? " + n;
    },
    4: "An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.",
    5: "Immer forbids circular references",
    6: "The first or second argument to `produce` must be a function",
    7: "The third argument to `produce` must be a function or undefined",
    8: "First argument to `createDraft` must be a plain object, an array, or an immerable object",
    9: "First argument to `finishDraft` must be a draft returned by `createDraft`",
    10: "The given draft is already finalized",
    11: "Object.defineProperty() cannot be used on an Immer draft",
    12: "Object.setPrototypeOf() cannot be used on an Immer draft",
    13: "Immer only supports deleting array indices",
    14: "Immer only supports setting array indices and the 'length' property",
    15: function _(n) {
      return "Cannot apply patch, path doesn't resolve: " + n;
    },
    16: 'Sets cannot have "replace" patches.',
    17: function _(n) {
      return "Unsupported patch operation: " + n;
    },
    18: function _(n) {
      return "The plugin for '" + n + "' has not been loaded into Immer. To enable the plugin, import and call `enable" + n + "()` when initializing your application.";
    },
    20: "Cannot use proxies if Proxy, Proxy.revocable or Reflect are not available",
    21: function _(n) {
      return "produce can only be called on things that are draftable: plain objects, arrays, Map, Set or classes that are marked with '[immerable]: true'. Got '" + n + "'";
    },
    22: function _(n) {
      return "'current' expects a draft, got: " + n;
    },
    23: function _(n) {
      return "'original' expects a draft, got: " + n;
    },
    24: "Patching reserved attributes like __proto__, prototype and constructor is not allowed"
  },
  Z = "" + Object.prototype.constructor,
  nn = "undefined" != typeof Reflect && Reflect.ownKeys ? Reflect.ownKeys : void 0 !== Object.getOwnPropertySymbols ? function (n) {
    return Object.getOwnPropertyNames(n).concat(Object.getOwnPropertySymbols(n));
  } : Object.getOwnPropertyNames,
  rn = Object.getOwnPropertyDescriptors || function (n) {
    var r = {};
    return nn(n).forEach(function (t) {
      r[t] = Object.getOwnPropertyDescriptor(n, t);
    }), r;
  },
  tn = {},
  en = {
    get: function get(n, r) {
      if (r === Q) return n;
      var e = p(n);
      if (!u(e, r)) return function (n, r, t) {
        var e,
          i = I(r, t);
        return i ? "value" in i ? i.value : null === (e = i.get) || void 0 === e ? void 0 : e.call(n.k) : void 0;
      }(n, e, r);
      var i = e[r];
      return n.I || !t(i) ? i : i === z(n.t, r) ? (E(n), n.o[r] = N(n.A.h, i, n)) : i;
    },
    has: function has(n, r) {
      return r in p(n);
    },
    ownKeys: function ownKeys(n) {
      return Reflect.ownKeys(p(n));
    },
    set: function set(n, r, t) {
      var e = I(p(n), r);
      if (null == e ? void 0 : e.set) return e.set.call(n.k, t), !0;
      if (!n.P) {
        var i = z(p(n), r),
          o = null == i ? void 0 : i[Q];
        if (o && o.t === t) return n.o[r] = t, n.R[r] = !1, !0;
        if (c(t, i) && (void 0 !== t || u(n.t, r))) return !0;
        E(n), k(n);
      }
      return n.o[r] === t && (void 0 !== t || r in n.o) || Number.isNaN(t) && Number.isNaN(n.o[r]) || (n.o[r] = t, n.R[r] = !0), !0;
    },
    deleteProperty: function deleteProperty(n, r) {
      return void 0 !== z(n.t, r) || r in n.t ? (n.R[r] = !1, E(n), k(n)) : delete n.R[r], n.o && delete n.o[r], !0;
    },
    getOwnPropertyDescriptor: function getOwnPropertyDescriptor(n, r) {
      var t = p(n),
        e = Reflect.getOwnPropertyDescriptor(t, r);
      return e ? {
        writable: !0,
        configurable: 1 !== n.i || "length" !== r,
        enumerable: e.enumerable,
        value: t[r]
      } : e;
    },
    defineProperty: function defineProperty() {
      n(11);
    },
    getPrototypeOf: function getPrototypeOf(n) {
      return Object.getPrototypeOf(n.t);
    },
    setPrototypeOf: function setPrototypeOf() {
      n(12);
    }
  },
  on = {};
i(en, function (n, r) {
  on[n] = function () {
    return arguments[0] = arguments[0][0], r.apply(this, arguments);
  };
}), on.deleteProperty = function (r, t) {
  return isNaN(parseInt(t)) && n(13), on.set.call(this, r, t, void 0);
}, on.set = function (r, t, e) {
  return "length" !== t && isNaN(parseInt(t)) && n(14), en.set.call(this, r[0], t, e, r[0]);
};
var un = function () {
    function e(r) {
      var e = this;
      this.g = B, this.D = !0, this.produce = function (r, i, o) {
        if ("function" == typeof r && "function" != typeof i) {
          var u = i;
          i = r;
          var a = e;
          return function (n) {
            var r = this;
            void 0 === n && (n = u);
            for (var t = arguments.length, e = Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) e[o - 1] = arguments[o];
            return a.produce(n, function (n) {
              var t;
              return (t = i).call.apply(t, [r, n].concat(e));
            });
          };
        }
        var f;
        if ("function" != typeof i && n(6), void 0 !== o && "function" != typeof o && n(7), t(r)) {
          var c = w(e),
            s = N(e, r, void 0),
            v = !0;
          try {
            f = i(s), v = !1;
          } finally {
            v ? O(c) : g(c);
          }
          return "undefined" != typeof Promise && f instanceof Promise ? f.then(function (n) {
            return j(c, o), P(n, c);
          }, function (n) {
            throw O(c), n;
          }) : (j(c, o), P(f, c));
        }
        if (!r || "object" != _typeof(r)) {
          if (void 0 === (f = i(r)) && (f = r), f === H && (f = void 0), e.D && d(f, !0), o) {
            var p = [],
              l = [];
            b("Patches").M(r, f, p, l), o(p, l);
          }
          return f;
        }
        n(21, r);
      }, this.produceWithPatches = function (n, r) {
        if ("function" == typeof n) return function (r) {
          for (var t = arguments.length, i = Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) i[o - 1] = arguments[o];
          return e.produceWithPatches(r, function (r) {
            return n.apply(void 0, [r].concat(i));
          });
        };
        var t,
          i,
          o = e.produce(n, r, function (n, r) {
            t = n, i = r;
          });
        return "undefined" != typeof Promise && o instanceof Promise ? o.then(function (n) {
          return [n, t, i];
        }) : [o, t, i];
      }, "boolean" == typeof (null == r ? void 0 : r.useProxies) && this.setUseProxies(r.useProxies), "boolean" == typeof (null == r ? void 0 : r.autoFreeze) && this.setAutoFreeze(r.autoFreeze);
    }
    var i = e.prototype;
    return i.createDraft = function (e) {
      t(e) || n(8), r(e) && (e = R(e));
      var i = w(this),
        o = N(this, e, void 0);
      return o[Q].C = !0, g(i), o;
    }, i.finishDraft = function (r, t) {
      var e = r && r[Q];
      (e && e.C || n(9), e.I && n(10));
      var i = e.A;
      return j(i, t), P(void 0, i);
    }, i.setAutoFreeze = function (n) {
      this.D = n;
    }, i.setUseProxies = function (r) {
      r && !B && n(20), this.g = r;
    }, i.applyPatches = function (n, t) {
      var e;
      for (e = t.length - 1; e >= 0; e--) {
        var i = t[e];
        if (0 === i.path.length && "replace" === i.op) {
          n = i.value;
          break;
        }
      }
      e > -1 && (t = t.slice(e + 1));
      var o = b("Patches").$;
      return r(n) ? o(n, t) : this.produce(n, function (n) {
        return o(n, t);
      });
    }, e;
  }(),
  an = new un(),
  fn = an.produce;
  an.produceWithPatches.bind(an);
  an.setAutoFreeze.bind(an);
  an.setUseProxies.bind(an);
  an.applyPatches.bind(an);
  an.createDraft.bind(an);
  an.finishDraft.bind(an);

var SAGA_EXTERMINATOR = '@@sb-saga!';

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
                    nextState = fn(state, function (draftState) {
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
exports.configureAdaptiveStore = configureAdaptiveStore;
exports.switchback = switchback;
//# sourceMappingURL=index.js.map
