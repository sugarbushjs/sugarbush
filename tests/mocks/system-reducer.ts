export enum SystemActionEnum {
  FETCH_SYSTEM_THEME = 'FETCH_SYSTEM_THEME',
  SET_SYSTEM_THEME = 'SET_SYSTEM_THEME',
  SET_SYSTEM_TIME = 'SET_SYSTEM_TIME',
}

export const initialState = {
  theme: '',
  timeZone: 0,
  isLoading: true,
}

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SystemActionEnum.FETCH_SYSTEM_THEME:
      // eslint-disable-next-line no-case-declarations
      const theme = action.payload !== undefined ? action.payload : 'light'
      return {
        ...state,
        theme: theme,
        isLoading: false,
      }
    case SystemActionEnum.SET_SYSTEM_THEME:
      return {
        ...state,
        theme: action.payload,
      }
    case SystemActionEnum.SET_SYSTEM_TIME:
      return {
        ...state,
        timeZone: action.payload,
      }
    default:
      return state
  }
}

export default reducer
