import { switchback } from "../src";
// @ts-ignore
import SystemState, { initialState } from "./mocks/system-reducer";

describe("switchback", () => {
  it("test switchback with id", () => {
    const _state = initialState;

    const s = switchback({
      SystemState,
    });

    const nextState = s(_state, {
      type: "FETCH_SYSTEM_THEME",
      payload: "light",
      key: "SystemState",
    });
    expect(nextState.SystemState.theme).toEqual("light");
  });

  it("test switchback with BAD id", () => {
    const _state = initialState;

    const s = switchback({
      SystemState,
    });

    const nextState = s(_state, {
      type: "FETCH_SYSTEM_THEME",
      payload: "light",
      key: "ABC",
    });
    expect(nextState.SystemState.theme).toEqual("light");
  });

  it("test switchback with NO id", () => {
    const _state = initialState;

    const s = switchback({
      SystemState,
    });

    const nextState = s(_state, {
      type: "FETCH_SYSTEM_THEME",
      payload: "dark",
    });
    expect(nextState.SystemState.theme).toEqual("dark");
  });
});
