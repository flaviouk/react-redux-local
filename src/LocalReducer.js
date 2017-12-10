import { Component } from 'react'
import { func, objectOf, arrayOf, object } from 'prop-types'
import { createStore, applyMiddleware, bindActionCreators } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'

class LocalReducer extends Component {
  constructor (props) {
    super(props)

    const { reducer, rootSaga, sagas, middleware, actions, devToolsOptions } = props

    this.sagaMiddleware = (sagas.length || rootSaga) && createSagaMiddleware()

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
    const { sagas, rootSaga } = this.props

    sagas.map(saga => this.sagas.push(this.sagaMiddleware.run(saga)))
    if (rootSaga) this.sagas.push(this.sagaMiddleware.run(rootSaga))
  }

  componentWillUnMount () {
    this.sagas.map(saga => saga.cancel())
  }

  dispatch (action = {}) {
    this.store.dispatch(action)
  }

  render () {
    return this.props.render(this.state, this.boundActions, this.dispatch)
  }
}

LocalReducer.propTypes = {
  reducer: func.isRequired,
  actions: objectOf(func.isRequired).isRequired,
  sagas: arrayOf(func.isRequired),
  rootSaga: func,
  middleware: arrayOf(func.isRequired),
  render: func.isRequired,
  devToolsOptions: object
}

LocalReducer.defaultProps = {
  sagas: [],
  middleware: []
}

export default LocalReducer
