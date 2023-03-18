/* eslint-disable */
// @ts-nocheck
import { configureStore } from '@reduxjs/toolkit'
import { configureAdaptiveStore } from '../../src'
import { switchback } from '../../src'
import CounterState from './count-reducers'
import SystemState from './system-reducer'

export const SAGA_BYPASS = '@@SAGA-BYPASS!'
export const AppStore = configureStore({
  reducer: { SystemState, CounterState },
})

export const createAdpStore = () => {
  return configureAdaptiveStore({
    dispatch: AppStore.dispatch,
  })
}

export const mockSwitchback = switchback(
  {
    SystemState,
    CounterState,
  },
  { verbose: false, sagaBypass: SAGA_BYPASS },
)

export default createAdpStore
