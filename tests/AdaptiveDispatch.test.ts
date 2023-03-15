// @ts-ignore
import { AppStore } from "./mocks/mock-store"
import { adaptiveDispatch } from '../src'

describe("Adaptive Dispatch", () => {
  it("dispatch with key ", () => {
    const systemDispatch = () =>
      adaptiveDispatch({ dispatch: AppStore.dispatch, key: "SystemState" });
    const dispatch = systemDispatch()
    dispatch({ type: "FETCH_SYSTEM_THEME", payload: "blue" });

    const theme = AppStore.getState().theme;
    expect(theme).toEqual("blue");
  });

  it("dispatch with No key", () => {
    const systemDispatch = () =>
      adaptiveDispatch({ dispatch: AppStore.dispatch });
    const _dispatch = systemDispatch();
    _dispatch({ type: "FETCH_SYSTEM_THEME", payload: "yellow" });

    const theme = AppStore.getState().theme;
    expect(theme).toEqual("yellow");
  });
})
