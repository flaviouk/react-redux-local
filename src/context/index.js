import React from 'react'

import LocalReducer from '../LocalReducer'
import getConsumer from './consumer'

export default props => {
  if (!props.reducer) throw new Error('A reducer must be provided.')
  if (!props.actions) throw new Error('A set of actions must be provided.')
  const { Provider, Consumer } = React.createContext()

  return {
    Provider: ({ children }) => (
      <LocalReducer {...props}>
        {value => <Provider value={value}>{children}</Provider>}
      </LocalReducer>
    ),
    createConsumer: mapState => getConsumer(Consumer, mapState)
  }
}
