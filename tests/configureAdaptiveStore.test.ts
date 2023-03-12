// @ts-ignore
import { createAdpStore, AppStore } from './mocks/mock-store'
// @ts-ignore
import SystemState from "./mocks/system-reducer";

describe("configureAdaptiveStore Test", () => {

  it("use createDispatch from Adaptive Store", () => {
    const adpStore = createAdpStore();
    const dispatch = adpStore.dispatch('SystemState')

    dispatch({ type: "FETCH_SYSTEM_THEME", payload: "green" });
    expect(AppStore.getState().theme).toEqual("green");
  });
});
