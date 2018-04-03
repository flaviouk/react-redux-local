import React from 'react'

import Context from './index'

const mapState = ({ downs }) => downs

const Consumer = Context.createConsumer(mapState)
const DownsOnly = () => <Consumer>{state => <h3>Downs: {state}</h3>}</Consumer>

export default DownsOnly
