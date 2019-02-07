import React from 'react'
import { takeEvery } from 'redux-saga'
import { render, cleanup, fireEvent } from 'react-testing-library'

import LocalReducer from '../..'
import { reducer, actions, types } from '../duck'

afterEach(cleanup)

it('should be defined', () => {
  expect(LocalReducer).toBeDefined()
})

const sharedProps = {
  reducer: reducer,
  actions: actions,
  children: ({ counter }, action) => (
    <>
      <h1>Counter: {counter}</h1>
      <button onClick={action.increase}>Increase</button>
      <button onClick={action.decrease}>Decrease</button>
      <button onClick={action.reset}>Reset</button>
    </>
  ),
}

const getCounterText = ({ getByText }) => getByText(/Counter: /i).textContent
const getIncreaseButton = ({ getByText }) => getByText(/Increase/i)
const getDecreaseButton = ({ getByText }) => getByText(/Decrease/i)
const getResetButton = ({ getByText }) => getByText(/Reset/i)

test('should render different states based on actions: ', () => {
  const container = render(<LocalReducer {...sharedProps} />)

  const increaseButton = getIncreaseButton(container)
  const decreaseButton = getDecreaseButton(container)
  const resetButton = getResetButton(container)

  expect(getCounterText(container)).toBe('Counter: 0')

  fireEvent.click(increaseButton)
  expect(getCounterText(container)).toBe('Counter: 1')
  fireEvent.click(increaseButton)
  expect(getCounterText(container)).toBe('Counter: 2')

  fireEvent.click(resetButton)
  expect(getCounterText(container)).toBe('Counter: 0')

  fireEvent.click(decreaseButton)
  expect(getCounterText(container)).toBe('Counter: -1')
  fireEvent.click(decreaseButton)
  expect(getCounterText(container)).toBe('Counter: -2')
})

describe('should call saga: ', () => {
  const sagaCallback = jest.fn()

  function* saga() {
    yield takeEvery(types.INCREASE, sagaCallback)
    yield takeEvery(types.DECREASE, sagaCallback)
    yield takeEvery(types.RESET, sagaCallback)
  }

  const container = render(<LocalReducer {...sharedProps} saga={saga} />)

  fireEvent.click(getIncreaseButton(container))
  expect(sagaCallback.mock.calls).toHaveLength(1)
  fireEvent.click(getDecreaseButton(container))
  expect(sagaCallback.mock.calls).toHaveLength(2)
  fireEvent.click(getResetButton(container))
  expect(sagaCallback.mock.calls).toHaveLength(3)
})

test('should handle middleware ', () => {
  const middlewareCallback = jest.fn()

  const middleware = _store => next => action => {
    middlewareCallback()
    return next(action)
  }

  const container = render(
    <LocalReducer {...sharedProps} middleware={[middleware]} />,
  )

  fireEvent.click(getIncreaseButton(container))
  expect(middlewareCallback.mock.calls).toHaveLength(1)
  fireEvent.click(getDecreaseButton(container))
  expect(middlewareCallback.mock.calls).toHaveLength(2)
})
