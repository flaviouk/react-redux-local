(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('redux'), require('react'), require('prop-types'), require('redux-saga')) :
typeof define === 'function' && define.amd ? define(['exports', 'redux', 'react', 'prop-types', 'redux-saga'], factory) :
(factory((global['react-redux-local'] = {}),global.redux,global.React,global.propTypes,global.createSagaMiddleware));
}(this, (function (exports,redux,React,propTypes,createSagaMiddleware) { 'use strict';

var redux__default = 'default' in redux ? redux['default'] : redux;
var React__default = 'default' in React ? React['default'] : React;
createSagaMiddleware = createSagaMiddleware && createSagaMiddleware.hasOwnProperty('default') ? createSagaMiddleware['default'] : createSagaMiddleware;

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var developmentOnly = createCommonjsModule(function (module, exports) {

var compose = redux__default.compose;

exports.__esModule = true;
exports.composeWithDevTools = (
  typeof window !== 'undefined' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :
    function() {
      if (arguments.length === 0) return undefined;
      if (typeof arguments[0] === 'object') return compose;
      return compose.apply(null, arguments);
    }
);

exports.devToolsEnhancer = (
  typeof window !== 'undefined' &&
  window.__REDUX_DEVTOOLS_EXTENSION__ ?
    window.__REDUX_DEVTOOLS_EXTENSION__ :
    function() { return function(noop) { return noop; } }
);
});

unwrapExports(developmentOnly);
var developmentOnly_1 = developmentOnly.composeWithDevTools;
var developmentOnly_2 = developmentOnly.devToolsEnhancer;

class LocalReducer extends React.Component {
  constructor(props) {
    super(props);

    this.dispatch = (action = {}) => this.store.dispatch(action);

    const { reducer, saga, middleware, actions, devToolsOptions } = props;

    this.sagaMiddleware = saga && createSagaMiddleware && createSagaMiddleware();

    const allMiddleware = [...middleware];

    if (this.sagaMiddleware) allMiddleware.push(this.sagaMiddleware);

    const enhancers = redux.applyMiddleware(...allMiddleware);

    const composeEnhancers = developmentOnly_1(devToolsOptions);

    this.state = reducer(undefined, {});

    this.store = redux.createStore(reducer, devToolsOptions ? composeEnhancers(enhancers) : enhancers);

    this.store.subscribe(() => this.setState(this.store.getState()));
    if (this.sagaMiddleware) this.saga = this.sagaMiddleware.run(saga);

    this.boundActions = redux.bindActionCreators(actions, this.dispatch);
  }

  componentWillUnMount() {
    if (this.sagaMiddleware) this.saga.cancel();
  }

  render() {
    return this.props.children(this.state, this.boundActions, this.dispatch);
  }
}

LocalReducer.propTypes = {
  reducer: propTypes.func.isRequired,
  actions: propTypes.objectOf(propTypes.func.isRequired).isRequired,
  saga: propTypes.func,
  middleware: propTypes.arrayOf(propTypes.func.isRequired),
  children: propTypes.func.isRequired,
  devToolsOptions: propTypes.object
};

LocalReducer.defaultProps = {
  middleware: []
};

/**
 * Lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright JS Foundation and other contributors <https://js.foundation/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    nullTag = '[object Null]',
    proxyTag = '[object Proxy]',
    undefinedTag = '[object Undefined]';

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var Symbol = root.Symbol,
    symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

var lodash_isfunction = isFunction;

class Prevent extends React.PureComponent {
  render() {
    const { children, state, actions, dispatch } = this.props;

    return children(state, actions, dispatch);
  }
}

var Context = (props => {
  if (!props.reducer) throw new Error('A reducer must be provided.');
  if (!props.actions) throw new Error('A set of actions must be provided.');
  const { Provider, Consumer } = React.createContext();

  const defaultMapState = () => undefined;
  const defaultMapActions = () => undefined;

  return {
    Provider: ({ children }) => React__default.createElement(
      LocalReducer,
      props,
      (state, actions, dispatch) => React__default.createElement(
        Provider,
        { value: { state, actions, dispatch } },
        children
      )
    ),

    Consumer: ({
      children,
      mapState = defaultMapState,
      mapActions = defaultMapActions
    }) => React__default.createElement(
      Consumer,
      null,
      ({ state, actions, dispatch }) => React__default.createElement(
        Prevent,
        {
          state: lodash_isfunction(mapState) ? mapState(state) : defaultMapState(state),
          actions: mapActions(actions, dispatch),
          dispatch: dispatch
        },
        children
      )
    )
  };
});

exports.default = LocalReducer;
exports.createContext = Context;

Object.defineProperty(exports, '__esModule', { value: true });

})));
