import * as React from 'react'

import getProvider from './provider'

const getConsumer = Consumer => props => {}

export default options => {
  const { Provider, Consumer } = React.createContext()

  return {
    Provider: getProvider(Provider, options),
    Consumer: getConsumer(Consumer)
  }
}
