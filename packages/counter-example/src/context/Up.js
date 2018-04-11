import React from 'react'

import { Consumer } from './index'

const mapActions = ({ countUp }) => countUp

const Up = () => (
  <Consumer mapActions={mapActions}>
    {(_, action) => <button onClick={action}>UP</button>}
  </Consumer>
)

export default Up
