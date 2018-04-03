import React from 'react'

import Context from './index'

const mapActions = ({ countUp }) => countUp

const Consumer = Context.createConsumer(false, mapActions)
const Up = () => (
  <Consumer>{(_, action) => <button onClick={action}>UP</button>}</Consumer>
)

export default Up
