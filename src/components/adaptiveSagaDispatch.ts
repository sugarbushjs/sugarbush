import { Dispatch } from 'redux'
import { IAdpSagaDispatchOptions } from '../types/disaptchTypes'
import { SAGA_EXTERMINATOR } from '../types/storeTypes'

// @ts-ignore
const emoji = String.fromCodePoint("0X1F6A1");

export function adaptiveSagaDispatch<
  D extends Dispatch,
>(options: IAdpSagaDispatchOptions<D>) {
  const {
    dispatch: _dispatch,
  } = options || {};

  return function _fis(action: any) {
    try{
      const _action = { ...action, key: SAGA_EXTERMINATOR };
      _dispatch(_action);
    } catch(e) {
      console.error(`${emoji} error in AdaptiveDispatch: ${e}`)
    }
  };
}


