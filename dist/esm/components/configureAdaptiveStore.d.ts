import { AnyAction, Dispatch } from 'redux';
import { IAdpStoreOptions } from "../types/storeTypes";
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
export declare function configureAdaptiveStore<D extends Dispatch, W extends boolean>(options: IAdpStoreOptions<D, W>): {
    dispatch: (key: string) => (action: AnyAction) => void;
    dispatchSaga: () => (action: AnyAction) => void;
};
