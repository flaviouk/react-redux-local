import { Component } from 'react'
import { func, objectOf, arrayOf, object } from 'prop-types'
import {
  createStore,
  applyMiddleware,
  bindActionCreators,
  compose,
} from 'redux'
import createSagaMiddleware from 'redux-saga'

class LocalReducer extends Component {
  constructor(props) {
    super(props)

    const { reducer, saga, middleware, actions, devToolsOptions } = props

    this.sagaMiddleware = saga && createSagaMiddleware && createSagaMiddleware()

    const allMiddleware = [...middleware]

    if (this.sagaMiddleware) allMiddleware.push(this.sagaMiddleware)

    const enhancers = applyMiddleware(...allMiddleware)

    const composeEnhancers =
      typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(devToolsOptions)
        : compose

    this.state = reducer(undefined, {})

    this.store = createStore(
      reducer,
      devToolsOptions ? composeEnhancers(enhancers) : enhancers,
    )

    this.store.subscribe(() => this.setState(this.store.getState()))
    if (this.sagaMiddleware) this.saga = this.sagaMiddleware.run(saga)

    this.boundActions = bindActionCreators(actions, this.dispatch)
  }

  componentWillUnMount() {
    if (this.sagaMiddleware) this.saga.cancel()
  }

  dispatch = (action = {}) => this.store.dispatch(action)

  render() {
    return this.props.children(this.state, this.boundActions, this.dispatch)
  }
}

LocalReducer.propTypes = {
  reducer: func.isRequired,
  actions: objectOf(func.isRequired).isRequired,
  saga: func,
  middleware: arrayOf(func.isRequired),
  children: func.isRequired,
  devToolsOptions: object,
}

LocalReducer.defaultProps = {
  middleware: [],
}

export default LocalReducer
