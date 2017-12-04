import { Component } from 'react'
import { func, objectOf, arrayOf } from 'prop-types'
import { createStore, applyMiddleware, bindActionCreators } from 'redux'
import createSagaMiddleware from 'redux-saga'

class LocalReducer extends Component {
  constructor (props) {
    super(props)

    const { reducer, actions, sagas, middleware } = this.props

    const sagaMiddleware = sagas.length && createSagaMiddleware()
    const allMiddleware = [...middleware, sagaMiddleware]

    this.state = reducer(undefined, {})

    this.store = createStore(reducer, applyMiddleware(...allMiddleware))

    this.store.subscribe(() => this.setState(this.store.getState()))

    sagas.map(saga => sagaMiddleware.run(saga))

    this.dispatch = this.dispatch.bind(this)
    this.boundActionCreators = bindActionCreators(actions, this.dispatch)
  }

  dispatch (action = {}) {
    this.store.dispatch(action)
  }

  render () {
    return this.props.children(this.state, this.boundActionCreators)
  }
}

LocalReducer.propTypes = {
  reducer: func.isRequired,
  actions: objectOf(func.isRequired).isRequired,
  sagas: arrayOf(func),
  middleware: arrayOf(func)
}

LocalReducer.defaultProps = {
  sagas: [],
  middleware: []
}

export default LocalReducer
