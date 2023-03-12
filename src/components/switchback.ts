import { SAGA_EXTERMINATOR } from '../types/storeTypes'

// @ts-ignore
const emoji = String.fromCodePoint("0x26F7");

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
 * @returns State object representing the reducers
 *  
 * */
export function switchback(reducers: any) {
  const reducerKeys = Object.keys(reducers);
  const loggingOn = process.env.NODE_ENV !== 'production'

  return function _lowerFIS(state: any = {}, action: any):any {
    let nextState: any = {};
    const id = action?.key || undefined;
    let runReduxCombined = false;

    if (id) {
      if (loggingOn) {
        console.log(`${emoji} running switchback: ${action.type}`);
      }

      try {
        nextState = { ...state };
        /**
         * If the dispatched saga does NOT have associated reducer
         * then just return the current store state - this comes
         * form either the configureAdaptiveStore.dispatchSaga or
         * adaptiveSagaDispatch
         *  */
        if (id === SAGA_EXTERMINATOR) {
          if (loggingOn) {
            console.log(`${emoji} SAGA Escape Hatch!!! ${action.type}`);
          }
          return nextState
        }

        const reducer = reducers[id];

        if (reducer) {
          const previousStateForKey = state[id];
          nextState[id] = reducer(previousStateForKey, action);
        } else {
          if(loggingOn) {
            console.log(`${emoji} switchback: key does not exists. Continuing with combinedReducer logic`);
          }
          runReduxCombined = true;
        }
      } catch (e: any) {
        const message = `key = ${id} => Error: ${e.message || ""}`;
        throw new Error(`${emoji} Error within switchback: ${message} `);
      }

      if (!runReduxCombined) return nextState;
    }

    if (loggingOn) {
      console.log(`${emoji} => running combinedReducer logic `);
    }

    for (let i = 0; i < reducerKeys.length; i++) {
      const key = reducerKeys[i];
      const reducer = reducers[key];
      const previousStateForKey = state[key];

      const nextStateForKey = reducer(previousStateForKey, action);
      _isStateValid(nextStateForKey, action, key);

      nextState[key] = nextStateForKey;
    }
    return nextState;
  };
}

const _isStateValid = (nextStateForKey: any, action: any, key: string) => {
  if (!nextStateForKey) {
    const actionType = action && action.type;
    throw new Error(
      `${emoji} When called with an action of type ${
        actionType ? `"${String(actionType)}"` : "(unknown type)"
      }, the slice reducer for key "${key}" returned undefined. ` +
        `To ignore an action, you must explicitly return the previous state. ` +
        `If you want this reducer to hold no value, you can return null instead of undefined.`
    );
  }

  return nextStateForKey;
};
