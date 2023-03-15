import { Dispatch } from 'redux';
import { IAdpSagaDispatchOptions } from '../types/disaptchTypes';
import { SAGA_EXTERMINATOR } from '../types/storeTypes';

// @ts-ignore
const emoji = String.fromCodePoint("0X1F6A1");

export function adaptiveSagaDispatch<D extends Dispatch, V extends boolean>(
  options: IAdpSagaDispatchOptions<D, V>
) {
  const { dispatch: _dispatch, verbose: _verbose = true } = options || {}

  const loggingOn = _verbose && process.env.NODE_ENV !== "production";

  return function _fis(action: any) {
    try {
      if (loggingOn) {
        console.log(`${emoji} adaptiveSagaDispatch`)
      }

      const _action = { ...action, key: SAGA_EXTERMINATOR }
      _dispatch(_action)
    } catch (e) {
      console.error(`${emoji} error in AdaptiveDispatch: ${e}`)
    }
  }
}
