import React from 'react'

import { Consumer } from './index'

const mapState = ({ downs }) => downs

const DownsOnly = () => (
  <Consumer mapState={mapState}>{state => <h3>Downs: {state}</h3>}</Consumer>
)

export default DownsOnly
