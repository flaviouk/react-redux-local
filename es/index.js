import React, { Component, PureComponent, createContext } from 'react';
import { func, objectOf, arrayOf, object } from 'prop-types';
import { createStore, applyMiddleware, bindActionCreators } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import isFunction from 'lodash.isfunction';

class LocalReducer extends Component {
  constructor(props) {
    super(props);

    this.dispatch = (action = {}) => this.store.dispatch(action);

    const { reducer, saga, middleware, actions, devToolsOptions } = props;

    this.sagaMiddleware = saga && createSagaMiddleware && createSagaMiddleware();

    const allMiddleware = [...middleware];

    if (this.sagaMiddleware) allMiddleware.push(this.sagaMiddleware);

    const enhancers = applyMiddleware(...allMiddleware);

    const composeEnhancers = composeWithDevTools(devToolsOptions);

    this.state = reducer(undefined, {});

    this.store = createStore(reducer, devToolsOptions ? composeEnhancers(enhancers) : enhancers);

    this.store.subscribe(() => this.setState(this.store.getState()));
    if (this.sagaMiddleware) this.saga = this.sagaMiddleware.run(saga);

    this.boundActions = bindActionCreators(actions, this.dispatch);
  }

  componentWillUnMount() {
    if (this.sagaMiddleware) this.saga.cancel();
  }

  render() {
    return this.props.children(this.state, this.boundActions, this.dispatch);
  }
}

LocalReducer.propTypes = {
  reducer: func.isRequired,
  actions: objectOf(func.isRequired).isRequired,
  saga: func,
  middleware: arrayOf(func.isRequired),
  children: func.isRequired,
  devToolsOptions: object
};

LocalReducer.defaultProps = {
  middleware: []
};

class Prevent extends PureComponent {
  render() {
    const { children, state, actions, dispatch } = this.props;

    return children(state, actions, dispatch);
  }
}

var Context = (props => {
  if (!props.reducer) throw new Error('A reducer must be provided.');
  if (!props.actions) throw new Error('A set of actions must be provided.');
  const { Provider, Consumer } = createContext();

  const defaultMapState = () => undefined;
  const defaultMapActions = () => undefined;

  return {
    Provider: ({ children }) => React.createElement(
      LocalReducer,
      props,
      (state, actions, dispatch) => React.createElement(
        Provider,
        { value: { state, actions, dispatch } },
        children
      )
    ),

    Consumer: ({
      children,
      mapState = defaultMapState,
      mapActions = defaultMapActions
    }) => React.createElement(
      Consumer,
      null,
      ({ state, actions, dispatch }) => React.createElement(
        Prevent,
        {
          state: isFunction(mapState) ? mapState(state) : defaultMapState(state),
          actions: mapActions(actions, dispatch),
          dispatch: dispatch
        },
        children
      )
    )
  };
});

export default LocalReducer;
export { Context as createContext };
