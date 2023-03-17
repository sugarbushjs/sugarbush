import { produce } from 'immer'
import { ReducersMapObject, StateFromReducersMapObject, AnyAction } from 'redux'
import { ISwitchbackOpt } from '../types/switchbackTypes'
//import { SAGA_EXTERMINATOR } from '../types/storeTypes'

// @ts-ignore
const emoji = String.fromCodePoint('0x26F7')

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
 * @param options for switchback options. All options are optional and include
 *  verbose (boolean) will output information to the console window, sagaBypass (string)
 *  will prevent the processing of any reducer. See ISwitchbackOpt for more inforamtmion
 *
 *  @example
 *    const reducers = switchback({
 *      SystemState,
 *      CounterState,
 *      StatusState,
 *    }, { sagaBypass: '@@SAGABYPASS!', verbose: false})
 *
 *  @example
 *    const reducers = switchback({
 *      SystemState,
 *      CounterState,
 *      StatusState,
 *    }, { verbose: false, sagaBypass: '@@SAGABYPASS!'})
 *
 *  @example
 *    const reducers = switchback({
 *      SystemState,
 *      CounterState,
 *      StatusState,
 *    }, { verbose: false })
 *
 *  @example
 *    const reducers = switchback({
 *      SystemState,
 *      CounterState,
 *      StatusState,
 *    }, { sagaBypass: '@@SAGABYPASS!'})
 *
 *  @example
 *    const reducers = switchback({
 *      SystemState,
 *      CounterState,
 *      StatusState,
 *    })
 *
 * @returns State object representing the reducers
 *
 * */
export function switchback<V extends boolean | undefined, S extends string | undefined>(
  reducers: ReducersMapObject,
  options?: ISwitchbackOpt<V, S>,
) {
  const { verbose = true, sagaBypass = '' } = options || { verbose: true, sagaBypass: '' }
  const reducerKeys = Object.keys(reducers)
  const loggingOn = verbose && process.env.NODE_ENV !== 'production'

  return function _lowerFIS(state: StateFromReducersMapObject<typeof reducers> = {}, action: AnyAction): any {
    let nextState: StateFromReducersMapObject<typeof reducers> = {}
    const id = action?.key || undefined
    let runReduxCombined = false

    /** Build state tree */
    if (!state) {
      nextState = _buildStateTree(reducers, reducerKeys, action)

      if (!nextState) {
        throw new Error(`${emoji} switchback: error with null state`)
      }
      return nextState
    }

    if (id) {
      if (loggingOn) {
        console.log(`${emoji} running switchback: ${action.type}`)
      }

      try {
        /**
         * If the dispatched saga does NOT have associated reducer
         * then just return the current store state - this comes
         * form either the configureAdaptiveStore.dispatchSaga or
         * adaptiveSagaDispatch
         *  */
        if (id === sagaBypass && id.trim() !== '') {
          if (loggingOn) {
            console.log(`${emoji} SAGA Bypass!!! ${action.type}`)
          }
          return state
        }

        const reducer = reducers[id]

        if (reducer) {
          nextState = produce(state, (draftState: any) => {
            const nState = draftState
            const previousStateForKey = state[id]
            const newState = reducer(previousStateForKey, action)
            _isStateValid(newState, action, id)
            nState[id] = newState
          })
        } else {
          if (loggingOn) {
            console.log(`${emoji} switchback: key does not exists. Continuing with combinedReducer logic`)
          }
          runReduxCombined = true
        }
      } catch (e: any) {
        const message = `key = ${id} => Error: ${e.message || ''}`
        throw new Error(`${emoji} Error within switchback: ${message} `)
      }

      if (!runReduxCombined) return nextState
    }

    if (loggingOn) {
      console.log(`${emoji} => running combinedReducer logic `)
    }

    for (let i = 0; i < reducerKeys.length; i++) {
      const key = reducerKeys[i]
      const reducer = reducers[key]

      if (!reducer) {
        throw new Error(`Error combinedReducer logic - reducer does not exist ${key}`)
      }

      const previousStateForKey = state[key]
      const nextStateForKey = reducer(previousStateForKey, action)
      _isStateValid(nextStateForKey, action, key)
      nextState[key] = nextStateForKey
    }
    return nextState
  }
}

const _isStateValid = (nextStateForKey: any, action: any, key: string) => {
  if (!nextStateForKey) {
    const actionType = action && action.type
    throw new Error(
      `${emoji} When called with an action of type ${
        actionType ? `"${String(actionType)}"` : '(unknown type)'
      }, the slice reducer for key "${key}" returned undefined. ` +
        `To ignore an action, you must explicitly return the previous state. ` +
        `If you want this reducer to hold no value, make sure you reducers has initial state` +
        `to represent the return type. For exp, if set to null use {} instead is returning an object.`,
    )
  }

  return nextStateForKey
}

const _buildStateTree = (reducers: ReducersMapObject, reducerKeys: any, action: AnyAction) => {
  const nextState: any = {}

  //Build state tree
  for (let i = 0; i < reducerKeys.length; i++) {
    const key = reducerKeys[i]
    const reducer = reducers[key]

    if (!reducer) {
      throw new Error(`Error combinedReducer logic - reducer does not exist ${key}`)
    }

    const nextStateForKey = reducer({}, action)
    nextState[key] = nextStateForKey
  }
  return nextState
}
