import { Dispatch } from 'redux'

/**
 * @template dispatch of type redux Dispatch
 * @description An interface for configureAdaptiveStore
 *
 * */
export interface IAdpStoreOptions<D extends Dispatch> {
  dispatch: D
}
