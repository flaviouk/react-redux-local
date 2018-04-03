import React from 'react'

import Context from './index'

const mapState = ({ total }) => total

const Consumer = Context.createConsumer(mapState)
const TotalCount = () => (
  <Consumer>{state => <h3>Total count: {state}</h3>}</Consumer>
)

export default TotalCount
