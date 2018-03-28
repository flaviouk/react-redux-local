'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var react = require('react');
var propTypes = require('prop-types');
var redux = require('redux');
var createSagaMiddleware = _interopDefault(require('redux-saga'));
var reduxDevtoolsExtension = require('redux-devtools-extension');

class LocalReducer extends react.Component {
  constructor(props) {
    super(props);

    const { reducer, saga, middleware, actions, devToolsOptions } = props;

    this.sagaMiddleware = saga && createSagaMiddleware();

    const allMiddleware = [...middleware];

    if (this.sagaMiddleware) allMiddleware.push(this.sagaMiddleware);

    const enhancers = redux.applyMiddleware(...allMiddleware);

    const composeEnhancers = reduxDevtoolsExtension.composeWithDevTools(devToolsOptions);

    this.state = reducer(undefined, {});

    this.store = redux.createStore(
      reducer,
      devToolsOptions ? composeEnhancers(enhancers) : enhancers
    );

    this.store.subscribe(() => this.setState(this.store.getState()));

    this.dispatch = this.dispatch.bind(this);
    this.boundActions = redux.bindActionCreators(actions, this.dispatch);
  }

  componentWillMount() {
    const { saga } = this.props;

    if (saga) this.saga = this.sagaMiddleware.run(saga);
  }

  componentWillUnMount() {
    const { saga } = this.props;

    if (saga) this.saga.cancel();
  }

  dispatch(action = {}) {
    this.store.dispatch(action);
  }

  render() {
    return this.props.render(this.state, this.boundActions, this.dispatch)
  }
}

LocalReducer.propTypes = {
  reducer: propTypes.func.isRequired,
  actions: propTypes.objectOf(propTypes.func.isRequired).isRequired,
  saga: propTypes.func,
  middleware: propTypes.arrayOf(propTypes.func.isRequired),
  render: propTypes.func.isRequired,
  devToolsOptions: propTypes.object
};

LocalReducer.defaultProps = {
  middleware: []
};

module.exports = LocalReducer;
