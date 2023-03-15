import { Dispatch } from 'redux'
import { IAdpDispatchOptions } from "../types/disaptchTypes";

// @ts-ignore
const emoji = String.fromCodePoint("0X1F6A1");

export function adaptiveDispatch<
  D extends Dispatch,
  K extends string | undefined,
  V extends boolean
>(options: IAdpDispatchOptions<D,K, V>) {
  const {
    dispatch: _dispatch,
    key: _key,
    verbose: _verbose = true
  } = options || {};

  const loggingOn = _verbose && process.env.NODE_ENV !== "production";

  return function _fis(action: any) {
    try{
      if(loggingOn) {
        console.log(`${emoji} adaptiveDispatch: ${_key}`)
      }

      const _action = { ...action, key: _key };
      _dispatch(_action);
    } catch(e) {
      console.error(`${emoji} error in AdaptiveDispatch: ${e}`)
    }
  };
}
