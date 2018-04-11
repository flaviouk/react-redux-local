import React from 'react'

import { Consumer } from './index'

const mapState = ({ total }) => total

const TotalCount = () => (
  <Consumer mapState={mapState}>
    {state => <h3>Total count: {state}</h3>}
  </Consumer>
)

export default TotalCount
