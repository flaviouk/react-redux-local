import React from 'react'

import Context from './index'

const mapState = ({ counter }) => counter

const Consumer = Context.createConsumer(mapState)
const Count = () => <Consumer>{state => <h3>Count: {state}</h3>}</Consumer>

export default Count
