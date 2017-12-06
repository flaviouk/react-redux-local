import { Component } from 'react'
import { func, objectOf, arrayOf, object } from 'prop-types'
import { createStore, applyMiddleware, bindActionCreators } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'

class LocalReducer extends Component {
  constructor (props) {
    super(props)

    const { reducer, sagas, middleware, actions, devToolsOptions } = props

    this.sagaMiddleware = sagas.length && createSagaMiddleware()

    const allMiddleware = [...middleware]

    if (this.sagaMiddleware) allMiddleware.push(this.sagaMiddleware)

    const enhancers = applyMiddleware(...allMiddleware)

    const composeEnhancers = composeWithDevTools(devToolsOptions)

    this.state = reducer(undefined, {})

    this.sagas = []

    this.store = createStore(reducer, devToolsOptions ? composeEnhancers(enhancers) : enhancers)
    this.store.subscribe(() => this.setState(this.store.getState()))

    this.dispatch = this.dispatch.bind(this)
    this.boundActions = bindActionCreators(actions, this.dispatch)
  }

  componentWillMount () {
    this.props.sagas.map(saga => this.sagas.push(this.sagaMiddleware.run(saga)))
  }

  componentWillUnMount () {
    this.sagas.map(saga => saga.cancel())
  }

  dispatch (action = {}) {
    this.store.dispatch(action)
  }

  render () {
    return this.props.children(this.state, this.boundActions)
  }
}

LocalReducer.propTypes = {
  reducer: func.isRequired,
  actions: objectOf(func.isRequired).isRequired,
  sagas: arrayOf(func.isRequired),
  middleware: arrayOf(func.isRequired),
  render: func.isRequired,
  devToolsOptions: object
}

LocalReducer.defaultProps = {
  sagas: [],
  middleware: []
}

export default LocalReducer
