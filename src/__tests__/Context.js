import React from 'react'
import { render, cleanup, fireEvent } from 'react-testing-library'

import { createContext } from '../..'
import { reducer, actions } from '../__mocks__/context'

afterEach(cleanup)

const getCounterText = ({ getByText }) => getByText(/Counter: /i).textContent
const getTotalText = ({ getByText }) => getByText(/Total: /i).textContent
const getTDownsText = ({ getByText }) => getByText(/Downs: /i).textContent
const getIncreaseButton = ({ getByText }) => getByText(/UP/i)
const getDecreaseButton = ({ getByText }) => getByText(/DOWN/i)
const getResetButton = ({ getByText }) => getByText(/RESET/i)

test('create context should be able to create a local reducer in react context: ', () => {
  const Context = createContext({ reducer, actions })

  const renders = {
    buttons: {
      up: jest.fn(),
      down: jest.fn(),
      reset: jest.fn(),
    },
    text: {
      counter: jest.fn(),
      total: jest.fn(),
      downs: jest.fn(),
    },
  }

  const Up = () => (
    <Context.Consumer mapActions={({ countUp }) => countUp}>
      {(_, action) => {
        renders.buttons.up()
        return <button onClick={action}>UP</button>
      }}
    </Context.Consumer>
  )

  const Down = () => {
    const action = Context.useActions(({ countDown }) => countDown)
    renders.buttons.down()

    return <button onClick={action}>DOWN</button>
  }

  const Reset = () => {
    const dispatch = Context.useDispatch()
    renders.buttons.reset()

    return <button onClick={() => dispatch({ type: 'RESET' })}>RESET</button>
  }

  const Count = () => (
    <Context.Consumer mapState={({ counter }) => counter}>
      {state => {
        renders.text.counter()
        return <h3>Counter: {state}</h3>
      }}
    </Context.Consumer>
  )

  const TotalCount = () => {
    const total = Context.useState(({ total }) => total)
    renders.text.total()
    return <h3>Total: {total}</h3>
  }

  const DownsOnly = () => {
    const state = Context.useState(a => a)
    renders.text.downs()
    return <h3>Downs: {state.downs}</h3>
  }

  const container = render(
    <Context.Provider>
      <Up />

      <Down />

      <Reset />

      <Count />

      <TotalCount />

      <DownsOnly />
    </Context.Provider>,
  )

  const increaseButton = getIncreaseButton(container)
  const decreaseButton = getDecreaseButton(container)
  const resetButton = getResetButton(container)
  const checkButtonRenders = expectedNum => {
    expect(renders.buttons.up.mock.calls).toHaveLength(expectedNum)
    expect(renders.buttons.down.mock.calls).toHaveLength(expectedNum)
    expect(renders.buttons.reset.mock.calls).toHaveLength(expectedNum)
  }
  //   const checkTextRenders = expectedNum => {
  //     expect(renders.text.counter.mock.calls).toHaveLength(expectedNum)
  //     expect(renders.text.total.mock.calls).toHaveLength(expectedNum)
  //     expect(renders.text.downs.mock.calls).toHaveLength(expectedNum)
  //   }

  expect(getCounterText(container)).toBe('Counter: 0')
  expect(getTotalText(container)).toBe('Total: 0')
  expect(getTDownsText(container)).toBe('Downs: 0')
  checkButtonRenders(1)
  //   expect(renders.text.counter.mock.calls).toHaveLength(1)

  fireEvent.click(increaseButton)
  expect(getCounterText(container)).toBe('Counter: 1')
  expect(getTotalText(container)).toBe('Total: 1')
  expect(getTDownsText(container)).toBe('Downs: 0')
  //   checkButtonRenders(1)
  //   expect(renders.text.counter.mock.calls).toHaveLength(2)

  fireEvent.click(decreaseButton)
  expect(getCounterText(container)).toBe('Counter: 0')
  expect(getTotalText(container)).toBe('Total: 2')
  expect(getTDownsText(container)).toBe('Downs: 1')
  //   expect(renders.text.counter.mock.calls).toHaveLength(3)
  //   checkButtonRenders(1)

  fireEvent.click(resetButton)
  expect(getCounterText(container)).toBe('Counter: 0')
  expect(getTotalText(container)).toBe('Total: 0')
  expect(getTDownsText(container)).toBe('Downs: 0')
  //   checkButtonRenders(1)
  //   expect(renders.text.counter.mock.calls).toHaveLength(4)
})
