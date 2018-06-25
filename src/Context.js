import React, { createContext } from 'react'
import isFunction from 'lodash.isfunction'

import LocalReducer from './LocalReducer'
import Prevent from './Prevent'

export default props => {
  if (!props.reducer) throw new Error('A reducer must be provided.')
  if (!props.actions) throw new Error('A set of actions must be provided.')
  const { Provider, Consumer } = createContext()

  const defaultMapState = () => undefined
  const defaultMapActions = () => undefined

  return {
    Provider: ({ children }) => (
      <LocalReducer {...props}>
        {(state, actions, dispatch) => (
          <Provider value={{ state, actions, dispatch }}>{children}</Provider>
        )}
      </LocalReducer>
    ),

    Consumer: ({
      children,
      mapState = defaultMapState,
      mapActions = defaultMapActions
    }) => (
      <Consumer>
        {({ state, actions, dispatch }) => (
          <Prevent
            state={
              isFunction(mapState) ? mapState(state) : defaultMapState(state)
            }
            actions={mapActions(actions, dispatch)}
            dispatch={dispatch}
          >
            {children}
          </Prevent>
        )}
      </Consumer>
    )
  }
}
