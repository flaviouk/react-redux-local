import React, { Component, PureComponent } from 'react';
import { func, objectOf, arrayOf, object } from 'prop-types';
import { applyMiddleware, compose, createStore, bindActionCreators } from 'redux';
import createSagaMiddleware from 'redux-saga';

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

var LocalReducer =
/*#__PURE__*/
function (_Component) {
  _inherits(LocalReducer, _Component);

  function LocalReducer(props) {
    var _this;

    _classCallCheck(this, LocalReducer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LocalReducer).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "dispatch", function () {
      var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return _this.store.dispatch(action);
    });

    var reducer = props.reducer,
        saga = props.saga,
        middleware = props.middleware,
        actions = props.actions,
        devToolsOptions = props.devToolsOptions;
    _this.sagaMiddleware = saga && createSagaMiddleware && createSagaMiddleware();

    var allMiddleware = _toConsumableArray(middleware);

    if (_this.sagaMiddleware) allMiddleware.push(_this.sagaMiddleware);
    var enhancers = applyMiddleware.apply(void 0, _toConsumableArray(allMiddleware));
    var composeEnhancers = (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(devToolsOptions) : compose;
    _this.state = reducer(undefined, {});
    _this.store = createStore(reducer, devToolsOptions ? composeEnhancers(enhancers) : enhancers);

    _this.store.subscribe(function () {
      return _this.setState(_this.store.getState());
    });

    if (_this.sagaMiddleware) _this.saga = _this.sagaMiddleware.run(saga);
    _this.boundActions = bindActionCreators(actions, _this.dispatch);
    return _this;
  }

  _createClass(LocalReducer, [{
    key: "componentWillUnMount",
    value: function componentWillUnMount() {
      if (this.sagaMiddleware) this.saga.cancel();
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.children(this.state, this.boundActions, this.dispatch);
    }
  }]);

  return LocalReducer;
}(Component);

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

var _default =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(_default, _PureComponent);

  function _default() {
    _classCallCheck(this, _default);

    return _possibleConstructorReturn(this, _getPrototypeOf(_default).apply(this, arguments));
  }

  _createClass(_default, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          state = _this$props.state,
          actions = _this$props.actions,
          dispatch = _this$props.dispatch;
      return children(state, actions, dispatch);
    }
  }]);

  return _default;
}(PureComponent);

var Context = (function (props) {
  if (!props.reducer) throw new Error('A reducer must be provided.');
  if (!props.actions) throw new Error('A set of actions must be provided.');
  var Context = React.createContext();

  var defaultMap = function defaultMap() {
    return undefined;
  };

  var Provider = function Provider(_ref) {
    var children = _ref.children;
    return React.createElement(LocalReducer, props, function (state, actions, dispatch) {
      return React.createElement(Context.Provider, {
        value: {
          state: state,
          actions: actions,
          dispatch: dispatch
        }
      }, children);
    });
  };

  var Consumer = function Consumer(_ref2) {
    var children = _ref2.children,
        _ref2$mapState = _ref2.mapState,
        mapState = _ref2$mapState === void 0 ? defaultMap : _ref2$mapState,
        _ref2$mapActions = _ref2.mapActions,
        mapActions = _ref2$mapActions === void 0 ? defaultMap : _ref2$mapActions;
    return React.createElement(Context.Consumer, null, function (_ref3) {
      var state = _ref3.state,
          actions = _ref3.actions,
          dispatch = _ref3.dispatch;
      return React.createElement(_default, {
        state: mapState(state),
        actions: mapActions(actions, dispatch),
        dispatch: dispatch
      }, children);
    });
  };

  var useDispatch = function useDispatch() {
    var _React$useContext = React.useContext(Context),
        dispatch = _React$useContext.dispatch;

    return dispatch;
  };

  var useState = function useState() {
    var mapState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultMap;

    var _React$useContext2 = React.useContext(Context),
        state = _React$useContext2.state;

    return mapState(state);
  };

  var useActions = function useActions() {
    var mapActions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultMap;

    var _React$useContext3 = React.useContext(Context),
        actions = _React$useContext3.actions;

    return mapActions(actions);
  };

  return {
    Provider: Provider,
    Consumer: Consumer,
    useDispatch: useDispatch,
    useState: useState,
    useActions: useActions
  };
});

export default LocalReducer;
export { LocalReducer, Context as createContext };
//# sourceMappingURL=index.es.js.map
