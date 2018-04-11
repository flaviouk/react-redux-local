import React from 'react'

import { Provider } from './context'

import Up from './context/Up'
import Down from './context/Down'
import Count from './context/Count'
import TotalCount from './context/TotalCount'
import DownOnly from './context/DownOnly'

const App = () => (
  <Provider>
    <Up />

    <Down />

    <Count />

    <TotalCount />

    <DownOnly />
  </Provider>
)

export default App
