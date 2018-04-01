import React from 'react'

import LocalReducer from '../LocalReducer'
import getConsumer from './consumer'

export default localReducerProps => {
  const { Provider, Consumer } = React.createContext()

  return {
    Provider: ({ children }) => (
      <LocalReducer {...localReducerProps}>
        {value => <Provider value={value}>{children}</Provider>}
      </LocalReducer>
    ),
    createConsumer: mapState => getConsumer(Consumer, mapState)
  }
}
