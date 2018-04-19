# react-redux-local

[![Build Status][build-badge]][build]
[![Code Coverage][coverage-badge]][coverage]
[![version][version-badge]][package]
[![downloads][downloads-badge]][npmtrends]

[![PRs Welcome][prs-badge]][prs]
[![MIT License][license-badge]][license]

[![Watch on GitHub][github-watch-badge]][github-watch]
[![Star on GitHub][github-star-badge]][github-star]
[![Tweet][twitter-badge]][twitter]

# The problem

I love redux, but building a small and simple local reducer component on every project is not on top of the list of things I like to do the most, plus what if I want to take advantage of sagas, dev tools and the new context api? It becomes a not so simple component very quickly.

# The solution

You can think of `react-redux-local` as a mini, yet powerful version of [react-redux](https://github.com/reactjs/redux), the api is very simple, abstracting away things like creating a redux store, adding middleware, binding actions and plugging in the redux dev tools.

# Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Api](#api)
- [Examples](#examples)
- [Other Solutions](#other-solutions)
- [LICENSE](#license)

# Installation

This module is distributed via [npm][npm] which is bundled with [node][node] and
should be installed as one of your project's `dependencies`:

```
yarn add react-redux-local
```


# Usage

## LocalReducer

```jsx
import LocalReducer from 'react-redux-local'

// https://github.com/erikras/ducks-modular-redux
import { actions, reducer, saga, middleware, devToolsOptions } from './duck'

const App = () => (
  <LocalReducer
    actions={actions}
    reducer={reducer}
    saga={saga}
    middleware={middleware}
    devToolsOptions={devToolsOptions}
  >
    {(state, actions, dispatch) => (
      <YourComponent
        state={state}
        actions={actions}
      />
    )}
  </LocalReducer>
)
```

## createContext

```jsx
import { createContext } from 'react-redux-local'

import { actions, reducer, saga, middleware, devToolsOptions } from './redux'

const { Provider, Consumer } = createContext({
  actions,
  reducer,
  saga,
  middleware,
  devToolsOptions
})

const Up = () => (
  <Consumer mapActions={({ countUp }) => countUp}>
    {(_, action) => <button onClick={action}>UP</button>}
  </Consumer>
)

const Down = () => (
  <Consumer mapActions={({ countDown }) => countDown}>
    {(_, action) => <button onClick={action}>DOWN</button>}
  </Consumer>
)

// Will only rerender when the "counter" state changes
const Count = () => (
  <Consumer mapState={({ counter }) => counter}>
    {state => <h3>Count: {state}</h3>}
  </Consumer>
)

// Will only rerender when the "total" state changes
const TotalCount = () => (
  <Consumer mapState={({ total }) => total}>
    {state => <h3>Total count: {state}</h3>}
  </Consumer>
)

// Will only rerender when the "downs" state changes
const DownsOnly = () => (
  <Consumer mapState={({ downs }) => downs}>
    {state => <h3>Downs: {state}</h3>}
  </Consumer>
)

const App = () => (
  <Provider>
    <Up />

    <Down />

    <Count />

    <TotalCount />

    <DownOnly />
  </Provider>
)

```

# Api


## Props

> Tip: `createContext` takes the same props as `LocalReducer`

### `reducer`

> func.isRequired

A reducer specifies how the application's state changes in response to actions sent to the store.

[Learn More](https://redux.js.org/basics/reducers)

> e.g.
```jsx
const initialState = { counter: 0, total: 0, downs: 0 }
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'COUNT_UP':
      return {
        counter: state.counter + 1,
        total: state.total + 1,
        downs: state.downs
      }

    case 'COUNT_DOWN':
      return {
        counter: state.counter - 1,
        total: state.total + 1,
        downs: state.downs + 1
      }

    default:
      return state
  }
}
```

### `actions`

> objectOf(func.isRequired).isRequired

Actions are payloads of information that send data from your application to your store. They are the only source of information for the store.

[Learn More](https://redux.js.org/basics/actions)

> e.g.
```jsx
const actions = {
  countUp: () => ({ type: 'COUNT_UP' }),
  countDown: () => ({ type: 'COUNT_DOWN' })
}
```

### `saga`

> func

Aims to make application side effects (i.e. asynchronous things like data fetching and impure things like accessing the browser cache) easier to manage, more efficient to execute, simple to test, and better at handling failures.

[Learn More](https://github.com/redux-saga/redux-saga)

> e.g.
```jsx
import { put } from 'redux-saga'

function* doubleCount () {
  put(actions.countUp())
}

function* saga () {
  yield takeEvery('COUNT_UP', doubleCount)
}
```

### `middleware`

> arrayOf(func.isRequired)

It provides a third-party extension point between dispatching an action, and the moment it reaches the reducer.

[Learn More](https://redux.js.org/advanced/middleware)

```jsx
const middleware = store => next => action => {
    console.log(action.type)
    return next(action)
  }
```

### `devToolsOptions`

> object

Allows for a better development experience with redux.

[Dev Tools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)

[Learn More](https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md#windowdevtoolsextensionconfig)

> e.g.
```jsx
const devToolsOptions = { name: 'My own devtools tab' }
```

### `children`

> func.isRequired

The term “render prop” refers to a simple technique for sharing code between React components using a prop whose value is a function.

[Learn More](https://reactjs.org/docs/render-props.html)

> Video: Michael Jackson - Never Write Another HoC

[![Michael Jackson - Never Write Another HoC](https://img.youtube.com/vi/BcVAq3YFiuc/0.jpg)](https://www.youtube.com/watch?v=BcVAq3YFiuc)

## `<Consumer />` props (from `createContext`)

### `mapState`

> func | state => undefined

Behaves like `mapStateToProps` from `react-redux` with the exception that it won't be available in the props (duh) and you are not required to return an object (thank you render props)

### `mapActions`

> func | (actions, dispatch) => undefined

Allows you to pick what actions you want available in the second argument of your render function. `dispatch` is very much optional since all the actions are binded automatically.


## `<LocalReducer />` render function

```jsx
(state, actions, dispatch) => <YourComponent />
```

### `state`

Your application state.

### `actions`

Binded actions. (You don't need to dispatch)

### `dispatch`

<b>Optional</b> function that allows you to dispatch other actions.

```jsx
dispatch({ type: 'VERY_CUSTOM_ACTION' })
```

# Examples

* [counter-example](https://github.com/imflavio/react-redux-local/tree/master/packages/counter-example)

# Other Solutions

[local-react-redux](https://github.com/HansDP/local-react-redux)

[local-react-redux-saga](https://github.com/HansDP/local-react-redux-saga)

[react-local-reducer](https://github.com/troch/react-local-reducer)

[react-copy-write](https://github.com/aweary/react-copy-write)

# LICENSE

MIT

[npm]: https://www.npmjs.com/
[node]: https://nodejs.org
[build-badge]: https://img.shields.io/travis/imflavio/react-redux-local.svg?style=flat-square
[build]: https://travis-ci.org/imflavio/react-redux-local
[coverage-badge]: https://img.shields.io/codecov/c/github/imflavio/react-redux-local.svg?style=flat-square
[coverage]: https://codecov.io/github/imflavio/react-redux-local
[version-badge]: https://img.shields.io/npm/v/react-redux-local.svg?style=flat-square
[package]: https://www.npmjs.com/package/react-redux-local
[downloads-badge]: https://img.shields.io/npm/dm/react-redux-local.svg?style=flat-square
[npmtrends]: http://www.npmtrends.com/react-redux-local
[license-badge]: https://img.shields.io/npm/l/react-redux-local.svg?style=flat-square
[license]: https://github.com/imflavio/react-redux-local/blob/master/LICENSE
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: http://makeapullrequest.com
[donate-badge]: https://img.shields.io/badge/$-support-green.svg?style=flat-square
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/imflavio/react-redux-local/blob/master/other/CODE_OF_CONDUCT.md
[github-watch-badge]: https://img.shields.io/github/watchers/imflavio/react-redux-local.svg?style=social
[github-watch]: https://github.com/imflavio/react-redux-local/watchers
[github-star-badge]: https://img.shields.io/github/stars/imflavio/react-redux-local.svg?style=social
[github-star]: https://github.com/imflavio/react-redux-local/stargazers
[twitter]: https://twitter.com/intent/tweet?text=Check%20out%20react-redux-local%20by%20%40imflavio_%20https%3A%2F%2Fgithub.com%2Fimflavio%2Freact-redux-local%20%F0%9F%91%8D
[twitter-badge]: https://img.shields.io/twitter/url/https/github.com/imflavio/react-redux-local.svg?style=social
