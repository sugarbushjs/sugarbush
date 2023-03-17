// @ts-ignore
import { createAdpStore, AppStore } from './mocks/mock-store'

describe('configureAdaptiveStore Test', () => {
  it('test default theme', () => {
    const adpStore = createAdpStore()
    const dispatch = adpStore.dispatch('SystemState')

    dispatch({ type: 'FETCH_SYSTEM_THEME' })
    const state = AppStore.getState()
    expect(state.SystemState.theme).toEqual('light')
  })

  it('test set default theme', () => {
    const adpStore = createAdpStore()
    const dispatch = adpStore.dispatch('SystemState')

    dispatch({ type: 'FETCH_SYSTEM_THEME', payload: 'green' })
    const state = AppStore.getState()
    expect(state.SystemState.theme).toEqual('green')
  })
})
