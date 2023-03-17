export enum CounterActionEnum {
  INCREMENT_COUNTER = 'INCREMENT_COUNTER',
  DECREMENT_COUNTER = 'DECREMENT_COUNTER',
}
export const initialState = {
  value: 0,
}

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CounterActionEnum.INCREMENT_COUNTER:
      // eslint-disable-next-line no-case-declarations
      const addValue = state.value || 0
      return {
        value: addValue + 1,
      }
    case CounterActionEnum.DECREMENT_COUNTER:
      // eslint-disable-next-line no-case-declarations
      const subValue = state.value || 0
      return {
        value: subValue - 1,
      }
    default:
      return state
  }
}

export default reducer
