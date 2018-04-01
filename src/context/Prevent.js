import { PureComponent } from 'react'

export default class extends PureComponent {
  render() {
    const { children, state, actions, dispatch } = this.props

    return children([state, actions, dispatch])
  }
}
