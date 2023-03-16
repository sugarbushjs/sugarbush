export declare const AppStore: import("@reduxjs/toolkit/dist/configureStore").ToolkitStore<{
    theme: string;
}, any, [import("@reduxjs/toolkit").ThunkMiddleware<{
    theme: string;
}, import("redux").AnyAction, undefined>]>;
export declare const createAdpStore: () => {
    dispatch: (key: string) => (action: import("redux").AnyAction) => void;
    dispatchSaga: () => (action: import("redux").AnyAction) => void;
};
export default createAdpStore;
