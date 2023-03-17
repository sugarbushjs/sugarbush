import { AnyAction, Dispatch } from 'redux';
import { IAdpStoreOptions } from '../types/storeTypes';
/**
 *
 * @description This creates a store that contains two methods: dispatch and dispatchSaga. The
 *  configureAdaptiveStore takes one parameter of type Redux Dispatch.
 *
 *  <p/>
 *  <p>The dispatch function creates a Redux dispatch that takes a key which is used with switchback.<p/>
 *  <p/>
 *  <p>The dispatchSaga function creates a Redux dispatch that takes a key which is used to
 *  bypass switchback. The same key must be added to switchback options (sagaBypass). See
 *  switch for more information<p/>
 *
 * @param options take dispatch of type Redux Dispatch
 *
 * @example
 **
 *  export const adpStore = configureAdaptiveStore({
 *    dispatch: store.dispatch
 *  })
 *
 * @example
 *  export const createAdpStore = () => {
 *   return configureAdaptiveStore({
 *     dispatch: store.dispatch,
 *   })
 * }
 *
 * <p/>
 * import { configureStore } from '@reduxjs/toolkit'*
 * => store from configureStore
 */
export declare function configureAdaptiveStore<D extends Dispatch>(options: IAdpStoreOptions<D>): {
    dispatch: (key: string) => (action: AnyAction) => void;
    dispatchSaga: (sagaKey: string) => (action: AnyAction) => void;
};
