import { Dispatch } from 'redux'
import { IAdpDispatchOptions } from '../types/disaptchTypes'

// @ts-ignore
const emoji = String.fromCodePoint('0X1F6A1')

/**
 * @description
 *
 * @param options dispatch, key, verbose
 * <p/>
 * dispath of type Redux Dispatch
 * <p/>
 * key of type string used with switchback to process only the reduces that represents the key
 * <p/>
 * verbose of type boolean and output information to the console windows. This is turned off in production
 *
 * @example
 *  const systemDispatch = () => adaptiveDispatch({
 *    dispatch: store.dispatch,
 *    key: 'SystemState',
 *    verbose: false
 *  })
 *
 * @example
 *  const systemDispatch = () => adaptiveDispatch({
 *    dispatch: store.dispatch,
 *    verbose: false
 *  })
 *
 * @example
 *  const systemDispatch = () => adaptiveDispatch({
 *    dispatch: store.dispatch
 *  })
 *
 * */
export function adaptiveDispatch<D extends Dispatch, K extends string | undefined, V extends boolean>(
  options: IAdpDispatchOptions<D, K, V>,
) {
  const { dispatch: _dispatch, key: _key, verbose: _verbose = true } = options || {}

  const loggingOn = _verbose && process.env.NODE_ENV !== 'production'

  return function _fis(action: any) {
    try {
      if (loggingOn) {
        console.log(`${emoji} adaptiveDispatch: ${_key}`)
      }

      const _action = { ...action, key: _key }
      _dispatch(_action)
    } catch (e) {
      console.error(`${emoji} error in AdaptiveDispatch: ${e}`)
    }
  }
}
