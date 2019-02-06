'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex
}

var React = require('react')
var React__default = _interopDefault(React)
var propTypes = require('prop-types')
var redux = require('redux')
var createSagaMiddleware = _interopDefault(require('redux-saga'))
var developmentOnly = require('redux-devtools-extension/developmentOnly')
var isFunction = _interopDefault(require('lodash.isfunction'))

class LocalReducer extends React.Component {
  constructor(props) {
    super(props)

    this.dispatch = (action = {}) => this.store.dispatch(action)

    const { reducer, saga, middleware, actions, devToolsOptions } = props

    this.sagaMiddleware = saga && createSagaMiddleware && createSagaMiddleware()

    const allMiddleware = [...middleware]

    if (this.sagaMiddleware) allMiddleware.push(this.sagaMiddleware)

    const enhancers = redux.applyMiddleware(...allMiddleware)

    const composeEnhancers = developmentOnly.composeWithDevTools(
      devToolsOptions,
    )

    this.state = reducer(undefined, {})

    this.store = redux.createStore(
      reducer,
      devToolsOptions ? composeEnhancers(enhancers) : enhancers,
    )

    this.store.subscribe(() => this.setState(this.store.getState()))
    if (this.sagaMiddleware) this.saga = this.sagaMiddleware.run(saga)

    this.boundActions = redux.bindActionCreators(actions, this.dispatch)
  }

  componentWillUnMount() {
    if (this.sagaMiddleware) this.saga.cancel()
  }

  render() {
    return this.props.children(this.state, this.boundActions, this.dispatch)
  }
}

LocalReducer.propTypes = {
  reducer: propTypes.func.isRequired,
  actions: propTypes.objectOf(propTypes.func.isRequired).isRequired,
  saga: propTypes.func,
  middleware: propTypes.arrayOf(propTypes.func.isRequired),
  children: propTypes.func.isRequired,
  devToolsOptions: propTypes.object,
}

LocalReducer.defaultProps = {
  middleware: [],
}

class Prevent extends React.PureComponent {
  render() {
    const { children, state, actions, dispatch } = this.props

    return children(state, actions, dispatch)
  }
}

var Context = props => {
  if (!props.reducer) throw new Error('A reducer must be provided.')
  if (!props.actions) throw new Error('A set of actions must be provided.')
  const { Provider, Consumer } = React.createContext()

  const defaultMapState = () => undefined
  const defaultMapActions = () => undefined

  return {
    Provider: ({ children }) =>
      React__default.createElement(
        LocalReducer,
        props,
        (state, actions, dispatch) =>
          React__default.createElement(
            Provider,
            { value: { state, actions, dispatch } },
            children,
          ),
      ),

    Consumer: ({
      children,
      mapState = defaultMapState,
      mapActions = defaultMapActions,
    }) =>
      React__default.createElement(
        Consumer,
        null,
        ({ state, actions, dispatch }) =>
          React__default.createElement(
            Prevent,
            {
              state: isFunction(mapState)
                ? mapState(state)
                : defaultMapState(state),
              actions: mapActions(actions, dispatch),
              dispatch: dispatch,
            },
            children,
          ),
      ),
  }
}

exports.default = LocalReducer
exports.createContext = Context
