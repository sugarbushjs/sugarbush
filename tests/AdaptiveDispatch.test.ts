// @ts-ignore
import { AppStore } from './mocks/mock-store'
import { SystemActionEnum } from './mocks/system-reducer'
import { adaptiveDispatch } from '../src'

describe('Adaptive Dispatch', () => {
  it('dispatch with key ', () => {
    const systemDispatch = () => adaptiveDispatch({ dispatch: AppStore.dispatch, key: 'SystemState', verbose: false })
    const dispatch = systemDispatch()
    dispatch({ type: SystemActionEnum.FETCH_SYSTEM_THEME, payload: 'blue' })

    const state = AppStore.getState()
    expect(state.SystemState.theme).toEqual('blue')
  })

  it('dispatch with No key', () => {
    const systemDispatch = () => adaptiveDispatch({ dispatch: AppStore.dispatch, verbose: false })
    const dispatch = systemDispatch()
    dispatch({ type: SystemActionEnum.FETCH_SYSTEM_THEME, payload: 'yellow' })

    const state = AppStore.getState()
    expect(state.SystemState.theme).toEqual('yellow')
  })
})
