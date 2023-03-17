import { ReducersMapObject, AnyAction } from 'redux';
import { ISwitchbackOpt } from '../types/switchbackTypes';
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
export declare function switchback<V extends boolean | undefined, S extends string | undefined>(reducers: ReducersMapObject, options?: ISwitchbackOpt<V, S>): (state: {
    [x: string]: any;
} | undefined, action: AnyAction) => any;
