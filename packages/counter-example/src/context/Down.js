import React from 'react'

import { Consumer } from './index'

const mapActions = ({ countDown }) => countDown

const Down = () => (
  <Consumer mapActions={mapActions}>
    {(_, action) => <button onClick={action}>DOWN</button>}
  </Consumer>
)

export default Down
