import React from 'react'

import { Consumer } from './index'

const mapState = ({ counter }) => counter

const Count = () => (
  <Consumer mapState={mapState}>{state => <h3>Count: {state}</h3>}</Consumer>
)

export default Count
