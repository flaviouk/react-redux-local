import 'raf/polyfill'
import React from 'react'
import prettyFormat from 'pretty-format'
import { render, fireEvent } from 'react-testing-library'

import { createContext } from '../..'

import { reducer, actions } from '../duck'
import { combinations } from '../utils'

it('should be defined', () => {
  expect(createContext).toBeDefined()
})

const createWrapper = ({ mapState, mapActions }) => {
  const { Provider, Consumer } = createContext({
    reducer,
    actions
  })

  return render(
    <Provider>
      <Consumer mapState={mapState} mapActions={mapActions}>
        {(state, actions = {}) => {
          const inc = actions.increase || function() {}
          const dec = actions.decrease || function() {}
          const reset = actions.reset || function() {}

          return (
            <div>
              Given:
              {prettyFormat([
                mapState ? mapState(reducer()) : mapState,
                mapActions ? mapActions(actions) : mapActions
              ])}
              Got:
              {prettyFormat([state, actions])}
              <button onClick={inc} type="button">
                inc
              </button>
              <button onClick={dec} type="button">
                dec
              </button>
              <button onClick={reset} type="button">
                reset
              </button>
            </div>
          )
        }}
      </Consumer>
    </Provider>
  )
}

const tests = combinations({
  mapState: [undefined, state => state, state => state.counter],
  mapActions: [
    undefined,
    actions => actions,
    actions => ({ increase: actions.increase })
  ]
})

describe('should render with different selectors', () => {
  tests.map(props =>
    test('[variation]', () => {
      const { container } = createWrapper(props)
      expect(container).toMatchSnapshot()
    })
  )
})

test('should be able to update state by firing an action', () => {
  const props = {
    mapState: state => state,
    mapActions: actions => actions
  }

  const { container, getByText } = createWrapper(props)
  fireEvent.click(getByText('inc'))
  expect(container).toMatchSnapshot()
  fireEvent.click(getByText('reset'))
  expect(container).toMatchSnapshot()
  fireEvent.click(getByText('dec'))
  expect(container).toMatchSnapshot()
})
