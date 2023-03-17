/**
 * @template verbose
 * @template sagaBypass
 * @description Interface for switchback options. All options are optional and include
 *  verbose (boolean) to determine if output to console window, sagaBypass (string) to
 *  bypass switchback when calling a saga action
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
 * */
export interface ISwitchbackOpt<V extends boolean | undefined, S extends string | undefined> {
    verbose?: V;
    sagaBypass?: S;
}
