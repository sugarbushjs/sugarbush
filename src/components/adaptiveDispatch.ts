import { Dispatch } from 'redux'
import { IAdpDispatchOptions } from "../types/disaptchTypes";

// @ts-ignore
const emoji = String.fromCodePoint("0X1F6A1");

export function adaptiveDispatch<
  D extends Dispatch,
  K extends string | undefined,
  W extends boolean
>(options: IAdpDispatchOptions<D,K, W>) {
  const {
    dispatch: _dispatch,
    key: _key,
    suppressLogging: _logging = false
  } = options || {};

  const loggingOn = process.env.NODE_ENV !== "production";
  
  if (!_key && loggingOn) {
    console.log(`${emoji} AdaptiveDispatch: key was not provided `);
  }

  return function _fis(action: any) {
    try{
      const _action = { ...action, key: _key };
      _dispatch(_action);
    } catch(e) {
      console.error(`${emoji} error in AdaptiveDispatch: ${e}`)
    }
  };
}
