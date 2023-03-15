/* eslint-disable */
// @ts-nocheck
import { configureStore } from '@reduxjs/toolkit'
import { configureAdaptiveStore } from '../../src'
// @ts-ignore
import SystemState from './system-reducer'

export const AppStore = configureStore({
  reducer: SystemState,
})

export const createAdpStore = () => {
  return configureAdaptiveStore({
    dispatch: AppStore.dispatch,
  })
}

export default createAdpStore
