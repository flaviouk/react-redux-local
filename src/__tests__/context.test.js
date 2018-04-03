import React from 'react'
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { createSerializer } from 'enzyme-to-json'

import createContext from '../context'
import * as duck from '../duck'

configure({ adapter: new Adapter() })
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }))

let Provider = undefined
let createConsumer = undefined

beforeEach(() => {
  const props = {
    ...duck,
    children: ([{ counter }]) => <h1>Counter: {counter}</h1>
  }

  const Context = createContext(props)
  Provider = Context.Provider
  createConsumer = Context.createConsumer
})

test('should be defined', () => expect(createContext).toBeDefined())

// describe('should handle the provider component: ', () => {
//   test('should render', () => {
//     const Consumer = createConsumer()
//     const wrapper = mount(
//       <Provider>
//         <Consumer>{([state]) => <div>{JSON.stringify(state)}</div>}</Consumer>
//       </Provider>
//     )
//     expect(wrapper).toMatchSnapshot()
//   })
// })
