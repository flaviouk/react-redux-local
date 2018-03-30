import React from 'react'
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { createSerializer } from 'enzyme-to-json'
import { takeEvery } from 'redux-saga'

import LocalReducer from '../'
import { reducer, actions, types } from './duck'

configure({ adapter: new Adapter() })
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }))

it('should be defined', () => {
  expect(LocalReducer).toBeDefined()
})

it('should render different states based on actions', () => {
  const wrapper = mount(
    <LocalReducer
      reducer={reducer}
      actions={actions}
      devToolsOptions={{ name: 'testing react-redux-local' }}
      render={({ counter }) => <h1>Counter: {counter}</h1>}
    />
  )

  /* -------------------> Increase <------------------- */
  expect(wrapper.instance().state).toMatchSnapshot()
  wrapper.instance().dispatch(actions.increase())
  expect(wrapper.instance().state).toMatchSnapshot()
  wrapper.instance().boundActions.increase()
  expect(wrapper.instance().state).toMatchSnapshot()

  /* -------------------> Reset <------------------- */
  wrapper.instance().dispatch(actions.reset())
  expect(wrapper.instance().state).toMatchSnapshot()

  /* -------------------> Decrease <------------------- */
  wrapper.instance().dispatch(actions.decrease())
  expect(wrapper.instance().state).toMatchSnapshot()
  wrapper.instance().boundActions.decrease()
  expect(wrapper.instance().state).toMatchSnapshot()

  /* -------------------> Reset <------------------- */
  wrapper.instance().boundActions.reset()
  expect(wrapper.instance().state).toMatchSnapshot()
})

it('should call saga', () => {
  const mockCallback = jest.fn()

  function* saga() {
    yield takeEvery(types.INCREASE, mockCallback)
    yield takeEvery(types.DECREASE, mockCallback)
    yield takeEvery(types.RESET, mockCallback)
  }

  const wrapper = mount(
    <LocalReducer
      reducer={reducer}
      actions={actions}
      saga={saga}
      render={({ counter }) => <h1>Counter: {counter}</h1>}
    />
  )

  wrapper.instance().boundActions.increase()
  expect(mockCallback.mock.calls.length).toBe(1)

  wrapper.instance().boundActions.decrease()
  expect(mockCallback.mock.calls.length).toBe(2)

  wrapper.instance().boundActions.reset()
  expect(mockCallback.mock.calls.length).toBe(3)
})

it('middleware should work', () => {
  const mockCallback = jest.fn()

  const middleware = store => next => action => {
    mockCallback()
    return next(action)
  }

  const wrapper = mount(
    <LocalReducer
      reducer={reducer}
      actions={actions}
      middleware={[middleware]}
      render={({ counter }) => <h1>Counter: {counter}</h1>}
    />
  )

  wrapper.instance().dispatch({ type: 'TOTALY_FAKE_ACTION_1' })
  expect(mockCallback.mock.calls.length).toBe(1)
  wrapper.instance().dispatch({ type: 'TOTALY_FAKE_ACTION_2' })
  expect(mockCallback.mock.calls.length).toBe(2)
})
