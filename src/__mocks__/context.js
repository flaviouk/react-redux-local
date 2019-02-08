export const actions = {
  countUp: () => ({ type: 'COUNT_UP' }),
  countDown: () => ({ type: 'COUNT_DOWN' }),
  reset: () => ({ type: 'RESET' }),
}

const initialState = { counter: 0, total: 0, downs: 0 }
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'COUNT_UP':
      return {
        counter: state.counter + 1,
        total: state.total + 1,
        downs: state.downs,
      }

    case 'COUNT_DOWN':
      return {
        counter: state.counter - 1,
        total: state.total + 1,
        downs: state.downs + 1,
      }

    case 'RESET':
      return initialState

    default:
      return state
  }
}
