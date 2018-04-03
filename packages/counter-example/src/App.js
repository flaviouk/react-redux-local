import React from 'react'

import Context from './context'
import Up from './context/Up'
import Down from './context/Down'
import Count from './context/Count'
import TotalCount from './context/TotalCount'
import DownOnly from './context/DownOnly'

const App = () => (
  <Context.Provider>
    <Up />

    <Down />

    <Count />

    <TotalCount />

    <DownOnly />
  </Context.Provider>
)

export default App
