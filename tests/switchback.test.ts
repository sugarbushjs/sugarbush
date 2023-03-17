import { mockSwitchback, AppStore, SAGA_BYPASS } from './mocks/mock-store'

// @ts-ignore
import { SystemActionEnum } from './mocks/system-reducer'

describe('switchback', () => {
  it('test switchback with id', () => {
    const state = AppStore.getState()

    const action = {
      type: 'FETCH_SYSTEM_THEME',
      payload: 'light',
      key: 'SystemState',
    }
    const nextState = mockSwitchback(state, action)
    expect(nextState.SystemState.theme).toEqual('light')
  })

  it('test switchback with BAD id', () => {
    const state = AppStore.getState()

    const action = {
      type: SystemActionEnum.SET_SYSTEM_THEME,
      payload: 'light',
      key: 'ABC',
    }
    const nextState = mockSwitchback(state, action)
    expect(nextState.SystemState.theme).toEqual('light')
  })

  it('test switchback with NO id', () => {
    const state = AppStore.getState()

    const action = {
      type: SystemActionEnum.SET_SYSTEM_THEME,
      payload: 'dark',
    }
    const nextState = mockSwitchback(state, action)
    expect(nextState.SystemState.theme).toEqual('dark')
  })

  it('test saga bypass', () => {
    const state = AppStore.getState()

    const action = { type: 'fetchSagaAPIInfo', key: SAGA_BYPASS }
    const nextState = mockSwitchback(state, action)
    expect(nextState).toEqual(state)
  })
})
