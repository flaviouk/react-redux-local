import { Component } from 'react'
import { func, objectOf } from 'prop-types'
import { bindActionCreators } from 'redux'

class LocalReducer extends Component {
  constructor (props) {
    super(props)

    this.state = this.props.reducer(undefined, {})

    this.dispatch = this.dispatch.bind(this)
    this.boundActionCreators = bindActionCreators(this.props.actions, this.dispatch)
  }

  dispatch (action = {}) {
    this.setState(prevState => this.props.reducer(prevState, action))
  }

  render () {
    return this.props.children(this.state, this.boundActionCreators)
  }
}

LocalReducer.propTypes = {
  reducer: func.isRequired,
  actions: objectOf(func.isRequired).isRequired
}

export default LocalReducer
