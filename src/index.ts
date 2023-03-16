import { adaptiveDispatch } from './components/adaptiveDispatch'
import { switchback } from './components/switchback'
import { configureAdaptiveStore } from './components/configureAdaptiveStore'
import { IAdpStoreOptions } from './types/storeTypes'
import { IAdpDispatchOptions } from './types/disaptchTypes'
import { SAGA_EXTERMINATOR } from './types/storeTypes'

export {
  adaptiveDispatch,
  switchback,
  configureAdaptiveStore,
  IAdpDispatchOptions,
  IAdpStoreOptions,
  SAGA_EXTERMINATOR as sagaExterminator,
}
