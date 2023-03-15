import { Dispatch, ReducersMapObject } from 'redux';
export const SAGA_EXTERMINATOR = '@@sb-saga!';

/**
 * @template store of type redux Store
 * @template suppressWarnings of type boolean
 * @description An interface for configureAdaptiveStore
 * */
export interface IAdpStoreOptions<D extends Dispatch> {
  dispatch: D;
}

export interface ISwitchback {
  R: ReducersMapObject;
  V?: boolean;
}
