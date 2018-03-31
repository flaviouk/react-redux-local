import React from 'react'

import LocalReducer from '../LocalReducer'

const getProvider = (Provider, options) => ({ children }) => (
  <LocalReducer {...options}>
    {value => <Provider value={value}>{children}</Provider>}
  </LocalReducer>
)

export default getProvider
