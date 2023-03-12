import { AnyAction, Dispatch } from 'redux'
import { IAdpStoreOptions, SAGA_EXTERMINATOR } from "../types/storeTypes";
// @ts-ignore
const emoji = String.fromCodePoint("0X1F3C2");

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
export function configureAdaptiveStore<
  D extends Dispatch,
  W extends boolean
>(options: IAdpStoreOptions<D,W>) {
  let { dispatch: dispt, suppressWarnings = false } = options || {};

  if (!suppressWarnings && process.env.NODE_ENV !== "production")
    console.log(`${emoji} Initializing Adaptive Store`);

  const dispatch = (key:string) => {
    return function _hammerHead(action: AnyAction) {
      const _a = { ...action, key };
      try {
        dispt(_a);
      } catch (e) {
        throw new Error(
          `${emoji} Error dispatching from createAdaptive: KEY= ${key}: Error => ${e}`
        );
      }
    };
  }

  const dispatchSaga = () => {
    return function _bravo(action: AnyAction) {
      const _a = { ...action, key: SAGA_EXTERMINATOR };
      try {
        dispt(_a);
      } catch (e) {
        throw new Error(
          `${emoji} Error dispatching Saga from createAdaptive: Error => ${e}`
        );
      }
    };
  }

  return {
    dispatch,
    dispatchSaga,
  };
}
