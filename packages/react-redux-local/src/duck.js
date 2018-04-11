export const types = {
  INCREASE: 'INCREASE',
  DECREASE: 'DECREASE',
  RESET: 'RESET'
}

export const actions = {
  increase: () => ({ type: types.INCREASE }),
  decrease: () => ({ type: types.DECREASE }),
  reset: () => ({ type: types.RESET })
}

const initialState = { counter: 0 }
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.INCREASE:
      return { counter: state.counter + 1 }

    case types.DECREASE:
      return { counter: state.counter - 1 }

    case types.RESET:
      return initialState

    default:
      return state
  }
}
