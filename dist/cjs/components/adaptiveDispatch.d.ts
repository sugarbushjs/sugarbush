import { Dispatch } from 'redux';
import { IAdpDispatchOptions } from '../types/disaptchTypes';
/**
 * @description
 *
 * @param options dispatch, key, verbose
 * <p/>
 * dispath of type Redux Dispatch
 * <p/>
 * key of type string used with switchback to process only the reduces that represents the key
 * <p/>
 * verbose of type boolean and output information to the console windows. This is turned off in production
 *
 * @example
 *  const systemDispatch = () => adaptiveDispatch({
 *    dispatch: store.dispatch,
 *    key: 'SystemState',
 *    verbose: false
 *  })
 *
 * @example
 *  const systemDispatch = () => adaptiveDispatch({
 *    dispatch: store.dispatch,
 *    verbose: false
 *  })
 *
 * @example
 *  const systemDispatch = () => adaptiveDispatch({
 *    dispatch: store.dispatch
 *  })
 *
 * */
export declare function adaptiveDispatch<D extends Dispatch, K extends string | undefined, V extends boolean>(options: IAdpDispatchOptions<D, K, V>): (action: any) => void;
