# react-redux-local

[![Build Status][build-badge]][build]
[![Code Coverage][coverage-badge]][coverage]
[![version][version-badge]][package]
[![downloads][downloads-badge]][npmtrends]
[![MIT License][license-badge]][license]

[![PRs Welcome][prs-badge]][prs]

[![Watch on GitHub][github-watch-badge]][github-watch]
[![Star on GitHub][github-star-badge]][github-star]
[![Tweet][twitter-badge]][twitter]

Adding a local reducer can be very verbose with libraries like [recompose](https://github.com/acdlite/recompose), the goal of this library is to reduce boilerplate when creating a local reducer.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Inspiration](#inspiration)
- [Other Solutions](#other-solutions)
- [LICENSE](#license)

## Installation

This module is distributed via [npm][npm] which is bundled with [node][node] and
should be installed as one of your project's `dependencies`:

```
npm install --save react-redux-local
yarn add react-redux-local
```

## Usage

### LocalReducer

```javascript
import LocalReducer from 'react-redux-local'

const actions = {
  doSomething: () => ({ type: 'SOMETHING' })
}

// https://github.com/redux-saga/redux-saga
function * saga () {
  yield takeEvery('SOMETHING', () => console.log('Action with type SOMETHING was triggered'))
}

// https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md#windowdevtoolsextensionconfig
const devToolsOptions = { name: 'Custom redux devtools tab' }

const MyComponent = () => (
  <LocalReducer
    reducer={reducer}
    actions={actions}
    devToolsOptions={devToolsOptions}
    saga={saga}
    children={(state, actions, dispatch) => {
      // state = redux state
      // actions = binded actions (no need to dispatch)
      // dispatch = optional dispatch function, if you need a more complex workflow
    }}
  />
)
```

### createContext

TODO

## Inspiration

Michael Jackson - Never Write Another HoC

[![Michael Jackson - Never Write Another HoC](https://img.youtube.com/vi/BcVAq3YFiuc/0.jpg)](https://www.youtube.com/watch?v=BcVAq3YFiuc)

## Other Solutions

[local-react-redux](https://github.com/HansDP/local-react-redux)

[local-react-redux-saga](https://github.com/HansDP/local-react-redux-saga)

[react-local-reducer](https://github.com/troch/react-local-reducer)

This project follows the [all-contributors][all-contributors] specification.
Contributions of any kind welcome!

## LICENSE

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
