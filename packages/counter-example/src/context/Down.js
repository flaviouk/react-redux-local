import React from 'react'

import Context from './index'

const mapActions = ({ countDown }) => countDown

const Consumer = Context.createConsumer(false, mapActions)
const Down = () => (
  <Consumer>{(_, action) => <button onClick={action}>DOWN</button>}</Consumer>
)

export default Down
