import { Dispatch } from 'redux'

/**
 * @template dispatch of type redux Dispatch
 * @template key <optional> of type string
 * @description An interface for useAdaptiveDispatch
 */
export interface IAdpDispatchOptions<
  D extends Dispatch,
  K extends string | undefined,
  W extends boolean
> {
  dispatch: D;
  key?: K;
  suppressLogging?: W
}

/**
 * @template dispatch of type redux Dispatch
 * @description An interface for useAdaptiveDispatch
 */
export interface IAdpSagaDispatchOptions<
  D extends Dispatch,
> {
  dispatch: D;
}