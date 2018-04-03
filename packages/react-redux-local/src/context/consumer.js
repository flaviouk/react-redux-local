import React from 'react'
import isFunction from 'lodash/isFunction'

import Prevent from './Prevent'

const defaultMapState = () => undefined
const defaultMapActions = () => undefined

const getConsumer = (
  mapState = defaultMapState,
  mapActions = defaultMapActions
) => Consumer => props => (
  <Consumer>
    {({ state, actions, dispatch }) => (
      <Prevent
        state={isFunction(mapState) ? mapState(state) : defaultMapState(state)}
        actions={mapActions(actions, dispatch)}
        children={props.children}
        dispatch={dispatch}
      />
    )}
  </Consumer>
)

export default getConsumer
