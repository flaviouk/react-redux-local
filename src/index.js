import { Component } from 'react'
import { func, objectOf, arrayOf, object } from 'prop-types'
import { createStore, applyMiddleware, bindActionCreators } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'

class LocalReducer extends Component {
  constructor(props) {
    super(props)

    const { reducer, saga, middleware, actions, devToolsOptions } = props

    this.sagaMiddleware = saga && createSagaMiddleware()

    const allMiddleware = [...middleware]

    if (this.sagaMiddleware) allMiddleware.push(this.sagaMiddleware)

    const enhancers = applyMiddleware(...allMiddleware)

    const composeEnhancers = composeWithDevTools(devToolsOptions)

    this.state = reducer(undefined, {})

    this.store = createStore(
      reducer,
      devToolsOptions ? composeEnhancers(enhancers) : enhancers
    )

    this.store.subscribe(() => this.setState(this.store.getState()))

    this.dispatch = this.dispatch.bind(this)
    this.boundActions = bindActionCreators(actions, this.dispatch)
  }

  componentWillMount() {
    const { saga } = this.props

    if (saga) this.saga = this.sagaMiddleware.run(saga)
  }

  componentWillUnMount() {
    const { saga } = this.props

    if (saga) this.saga.cancel()
  }

  dispatch(action = {}) {
    this.store.dispatch(action)
  }

  render() {
    return this.props.render(this.state, this.boundActions, this.dispatch)
  }
}

LocalReducer.propTypes = {
  reducer: func.isRequired,
  actions: objectOf(func.isRequired).isRequired,
  saga: func,
  middleware: arrayOf(func.isRequired),
  render: func.isRequired,
  devToolsOptions: object
}

LocalReducer.defaultProps = {
  middleware: []
}

export default LocalReducer
