import React from 'react'

import LocalReducer from './LocalReducer'
import Prevent from './Prevent'

export default props => {
  if (!props.reducer) throw new Error('A reducer must be provided.')
  if (!props.actions) throw new Error('A set of actions must be provided.')
  const Context = React.createContext()

  const defaultMap = () => undefined

  const Provider = ({ children }) => (
    <LocalReducer {...props}>
      {(state, actions, dispatch) => (
        <Context.Provider value={{ state, actions, dispatch }}>
          {children}
        </Context.Provider>
      )}
    </LocalReducer>
  )

  const Consumer = ({
    children,
    mapState = defaultMap,
    mapActions = defaultMap,
  }) => (
    <Context.Consumer>
      {({ state, actions, dispatch }) => (
        <Prevent
          state={mapState(state)}
          actions={mapActions(actions, dispatch)}
          dispatch={dispatch}
        >
          {children}
        </Prevent>
      )}
    </Context.Consumer>
  )

  const useDispatch = () => {
    const { dispatch } = React.useContext(Context)

    return dispatch
  }

  const useState = (mapState = defaultMap) => {
    const { state } = React.useContext(Context)

    return mapState(state)
  }

  const useActions = (mapActions = defaultMap) => {
    const { actions } = React.useContext(Context)

    return mapActions(actions)
  }

  return {
    Provider,
    Consumer,
    useDispatch,
    useState,
    useActions,
  }
}
