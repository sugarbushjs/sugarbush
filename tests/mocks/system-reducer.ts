export const initialState = {
  theme: '',
}

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'FETCH_SYSTEM_THEME':
      return {
        ...state,
        theme: action.payload,
      }
    default:
      return state
  }
}

export default reducer
