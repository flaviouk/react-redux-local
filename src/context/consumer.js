import React from 'react'

import Prevent from './Prevent'

const defaultMapState = state => state

const getConsumer = (Consumer, mapState = defaultMapState) => props => (
  <Consumer>
    {([state, actions, dispatch]) => (
      <Prevent
        children={props.children}
        actions={actions}
        dispatch={dispatch}
        state={mapState(state)}
      />
    )}
  </Consumer>
)

export default getConsumer
