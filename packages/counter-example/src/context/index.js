import { createContext } from 'react-redux-local'

const actions = {
  countUp: () => ({ type: 'COUNT_UP' }),
  countDown: () => ({ type: 'COUNT_DOWN' })
}

const initialState = { counter: 0, total: 0, downs: 0 }
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'COUNT_UP':
      return {
        counter: state.counter + 1,
        total: state.total + 1,
        downs: state.downs
      }

    case 'COUNT_DOWN':
      return {
        counter: state.counter - 1,
        total: state.total + 1,
        downs: state.downs + 1
      }

    default:
      return state
  }
}

export const { Provider, Consumer } = createContext({
  reducer,
  actions,
  devToolsOptions: { name: 'react-redux-local - DevTools' }
})
