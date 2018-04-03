import React from 'react'

import Prevent from './Prevent'

const defaultMapState = state => state
const defaultMapDispatch = actions => actions

const getConsumer = (
  Consumer,
  mapState = defaultMapState,
  mapDispatch = defaultMapDispatch
) => props => (
  <Consumer>
    {([state, actions, dispatch]) => (
      <Prevent
        children={props.children}
        actions={mapDispatch(actions, dispatch)}
        dispatch={dispatch}
        state={mapState(state)}
      />
    )}
  </Consumer>
)

export default getConsumer
