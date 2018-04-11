import React from 'react'
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { createSerializer } from 'enzyme-to-json'
import { takeEvery } from 'redux-saga'

import LocalReducer from '../LocalReducer'
import { reducer, actions, types } from '../duck'

configure({ adapter: new Adapter() })
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }))

it('should be defined', () => {
  expect(LocalReducer).toBeDefined()
})

let wrapper = undefined
let middlewareCallback = undefined
let sagaCallback = undefined

beforeEach(() => {
  middlewareCallback = jest.fn()
  sagaCallback = jest.fn()

  const middleware = store => next => action => {
    middlewareCallback()
    return next(action)
  }

  function* saga() {
    yield takeEvery(types.INCREASE, sagaCallback)
    yield takeEvery(types.DECREASE, sagaCallback)
    yield takeEvery(types.RESET, sagaCallback)
  }

  wrapper = mount(
    <LocalReducer
      reducer={reducer}
      actions={actions}
      saga={saga}
      middleware={[middleware]}
      children={({ counter }) => <h1>Counter: {counter}</h1>}
    />
  )
})

describe('should render different states based on actions: ', () => {
  /* -------------------> Increase <------------------- */
  test('should handle increase correctly', () => {
    expect(wrapper.instance().state).toMatchSnapshot()
    wrapper.instance().dispatch(actions.increase())
    expect(wrapper.instance().state).toMatchSnapshot()
    wrapper.instance().boundActions.increase()
    expect(wrapper.instance().state).toMatchSnapshot()
  })

  /* -------------------> Reset dispatch <------------------- */
  test('should handle reset with dispatch correctly', () => {
    wrapper.instance().dispatch(actions.reset())
    expect(wrapper.instance().state).toMatchSnapshot()
  })

  /* -------------------> Decrease <------------------- */
  test('should handle decrease correctly', () => {
    wrapper.instance().dispatch(actions.decrease())
    expect(wrapper.instance().state).toMatchSnapshot()
    wrapper.instance().boundActions.decrease()
    expect(wrapper.instance().state).toMatchSnapshot()
  })

  /* -------------------> Reset <------------------- */
  test('should handle reset correctly', () => {
    wrapper.instance().boundActions.reset()
    expect(wrapper.instance().state).toMatchSnapshot()
  })
})

describe('should call saga: ', () => {
  test('should handle increase', () => {
    wrapper.instance().boundActions.increase()
    expect(sagaCallback.mock.calls.length).toBe(1)
  })

  test('should handle decrease', () => {
    wrapper.instance().boundActions.decrease()
    expect(sagaCallback.mock.calls.length).toBe(1)
  })

  test('should handle reset', () => {
    wrapper.instance().boundActions.reset()
    expect(sagaCallback.mock.calls.length).toBe(1)
  })
})

test('should handle middleware: ', () => {
  wrapper.instance().dispatch({ type: 'TOTALY_FAKE_ACTION_1' })
  expect(middlewareCallback.mock.calls.length).toBe(1)
  wrapper.instance().dispatch({ type: 'TOTALY_FAKE_ACTION_2' })
  expect(middlewareCallback.mock.calls.length).toBe(2)
})
