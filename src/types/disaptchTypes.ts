import { Dispatch } from 'redux'

/**
 * @template dispatch of type redux Dispatch
 * @template key <optional> of type string
 * @template verbose <optional> of type boolean
 * @description An interface for useAdaptiveDispatch
 */
export interface IAdpDispatchOptions<D extends Dispatch, K extends string | undefined, V extends boolean> {
  dispatch: D
  key?: K
  verbose?: V
}
