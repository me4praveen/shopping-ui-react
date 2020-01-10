'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var ReactDOM = require('react-dom');
var ReactDOM__default = _interopDefault(ReactDOM);

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var classnames = createCommonjsModule(function (module) {
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg) && arg.length) {
				var inner = classNames.apply(null, arg);
				if (inner) {
					classes.push(inner);
				}
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else {
		window.classNames = classNames;
	}
}());
});

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var NODE_ENV = process.env.NODE_ENV;

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

var invariant_1 = invariant;

var noop = function noop() {};

function readOnlyPropType(handler, name) {
  return function (props, propName) {
    if (props[propName] !== undefined) {
      if (!props[handler]) {
        return new Error("You have provided a `" + propName + "` prop to `" + name + "` " + ("without an `" + handler + "` handler prop. This will render a read-only field. ") + ("If the field should be mutable use `" + defaultKey(propName) + "`. ") + ("Otherwise, set `" + handler + "`."));
      }
    }
  };
}

function uncontrolledPropTypes(controlledValues, displayName) {
  var propTypes = {};
  Object.keys(controlledValues).forEach(function (prop) {
    // add default propTypes for folks that use runtime checks
    propTypes[defaultKey(prop)] = noop;

    if (process.env.NODE_ENV !== 'production') {
      var handler = controlledValues[prop];
      !(typeof handler === 'string' && handler.trim().length) ? process.env.NODE_ENV !== "production" ? invariant_1(false, 'Uncontrollable - [%s]: the prop `%s` needs a valid handler key name in order to make it uncontrollable', displayName, prop) : invariant_1(false) : void 0;
      propTypes[prop] = readOnlyPropType(handler, displayName);
    }
  });
  return propTypes;
}
function isProp(props, prop) {
  return props[prop] !== undefined;
}
function defaultKey(key) {
  return 'default' + key.charAt(0).toUpperCase() + key.substr(1);
}
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

function canAcceptRef(component) {
  return !!component && (typeof component !== 'function' || component.prototype && component.prototype.isReactComponent);
}

function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }

function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

function useUncontrolledProp(propValue, defaultValue, handler) {
  var wasPropRef = React.useRef(propValue !== undefined);

  var _useState = React.useState(defaultValue),
      stateValue = _useState[0],
      setState = _useState[1];

  var isProp$$1 = propValue !== undefined;
  var wasProp = wasPropRef.current;
  wasPropRef.current = isProp$$1;
  /**
   * If a prop switches from controlled to Uncontrolled
   * reset its value to the defaultValue
   */

  if (!isProp$$1 && wasProp && stateValue !== defaultValue) {
    setState(defaultValue);
  }

  return [isProp$$1 ? propValue : stateValue, React.useCallback(function (value) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    if (handler) handler.apply(void 0, [value].concat(args));
    setState(value);
  }, [handler])];
}
function useUncontrolled(props, config) {
  return Object.keys(config).reduce(function (result, fieldName) {
    var _extends2;

    var _ref = result,
        defaultValue = _ref[defaultKey(fieldName)],
        propsValue = _ref[fieldName],
        rest = _objectWithoutPropertiesLoose(_ref, [defaultKey(fieldName), fieldName].map(_toPropertyKey));

    var handlerName = config[fieldName];

    var _useUncontrolledProp = useUncontrolledProp(propsValue, defaultValue, props[handlerName]),
        value = _useUncontrolledProp[0],
        handler = _useUncontrolledProp[1];

    return _extends({}, rest, (_extends2 = {}, _extends2[fieldName] = value, _extends2[handlerName] = handler, _extends2));
  }, props);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

function componentWillMount() {
  // Call this.constructor.gDSFP to support sub-classes.
  var state = this.constructor.getDerivedStateFromProps(this.props, this.state);
  if (state !== null && state !== undefined) {
    this.setState(state);
  }
}

function componentWillReceiveProps(nextProps) {
  // Call this.constructor.gDSFP to support sub-classes.
  // Use the setState() updater to ensure state isn't stale in certain edge cases.
  function updater(prevState) {
    var state = this.constructor.getDerivedStateFromProps(nextProps, prevState);
    return state !== null && state !== undefined ? state : null;
  }
  // Binding "this" is important for shallow renderer support.
  this.setState(updater.bind(this));
}

function componentWillUpdate(nextProps, nextState) {
  try {
    var prevProps = this.props;
    var prevState = this.state;
    this.props = nextProps;
    this.state = nextState;
    this.__reactInternalSnapshotFlag = true;
    this.__reactInternalSnapshot = this.getSnapshotBeforeUpdate(
      prevProps,
      prevState
    );
  } finally {
    this.props = prevProps;
    this.state = prevState;
  }
}

// React may warn about cWM/cWRP/cWU methods being deprecated.
// Add a flag to suppress these warnings for this special case.
componentWillMount.__suppressDeprecationWarning = true;
componentWillReceiveProps.__suppressDeprecationWarning = true;
componentWillUpdate.__suppressDeprecationWarning = true;

function polyfill(Component) {
  var prototype = Component.prototype;

  if (!prototype || !prototype.isReactComponent) {
    throw new Error('Can only polyfill class components');
  }

  if (
    typeof Component.getDerivedStateFromProps !== 'function' &&
    typeof prototype.getSnapshotBeforeUpdate !== 'function'
  ) {
    return Component;
  }

  // If new component APIs are defined, "unsafe" lifecycles won't be called.
  // Error if any of these lifecycles are present,
  // Because they would work differently between older and newer (16.3+) versions of React.
  var foundWillMountName = null;
  var foundWillReceivePropsName = null;
  var foundWillUpdateName = null;
  if (typeof prototype.componentWillMount === 'function') {
    foundWillMountName = 'componentWillMount';
  } else if (typeof prototype.UNSAFE_componentWillMount === 'function') {
    foundWillMountName = 'UNSAFE_componentWillMount';
  }
  if (typeof prototype.componentWillReceiveProps === 'function') {
    foundWillReceivePropsName = 'componentWillReceiveProps';
  } else if (typeof prototype.UNSAFE_componentWillReceiveProps === 'function') {
    foundWillReceivePropsName = 'UNSAFE_componentWillReceiveProps';
  }
  if (typeof prototype.componentWillUpdate === 'function') {
    foundWillUpdateName = 'componentWillUpdate';
  } else if (typeof prototype.UNSAFE_componentWillUpdate === 'function') {
    foundWillUpdateName = 'UNSAFE_componentWillUpdate';
  }
  if (
    foundWillMountName !== null ||
    foundWillReceivePropsName !== null ||
    foundWillUpdateName !== null
  ) {
    var componentName = Component.displayName || Component.name;
    var newApiName =
      typeof Component.getDerivedStateFromProps === 'function'
        ? 'getDerivedStateFromProps()'
        : 'getSnapshotBeforeUpdate()';

    throw Error(
      'Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n' +
        componentName +
        ' uses ' +
        newApiName +
        ' but also contains the following legacy lifecycles:' +
        (foundWillMountName !== null ? '\n  ' + foundWillMountName : '') +
        (foundWillReceivePropsName !== null
          ? '\n  ' + foundWillReceivePropsName
          : '') +
        (foundWillUpdateName !== null ? '\n  ' + foundWillUpdateName : '') +
        '\n\nThe above lifecycles should be removed. Learn more about this warning here:\n' +
        'https://fb.me/react-async-component-lifecycle-hooks'
    );
  }

  // React <= 16.2 does not support static getDerivedStateFromProps.
  // As a workaround, use cWM and cWRP to invoke the new static lifecycle.
  // Newer versions of React will ignore these lifecycles if gDSFP exists.
  if (typeof Component.getDerivedStateFromProps === 'function') {
    prototype.componentWillMount = componentWillMount;
    prototype.componentWillReceiveProps = componentWillReceiveProps;
  }

  // React <= 16.2 does not support getSnapshotBeforeUpdate.
  // As a workaround, use cWU to invoke the new lifecycle.
  // Newer versions of React will ignore that lifecycle if gSBU exists.
  if (typeof prototype.getSnapshotBeforeUpdate === 'function') {
    if (typeof prototype.componentDidUpdate !== 'function') {
      throw new Error(
        'Cannot polyfill getSnapshotBeforeUpdate() for components that do not define componentDidUpdate() on the prototype'
      );
    }

    prototype.componentWillUpdate = componentWillUpdate;

    var componentDidUpdate = prototype.componentDidUpdate;

    prototype.componentDidUpdate = function componentDidUpdatePolyfill(
      prevProps,
      prevState,
      maybeSnapshot
    ) {
      // 16.3+ will not execute our will-update method;
      // It will pass a snapshot value to did-update though.
      // Older versions will require our polyfilled will-update value.
      // We need to handle both cases, but can't just check for the presence of "maybeSnapshot",
      // Because for <= 15.x versions this might be a "prevContext" object.
      // We also can't just check "__reactInternalSnapshot",
      // Because get-snapshot might return a falsy value.
      // So check for the explicit __reactInternalSnapshotFlag flag to determine behavior.
      var snapshot = this.__reactInternalSnapshotFlag
        ? this.__reactInternalSnapshot
        : maybeSnapshot;

      componentDidUpdate.call(this, prevProps, prevState, snapshot);
    };
  }

  return Component;
}

function uncontrollable(Component, controlledValues, methods) {
  if (methods === void 0) {
    methods = [];
  }

  var displayName = Component.displayName || Component.name || 'Component';
  var canAcceptRef$$1 = canAcceptRef(Component);
  var controlledProps = Object.keys(controlledValues);
  var PROPS_TO_OMIT = controlledProps.map(defaultKey);
  !(canAcceptRef$$1 || !methods.length) ? process.env.NODE_ENV !== "production" ? invariant_1(false, '[uncontrollable] stateless function components cannot pass through methods ' + 'because they have no associated instances. Check component: ' + displayName + ', ' + 'attempting to pass through methods: ' + methods.join(', ')) : invariant_1(false) : void 0;

  var UncontrolledComponent =
  /*#__PURE__*/
  function (_React$Component) {
    _inheritsLoose(UncontrolledComponent, _React$Component);

    function UncontrolledComponent() {
      var _this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
      _this.handlers = Object.create(null);
      controlledProps.forEach(function (propName) {
        var handlerName = controlledValues[propName];

        var handleChange = function handleChange(value) {
          if (_this.props[handlerName]) {
            var _this$props;

            _this._notifying = true;

            for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
              args[_key2 - 1] = arguments[_key2];
            }

            (_this$props = _this.props)[handlerName].apply(_this$props, [value].concat(args));

            _this._notifying = false;
          }

          if (!_this.unmounted) _this.setState(function (_ref) {
            var _extends2;

            var values = _ref.values;
            return {
              values: _extends(Object.create(null), values, (_extends2 = {}, _extends2[propName] = value, _extends2))
            };
          });
        };

        _this.handlers[handlerName] = handleChange;
      });
      if (methods.length) _this.attachRef = function (ref) {
        _this.inner = ref;
      };
      var values = Object.create(null);
      controlledProps.forEach(function (key) {
        values[key] = _this.props[defaultKey(key)];
      });
      _this.state = {
        values: values,
        prevProps: {}
      };
      return _this;
    }

    var _proto = UncontrolledComponent.prototype;

    _proto.shouldComponentUpdate = function shouldComponentUpdate() {
      //let setState trigger the update
      return !this._notifying;
    };

    UncontrolledComponent.getDerivedStateFromProps = function getDerivedStateFromProps(props, _ref2) {
      var values = _ref2.values,
          prevProps = _ref2.prevProps;
      var nextState = {
        values: _extends(Object.create(null), values),
        prevProps: {}
      };
      controlledProps.forEach(function (key) {
        /**
         * If a prop switches from controlled to Uncontrolled
         * reset its value to the defaultValue
         */
        nextState.prevProps[key] = props[key];

        if (!isProp(props, key) && isProp(prevProps, key)) {
          nextState.values[key] = props[defaultKey(key)];
        }
      });
      return nextState;
    };

    _proto.componentWillUnmount = function componentWillUnmount() {
      this.unmounted = true;
    };

    _proto.render = function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          innerRef = _this$props2.innerRef,
          props = _objectWithoutPropertiesLoose(_this$props2, ["innerRef"]);

      PROPS_TO_OMIT.forEach(function (prop) {
        delete props[prop];
      });
      var newProps = {};
      controlledProps.forEach(function (propName) {
        var propValue = _this2.props[propName];
        newProps[propName] = propValue !== undefined ? propValue : _this2.state.values[propName];
      });
      return React__default.createElement(Component, _extends({}, props, newProps, this.handlers, {
        ref: innerRef || this.attachRef
      }));
    };

    return UncontrolledComponent;
  }(React__default.Component);

  polyfill(UncontrolledComponent);
  UncontrolledComponent.displayName = "Uncontrolled(" + displayName + ")";
  UncontrolledComponent.propTypes = _extends({
    innerRef: function innerRef() {}
  }, uncontrolledPropTypes(controlledValues, displayName));
  methods.forEach(function (method) {
    UncontrolledComponent.prototype[method] = function $proxiedMethod() {
      var _this$inner;

      return (_this$inner = this.inner)[method].apply(_this$inner, arguments);
    };
  });
  var WrappedComponent = UncontrolledComponent;

  if (React__default.forwardRef) {
    WrappedComponent = React__default.forwardRef(function (props, ref) {
      return React__default.createElement(UncontrolledComponent, _extends({}, props, {
        innerRef: ref
      }));
    });
    WrappedComponent.propTypes = UncontrolledComponent.propTypes;
  }

  WrappedComponent.ControlledComponent = Component;
  /**
   * useful when wrapping a Component and you want to control
   * everything
   */

  WrappedComponent.deferControlTo = function (newComponent, additions, nextMethods) {
    if (additions === void 0) {
      additions = {};
    }

    return uncontrollable(newComponent, _extends({}, controlledValues, additions), nextMethods);
  };

  return WrappedComponent;
}

var forwardRef_1 = createCommonjsModule(function (module, exports) {

exports.__esModule = true;
exports.default = forwardRef;

var _react = _interopRequireDefault(React__default);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function forwardRef(renderFn, _temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      propTypes = _ref.propTypes,
      defaultProps = _ref.defaultProps,
      _ref$allowFallback = _ref.allowFallback,
      allowFallback = _ref$allowFallback === void 0 ? false : _ref$allowFallback,
      _ref$displayName = _ref.displayName,
      displayName = _ref$displayName === void 0 ? renderFn.name || renderFn.displayName : _ref$displayName;

  var render = function render(props, ref) {
    return renderFn(props, ref);
  };

  return Object.assign(_react.default.forwardRef || !allowFallback ? _react.default.forwardRef(render) : function (props) {
    return render(props, null);
  }, {
    displayName: displayName,
    propTypes: propTypes,
    defaultProps: defaultProps
  });
}
});

var forwardRef = unwrapExports(forwardRef_1);

var ThemeContext = React__default.createContext({});
var Consumer = ThemeContext.Consumer,
    Provider = ThemeContext.Provider;

function useBootstrapPrefix(prefix, defaultPrefix) {
  var prefixes = React.useContext(ThemeContext);
  return prefix || prefixes[defaultPrefix] || defaultPrefix;
}

function createBootstrapComponent(Component, opts) {
  if (typeof opts === 'string') opts = {
    prefix: opts
  };
  var isClassy = Component.prototype && Component.prototype.isReactComponent; // If it's a functional component make sure we don't break it with a ref

  var _opts = opts,
      prefix = _opts.prefix,
      _opts$forwardRefAs = _opts.forwardRefAs,
      forwardRefAs = _opts$forwardRefAs === void 0 ? isClassy ? 'ref' : 'innerRef' : _opts$forwardRefAs;
  return forwardRef(function (_ref2, ref) {
    var props = _extends({}, _ref2);

    props[forwardRefAs] = ref; // eslint-disable-next-line react/prop-types

    var bsPrefix = useBootstrapPrefix(props.bsPrefix, prefix);
    return React__default.createElement(Component, _extends({}, props, {
      bsPrefix: bsPrefix
    }));
  }, {
    displayName: "Bootstrap(" + (Component.displayName || Component.name) + ")"
  });
}

var SelectableContext = React__default.createContext();
var makeEventKey = function makeEventKey(eventKey, href) {
  if (eventKey != null) return String(eventKey);
  return href || null;
};

var AccordionContext = React__default.createContext(null);

function useAccordionToggle(eventKey, onClick) {
  var contextEventKey = React.useContext(AccordionContext);
  var onSelect = React.useContext(SelectableContext);
  return function (e) {
    /* 
      Compare the event key in context with the given event key.
      If they are the same, then collapse the component.
    */
    var eventKeyPassed = eventKey === contextEventKey ? null : eventKey;
    onSelect(eventKeyPassed, e);
    if (onClick) onClick(e);
  };
}
var AccordionToggle = React__default.forwardRef(function (_ref, ref) {
  var _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'button' : _ref$as,
      children = _ref.children,
      eventKey = _ref.eventKey,
      onClick = _ref.onClick,
      props = _objectWithoutPropertiesLoose(_ref, ["as", "children", "eventKey", "onClick"]);

  var accordionOnClick = useAccordionToggle(eventKey, onClick);
  return React__default.createElement(Component, _extends({
    ref: ref,
    onClick: accordionOnClick
  }, props), children);
});

function ownerDocument(node) {
  return node && node.ownerDocument || document;
}

function ownerWindow(node) {
  var doc = ownerDocument(node);
  return doc && doc.defaultView || window;
}

function getComputedStyle$1(node, psuedoElement) {
  return ownerWindow(node).getComputedStyle(node, psuedoElement);
}

var rUpper = /([A-Z])/g;
function hyphenate(string) {
  return string.replace(rUpper, '-$1').toLowerCase();
}

/**
 * Copyright 2013-2014, Facebook, Inc.
 * All rights reserved.
 * https://github.com/facebook/react/blob/2aeb8a2a6beb00617a4217f7f8284924fa2ad819/src/vendor/core/hyphenateStyleName.js
 */
var msPattern = /^ms-/;
function hyphenateStyleName(string) {
  return hyphenate(string).replace(msPattern, '-ms-');
}

var supportedTransforms = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i;
function isTransform(value) {
  return !!(value && supportedTransforms.test(value));
}

function style(node, property) {
  var css = '';
  var transforms = '';

  if (typeof property === 'string') {
    return node.style.getPropertyValue(hyphenateStyleName(property)) || getComputedStyle$1(node).getPropertyValue(hyphenateStyleName(property));
  }

  Object.keys(property).forEach(function (key) {
    var value = property[key];

    if (!value && value !== 0) {
      node.style.removeProperty(hyphenateStyleName(key));
    } else if (isTransform(key)) {
      transforms += key + "(" + value + ") ";
    } else {
      css += hyphenateStyleName(key) + ": " + value + ";";
    }
  });

  if (transforms) {
    css += "transform: " + transforms + ";";
  }

  node.style.cssText += ";" + css;
}

var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

/* eslint-disable no-return-assign */
var optionsSupported = false;
var onceSupported = false;

try {
  var options = {
    get passive() {
      return optionsSupported = true;
    },

    get once() {
      // eslint-disable-next-line no-multi-assign
      return onceSupported = optionsSupported = true;
    }

  };

  if (canUseDOM) {
    window.addEventListener('test', options, options);
    window.removeEventListener('test', options, true);
  }
} catch (e) {
  /* */
}

/**
 * An `addEventListener` ponyfill, supports the `once` option
 */
function addEventListener(node, eventName, handler, options) {
  if (options && typeof options !== 'boolean' && !onceSupported) {
    var once = options.once,
        capture = options.capture;
    var wrappedHandler = handler;

    if (!onceSupported && once) {
      wrappedHandler = handler.__once || function onceHandler(event) {
        this.removeEventListener(eventName, onceHandler, capture);
        handler.call(this, event);
      };

      handler.__once = wrappedHandler;
    }

    node.addEventListener(eventName, wrappedHandler, optionsSupported ? options : capture);
  }

  node.addEventListener(eventName, handler, options);
}

function removeEventListener(node, eventName, handler, options) {
  var capture = options && typeof options !== 'boolean' ? options.capture : options;
  node.removeEventListener(eventName, handler, capture);

  if (handler.__once) {
    node.removeEventListener(eventName, handler.__once, capture);
  }
}

function listen(node, eventName, handler, options) {
  addEventListener(node, eventName, handler, options);
  return function () {
    removeEventListener(node, eventName, handler, options);
  };
}

var TRANSITION_SUPPORTED = canUseDOM && 'ontransitionend' in window;
function parseDuration(node) {
  var str = style(node, 'transitionDuration') || '';
  var mult = str.indexOf('ms') === -1 ? 1000 : 1;
  return parseFloat(str) * mult;
}

function triggerTransitionEnd(element) {
  var evt = document.createEvent('HTMLEvents');
  evt.initEvent('transitionend', true, true);
  element.dispatchEvent(evt);
}

function emulateTransitionEnd(element, duration, padding) {
  if (padding === void 0) {
    padding = 5;
  }

  var called = false;
  var handle = setTimeout(function () {
    if (!called) triggerTransitionEnd(element);
  }, duration + padding);
  var remove = listen(element, 'transitionend', function () {
    called = true;
  }, {
    once: true
  });
  return function () {
    clearTimeout(handle);
    remove();
  };
}

function transitionEnd(element, handler, duration) {
  if (!TRANSITION_SUPPORTED) {
    return emulateTransitionEnd(element, 0, 0);
  }

  if (duration == null) duration = parseDuration(element) || 0;
  emulateTransitionEnd(element, duration);
  return listen(element, 'transitionend', handler);
}

var config = {
  disabled: false
};

var timeoutsShape = process.env.NODE_ENV !== 'production' ? PropTypes.oneOfType([PropTypes.number, PropTypes.shape({
  enter: PropTypes.number,
  exit: PropTypes.number,
  appear: PropTypes.number
}).isRequired]) : null;
var classNamesShape = process.env.NODE_ENV !== 'production' ? PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
  enter: PropTypes.string,
  exit: PropTypes.string,
  active: PropTypes.string
}), PropTypes.shape({
  enter: PropTypes.string,
  enterDone: PropTypes.string,
  enterActive: PropTypes.string,
  exit: PropTypes.string,
  exitDone: PropTypes.string,
  exitActive: PropTypes.string
})]) : null;

var TransitionGroupContext = React__default.createContext(null);

var UNMOUNTED = 'unmounted';
var EXITED = 'exited';
var ENTERING = 'entering';
var ENTERED = 'entered';
var EXITING = 'exiting';
/**
 * The Transition component lets you describe a transition from one component
 * state to another _over time_ with a simple declarative API. Most commonly
 * it's used to animate the mounting and unmounting of a component, but can also
 * be used to describe in-place transition states as well.
 *
 * ---
 *
 * **Note**: `Transition` is a platform-agnostic base component. If you're using
 * transitions in CSS, you'll probably want to use
 * [`CSSTransition`](https://reactcommunity.org/react-transition-group/css-transition)
 * instead. It inherits all the features of `Transition`, but contains
 * additional features necessary to play nice with CSS transitions (hence the
 * name of the component).
 *
 * ---
 *
 * By default the `Transition` component does not alter the behavior of the
 * component it renders, it only tracks "enter" and "exit" states for the
 * components. It's up to you to give meaning and effect to those states. For
 * example we can add styles to a component when it enters or exits:
 *
 * ```jsx
 * import { Transition } from 'react-transition-group';
 *
 * const duration = 300;
 *
 * const defaultStyle = {
 *   transition: `opacity ${duration}ms ease-in-out`,
 *   opacity: 0,
 * }
 *
 * const transitionStyles = {
 *   entering: { opacity: 1 },
 *   entered:  { opacity: 1 },
 *   exiting:  { opacity: 0 },
 *   exited:  { opacity: 0 },
 * };
 *
 * const Fade = ({ in: inProp }) => (
 *   <Transition in={inProp} timeout={duration}>
 *     {state => (
 *       <div style={{
 *         ...defaultStyle,
 *         ...transitionStyles[state]
 *       }}>
 *         I'm a fade Transition!
 *       </div>
 *     )}
 *   </Transition>
 * );
 * ```
 *
 * There are 4 main states a Transition can be in:
 *  - `'entering'`
 *  - `'entered'`
 *  - `'exiting'`
 *  - `'exited'`
 *
 * Transition state is toggled via the `in` prop. When `true` the component
 * begins the "Enter" stage. During this stage, the component will shift from
 * its current transition state, to `'entering'` for the duration of the
 * transition and then to the `'entered'` stage once it's complete. Let's take
 * the following example (we'll use the
 * [useState](https://reactjs.org/docs/hooks-reference.html#usestate) hook):
 *
 * ```jsx
 * function App() {
 *   const [inProp, setInProp] = useState(false);
 *   return (
 *     <div>
 *       <Transition in={inProp} timeout={500}>
 *         {state => (
 *           // ...
 *         )}
 *       </Transition>
 *       <button onClick={() => setInProp(true)}>
 *         Click to Enter
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 *
 * When the button is clicked the component will shift to the `'entering'` state
 * and stay there for 500ms (the value of `timeout`) before it finally switches
 * to `'entered'`.
 *
 * When `in` is `false` the same thing happens except the state moves from
 * `'exiting'` to `'exited'`.
 */

var Transition =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Transition, _React$Component);

  function Transition(props, context) {
    var _this;

    _this = _React$Component.call(this, props, context) || this;
    var parentGroup = context; // In the context of a TransitionGroup all enters are really appears

    var appear = parentGroup && !parentGroup.isMounting ? props.enter : props.appear;
    var initialStatus;
    _this.appearStatus = null;

    if (props.in) {
      if (appear) {
        initialStatus = EXITED;
        _this.appearStatus = ENTERING;
      } else {
        initialStatus = ENTERED;
      }
    } else {
      if (props.unmountOnExit || props.mountOnEnter) {
        initialStatus = UNMOUNTED;
      } else {
        initialStatus = EXITED;
      }
    }

    _this.state = {
      status: initialStatus
    };
    _this.nextCallback = null;
    return _this;
  }

  Transition.getDerivedStateFromProps = function getDerivedStateFromProps(_ref, prevState) {
    var nextIn = _ref.in;

    if (nextIn && prevState.status === UNMOUNTED) {
      return {
        status: EXITED
      };
    }

    return null;
  }; // getSnapshotBeforeUpdate(prevProps) {
  //   let nextStatus = null
  //   if (prevProps !== this.props) {
  //     const { status } = this.state
  //     if (this.props.in) {
  //       if (status !== ENTERING && status !== ENTERED) {
  //         nextStatus = ENTERING
  //       }
  //     } else {
  //       if (status === ENTERING || status === ENTERED) {
  //         nextStatus = EXITING
  //       }
  //     }
  //   }
  //   return { nextStatus }
  // }


  var _proto = Transition.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.updateStatus(true, this.appearStatus);
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var nextStatus = null;

    if (prevProps !== this.props) {
      var status = this.state.status;

      if (this.props.in) {
        if (status !== ENTERING && status !== ENTERED) {
          nextStatus = ENTERING;
        }
      } else {
        if (status === ENTERING || status === ENTERED) {
          nextStatus = EXITING;
        }
      }
    }

    this.updateStatus(false, nextStatus);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.cancelNextCallback();
  };

  _proto.getTimeouts = function getTimeouts() {
    var timeout = this.props.timeout;
    var exit, enter, appear;
    exit = enter = appear = timeout;

    if (timeout != null && typeof timeout !== 'number') {
      exit = timeout.exit;
      enter = timeout.enter; // TODO: remove fallback for next major

      appear = timeout.appear !== undefined ? timeout.appear : enter;
    }

    return {
      exit: exit,
      enter: enter,
      appear: appear
    };
  };

  _proto.updateStatus = function updateStatus(mounting, nextStatus) {
    if (mounting === void 0) {
      mounting = false;
    }

    if (nextStatus !== null) {
      // nextStatus will always be ENTERING or EXITING.
      this.cancelNextCallback();
      var node = ReactDOM__default.findDOMNode(this);

      if (nextStatus === ENTERING) {
        this.performEnter(node, mounting);
      } else {
        this.performExit(node);
      }
    } else if (this.props.unmountOnExit && this.state.status === EXITED) {
      this.setState({
        status: UNMOUNTED
      });
    }
  };

  _proto.performEnter = function performEnter(node, mounting) {
    var _this2 = this;

    var enter = this.props.enter;
    var appearing = this.context ? this.context.isMounting : mounting;
    var timeouts = this.getTimeouts();
    var enterTimeout = appearing ? timeouts.appear : timeouts.enter; // no enter animation skip right to ENTERED
    // if we are mounting and running this it means appear _must_ be set

    if (!mounting && !enter || config.disabled) {
      this.safeSetState({
        status: ENTERED
      }, function () {
        _this2.props.onEntered(node);
      });
      return;
    }

    this.props.onEnter(node, appearing);
    this.safeSetState({
      status: ENTERING
    }, function () {
      _this2.props.onEntering(node, appearing);

      _this2.onTransitionEnd(node, enterTimeout, function () {
        _this2.safeSetState({
          status: ENTERED
        }, function () {
          _this2.props.onEntered(node, appearing);
        });
      });
    });
  };

  _proto.performExit = function performExit(node) {
    var _this3 = this;

    var exit = this.props.exit;
    var timeouts = this.getTimeouts(); // no exit animation skip right to EXITED

    if (!exit || config.disabled) {
      this.safeSetState({
        status: EXITED
      }, function () {
        _this3.props.onExited(node);
      });
      return;
    }

    this.props.onExit(node);
    this.safeSetState({
      status: EXITING
    }, function () {
      _this3.props.onExiting(node);

      _this3.onTransitionEnd(node, timeouts.exit, function () {
        _this3.safeSetState({
          status: EXITED
        }, function () {
          _this3.props.onExited(node);
        });
      });
    });
  };

  _proto.cancelNextCallback = function cancelNextCallback() {
    if (this.nextCallback !== null) {
      this.nextCallback.cancel();
      this.nextCallback = null;
    }
  };

  _proto.safeSetState = function safeSetState(nextState, callback) {
    // This shouldn't be necessary, but there are weird race conditions with
    // setState callbacks and unmounting in testing, so always make sure that
    // we can cancel any pending setState callbacks after we unmount.
    callback = this.setNextCallback(callback);
    this.setState(nextState, callback);
  };

  _proto.setNextCallback = function setNextCallback(callback) {
    var _this4 = this;

    var active = true;

    this.nextCallback = function (event) {
      if (active) {
        active = false;
        _this4.nextCallback = null;
        callback(event);
      }
    };

    this.nextCallback.cancel = function () {
      active = false;
    };

    return this.nextCallback;
  };

  _proto.onTransitionEnd = function onTransitionEnd(node, timeout, handler) {
    this.setNextCallback(handler);
    var doesNotHaveTimeoutOrListener = timeout == null && !this.props.addEndListener;

    if (!node || doesNotHaveTimeoutOrListener) {
      setTimeout(this.nextCallback, 0);
      return;
    }

    if (this.props.addEndListener) {
      this.props.addEndListener(node, this.nextCallback);
    }

    if (timeout != null) {
      setTimeout(this.nextCallback, timeout);
    }
  };

  _proto.render = function render() {
    var status = this.state.status;

    if (status === UNMOUNTED) {
      return null;
    }

    var _this$props = this.props,
        children = _this$props.children,
        childProps = _objectWithoutPropertiesLoose(_this$props, ["children"]); // filter props for Transtition


    delete childProps.in;
    delete childProps.mountOnEnter;
    delete childProps.unmountOnExit;
    delete childProps.appear;
    delete childProps.enter;
    delete childProps.exit;
    delete childProps.timeout;
    delete childProps.addEndListener;
    delete childProps.onEnter;
    delete childProps.onEntering;
    delete childProps.onEntered;
    delete childProps.onExit;
    delete childProps.onExiting;
    delete childProps.onExited;

    if (typeof children === 'function') {
      // allows for nested Transitions
      return React__default.createElement(TransitionGroupContext.Provider, {
        value: null
      }, children(status, childProps));
    }

    var child = React__default.Children.only(children);
    return (// allows for nested Transitions
      React__default.createElement(TransitionGroupContext.Provider, {
        value: null
      }, React__default.cloneElement(child, childProps))
    );
  };

  return Transition;
}(React__default.Component);

Transition.contextType = TransitionGroupContext;
Transition.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * A `function` child can be used instead of a React element. This function is
   * called with the current transition status (`'entering'`, `'entered'`,
   * `'exiting'`, `'exited'`), which can be used to apply context
   * specific props to a component.
   *
   * ```jsx
   * <Transition in={this.state.in} timeout={150}>
   *   {state => (
   *     <MyComponent className={`fade fade-${state}`} />
   *   )}
   * </Transition>
   * ```
   */
  children: PropTypes.oneOfType([PropTypes.func.isRequired, PropTypes.element.isRequired]).isRequired,

  /**
   * Show the component; triggers the enter or exit states
   */
  in: PropTypes.bool,

  /**
   * By default the child component is mounted immediately along with
   * the parent `Transition` component. If you want to "lazy mount" the component on the
   * first `in={true}` you can set `mountOnEnter`. After the first enter transition the component will stay
   * mounted, even on "exited", unless you also specify `unmountOnExit`.
   */
  mountOnEnter: PropTypes.bool,

  /**
   * By default the child component stays mounted after it reaches the `'exited'` state.
   * Set `unmountOnExit` if you'd prefer to unmount the component after it finishes exiting.
   */
  unmountOnExit: PropTypes.bool,

  /**
   * Normally a component is not transitioned if it is shown when the
   * `<Transition>` component mounts. If you want to transition on the first
   * mount set `appear` to `true`, and the component will transition in as soon
   * as the `<Transition>` mounts.
   *
   * > **Note**: there are no special appear states like `appearing`/`appeared`, this prop
   * > only adds an additional enter transition. However, in the
   * > `<CSSTransition>` component that first enter transition does result in
   * > additional `.appear-*` classes, that way you can choose to style it
   * > differently.
   */
  appear: PropTypes.bool,

  /**
   * Enable or disable enter transitions.
   */
  enter: PropTypes.bool,

  /**
   * Enable or disable exit transitions.
   */
  exit: PropTypes.bool,

  /**
   * The duration of the transition, in milliseconds.
   * Required unless `addEndListener` is provided.
   *
   * You may specify a single timeout for all transitions:
   *
   * ```jsx
   * timeout={500}
   * ```
   *
   * or individually:
   *
   * ```jsx
   * timeout={{
   *  appear: 500,
   *  enter: 300,
   *  exit: 500,
   * }}
   * ```
   *
   * - `appear` defaults to the value of `enter`
   * - `enter` defaults to `0`
   * - `exit` defaults to `0`
   *
   * @type {number | { enter?: number, exit?: number, appear?: number }}
   */
  timeout: function timeout(props) {
    var pt = timeoutsShape;
    if (!props.addEndListener) pt = pt.isRequired;

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return pt.apply(void 0, [props].concat(args));
  },

  /**
   * Add a custom transition end trigger. Called with the transitioning
   * DOM node and a `done` callback. Allows for more fine grained transition end
   * logic. **Note:** Timeouts are still used as a fallback if provided.
   *
   * ```jsx
   * addEndListener={(node, done) => {
   *   // use the css transitionend event to mark the finish of a transition
   *   node.addEventListener('transitionend', done, false);
   * }}
   * ```
   */
  addEndListener: PropTypes.func,

  /**
   * Callback fired before the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEnter: PropTypes.func,

  /**
   * Callback fired after the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * @type Function(node: HtmlElement, isAppearing: bool)
   */
  onEntering: PropTypes.func,

  /**
   * Callback fired after the "entered" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEntered: PropTypes.func,

  /**
   * Callback fired before the "exiting" status is applied.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExit: PropTypes.func,

  /**
   * Callback fired after the "exiting" status is applied.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExiting: PropTypes.func,

  /**
   * Callback fired after the "exited" status is applied.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExited: PropTypes.func // Name the function so it is clearer in the documentation

} : {};

function noop$1() {}

Transition.defaultProps = {
  in: false,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false,
  enter: true,
  exit: true,
  onEnter: noop$1,
  onEntering: noop$1,
  onEntered: noop$1,
  onExit: noop$1,
  onExiting: noop$1,
  onExited: noop$1
};
Transition.UNMOUNTED = 0;
Transition.EXITED = 1;
Transition.ENTERING = 2;
Transition.ENTERED = 3;
Transition.EXITING = 4;

/**
 * Safe chained function
 *
 * Will only create a new function if needed,
 * otherwise will pass back existing functions or null.
 *
 * @param {function} functions to chain
 * @returns {function|null}
 */
function createChainedFunction() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  return funcs.filter(function (f) {
    return f != null;
  }).reduce(function (acc, f) {
    if (typeof f !== 'function') {
      throw new Error('Invalid Argument Type, must only provide functions, undefined, or null.');
    }

    if (acc === null) return f;
    return function chainedFunction() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      acc.apply(this, args);
      f.apply(this, args);
    };
  }, null);
}

// reading a dimension prop will cause the browser to recalculate,
// which will let our animations work
function triggerBrowserReflow(node) {
  node.offsetHeight; // eslint-disable-line no-unused-expressions
}

var _collapseStyles;
var MARGINS = {
  height: ['marginTop', 'marginBottom'],
  width: ['marginLeft', 'marginRight']
};

function getDimensionValue(dimension, elem) {
  var offset = "offset" + dimension[0].toUpperCase() + dimension.slice(1);
  var value = elem[offset];
  var margins = MARGINS[dimension];
  return value + parseInt(style(elem, margins[0]), 10) + parseInt(style(elem, margins[1]), 10);
}

var collapseStyles = (_collapseStyles = {}, _collapseStyles[EXITED] = 'collapse', _collapseStyles[EXITING] = 'collapsing', _collapseStyles[ENTERING] = 'collapsing', _collapseStyles[ENTERED] = 'collapse show', _collapseStyles);
var defaultProps = {
  in: false,
  timeout: 300,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false,
  dimension: 'height',
  getDimensionValue: getDimensionValue
};

var Collapse =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Collapse, _React$Component);

  function Collapse() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.handleEnter = function (elem) {
      elem.style[_this.getDimension()] = '0';
    };

    _this.handleEntering = function (elem) {
      var dimension = _this.getDimension();

      elem.style[dimension] = _this._getScrollDimensionValue(elem, dimension);
    };

    _this.handleEntered = function (elem) {
      elem.style[_this.getDimension()] = null;
    };

    _this.handleExit = function (elem) {
      var dimension = _this.getDimension();

      elem.style[dimension] = _this.props.getDimensionValue(dimension, elem) + "px";
      triggerBrowserReflow(elem);
    };

    _this.handleExiting = function (elem) {
      elem.style[_this.getDimension()] = null;
    };

    return _this;
  }

  var _proto = Collapse.prototype;

  _proto.getDimension = function getDimension() {
    return typeof this.props.dimension === 'function' ? this.props.dimension() : this.props.dimension;
  }
  /* -- Expanding -- */
  ;

  // for testing
  _proto._getScrollDimensionValue = function _getScrollDimensionValue(elem, dimension) {
    var scroll = "scroll" + dimension[0].toUpperCase() + dimension.slice(1);
    return elem[scroll] + "px";
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props = this.props,
        onEnter = _this$props.onEnter,
        onEntering = _this$props.onEntering,
        onEntered = _this$props.onEntered,
        onExit = _this$props.onExit,
        onExiting = _this$props.onExiting,
        className = _this$props.className,
        children = _this$props.children,
        props = _objectWithoutPropertiesLoose(_this$props, ["onEnter", "onEntering", "onEntered", "onExit", "onExiting", "className", "children"]);

    delete props.dimension;
    delete props.getDimensionValue;
    var handleEnter = createChainedFunction(this.handleEnter, onEnter);
    var handleEntering = createChainedFunction(this.handleEntering, onEntering);
    var handleEntered = createChainedFunction(this.handleEntered, onEntered);
    var handleExit = createChainedFunction(this.handleExit, onExit);
    var handleExiting = createChainedFunction(this.handleExiting, onExiting);
    return React__default.createElement(Transition, _extends({
      addEndListener: transitionEnd
    }, props, {
      "aria-expanded": props.role ? props.in : null,
      onEnter: handleEnter,
      onEntering: handleEntering,
      onEntered: handleEntered,
      onExit: handleExit,
      onExiting: handleExiting
    }), function (state, innerProps) {
      return React__default.cloneElement(children, _extends({}, innerProps, {
        className: classnames(className, children.props.className, collapseStyles[state], _this2.getDimension() === 'width' && 'width')
      }));
    });
  };

  return Collapse;
}(React__default.Component);

Collapse.defaultProps = defaultProps;

var AccordionCollapse = React__default.forwardRef(function (_ref, ref) {
  var children = _ref.children,
      eventKey = _ref.eventKey,
      props = _objectWithoutPropertiesLoose(_ref, ["children", "eventKey"]);

  var contextEventKey = React.useContext(AccordionContext);
  return React__default.createElement(Collapse, _extends({
    ref: ref,
    in: contextEventKey === eventKey
  }, props), React__default.createElement("div", null, React__default.Children.only(children)));
});
AccordionCollapse.displayName = 'AccordionCollapse';

var Accordion = React__default.forwardRef(function (props, ref) {
  var _useUncontrolled = useUncontrolled(props, {
    activeKey: 'onSelect'
  }),
      _useUncontrolled$as = _useUncontrolled.as,
      Component = _useUncontrolled$as === void 0 ? 'div' : _useUncontrolled$as,
      activeKey = _useUncontrolled.activeKey,
      bsPrefix = _useUncontrolled.bsPrefix,
      children = _useUncontrolled.children,
      className = _useUncontrolled.className,
      onSelect = _useUncontrolled.onSelect,
      controlledProps = _objectWithoutPropertiesLoose(_useUncontrolled, ["as", "activeKey", "bsPrefix", "children", "className", "onSelect"]);

  bsPrefix = useBootstrapPrefix(bsPrefix, 'accordion');
  return React__default.createElement(AccordionContext.Provider, {
    value: activeKey
  }, React__default.createElement(SelectableContext.Provider, {
    value: onSelect
  }, React__default.createElement(Component, _extends({
    ref: ref
  }, controlledProps, {
    className: classnames(className, bsPrefix)
  }), children)));
});
Accordion.Toggle = AccordionToggle;
Accordion.Collapse = AccordionCollapse;

/**
 * Creates a `Ref` whose value is updated in an effect, ensuring the most recent
 * value is the one rendered with. Generally only required for Concurrent mode usage
 * where previous work in `render()` may be discarded befor being used.
 *
 * This is safe to access in an event handler.
 *
 * @param value The `Ref` value
 */

function useCommittedRef(value) {
  var ref = React.useRef(value);
  React.useEffect(function () {
    ref.current = value;
  }, [value]);
  return ref;
}

function useEventCallback(fn) {
  var ref = useCommittedRef(fn);
  return React.useCallback(function () {
    return ref.current && ref.current.apply(ref, arguments);
  }, [ref]);
}

var rHyphen = /-(.)/g;
function camelize(string) {
  return string.replace(rHyphen, function (_, chr) {
    return chr.toUpperCase();
  });
}

var pascalCase = function pascalCase(str) {
  return str[0].toUpperCase() + camelize(str).slice(1);
};

function createWithBsPrefix(prefix, _temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$displayName = _ref.displayName,
      displayName = _ref$displayName === void 0 ? pascalCase(prefix) : _ref$displayName,
      _ref$Component = _ref.Component,
      Component = _ref$Component === void 0 ? 'div' : _ref$Component,
      defaultProps = _ref.defaultProps;

  var BsComponent = React__default.forwardRef( // eslint-disable-next-line react/prop-types
  function (_ref2, ref) {
    var className = _ref2.className,
        bsPrefix = _ref2.bsPrefix,
        _ref2$as = _ref2.as,
        Tag = _ref2$as === void 0 ? Component : _ref2$as,
        props = _objectWithoutPropertiesLoose(_ref2, ["className", "bsPrefix", "as"]);

    var resolvedPrefix = useBootstrapPrefix(bsPrefix, prefix);
    return React__default.createElement(Tag, _extends({
      ref: ref,
      className: classnames(className, resolvedPrefix)
    }, props));
  });
  BsComponent.defaultProps = defaultProps;
  BsComponent.displayName = displayName;
  return BsComponent;
}

var divWithClassName = (function (className) {
  return React__default.forwardRef(function (p, ref) {
    return React__default.createElement("div", _extends({}, p, {
      ref: ref,
      className: classnames(p.className, className)
    }));
  });
});

var _fadeStyles;
var defaultProps$1 = {
  in: false,
  timeout: 300,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false
};
var fadeStyles = (_fadeStyles = {}, _fadeStyles[ENTERING] = 'show', _fadeStyles[ENTERED] = 'show', _fadeStyles);
var Fade = React__default.forwardRef(function (_ref, ref) {
  var className = _ref.className,
      children = _ref.children,
      props = _objectWithoutPropertiesLoose(_ref, ["className", "children"]);

  var handleEnter = React.useCallback(function (node) {
    triggerBrowserReflow(node);
    if (props.onEnter) props.onEnter(node);
  }, [props]);
  return React__default.createElement(Transition, _extends({
    ref: ref,
    addEndListener: transitionEnd
  }, props, {
    onEnter: handleEnter
  }), function (status, innerProps) {
    return React__default.cloneElement(children, _extends({}, innerProps, {
      className: classnames('fade', className, children.props.className, fadeStyles[status])
    }));
  });
});
Fade.defaultProps = defaultProps$1;
Fade.displayName = 'Fade';

var propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func
};
var defaultProps$2 = {
  label: 'Close'
};
var CloseButton = React__default.forwardRef(function (_ref, ref) {
  var label = _ref.label,
      onClick = _ref.onClick,
      className = _ref.className,
      props = _objectWithoutPropertiesLoose(_ref, ["label", "onClick", "className"]);

  return React__default.createElement("button", _extends({
    ref: ref,
    type: "button",
    className: classnames('close', className),
    onClick: onClick
  }, props), React__default.createElement("span", {
    "aria-hidden": "true"
  }, "\xD7"), React__default.createElement("span", {
    className: "sr-only"
  }, label));
});
CloseButton.displayName = 'CloseButton';
CloseButton.propTypes = propTypes;
CloseButton.defaultProps = defaultProps$2;

function isTrivialHref(href) {
  return !href || href.trim() === '#';
}
/**
 * There are situations due to browser quirks or Bootstrap CSS where
 * an anchor tag is needed, when semantically a button tag is the
 * better choice. SafeAnchor ensures that when an anchor is used like a
 * button its accessible. It also emulates input `disabled` behavior for
 * links, which is usually desirable for Buttons, NavItems, DropdownItems, etc.
 */


var SafeAnchor = React__default.forwardRef(function (_ref, ref) {
  var _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'a' : _ref$as,
      disabled = _ref.disabled,
      onKeyDown = _ref.onKeyDown,
      props = _objectWithoutPropertiesLoose(_ref, ["as", "disabled", "onKeyDown"]);

  var handleClick = function handleClick(event) {
    var href = props.href,
        onClick = props.onClick;

    if (disabled || isTrivialHref(href)) {
      event.preventDefault();
    }

    if (disabled) {
      event.stopPropagation();
      return;
    }

    if (onClick) {
      onClick(event);
    }
  };

  var handleKeyDown = function handleKeyDown(event) {
    if (event.key === ' ') {
      event.preventDefault();
      handleClick(event);
    }
  };

  if (isTrivialHref(props.href)) {
    props.role = props.role || 'button'; // we want to make sure there is a href attribute on the node
    // otherwise, the cursor incorrectly styled (except with role='button')

    props.href = props.href || '#';
  }

  if (disabled) {
    props.tabIndex = -1;
    props['aria-disabled'] = true;
  }

  return React__default.createElement(Component, _extends({
    ref: ref
  }, props, {
    onClick: handleClick,
    onKeyDown: createChainedFunction(handleKeyDown, onKeyDown)
  }));
});
SafeAnchor.displayName = 'SafeAnchor';

var defaultProps$3 = {
  show: true,
  transition: Fade,
  closeLabel: 'Close alert'
};
var controllables = {
  show: 'onClose'
};
var Alert = React__default.forwardRef(function (uncontrolledProps, ref) {
  var _useUncontrolled = useUncontrolled(uncontrolledProps, controllables),
      bsPrefix = _useUncontrolled.bsPrefix,
      show = _useUncontrolled.show,
      closeLabel = _useUncontrolled.closeLabel,
      className = _useUncontrolled.className,
      children = _useUncontrolled.children,
      variant = _useUncontrolled.variant,
      onClose = _useUncontrolled.onClose,
      dismissible = _useUncontrolled.dismissible,
      Transition = _useUncontrolled.transition,
      props = _objectWithoutPropertiesLoose(_useUncontrolled, ["bsPrefix", "show", "closeLabel", "className", "children", "variant", "onClose", "dismissible", "transition"]);

  var prefix = useBootstrapPrefix(bsPrefix, 'alert');
  var handleClose = useEventCallback(function (e) {
    onClose(false, e);
  });
  var alert = React__default.createElement("div", _extends({
    role: "alert"
  }, Transition ? props : undefined, {
    className: classnames(className, prefix, variant && prefix + "-" + variant, dismissible && prefix + "-dismissible")
  }), dismissible && React__default.createElement(CloseButton, {
    onClick: handleClose,
    label: closeLabel
  }), children);
  if (!Transition) return show ? alert : null;
  return React__default.createElement(Transition, _extends({
    unmountOnExit: true,
    ref: ref
  }, props, {
    in: show
  }), alert);
});
var DivStyledAsH4 = divWithClassName('h4');
DivStyledAsH4.displayName = 'DivStyledAsH4';
Alert.displayName = 'Alert';
Alert.defaultProps = defaultProps$3;
Alert.Link = createWithBsPrefix('alert-link', {
  Component: SafeAnchor
});
Alert.Heading = createWithBsPrefix('alert-heading', {
  Component: DivStyledAsH4
});

var defaultProps$4 = {
  pill: false
};
var Badge = React__default.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      variant = _ref.variant,
      pill = _ref.pill,
      className = _ref.className,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'span' : _ref$as,
      props = _objectWithoutPropertiesLoose(_ref, ["bsPrefix", "variant", "pill", "className", "as"]);

  var prefix = useBootstrapPrefix(bsPrefix, 'badge');
  return React__default.createElement(Component, _extends({
    ref: ref
  }, props, {
    className: classnames(className, prefix, pill && prefix + "-pill", variant && prefix + "-" + variant)
  }));
});
Badge.displayName = 'Badge';
Badge.defaultProps = defaultProps$4;

var defaultProps$5 = {
  active: false
};
var BreadcrumbItem = React__default.forwardRef( // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      active = _ref.active,
      className = _ref.className,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'li' : _ref$as,
      props = _objectWithoutPropertiesLoose(_ref, ["bsPrefix", "active", "className", "as"]);

  var prefix = useBootstrapPrefix(bsPrefix, 'breadcrumb-item');

  var href = props.href,
      title = props.title,
      target = props.target,
      elementProps = _objectWithoutPropertiesLoose(props, ["href", "title", "target"]);

  var linkProps = {
    href: href,
    title: title,
    target: target
  };
  return React__default.createElement(Component, {
    ref: ref,
    className: classnames(prefix, className, {
      active: active
    }),
    "aria-current": active ? 'page' : undefined
  }, active ? React__default.createElement("span", _extends({}, elementProps, {
    className: classnames({
      active: active
    })
  })) : React__default.createElement(SafeAnchor, _extends({}, elementProps, linkProps)));
});
BreadcrumbItem.displayName = 'BreadcrumbItem';
BreadcrumbItem.defaultProps = defaultProps$5;

var defaultProps$6 = {
  label: 'breadcrumb',
  listProps: {}
};
var Breadcrumb = React__default.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      listProps = _ref.listProps,
      children = _ref.children,
      label = _ref.label,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'nav' : _ref$as,
      props = _objectWithoutPropertiesLoose(_ref, ["bsPrefix", "className", "listProps", "children", "label", "as"]);

  var prefix = useBootstrapPrefix(bsPrefix, 'breadcrumb');
  return React__default.createElement(Component, _extends({
    "aria-label": label,
    className: className,
    ref: ref
  }, props), React__default.createElement("ol", _extends({}, listProps, {
    className: classnames(prefix, listProps.className)
  }), children));
});
Breadcrumb.displayName = 'Breadcrumb';
Breadcrumb.defaultProps = defaultProps$6;
Breadcrumb.Item = BreadcrumbItem;

var defaultProps$7 = {
  variant: 'primary',
  active: false,
  disabled: false,
  type: 'button'
};
var Button = React__default.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      variant = _ref.variant,
      size = _ref.size,
      active = _ref.active,
      className = _ref.className,
      block = _ref.block,
      type = _ref.type,
      as = _ref.as,
      props = _objectWithoutPropertiesLoose(_ref, ["bsPrefix", "variant", "size", "active", "className", "block", "type", "as"]);

  var prefix = useBootstrapPrefix(bsPrefix, 'btn');
  var classes = classnames(className, prefix, active && 'active', prefix + "-" + variant, block && prefix + "-block", size && prefix + "-" + size);

  if (props.href) {
    return React__default.createElement(SafeAnchor, _extends({}, props, {
      as: as,
      ref: ref,
      className: classnames(classes, props.disabled && 'disabled')
    }));
  }

  if (ref) {
    props.ref = ref;
  }

  if (!as) {
    props.type = type;
  }

  var Component = as || 'button';
  return React__default.createElement(Component, _extends({}, props, {
    className: classes
  }));
});
Button.displayName = 'Button';
Button.defaultProps = defaultProps$7;

var defaultProps$8 = {
  vertical: false,
  toggle: false,
  role: 'group'
};
var ButtonGroup = React__default.forwardRef(function (props, ref) {
  var bsPrefix = props.bsPrefix,
      size = props.size,
      toggle = props.toggle,
      vertical = props.vertical,
      className = props.className,
      _props$as = props.as,
      Component = _props$as === void 0 ? 'div' : _props$as,
      rest = _objectWithoutPropertiesLoose(props, ["bsPrefix", "size", "toggle", "vertical", "className", "as"]);

  var prefix = useBootstrapPrefix(bsPrefix, 'btn-group');
  var baseClass = prefix;
  if (vertical) baseClass = prefix + "-vertical";
  return React__default.createElement(Component, _extends({}, rest, {
    ref: ref,
    className: classnames(className, baseClass, size && prefix + "-" + size, toggle && prefix + "-toggle")
  }));
});
ButtonGroup.displayName = 'ButtonGroup';
ButtonGroup.defaultProps = defaultProps$8;

var defaultProps$9 = {
  role: 'toolbar'
};
var ButtonToolbar = React__default.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      props = _objectWithoutPropertiesLoose(_ref, ["bsPrefix", "className"]);

  var prefix = useBootstrapPrefix(bsPrefix, 'btn-toolbar');
  return React__default.createElement("div", _extends({}, props, {
    ref: ref,
    className: classnames(className, prefix)
  }));
});
ButtonToolbar.displayName = 'ButtonToolbar';
ButtonToolbar.defaultProps = defaultProps$9;

var CardContext = React__default.createContext(null);

var defaultProps$a = {
  variant: null
};
var CardImg = React__default.forwardRef( // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      variant = _ref.variant,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'img' : _ref$as,
      props = _objectWithoutPropertiesLoose(_ref, ["bsPrefix", "className", "variant", "as"]);

  var prefix = useBootstrapPrefix(bsPrefix, 'card-img');
  return React__default.createElement(Component, _extends({
    ref: ref,
    className: classnames(variant ? prefix + "-" + variant : prefix, className)
  }, props));
});
CardImg.displayName = 'CardImg';
CardImg.defaultProps = defaultProps$a;

var DivStyledAsH5 = divWithClassName('h5');
var DivStyledAsH6 = divWithClassName('h6');
var CardBody = createWithBsPrefix('card-body');
var defaultProps$b = {
  body: false
};
var Card = React__default.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      bg = _ref.bg,
      text = _ref.text,
      border = _ref.border,
      body = _ref.body,
      children = _ref.children,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'div' : _ref$as,
      props = _objectWithoutPropertiesLoose(_ref, ["bsPrefix", "className", "bg", "text", "border", "body", "children", "as"]);

  var prefix = useBootstrapPrefix(bsPrefix, 'card');
  var cardContext = React.useMemo(function () {
    return {
      cardHeaderBsPrefix: prefix + "-header"
    };
  }, [prefix]);
  return React__default.createElement(CardContext.Provider, {
    value: cardContext
  }, React__default.createElement(Component, _extends({
    ref: ref
  }, props, {
    className: classnames(className, prefix, bg && "bg-" + bg, text && "text-" + text, border && "border-" + border)
  }), body ? React__default.createElement(CardBody, null, children) : children));
});
Card.displayName = 'Card';
Card.defaultProps = defaultProps$b;
Card.Img = CardImg;
Card.Title = createWithBsPrefix('card-title', {
  Component: DivStyledAsH5
});
Card.Subtitle = createWithBsPrefix('card-subtitle', {
  Component: DivStyledAsH6
});
Card.Body = CardBody;
Card.Link = createWithBsPrefix('card-link', {
  Component: 'a'
});
Card.Text = createWithBsPrefix('card-text', {
  Component: 'p'
});
Card.Header = createWithBsPrefix('card-header');
Card.Footer = createWithBsPrefix('card-footer');
Card.ImgOverlay = createWithBsPrefix('card-img-overlay');

createWithBsPrefix('card-columns');

createWithBsPrefix('card-deck');

createWithBsPrefix('card-group');

var CarouselCaption = createWithBsPrefix('carousel-caption', {
  Component: 'div'
});

var CarouselItem = createWithBsPrefix('carousel-item');

/**
 * Iterates through children that are typically specified as `props.children`,
 * but only maps over children that are "valid elements".
 *
 * The mapFunction provided index will be normalised to the components mapped,
 * so an invalid component would not increase the index.
 *
 */

function map(children, func) {
  var index = 0;
  return React__default.Children.map(children, function (child) {
    return React__default.isValidElement(child) ? func(child, index++) : child;
  });
}
/**
 * Iterates through children that are "valid elements".
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child with the index reflecting the position relative to "valid components".
 */


function forEach(children, func) {
  var index = 0;
  React__default.Children.forEach(children, function (child) {
    if (React__default.isValidElement(child)) func(child, index++);
  });
}

var countChildren = function countChildren(c) {
  return React__default.Children.toArray(c).filter(React__default.isValidElement).length;
};

var SWIPE_THRESHOLD = 40; // TODO: `slide` should be `animate`.

var defaultProps$c = {
  slide: true,
  fade: false,
  interval: 5000,
  keyboard: true,
  pauseOnHover: true,
  wrap: true,
  indicators: true,
  controls: true,
  activeIndex: 0,
  prevIcon: React__default.createElement("span", {
    "aria-hidden": "true",
    className: "carousel-control-prev-icon"
  }),
  prevLabel: 'Previous',
  nextIcon: React__default.createElement("span", {
    "aria-hidden": "true",
    className: "carousel-control-next-icon"
  }),
  nextLabel: 'Next',
  touch: true
};

var Carousel =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Carousel, _React$Component);

  function Carousel() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.state = {
      prevClasses: '',
      currentClasses: 'active',
      touchStartX: 0
    };
    _this.isUnmounted = false;
    _this.carousel = React__default.createRef();

    _this.handleTouchStart = function (e) {
      _this.setState({
        touchStartX: e.changedTouches[0].screenX
      });
    };

    _this.handleTouchEnd = function (e) {
      // If the swipe is under the threshold, don't do anything.
      if (Math.abs(e.changedTouches[0].screenX - _this.state.touchStartX) < SWIPE_THRESHOLD) return;

      if (e.changedTouches[0].screenX < _this.state.touchStartX) {
        // Swiping left to navigate to next item.
        _this.handleNext(e);
      } else {
        // Swiping right to navigate to previous item.
        _this.handlePrev(e);
      }
    };

    _this.handleSlideEnd = function () {
      var pendingIndex = _this._pendingIndex;
      _this._isSliding = false;
      _this._pendingIndex = null;
      if (pendingIndex != null) _this.to(pendingIndex);else _this.cycle();
    };

    _this.handleMouseOut = function () {
      _this.cycle();
    };

    _this.handleMouseOver = function () {
      if (_this.props.pauseOnHover) _this.pause();
    };

    _this.handleKeyDown = function (event) {
      if (/input|textarea/i.test(event.target.tagName)) return;

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();

          _this.handlePrev(event);

          break;

        case 'ArrowRight':
          event.preventDefault();

          _this.handleNext(event);

          break;

        default:
          break;
      }
    };

    _this.handleNextWhenVisible = function () {
      if (!_this.isUnmounted && !document.hidden && style(_this.carousel.current, 'visibility') !== 'hidden') {
        _this.handleNext();
      }
    };

    _this.handleNext = function (e) {
      if (_this._isSliding) return;
      var _this$props = _this.props,
          wrap = _this$props.wrap,
          activeIndex = _this$props.activeIndex;
      var index = activeIndex + 1;
      var count = countChildren(_this.props.children);

      if (index > count - 1) {
        if (!wrap) return;
        index = 0;
      }

      _this.select(index, e, 'next');
    };

    _this.handlePrev = function (e) {
      if (_this._isSliding) return;
      var _this$props2 = _this.props,
          wrap = _this$props2.wrap,
          activeIndex = _this$props2.activeIndex;
      var index = activeIndex - 1;

      if (index < 0) {
        if (!wrap) return;
        index = countChildren(_this.props.children) - 1;
      }

      _this.select(index, e, 'prev');
    };

    return _this;
  }

  var _proto = Carousel.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.cycle();
  };

  Carousel.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, _ref) {
    var previousActiveIndex = _ref.activeIndex;

    if (nextProps.activeIndex !== previousActiveIndex) {
      var lastPossibleIndex = countChildren(nextProps.children) - 1;
      var nextIndex = Math.max(0, Math.min(nextProps.activeIndex, lastPossibleIndex));
      var direction;

      if (nextIndex === 0 && previousActiveIndex >= lastPossibleIndex || previousActiveIndex <= nextIndex) {
        direction = 'next';
      } else {
        direction = 'prev';
      }

      return {
        direction: direction,
        previousActiveIndex: previousActiveIndex,
        activeIndex: nextIndex
      };
    }

    return null;
  };

  _proto.componentDidUpdate = function componentDidUpdate(_, prevState) {
    var _this2 = this;

    var _this$props3 = this.props,
        bsPrefix = _this$props3.bsPrefix,
        slide = _this$props3.slide,
        onSlideEnd = _this$props3.onSlideEnd;
    if (!slide || this.state.activeIndex === prevState.activeIndex || this._isSliding) return;
    var _this$state = this.state,
        activeIndex = _this$state.activeIndex,
        direction = _this$state.direction;
    var orderClassName, directionalClassName;

    if (direction === 'next') {
      orderClassName = bsPrefix + "-item-next";
      directionalClassName = bsPrefix + "-item-left";
    } else if (direction === 'prev') {
      orderClassName = bsPrefix + "-item-prev";
      directionalClassName = bsPrefix + "-item-right";
    }

    this._isSliding = true;
    this.pause(); // eslint-disable-next-line react/no-did-update-set-state

    this.safeSetState({
      prevClasses: 'active',
      currentClasses: orderClassName
    }, function () {
      var items = _this2.carousel.current.children;
      var nextElement = items[activeIndex];
      triggerBrowserReflow(nextElement);

      _this2.safeSetState({
        prevClasses: classnames('active', directionalClassName),
        currentClasses: classnames(orderClassName, directionalClassName)
      }, function () {
        return transitionEnd(nextElement, function () {
          _this2.safeSetState({
            prevClasses: '',
            currentClasses: 'active'
          }, _this2.handleSlideEnd);

          if (onSlideEnd) {
            onSlideEnd();
          }
        });
      });
    });
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    clearTimeout(this.timeout);
    this.isUnmounted = true;
  };

  _proto.safeSetState = function safeSetState(state, cb) {
    var _this3 = this;

    if (this.isUnmounted) return;
    this.setState(state, function () {
      return !_this3.isUnmounted && cb();
    });
  } // This might be a public API.
  ;

  _proto.pause = function pause() {
    this._isPaused = true;
    clearInterval(this._interval);
    this._interval = null;
  };

  _proto.cycle = function cycle() {
    this._isPaused = false;
    clearInterval(this._interval);
    this._interval = null;

    if (this.props.interval && !this._isPaused) {
      this._interval = setInterval(document.visibilityState ? this.handleNextWhenVisible : this.handleNext, this.props.interval);
    }
  };

  _proto.to = function to(index, event) {
    var children = this.props.children;

    if (index < 0 || index > countChildren(children) - 1) {
      return;
    }

    if (this._isSliding) {
      this._pendingIndex = index;
      return;
    }

    this.select(index, event);
  };

  _proto.select = function select(index, event, direction) {
    var _this4 = this;

    clearTimeout(this.selectThrottle);
    if (event && event.persist) event.persist(); // The timeout throttles fast clicks, in order to give any pending state
    // a chance to update and propagate back through props

    this.selectThrottle = setTimeout(function () {
      clearTimeout(_this4.timeout);
      var _this4$props = _this4.props,
          activeIndex = _this4$props.activeIndex,
          onSelect = _this4$props.onSelect;
      if (index === activeIndex || _this4._isSliding || _this4.isUnmounted) return;
      onSelect(index, direction || (index < activeIndex ? 'prev' : 'next'), event);
    }, 50);
  };

  _proto.renderControls = function renderControls(properties) {
    var bsPrefix = this.props.bsPrefix;
    var wrap = properties.wrap,
        children = properties.children,
        activeIndex = properties.activeIndex,
        prevIcon = properties.prevIcon,
        nextIcon = properties.nextIcon,
        prevLabel = properties.prevLabel,
        nextLabel = properties.nextLabel;
    var count = countChildren(children);
    return [(wrap || activeIndex !== 0) && React__default.createElement(SafeAnchor, {
      key: "prev",
      className: bsPrefix + "-control-prev",
      onClick: this.handlePrev
    }, prevIcon, prevLabel && React__default.createElement("span", {
      className: "sr-only"
    }, prevLabel)), (wrap || activeIndex !== count - 1) && React__default.createElement(SafeAnchor, {
      key: "next",
      className: bsPrefix + "-control-next",
      onClick: this.handleNext
    }, nextIcon, nextLabel && React__default.createElement("span", {
      className: "sr-only"
    }, nextLabel))];
  };

  _proto.renderIndicators = function renderIndicators(children, activeIndex) {
    var _this5 = this;

    var bsPrefix = this.props.bsPrefix;
    var indicators = [];
    forEach(children, function (child, index) {
      indicators.push(React__default.createElement("li", {
        key: index,
        className: index === activeIndex ? 'active' : null,
        onClick: function onClick(e) {
          return _this5.to(index, e);
        }
      }), // Force whitespace between indicator elements. Bootstrap requires
      // this for correct spacing of elements.
      ' ');
    });
    return React__default.createElement("ol", {
      className: bsPrefix + "-indicators"
    }, indicators);
  };

  _proto.render = function render() {
    var _this$props4 = this.props,
        _this$props4$as = _this$props4.as,
        Component = _this$props4$as === void 0 ? 'div' : _this$props4$as,
        bsPrefix = _this$props4.bsPrefix,
        slide = _this$props4.slide,
        fade = _this$props4.fade,
        indicators = _this$props4.indicators,
        controls = _this$props4.controls,
        wrap = _this$props4.wrap,
        touch = _this$props4.touch,
        prevIcon = _this$props4.prevIcon,
        prevLabel = _this$props4.prevLabel,
        nextIcon = _this$props4.nextIcon,
        nextLabel = _this$props4.nextLabel,
        className = _this$props4.className,
        children = _this$props4.children,
        keyboard = _this$props4.keyboard,
        _5 = _this$props4.activeIndex,
        _4 = _this$props4.pauseOnHover,
        _3 = _this$props4.interval,
        _2 = _this$props4.onSelect,
        _1 = _this$props4.onSlideEnd,
        props = _objectWithoutPropertiesLoose(_this$props4, ["as", "bsPrefix", "slide", "fade", "indicators", "controls", "wrap", "touch", "prevIcon", "prevLabel", "nextIcon", "nextLabel", "className", "children", "keyboard", "activeIndex", "pauseOnHover", "interval", "onSelect", "onSlideEnd"]);

    var _this$state2 = this.state,
        activeIndex = _this$state2.activeIndex,
        previousActiveIndex = _this$state2.previousActiveIndex,
        prevClasses = _this$state2.prevClasses,
        currentClasses = _this$state2.currentClasses;
    return (// eslint-disable-next-line jsx-a11y/no-static-element-interactions
      React__default.createElement(Component, _extends({
        onTouchStart: touch ? this.handleTouchStart : undefined,
        onTouchEnd: touch ? this.handleTouchEnd : undefined
      }, props, {
        className: classnames(className, bsPrefix, slide && 'slide', fade && bsPrefix + "-fade"),
        onKeyDown: keyboard ? this.handleKeyDown : undefined,
        onMouseOver: this.handleMouseOver,
        onMouseOut: this.handleMouseOut
      }), indicators && this.renderIndicators(children, activeIndex), React__default.createElement("div", {
        className: bsPrefix + "-inner",
        ref: this.carousel
      }, map(children, function (child, index) {
        var current = index === activeIndex;
        var previous = index === previousActiveIndex;
        return React.cloneElement(child, {
          className: classnames(child.props.className, current && currentClasses, previous && prevClasses)
        });
      })), controls && this.renderControls({
        wrap: wrap,
        children: children,
        activeIndex: activeIndex,
        prevIcon: prevIcon,
        prevLabel: prevLabel,
        nextIcon: nextIcon,
        nextLabel: nextLabel
      }))
    );
  };

  return Carousel;
}(React__default.Component);

Carousel.defaultProps = defaultProps$c;
var DecoratedCarousel = createBootstrapComponent(uncontrollable(Carousel, {
  activeIndex: 'onSelect'
}), 'carousel');
DecoratedCarousel.Caption = CarouselCaption;
DecoratedCarousel.Item = CarouselItem;

var DEVICE_SIZES = ['xl', 'lg', 'md', 'sm', 'xs'];
var Col = React__default.forwardRef( // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'div' : _ref$as,
      props = _objectWithoutPropertiesLoose(_ref, ["bsPrefix", "className", "as"]);

  var prefix = useBootstrapPrefix(bsPrefix, 'col');
  var spans = [];
  var classes = [];
  DEVICE_SIZES.forEach(function (brkPoint) {
    var propValue = props[brkPoint];
    delete props[brkPoint];
    var span, offset, order;

    if (propValue != null && typeof propValue === 'object') {
      var _propValue$span = propValue.span;
      span = _propValue$span === void 0 ? true : _propValue$span;
      offset = propValue.offset;
      order = propValue.order;
    } else {
      span = propValue;
    }

    var infix = brkPoint !== 'xs' ? "-" + brkPoint : '';
    if (span != null) spans.push(span === true ? "" + prefix + infix : "" + prefix + infix + "-" + span);
    if (order != null) classes.push("order" + infix + "-" + order);
    if (offset != null) classes.push("offset" + infix + "-" + offset);
  });

  if (!spans.length) {
    spans.push(prefix); // plain 'col'
  }

  return React__default.createElement(Component, _extends({}, props, {
    ref: ref,
    className: classnames.apply(void 0, [className].concat(spans, classes))
  }));
});
Col.displayName = 'Col';

var matchesImpl;
function matches(node, selector) {
  if (!matchesImpl) {
    var body = document.body;
    var nativeMatch = body.matches || body.matchesSelector || body.webkitMatchesSelector || body.mozMatchesSelector || body.msMatchesSelector;

    matchesImpl = function matchesImpl(n, s) {
      return nativeMatch.call(n, s);
    };
  }

  return matchesImpl(node, selector);
}

var toArray = Function.prototype.bind.call(Function.prototype.call, [].slice);
function qsa(element, selector) {
  return toArray(element.querySelectorAll(selector));
}

/**
 * Store the last of some value. Tracked via a `Ref` only updating it
 * after the component renders.
 *
 * Helpful if you need to compare a prop value to it's previous value during render.
 *
 * ```ts
 * function Component(props) {
 *   const lastProps = usePrevious(props)
 *
 *   if (lastProps.foo !== props.foo)
 *     resetValueFromProps(props.foo)
 * }
 * ```
 *
 * @param value the value to track
 */

function usePrevious(value) {
  var ref = React.useRef(null);
  React.useEffect(function () {
    ref.current = value;
  });
  return ref.current;
}

/**
 * A convenience hook around `useState` designed to be paired with
 * the component [callback ref](https://reactjs.org/docs/refs-and-the-dom.html#callback-refs) api.
 * Callback refs are useful over `useRef()` when you need to respond to the ref being set
 * instead of lazily accessing it in an effect.
 *
 * ```ts
 * const [element, attachRef] = useCallbackRef<HTMLDivElement>()
 *
 * useEffect(() => {
 *   if (!element) return
 *
 *   const calendar = new FullCalendar.Calendar(element)
 *
 *   return () => {
 *     calendar.destroy()
 *   }
 * }, [element])
 *
 * return <div ref={attachRef} />
 * ```
 */

function useCallbackRef() {
  return React.useState(null);
}

/**
 * Returns a function that triggers a component update. the hook equivalent to
 * `this.forceUpdate()` in a class component. In most cases using a state value directly
 * is preferable but may be required in some advanced usages of refs for interop or
 * when direct DOM manipulation is required.
 *
 * ```ts
 * const forceUpdate = useForceUpdate();
 *
 * const updateOnClick = useCallback(() => {
 *  forceUpdate()
 * }, [forceUpdate])
 *
 * return <button type="button" onClick={updateOnClick}>Hi there</button>
 * ```
 */

function useForceUpdate() {
  // The toggling state value is designed to defeat React optimizations for skipping
  // updates when they are stricting equal to the last state value
  var _useReducer = React.useReducer(function (state) {
    return !state;
  }, false),
      dispatch = _useReducer[1];

  return dispatch;
}

var DropdownContext = React__default.createContext({
  menuRef: function menuRef() {},
  toggleRef: function toggleRef() {},
  onToggle: function onToggle() {},
  toggleNode: undefined,
  alignEnd: null,
  show: null,
  drop: null
});

/**!
 * @fileOverview Kickass library to create and place poppers near their reference elements.
 * @version 1.16.0
 * @license
 * Copyright (c) 2016 Federico Zivolo and contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && typeof navigator !== 'undefined';

var timeoutDuration = function () {
  var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
  for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
    if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
      return 1;
    }
  }
  return 0;
}();

function microtaskDebounce(fn) {
  var called = false;
  return function () {
    if (called) {
      return;
    }
    called = true;
    window.Promise.resolve().then(function () {
      called = false;
      fn();
    });
  };
}

function taskDebounce(fn) {
  var scheduled = false;
  return function () {
    if (!scheduled) {
      scheduled = true;
      setTimeout(function () {
        scheduled = false;
        fn();
      }, timeoutDuration);
    }
  };
}

var supportsMicroTasks = isBrowser && window.Promise;

/**
* Create a debounced version of a method, that's asynchronously deferred
* but called in the minimum time possible.
*
* @method
* @memberof Popper.Utils
* @argument {Function} fn
* @returns {Function}
*/
var debounce = supportsMicroTasks ? microtaskDebounce : taskDebounce;

/**
 * Check if the given variable is a function
 * @method
 * @memberof Popper.Utils
 * @argument {Any} functionToCheck - variable to check
 * @returns {Boolean} answer to: is a function?
 */
function isFunction(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

/**
 * Get CSS computed property of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Eement} element
 * @argument {String} property
 */
function getStyleComputedProperty(element, property) {
  if (element.nodeType !== 1) {
    return [];
  }
  // NOTE: 1 DOM access here
  var window = element.ownerDocument.defaultView;
  var css = window.getComputedStyle(element, null);
  return property ? css[property] : css;
}

/**
 * Returns the parentNode or the host of the element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} parent
 */
function getParentNode(element) {
  if (element.nodeName === 'HTML') {
    return element;
  }
  return element.parentNode || element.host;
}

/**
 * Returns the scrolling parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} scroll parent
 */
function getScrollParent(element) {
  // Return body, `getScroll` will take care to get the correct `scrollTop` from it
  if (!element) {
    return document.body;
  }

  switch (element.nodeName) {
    case 'HTML':
    case 'BODY':
      return element.ownerDocument.body;
    case '#document':
      return element.body;
  }

  // Firefox want us to check `-x` and `-y` variations as well

  var _getStyleComputedProp = getStyleComputedProperty(element),
      overflow = _getStyleComputedProp.overflow,
      overflowX = _getStyleComputedProp.overflowX,
      overflowY = _getStyleComputedProp.overflowY;

  if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
    return element;
  }

  return getScrollParent(getParentNode(element));
}

/**
 * Returns the reference node of the reference object, or the reference object itself.
 * @method
 * @memberof Popper.Utils
 * @param {Element|Object} reference - the reference element (the popper will be relative to this)
 * @returns {Element} parent
 */
function getReferenceNode(reference) {
  return reference && reference.referenceNode ? reference.referenceNode : reference;
}

var isIE11 = isBrowser && !!(window.MSInputMethodContext && document.documentMode);
var isIE10 = isBrowser && /MSIE 10/.test(navigator.userAgent);

/**
 * Determines if the browser is Internet Explorer
 * @method
 * @memberof Popper.Utils
 * @param {Number} version to check
 * @returns {Boolean} isIE
 */
function isIE(version) {
  if (version === 11) {
    return isIE11;
  }
  if (version === 10) {
    return isIE10;
  }
  return isIE11 || isIE10;
}

/**
 * Returns the offset parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} offset parent
 */
function getOffsetParent(element) {
  if (!element) {
    return document.documentElement;
  }

  var noOffsetParent = isIE(10) ? document.body : null;

  // NOTE: 1 DOM access here
  var offsetParent = element.offsetParent || null;
  // Skip hidden elements which don't have an offsetParent
  while (offsetParent === noOffsetParent && element.nextElementSibling) {
    offsetParent = (element = element.nextElementSibling).offsetParent;
  }

  var nodeName = offsetParent && offsetParent.nodeName;

  if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
    return element ? element.ownerDocument.documentElement : document.documentElement;
  }

  // .offsetParent will return the closest TH, TD or TABLE in case
  // no offsetParent is present, I hate this job...
  if (['TH', 'TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, 'position') === 'static') {
    return getOffsetParent(offsetParent);
  }

  return offsetParent;
}

function isOffsetContainer(element) {
  var nodeName = element.nodeName;

  if (nodeName === 'BODY') {
    return false;
  }
  return nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element;
}

/**
 * Finds the root node (document, shadowDOM root) of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} node
 * @returns {Element} root node
 */
function getRoot(node) {
  if (node.parentNode !== null) {
    return getRoot(node.parentNode);
  }

  return node;
}

/**
 * Finds the offset parent common to the two provided nodes
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element1
 * @argument {Element} element2
 * @returns {Element} common offset parent
 */
function findCommonOffsetParent(element1, element2) {
  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
  if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
    return document.documentElement;
  }

  // Here we make sure to give as "start" the element that comes first in the DOM
  var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
  var start = order ? element1 : element2;
  var end = order ? element2 : element1;

  // Get common ancestor container
  var range = document.createRange();
  range.setStart(start, 0);
  range.setEnd(end, 0);
  var commonAncestorContainer = range.commonAncestorContainer;

  // Both nodes are inside #document

  if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
    if (isOffsetContainer(commonAncestorContainer)) {
      return commonAncestorContainer;
    }

    return getOffsetParent(commonAncestorContainer);
  }

  // one of the nodes is inside shadowDOM, find which one
  var element1root = getRoot(element1);
  if (element1root.host) {
    return findCommonOffsetParent(element1root.host, element2);
  } else {
    return findCommonOffsetParent(element1, getRoot(element2).host);
  }
}

/**
 * Gets the scroll value of the given element in the given side (top and left)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {String} side `top` or `left`
 * @returns {number} amount of scrolled pixels
 */
function getScroll(element) {
  var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';

  var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
  var nodeName = element.nodeName;

  if (nodeName === 'BODY' || nodeName === 'HTML') {
    var html = element.ownerDocument.documentElement;
    var scrollingElement = element.ownerDocument.scrollingElement || html;
    return scrollingElement[upperSide];
  }

  return element[upperSide];
}

/*
 * Sum or subtract the element scroll values (left and top) from a given rect object
 * @method
 * @memberof Popper.Utils
 * @param {Object} rect - Rect object you want to change
 * @param {HTMLElement} element - The element from the function reads the scroll values
 * @param {Boolean} subtract - set to true if you want to subtract the scroll values
 * @return {Object} rect - The modifier rect object
 */
function includeScroll(rect, element) {
  var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var scrollTop = getScroll(element, 'top');
  var scrollLeft = getScroll(element, 'left');
  var modifier = subtract ? -1 : 1;
  rect.top += scrollTop * modifier;
  rect.bottom += scrollTop * modifier;
  rect.left += scrollLeft * modifier;
  rect.right += scrollLeft * modifier;
  return rect;
}

/*
 * Helper to detect borders of a given element
 * @method
 * @memberof Popper.Utils
 * @param {CSSStyleDeclaration} styles
 * Result of `getStyleComputedProperty` on the given element
 * @param {String} axis - `x` or `y`
 * @return {number} borders - The borders size of the given axis
 */

function getBordersSize(styles, axis) {
  var sideA = axis === 'x' ? 'Left' : 'Top';
  var sideB = sideA === 'Left' ? 'Right' : 'Bottom';

  return parseFloat(styles['border' + sideA + 'Width'], 10) + parseFloat(styles['border' + sideB + 'Width'], 10);
}

function getSize(axis, body, html, computedStyle) {
  return Math.max(body['offset' + axis], body['scroll' + axis], html['client' + axis], html['offset' + axis], html['scroll' + axis], isIE(10) ? parseInt(html['offset' + axis]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')]) : 0);
}

function getWindowSizes(document) {
  var body = document.body;
  var html = document.documentElement;
  var computedStyle = isIE(10) && getComputedStyle(html);

  return {
    height: getSize('Height', body, html, computedStyle),
    width: getSize('Width', body, html, computedStyle)
  };
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
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
};

var _extends$1 = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/**
 * Given element offsets, generate an output similar to getBoundingClientRect
 * @method
 * @memberof Popper.Utils
 * @argument {Object} offsets
 * @returns {Object} ClientRect like output
 */
function getClientRect(offsets) {
  return _extends$1({}, offsets, {
    right: offsets.left + offsets.width,
    bottom: offsets.top + offsets.height
  });
}

/**
 * Get bounding client rect of given element
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} element
 * @return {Object} client rect
 */
function getBoundingClientRect(element) {
  var rect = {};

  // IE10 10 FIX: Please, don't ask, the element isn't
  // considered in DOM in some circumstances...
  // This isn't reproducible in IE10 compatibility mode of IE11
  try {
    if (isIE(10)) {
      rect = element.getBoundingClientRect();
      var scrollTop = getScroll(element, 'top');
      var scrollLeft = getScroll(element, 'left');
      rect.top += scrollTop;
      rect.left += scrollLeft;
      rect.bottom += scrollTop;
      rect.right += scrollLeft;
    } else {
      rect = element.getBoundingClientRect();
    }
  } catch (e) {}

  var result = {
    left: rect.left,
    top: rect.top,
    width: rect.right - rect.left,
    height: rect.bottom - rect.top
  };

  // subtract scrollbar size from sizes
  var sizes = element.nodeName === 'HTML' ? getWindowSizes(element.ownerDocument) : {};
  var width = sizes.width || element.clientWidth || result.width;
  var height = sizes.height || element.clientHeight || result.height;

  var horizScrollbar = element.offsetWidth - width;
  var vertScrollbar = element.offsetHeight - height;

  // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
  // we make this check conditional for performance reasons
  if (horizScrollbar || vertScrollbar) {
    var styles = getStyleComputedProperty(element);
    horizScrollbar -= getBordersSize(styles, 'x');
    vertScrollbar -= getBordersSize(styles, 'y');

    result.width -= horizScrollbar;
    result.height -= vertScrollbar;
  }

  return getClientRect(result);
}

function getOffsetRectRelativeToArbitraryNode(children, parent) {
  var fixedPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var isIE10 = isIE(10);
  var isHTML = parent.nodeName === 'HTML';
  var childrenRect = getBoundingClientRect(children);
  var parentRect = getBoundingClientRect(parent);
  var scrollParent = getScrollParent(children);

  var styles = getStyleComputedProperty(parent);
  var borderTopWidth = parseFloat(styles.borderTopWidth, 10);
  var borderLeftWidth = parseFloat(styles.borderLeftWidth, 10);

  // In cases where the parent is fixed, we must ignore negative scroll in offset calc
  if (fixedPosition && isHTML) {
    parentRect.top = Math.max(parentRect.top, 0);
    parentRect.left = Math.max(parentRect.left, 0);
  }
  var offsets = getClientRect({
    top: childrenRect.top - parentRect.top - borderTopWidth,
    left: childrenRect.left - parentRect.left - borderLeftWidth,
    width: childrenRect.width,
    height: childrenRect.height
  });
  offsets.marginTop = 0;
  offsets.marginLeft = 0;

  // Subtract margins of documentElement in case it's being used as parent
  // we do this only on HTML because it's the only element that behaves
  // differently when margins are applied to it. The margins are included in
  // the box of the documentElement, in the other cases not.
  if (!isIE10 && isHTML) {
    var marginTop = parseFloat(styles.marginTop, 10);
    var marginLeft = parseFloat(styles.marginLeft, 10);

    offsets.top -= borderTopWidth - marginTop;
    offsets.bottom -= borderTopWidth - marginTop;
    offsets.left -= borderLeftWidth - marginLeft;
    offsets.right -= borderLeftWidth - marginLeft;

    // Attach marginTop and marginLeft because in some circumstances we may need them
    offsets.marginTop = marginTop;
    offsets.marginLeft = marginLeft;
  }

  if (isIE10 && !fixedPosition ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {
    offsets = includeScroll(offsets, parent);
  }

  return offsets;
}

function getViewportOffsetRectRelativeToArtbitraryNode(element) {
  var excludeScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var html = element.ownerDocument.documentElement;
  var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
  var width = Math.max(html.clientWidth, window.innerWidth || 0);
  var height = Math.max(html.clientHeight, window.innerHeight || 0);

  var scrollTop = !excludeScroll ? getScroll(html) : 0;
  var scrollLeft = !excludeScroll ? getScroll(html, 'left') : 0;

  var offset = {
    top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
    left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
    width: width,
    height: height
  };

  return getClientRect(offset);
}

/**
 * Check if the given element is fixed or is inside a fixed parent
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {Element} customContainer
 * @returns {Boolean} answer to "isFixed?"
 */
function isFixed(element) {
  var nodeName = element.nodeName;
  if (nodeName === 'BODY' || nodeName === 'HTML') {
    return false;
  }
  if (getStyleComputedProperty(element, 'position') === 'fixed') {
    return true;
  }
  var parentNode = getParentNode(element);
  if (!parentNode) {
    return false;
  }
  return isFixed(parentNode);
}

/**
 * Finds the first parent of an element that has a transformed property defined
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} first transformed parent or documentElement
 */

function getFixedPositionOffsetParent(element) {
  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
  if (!element || !element.parentElement || isIE()) {
    return document.documentElement;
  }
  var el = element.parentElement;
  while (el && getStyleComputedProperty(el, 'transform') === 'none') {
    el = el.parentElement;
  }
  return el || document.documentElement;
}

/**
 * Computed the boundaries limits and return them
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} popper
 * @param {HTMLElement} reference
 * @param {number} padding
 * @param {HTMLElement} boundariesElement - Element used to define the boundaries
 * @param {Boolean} fixedPosition - Is in fixed position mode
 * @returns {Object} Coordinates of the boundaries
 */
function getBoundaries(popper, reference, padding, boundariesElement) {
  var fixedPosition = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

  // NOTE: 1 DOM access here

  var boundaries = { top: 0, left: 0 };
  var offsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, getReferenceNode(reference));

  // Handle viewport case
  if (boundariesElement === 'viewport') {
    boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);
  } else {
    // Handle other cases based on DOM element used as boundaries
    var boundariesNode = void 0;
    if (boundariesElement === 'scrollParent') {
      boundariesNode = getScrollParent(getParentNode(reference));
      if (boundariesNode.nodeName === 'BODY') {
        boundariesNode = popper.ownerDocument.documentElement;
      }
    } else if (boundariesElement === 'window') {
      boundariesNode = popper.ownerDocument.documentElement;
    } else {
      boundariesNode = boundariesElement;
    }

    var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent, fixedPosition);

    // In case of HTML, we need a different computation
    if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
      var _getWindowSizes = getWindowSizes(popper.ownerDocument),
          height = _getWindowSizes.height,
          width = _getWindowSizes.width;

      boundaries.top += offsets.top - offsets.marginTop;
      boundaries.bottom = height + offsets.top;
      boundaries.left += offsets.left - offsets.marginLeft;
      boundaries.right = width + offsets.left;
    } else {
      // for all the other DOM elements, this one is good
      boundaries = offsets;
    }
  }

  // Add paddings
  padding = padding || 0;
  var isPaddingNumber = typeof padding === 'number';
  boundaries.left += isPaddingNumber ? padding : padding.left || 0;
  boundaries.top += isPaddingNumber ? padding : padding.top || 0;
  boundaries.right -= isPaddingNumber ? padding : padding.right || 0;
  boundaries.bottom -= isPaddingNumber ? padding : padding.bottom || 0;

  return boundaries;
}

function getArea(_ref) {
  var width = _ref.width,
      height = _ref.height;

  return width * height;
}

/**
 * Utility used to transform the `auto` placement to the placement with more
 * available space.
 * @method
 * @memberof Popper.Utils
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
  var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

  if (placement.indexOf('auto') === -1) {
    return placement;
  }

  var boundaries = getBoundaries(popper, reference, padding, boundariesElement);

  var rects = {
    top: {
      width: boundaries.width,
      height: refRect.top - boundaries.top
    },
    right: {
      width: boundaries.right - refRect.right,
      height: boundaries.height
    },
    bottom: {
      width: boundaries.width,
      height: boundaries.bottom - refRect.bottom
    },
    left: {
      width: refRect.left - boundaries.left,
      height: boundaries.height
    }
  };

  var sortedAreas = Object.keys(rects).map(function (key) {
    return _extends$1({
      key: key
    }, rects[key], {
      area: getArea(rects[key])
    });
  }).sort(function (a, b) {
    return b.area - a.area;
  });

  var filteredAreas = sortedAreas.filter(function (_ref2) {
    var width = _ref2.width,
        height = _ref2.height;
    return width >= popper.clientWidth && height >= popper.clientHeight;
  });

  var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;

  var variation = placement.split('-')[1];

  return computedPlacement + (variation ? '-' + variation : '');
}

/**
 * Get offsets to the reference element
 * @method
 * @memberof Popper.Utils
 * @param {Object} state
 * @param {Element} popper - the popper element
 * @param {Element} reference - the reference element (the popper will be relative to this)
 * @param {Element} fixedPosition - is in fixed position mode
 * @returns {Object} An object containing the offsets which will be applied to the popper
 */
function getReferenceOffsets(state, popper, reference) {
  var fixedPosition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  var commonOffsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, getReferenceNode(reference));
  return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent, fixedPosition);
}

/**
 * Get the outer sizes of the given element (offset size + margins)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Object} object containing width and height properties
 */
function getOuterSizes(element) {
  var window = element.ownerDocument.defaultView;
  var styles = window.getComputedStyle(element);
  var x = parseFloat(styles.marginTop || 0) + parseFloat(styles.marginBottom || 0);
  var y = parseFloat(styles.marginLeft || 0) + parseFloat(styles.marginRight || 0);
  var result = {
    width: element.offsetWidth + y,
    height: element.offsetHeight + x
  };
  return result;
}

/**
 * Get the opposite placement of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement
 * @returns {String} flipped placement
 */
function getOppositePlacement(placement) {
  var hash = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched];
  });
}

/**
 * Get offsets to the popper
 * @method
 * @memberof Popper.Utils
 * @param {Object} position - CSS position the Popper will get applied
 * @param {HTMLElement} popper - the popper element
 * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
 * @param {String} placement - one of the valid placement options
 * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
 */
function getPopperOffsets(popper, referenceOffsets, placement) {
  placement = placement.split('-')[0];

  // Get popper node sizes
  var popperRect = getOuterSizes(popper);

  // Add position, width and height to our offsets object
  var popperOffsets = {
    width: popperRect.width,
    height: popperRect.height
  };

  // depending by the popper placement we have to compute its offsets slightly differently
  var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
  var mainSide = isHoriz ? 'top' : 'left';
  var secondarySide = isHoriz ? 'left' : 'top';
  var measurement = isHoriz ? 'height' : 'width';
  var secondaryMeasurement = !isHoriz ? 'height' : 'width';

  popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;
  if (placement === secondarySide) {
    popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
  } else {
    popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
  }

  return popperOffsets;
}

/**
 * Mimics the `find` method of Array
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */
function find(arr, check) {
  // use native find if supported
  if (Array.prototype.find) {
    return arr.find(check);
  }

  // use `filter` to obtain the same behavior of `find`
  return arr.filter(check)[0];
}

/**
 * Return the index of the matching object
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */
function findIndex(arr, prop, value) {
  // use native findIndex if supported
  if (Array.prototype.findIndex) {
    return arr.findIndex(function (cur) {
      return cur[prop] === value;
    });
  }

  // use `find` + `indexOf` if `findIndex` isn't supported
  var match = find(arr, function (obj) {
    return obj[prop] === value;
  });
  return arr.indexOf(match);
}

/**
 * Loop trough the list of modifiers and run them in order,
 * each of them will then edit the data object.
 * @method
 * @memberof Popper.Utils
 * @param {dataObject} data
 * @param {Array} modifiers
 * @param {String} ends - Optional modifier name used as stopper
 * @returns {dataObject}
 */
function runModifiers(modifiers, data, ends) {
  var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));

  modifiersToRun.forEach(function (modifier) {
    if (modifier['function']) {
      // eslint-disable-line dot-notation
      console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
    }
    var fn = modifier['function'] || modifier.fn; // eslint-disable-line dot-notation
    if (modifier.enabled && isFunction(fn)) {
      // Add properties to offsets to make them a complete clientRect object
      // we do this before each modifier to make sure the previous one doesn't
      // mess with these values
      data.offsets.popper = getClientRect(data.offsets.popper);
      data.offsets.reference = getClientRect(data.offsets.reference);

      data = fn(data, modifier);
    }
  });

  return data;
}

/**
 * Updates the position of the popper, computing the new offsets and applying
 * the new style.<br />
 * Prefer `scheduleUpdate` over `update` because of performance reasons.
 * @method
 * @memberof Popper
 */
function update() {
  // if popper is destroyed, don't perform any further update
  if (this.state.isDestroyed) {
    return;
  }

  var data = {
    instance: this,
    styles: {},
    arrowStyles: {},
    attributes: {},
    flipped: false,
    offsets: {}
  };

  // compute reference element offsets
  data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference, this.options.positionFixed);

  // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value
  data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);

  // store the computed placement inside `originalPlacement`
  data.originalPlacement = data.placement;

  data.positionFixed = this.options.positionFixed;

  // compute the popper offsets
  data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);

  data.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute';

  // run the modifiers
  data = runModifiers(this.modifiers, data);

  // the first `update` will call `onCreate` callback
  // the other ones will call `onUpdate` callback
  if (!this.state.isCreated) {
    this.state.isCreated = true;
    this.options.onCreate(data);
  } else {
    this.options.onUpdate(data);
  }
}

/**
 * Helper used to know if the given modifier is enabled.
 * @method
 * @memberof Popper.Utils
 * @returns {Boolean}
 */
function isModifierEnabled(modifiers, modifierName) {
  return modifiers.some(function (_ref) {
    var name = _ref.name,
        enabled = _ref.enabled;
    return enabled && name === modifierName;
  });
}

/**
 * Get the prefixed supported property name
 * @method
 * @memberof Popper.Utils
 * @argument {String} property (camelCase)
 * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
 */
function getSupportedPropertyName(property) {
  var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
  var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

  for (var i = 0; i < prefixes.length; i++) {
    var prefix = prefixes[i];
    var toCheck = prefix ? '' + prefix + upperProp : property;
    if (typeof document.body.style[toCheck] !== 'undefined') {
      return toCheck;
    }
  }
  return null;
}

/**
 * Destroys the popper.
 * @method
 * @memberof Popper
 */
function destroy() {
  this.state.isDestroyed = true;

  // touch DOM only if `applyStyle` modifier is enabled
  if (isModifierEnabled(this.modifiers, 'applyStyle')) {
    this.popper.removeAttribute('x-placement');
    this.popper.style.position = '';
    this.popper.style.top = '';
    this.popper.style.left = '';
    this.popper.style.right = '';
    this.popper.style.bottom = '';
    this.popper.style.willChange = '';
    this.popper.style[getSupportedPropertyName('transform')] = '';
  }

  this.disableEventListeners();

  // remove the popper if user explicitly asked for the deletion on destroy
  // do not use `remove` because IE11 doesn't support it
  if (this.options.removeOnDestroy) {
    this.popper.parentNode.removeChild(this.popper);
  }
  return this;
}

/**
 * Get the window associated with the element
 * @argument {Element} element
 * @returns {Window}
 */
function getWindow(element) {
  var ownerDocument = element.ownerDocument;
  return ownerDocument ? ownerDocument.defaultView : window;
}

function attachToScrollParents(scrollParent, event, callback, scrollParents) {
  var isBody = scrollParent.nodeName === 'BODY';
  var target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;
  target.addEventListener(event, callback, { passive: true });

  if (!isBody) {
    attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
  }
  scrollParents.push(target);
}

/**
 * Setup needed event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */
function setupEventListeners(reference, options, state, updateBound) {
  // Resize event listener on window
  state.updateBound = updateBound;
  getWindow(reference).addEventListener('resize', state.updateBound, { passive: true });

  // Scroll event listener on scroll parents
  var scrollElement = getScrollParent(reference);
  attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
  state.scrollElement = scrollElement;
  state.eventsEnabled = true;

  return state;
}

/**
 * It will add resize/scroll events and start recalculating
 * position of the popper element when they are triggered.
 * @method
 * @memberof Popper
 */
function enableEventListeners() {
  if (!this.state.eventsEnabled) {
    this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
  }
}

/**
 * Remove event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */
function removeEventListeners(reference, state) {
  // Remove resize event listener on window
  getWindow(reference).removeEventListener('resize', state.updateBound);

  // Remove scroll event listener on scroll parents
  state.scrollParents.forEach(function (target) {
    target.removeEventListener('scroll', state.updateBound);
  });

  // Reset state
  state.updateBound = null;
  state.scrollParents = [];
  state.scrollElement = null;
  state.eventsEnabled = false;
  return state;
}

/**
 * It will remove resize/scroll events and won't recalculate popper position
 * when they are triggered. It also won't trigger `onUpdate` callback anymore,
 * unless you call `update` method manually.
 * @method
 * @memberof Popper
 */
function disableEventListeners() {
  if (this.state.eventsEnabled) {
    cancelAnimationFrame(this.scheduleUpdate);
    this.state = removeEventListeners(this.reference, this.state);
  }
}

/**
 * Tells if a given input is a number
 * @method
 * @memberof Popper.Utils
 * @param {*} input to check
 * @return {Boolean}
 */
function isNumeric(n) {
  return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
}

/**
 * Set the style to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the style to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */
function setStyles(element, styles) {
  Object.keys(styles).forEach(function (prop) {
    var unit = '';
    // add unit if the value is numeric and is one of the following
    if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
      unit = 'px';
    }
    element.style[prop] = styles[prop] + unit;
  });
}

/**
 * Set the attributes to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the attributes to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */
function setAttributes(element, attributes) {
  Object.keys(attributes).forEach(function (prop) {
    var value = attributes[prop];
    if (value !== false) {
      element.setAttribute(prop, attributes[prop]);
    } else {
      element.removeAttribute(prop);
    }
  });
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} data.styles - List of style properties - values to apply to popper element
 * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The same data object
 */
function applyStyle(data) {
  // any property present in `data.styles` will be applied to the popper,
  // in this way we can make the 3rd party modifiers add custom styles to it
  // Be aware, modifiers could override the properties defined in the previous
  // lines of this modifier!
  setStyles(data.instance.popper, data.styles);

  // any property present in `data.attributes` will be applied to the popper,
  // they will be set as HTML attributes of the element
  setAttributes(data.instance.popper, data.attributes);

  // if arrowElement is defined and arrowStyles has some properties
  if (data.arrowElement && Object.keys(data.arrowStyles).length) {
    setStyles(data.arrowElement, data.arrowStyles);
  }

  return data;
}

/**
 * Set the x-placement attribute before everything else because it could be used
 * to add margins to the popper margins needs to be calculated to get the
 * correct popper offsets.
 * @method
 * @memberof Popper.modifiers
 * @param {HTMLElement} reference - The reference element used to position the popper
 * @param {HTMLElement} popper - The HTML element used as popper
 * @param {Object} options - Popper.js options
 */
function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
  // compute reference element offsets
  var referenceOffsets = getReferenceOffsets(state, popper, reference, options.positionFixed);

  // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value
  var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);

  popper.setAttribute('x-placement', placement);

  // Apply `position` to popper before anything else because
  // without the position applied we can't guarantee correct computations
  setStyles(popper, { position: options.positionFixed ? 'fixed' : 'absolute' });

  return options;
}

/**
 * @function
 * @memberof Popper.Utils
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Boolean} shouldRound - If the offsets should be rounded at all
 * @returns {Object} The popper's position offsets rounded
 *
 * The tale of pixel-perfect positioning. It's still not 100% perfect, but as
 * good as it can be within reason.
 * Discussion here: https://github.com/FezVrasta/popper.js/pull/715
 *
 * Low DPI screens cause a popper to be blurry if not using full pixels (Safari
 * as well on High DPI screens).
 *
 * Firefox prefers no rounding for positioning and does not have blurriness on
 * high DPI screens.
 *
 * Only horizontal placement and left/right values need to be considered.
 */
function getRoundedOffsets(data, shouldRound) {
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;
  var round = Math.round,
      floor = Math.floor;

  var noRound = function noRound(v) {
    return v;
  };

  var referenceWidth = round(reference.width);
  var popperWidth = round(popper.width);

  var isVertical = ['left', 'right'].indexOf(data.placement) !== -1;
  var isVariation = data.placement.indexOf('-') !== -1;
  var sameWidthParity = referenceWidth % 2 === popperWidth % 2;
  var bothOddWidth = referenceWidth % 2 === 1 && popperWidth % 2 === 1;

  var horizontalToInteger = !shouldRound ? noRound : isVertical || isVariation || sameWidthParity ? round : floor;
  var verticalToInteger = !shouldRound ? noRound : round;

  return {
    left: horizontalToInteger(bothOddWidth && !isVariation && shouldRound ? popper.left - 1 : popper.left),
    top: verticalToInteger(popper.top),
    bottom: verticalToInteger(popper.bottom),
    right: horizontalToInteger(popper.right)
  };
}

var isFirefox = isBrowser && /Firefox/i.test(navigator.userAgent);

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function computeStyle(data, options) {
  var x = options.x,
      y = options.y;
  var popper = data.offsets.popper;

  // Remove this legacy support in Popper.js v2

  var legacyGpuAccelerationOption = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'applyStyle';
  }).gpuAcceleration;
  if (legacyGpuAccelerationOption !== undefined) {
    console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
  }
  var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;

  var offsetParent = getOffsetParent(data.instance.popper);
  var offsetParentRect = getBoundingClientRect(offsetParent);

  // Styles
  var styles = {
    position: popper.position
  };

  var offsets = getRoundedOffsets(data, window.devicePixelRatio < 2 || !isFirefox);

  var sideA = x === 'bottom' ? 'top' : 'bottom';
  var sideB = y === 'right' ? 'left' : 'right';

  // if gpuAcceleration is set to `true` and transform is supported,
  //  we use `translate3d` to apply the position to the popper we
  // automatically use the supported prefixed version if needed
  var prefixedProperty = getSupportedPropertyName('transform');

  // now, let's make a step back and look at this code closely (wtf?)
  // If the content of the popper grows once it's been positioned, it
  // may happen that the popper gets misplaced because of the new content
  // overflowing its reference element
  // To avoid this problem, we provide two options (x and y), which allow
  // the consumer to define the offset origin.
  // If we position a popper on top of a reference element, we can set
  // `x` to `top` to make the popper grow towards its top instead of
  // its bottom.
  var left = void 0,
      top = void 0;
  if (sideA === 'bottom') {
    // when offsetParent is <html> the positioning is relative to the bottom of the screen (excluding the scrollbar)
    // and not the bottom of the html element
    if (offsetParent.nodeName === 'HTML') {
      top = -offsetParent.clientHeight + offsets.bottom;
    } else {
      top = -offsetParentRect.height + offsets.bottom;
    }
  } else {
    top = offsets.top;
  }
  if (sideB === 'right') {
    if (offsetParent.nodeName === 'HTML') {
      left = -offsetParent.clientWidth + offsets.right;
    } else {
      left = -offsetParentRect.width + offsets.right;
    }
  } else {
    left = offsets.left;
  }
  if (gpuAcceleration && prefixedProperty) {
    styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
    styles[sideA] = 0;
    styles[sideB] = 0;
    styles.willChange = 'transform';
  } else {
    // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
    var invertTop = sideA === 'bottom' ? -1 : 1;
    var invertLeft = sideB === 'right' ? -1 : 1;
    styles[sideA] = top * invertTop;
    styles[sideB] = left * invertLeft;
    styles.willChange = sideA + ', ' + sideB;
  }

  // Attributes
  var attributes = {
    'x-placement': data.placement
  };

  // Update `data` attributes, styles and arrowStyles
  data.attributes = _extends$1({}, attributes, data.attributes);
  data.styles = _extends$1({}, styles, data.styles);
  data.arrowStyles = _extends$1({}, data.offsets.arrow, data.arrowStyles);

  return data;
}

/**
 * Helper used to know if the given modifier depends from another one.<br />
 * It checks if the needed modifier is listed and enabled.
 * @method
 * @memberof Popper.Utils
 * @param {Array} modifiers - list of modifiers
 * @param {String} requestingName - name of requesting modifier
 * @param {String} requestedName - name of requested modifier
 * @returns {Boolean}
 */
function isModifierRequired(modifiers, requestingName, requestedName) {
  var requesting = find(modifiers, function (_ref) {
    var name = _ref.name;
    return name === requestingName;
  });

  var isRequired = !!requesting && modifiers.some(function (modifier) {
    return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
  });

  if (!isRequired) {
    var _requesting = '`' + requestingName + '`';
    var requested = '`' + requestedName + '`';
    console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');
  }
  return isRequired;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function arrow(data, options) {
  var _data$offsets$arrow;

  // arrow depends on keepTogether in order to work
  if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
    return data;
  }

  var arrowElement = options.element;

  // if arrowElement is a string, suppose it's a CSS selector
  if (typeof arrowElement === 'string') {
    arrowElement = data.instance.popper.querySelector(arrowElement);

    // if arrowElement is not found, don't run the modifier
    if (!arrowElement) {
      return data;
    }
  } else {
    // if the arrowElement isn't a query selector we must check that the
    // provided DOM node is child of its popper node
    if (!data.instance.popper.contains(arrowElement)) {
      console.warn('WARNING: `arrow.element` must be child of its popper element!');
      return data;
    }
  }

  var placement = data.placement.split('-')[0];
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var isVertical = ['left', 'right'].indexOf(placement) !== -1;

  var len = isVertical ? 'height' : 'width';
  var sideCapitalized = isVertical ? 'Top' : 'Left';
  var side = sideCapitalized.toLowerCase();
  var altSide = isVertical ? 'left' : 'top';
  var opSide = isVertical ? 'bottom' : 'right';
  var arrowElementSize = getOuterSizes(arrowElement)[len];

  //
  // extends keepTogether behavior making sure the popper and its
  // reference have enough pixels in conjunction
  //

  // top/left side
  if (reference[opSide] - arrowElementSize < popper[side]) {
    data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
  }
  // bottom/right side
  if (reference[side] + arrowElementSize > popper[opSide]) {
    data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
  }
  data.offsets.popper = getClientRect(data.offsets.popper);

  // compute center of the popper
  var center = reference[side] + reference[len] / 2 - arrowElementSize / 2;

  // Compute the sideValue using the updated popper offsets
  // take popper margin in account because we don't have this info available
  var css = getStyleComputedProperty(data.instance.popper);
  var popperMarginSide = parseFloat(css['margin' + sideCapitalized], 10);
  var popperBorderSide = parseFloat(css['border' + sideCapitalized + 'Width'], 10);
  var sideValue = center - data.offsets.popper[side] - popperMarginSide - popperBorderSide;

  // prevent arrowElement from being placed not contiguously to its popper
  sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);

  data.arrowElement = arrowElement;
  data.offsets.arrow = (_data$offsets$arrow = {}, defineProperty(_data$offsets$arrow, side, Math.round(sideValue)), defineProperty(_data$offsets$arrow, altSide, ''), _data$offsets$arrow);

  return data;
}

/**
 * Get the opposite placement variation of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement variation
 * @returns {String} flipped placement variation
 */
function getOppositeVariation(variation) {
  if (variation === 'end') {
    return 'start';
  } else if (variation === 'start') {
    return 'end';
  }
  return variation;
}

/**
 * List of accepted placements to use as values of the `placement` option.<br />
 * Valid placements are:
 * - `auto`
 * - `top`
 * - `right`
 * - `bottom`
 * - `left`
 *
 * Each placement can have a variation from this list:
 * - `-start`
 * - `-end`
 *
 * Variations are interpreted easily if you think of them as the left to right
 * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
 * is right.<br />
 * Vertically (`left` and `right`), `start` is top and `end` is bottom.
 *
 * Some valid examples are:
 * - `top-end` (on top of reference, right aligned)
 * - `right-start` (on right of reference, top aligned)
 * - `bottom` (on bottom, centered)
 * - `auto-end` (on the side with more space available, alignment depends by placement)
 *
 * @static
 * @type {Array}
 * @enum {String}
 * @readonly
 * @method placements
 * @memberof Popper
 */
var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];

// Get rid of `auto` `auto-start` and `auto-end`
var validPlacements = placements.slice(3);

/**
 * Given an initial placement, returns all the subsequent placements
 * clockwise (or counter-clockwise).
 *
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement - A valid placement (it accepts variations)
 * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
 * @returns {Array} placements including their variations
 */
function clockwise(placement) {
  var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var index = validPlacements.indexOf(placement);
  var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
  return counter ? arr.reverse() : arr;
}

var BEHAVIORS = {
  FLIP: 'flip',
  CLOCKWISE: 'clockwise',
  COUNTERCLOCKWISE: 'counterclockwise'
};

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function flip(data, options) {
  // if `inner` modifier is enabled, we can't use the `flip` modifier
  if (isModifierEnabled(data.instance.modifiers, 'inner')) {
    return data;
  }

  if (data.flipped && data.placement === data.originalPlacement) {
    // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
    return data;
  }

  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement, data.positionFixed);

  var placement = data.placement.split('-')[0];
  var placementOpposite = getOppositePlacement(placement);
  var variation = data.placement.split('-')[1] || '';

  var flipOrder = [];

  switch (options.behavior) {
    case BEHAVIORS.FLIP:
      flipOrder = [placement, placementOpposite];
      break;
    case BEHAVIORS.CLOCKWISE:
      flipOrder = clockwise(placement);
      break;
    case BEHAVIORS.COUNTERCLOCKWISE:
      flipOrder = clockwise(placement, true);
      break;
    default:
      flipOrder = options.behavior;
  }

  flipOrder.forEach(function (step, index) {
    if (placement !== step || flipOrder.length === index + 1) {
      return data;
    }

    placement = data.placement.split('-')[0];
    placementOpposite = getOppositePlacement(placement);

    var popperOffsets = data.offsets.popper;
    var refOffsets = data.offsets.reference;

    // using floor because the reference offsets may contain decimals we are not going to consider here
    var floor = Math.floor;
    var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);

    var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
    var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
    var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
    var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);

    var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom;

    // flip the variation if required
    var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;

    // flips variation if reference element overflows boundaries
    var flippedVariationByRef = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);

    // flips variation if popper content overflows boundaries
    var flippedVariationByContent = !!options.flipVariationsByContent && (isVertical && variation === 'start' && overflowsRight || isVertical && variation === 'end' && overflowsLeft || !isVertical && variation === 'start' && overflowsBottom || !isVertical && variation === 'end' && overflowsTop);

    var flippedVariation = flippedVariationByRef || flippedVariationByContent;

    if (overlapsRef || overflowsBoundaries || flippedVariation) {
      // this boolean to detect any flip loop
      data.flipped = true;

      if (overlapsRef || overflowsBoundaries) {
        placement = flipOrder[index + 1];
      }

      if (flippedVariation) {
        variation = getOppositeVariation(variation);
      }

      data.placement = placement + (variation ? '-' + variation : '');

      // this object contains `position`, we want to preserve it along with
      // any additional property we may add in the future
      data.offsets.popper = _extends$1({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));

      data = runModifiers(data.instance.modifiers, data, 'flip');
    }
  });
  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function keepTogether(data) {
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var placement = data.placement.split('-')[0];
  var floor = Math.floor;
  var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
  var side = isVertical ? 'right' : 'bottom';
  var opSide = isVertical ? 'left' : 'top';
  var measurement = isVertical ? 'width' : 'height';

  if (popper[side] < floor(reference[opSide])) {
    data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
  }
  if (popper[opSide] > floor(reference[side])) {
    data.offsets.popper[opSide] = floor(reference[side]);
  }

  return data;
}

/**
 * Converts a string containing value + unit into a px value number
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} str - Value + unit string
 * @argument {String} measurement - `height` or `width`
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @returns {Number|String}
 * Value in pixels, or original string if no values were extracted
 */
function toValue(str, measurement, popperOffsets, referenceOffsets) {
  // separate value from unit
  var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
  var value = +split[1];
  var unit = split[2];

  // If it's not a number it's an operator, I guess
  if (!value) {
    return str;
  }

  if (unit.indexOf('%') === 0) {
    var element = void 0;
    switch (unit) {
      case '%p':
        element = popperOffsets;
        break;
      case '%':
      case '%r':
      default:
        element = referenceOffsets;
    }

    var rect = getClientRect(element);
    return rect[measurement] / 100 * value;
  } else if (unit === 'vh' || unit === 'vw') {
    // if is a vh or vw, we calculate the size based on the viewport
    var size = void 0;
    if (unit === 'vh') {
      size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    } else {
      size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }
    return size / 100 * value;
  } else {
    // if is an explicit pixel unit, we get rid of the unit and keep the value
    // if is an implicit unit, it's px, and we return just the value
    return value;
  }
}

/**
 * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} offset
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @argument {String} basePlacement
 * @returns {Array} a two cells array with x and y offsets in numbers
 */
function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
  var offsets = [0, 0];

  // Use height if placement is left or right and index is 0 otherwise use width
  // in this way the first offset will use an axis and the second one
  // will use the other one
  var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1;

  // Split the offset string to obtain a list of values and operands
  // The regex addresses values with the plus or minus sign in front (+10, -20, etc)
  var fragments = offset.split(/(\+|\-)/).map(function (frag) {
    return frag.trim();
  });

  // Detect if the offset string contains a pair of values or a single one
  // they could be separated by comma or space
  var divider = fragments.indexOf(find(fragments, function (frag) {
    return frag.search(/,|\s/) !== -1;
  }));

  if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
    console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
  }

  // If divider is found, we divide the list of values and operands to divide
  // them by ofset X and Y.
  var splitRegex = /\s*,\s*|\s+/;
  var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments];

  // Convert the values with units to absolute pixels to allow our computations
  ops = ops.map(function (op, index) {
    // Most of the units rely on the orientation of the popper
    var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
    var mergeWithPrevious = false;
    return op
    // This aggregates any `+` or `-` sign that aren't considered operators
    // e.g.: 10 + +5 => [10, +, +5]
    .reduce(function (a, b) {
      if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
        a[a.length - 1] = b;
        mergeWithPrevious = true;
        return a;
      } else if (mergeWithPrevious) {
        a[a.length - 1] += b;
        mergeWithPrevious = false;
        return a;
      } else {
        return a.concat(b);
      }
    }, [])
    // Here we convert the string values into number values (in px)
    .map(function (str) {
      return toValue(str, measurement, popperOffsets, referenceOffsets);
    });
  });

  // Loop trough the offsets arrays and execute the operations
  ops.forEach(function (op, index) {
    op.forEach(function (frag, index2) {
      if (isNumeric(frag)) {
        offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
      }
    });
  });
  return offsets;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @argument {Number|String} options.offset=0
 * The offset value as described in the modifier description
 * @returns {Object} The data object, properly modified
 */
function offset(data, _ref) {
  var offset = _ref.offset;
  var placement = data.placement,
      _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var basePlacement = placement.split('-')[0];

  var offsets = void 0;
  if (isNumeric(+offset)) {
    offsets = [+offset, 0];
  } else {
    offsets = parseOffset(offset, popper, reference, basePlacement);
  }

  if (basePlacement === 'left') {
    popper.top += offsets[0];
    popper.left -= offsets[1];
  } else if (basePlacement === 'right') {
    popper.top += offsets[0];
    popper.left += offsets[1];
  } else if (basePlacement === 'top') {
    popper.left += offsets[0];
    popper.top -= offsets[1];
  } else if (basePlacement === 'bottom') {
    popper.left += offsets[0];
    popper.top += offsets[1];
  }

  data.popper = popper;
  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function preventOverflow(data, options) {
  var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);

  // If offsetParent is the reference element, we really want to
  // go one step up and use the next offsetParent as reference to
  // avoid to make this modifier completely useless and look like broken
  if (data.instance.reference === boundariesElement) {
    boundariesElement = getOffsetParent(boundariesElement);
  }

  // NOTE: DOM access here
  // resets the popper's position so that the document size can be calculated excluding
  // the size of the popper element itself
  var transformProp = getSupportedPropertyName('transform');
  var popperStyles = data.instance.popper.style; // assignment to help minification
  var top = popperStyles.top,
      left = popperStyles.left,
      transform = popperStyles[transformProp];

  popperStyles.top = '';
  popperStyles.left = '';
  popperStyles[transformProp] = '';

  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement, data.positionFixed);

  // NOTE: DOM access here
  // restores the original style properties after the offsets have been computed
  popperStyles.top = top;
  popperStyles.left = left;
  popperStyles[transformProp] = transform;

  options.boundaries = boundaries;

  var order = options.priority;
  var popper = data.offsets.popper;

  var check = {
    primary: function primary(placement) {
      var value = popper[placement];
      if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
        value = Math.max(popper[placement], boundaries[placement]);
      }
      return defineProperty({}, placement, value);
    },
    secondary: function secondary(placement) {
      var mainSide = placement === 'right' ? 'left' : 'top';
      var value = popper[mainSide];
      if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
        value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
      }
      return defineProperty({}, mainSide, value);
    }
  };

  order.forEach(function (placement) {
    var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
    popper = _extends$1({}, popper, check[side](placement));
  });

  data.offsets.popper = popper;

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function shift(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var shiftvariation = placement.split('-')[1];

  // if shift shiftvariation is specified, run the modifier
  if (shiftvariation) {
    var _data$offsets = data.offsets,
        reference = _data$offsets.reference,
        popper = _data$offsets.popper;

    var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
    var side = isVertical ? 'left' : 'top';
    var measurement = isVertical ? 'width' : 'height';

    var shiftOffsets = {
      start: defineProperty({}, side, reference[side]),
      end: defineProperty({}, side, reference[side] + reference[measurement] - popper[measurement])
    };

    data.offsets.popper = _extends$1({}, popper, shiftOffsets[shiftvariation]);
  }

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function hide(data) {
  if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
    return data;
  }

  var refRect = data.offsets.reference;
  var bound = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'preventOverflow';
  }).boundaries;

  if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === true) {
      return data;
    }

    data.hide = true;
    data.attributes['x-out-of-boundaries'] = '';
  } else {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === false) {
      return data;
    }

    data.hide = false;
    data.attributes['x-out-of-boundaries'] = false;
  }

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function inner(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;

  var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;

  popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);

  data.placement = getOppositePlacement(placement);
  data.offsets.popper = getClientRect(popper);

  return data;
}

/**
 * Modifier function, each modifier can have a function of this type assigned
 * to its `fn` property.<br />
 * These functions will be called on each update, this means that you must
 * make sure they are performant enough to avoid performance bottlenecks.
 *
 * @function ModifierFn
 * @argument {dataObject} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {dataObject} The data object, properly modified
 */

/**
 * Modifiers are plugins used to alter the behavior of your poppers.<br />
 * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
 * needed by the library.
 *
 * Usually you don't want to override the `order`, `fn` and `onLoad` props.
 * All the other properties are configurations that could be tweaked.
 * @namespace modifiers
 */
var modifiers = {
  /**
   * Modifier used to shift the popper on the start or end of its reference
   * element.<br />
   * It will read the variation of the `placement` property.<br />
   * It can be one either `-end` or `-start`.
   * @memberof modifiers
   * @inner
   */
  shift: {
    /** @prop {number} order=100 - Index used to define the order of execution */
    order: 100,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: shift
  },

  /**
   * The `offset` modifier can shift your popper on both its axis.
   *
   * It accepts the following units:
   * - `px` or unit-less, interpreted as pixels
   * - `%` or `%r`, percentage relative to the length of the reference element
   * - `%p`, percentage relative to the length of the popper element
   * - `vw`, CSS viewport width unit
   * - `vh`, CSS viewport height unit
   *
   * For length is intended the main axis relative to the placement of the popper.<br />
   * This means that if the placement is `top` or `bottom`, the length will be the
   * `width`. In case of `left` or `right`, it will be the `height`.
   *
   * You can provide a single value (as `Number` or `String`), or a pair of values
   * as `String` divided by a comma or one (or more) white spaces.<br />
   * The latter is a deprecated method because it leads to confusion and will be
   * removed in v2.<br />
   * Additionally, it accepts additions and subtractions between different units.
   * Note that multiplications and divisions aren't supported.
   *
   * Valid examples are:
   * ```
   * 10
   * '10%'
   * '10, 10'
   * '10%, 10'
   * '10 + 10%'
   * '10 - 5vh + 3%'
   * '-10px + 5vh, 5px - 6%'
   * ```
   * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
   * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
   * > You can read more on this at this [issue](https://github.com/FezVrasta/popper.js/issues/373).
   *
   * @memberof modifiers
   * @inner
   */
  offset: {
    /** @prop {number} order=200 - Index used to define the order of execution */
    order: 200,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: offset,
    /** @prop {Number|String} offset=0
     * The offset value as described in the modifier description
     */
    offset: 0
  },

  /**
   * Modifier used to prevent the popper from being positioned outside the boundary.
   *
   * A scenario exists where the reference itself is not within the boundaries.<br />
   * We can say it has "escaped the boundaries" — or just "escaped".<br />
   * In this case we need to decide whether the popper should either:
   *
   * - detach from the reference and remain "trapped" in the boundaries, or
   * - if it should ignore the boundary and "escape with its reference"
   *
   * When `escapeWithReference` is set to`true` and reference is completely
   * outside its boundaries, the popper will overflow (or completely leave)
   * the boundaries in order to remain attached to the edge of the reference.
   *
   * @memberof modifiers
   * @inner
   */
  preventOverflow: {
    /** @prop {number} order=300 - Index used to define the order of execution */
    order: 300,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: preventOverflow,
    /**
     * @prop {Array} [priority=['left','right','top','bottom']]
     * Popper will try to prevent overflow following these priorities by default,
     * then, it could overflow on the left and on top of the `boundariesElement`
     */
    priority: ['left', 'right', 'top', 'bottom'],
    /**
     * @prop {number} padding=5
     * Amount of pixel used to define a minimum distance between the boundaries
     * and the popper. This makes sure the popper always has a little padding
     * between the edges of its container
     */
    padding: 5,
    /**
     * @prop {String|HTMLElement} boundariesElement='scrollParent'
     * Boundaries used by the modifier. Can be `scrollParent`, `window`,
     * `viewport` or any DOM element.
     */
    boundariesElement: 'scrollParent'
  },

  /**
   * Modifier used to make sure the reference and its popper stay near each other
   * without leaving any gap between the two. Especially useful when the arrow is
   * enabled and you want to ensure that it points to its reference element.
   * It cares only about the first axis. You can still have poppers with margin
   * between the popper and its reference element.
   * @memberof modifiers
   * @inner
   */
  keepTogether: {
    /** @prop {number} order=400 - Index used to define the order of execution */
    order: 400,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: keepTogether
  },

  /**
   * This modifier is used to move the `arrowElement` of the popper to make
   * sure it is positioned between the reference element and its popper element.
   * It will read the outer size of the `arrowElement` node to detect how many
   * pixels of conjunction are needed.
   *
   * It has no effect if no `arrowElement` is provided.
   * @memberof modifiers
   * @inner
   */
  arrow: {
    /** @prop {number} order=500 - Index used to define the order of execution */
    order: 500,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: arrow,
    /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
    element: '[x-arrow]'
  },

  /**
   * Modifier used to flip the popper's placement when it starts to overlap its
   * reference element.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   *
   * **NOTE:** this modifier will interrupt the current update cycle and will
   * restart it if it detects the need to flip the placement.
   * @memberof modifiers
   * @inner
   */
  flip: {
    /** @prop {number} order=600 - Index used to define the order of execution */
    order: 600,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: flip,
    /**
     * @prop {String|Array} behavior='flip'
     * The behavior used to change the popper's placement. It can be one of
     * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
     * placements (with optional variations)
     */
    behavior: 'flip',
    /**
     * @prop {number} padding=5
     * The popper will flip if it hits the edges of the `boundariesElement`
     */
    padding: 5,
    /**
     * @prop {String|HTMLElement} boundariesElement='viewport'
     * The element which will define the boundaries of the popper position.
     * The popper will never be placed outside of the defined boundaries
     * (except if `keepTogether` is enabled)
     */
    boundariesElement: 'viewport',
    /**
     * @prop {Boolean} flipVariations=false
     * The popper will switch placement variation between `-start` and `-end` when
     * the reference element overlaps its boundaries.
     *
     * The original placement should have a set variation.
     */
    flipVariations: false,
    /**
     * @prop {Boolean} flipVariationsByContent=false
     * The popper will switch placement variation between `-start` and `-end` when
     * the popper element overlaps its reference boundaries.
     *
     * The original placement should have a set variation.
     */
    flipVariationsByContent: false
  },

  /**
   * Modifier used to make the popper flow toward the inner of the reference element.
   * By default, when this modifier is disabled, the popper will be placed outside
   * the reference element.
   * @memberof modifiers
   * @inner
   */
  inner: {
    /** @prop {number} order=700 - Index used to define the order of execution */
    order: 700,
    /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
    enabled: false,
    /** @prop {ModifierFn} */
    fn: inner
  },

  /**
   * Modifier used to hide the popper when its reference element is outside of the
   * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
   * be used to hide with a CSS selector the popper when its reference is
   * out of boundaries.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   * @memberof modifiers
   * @inner
   */
  hide: {
    /** @prop {number} order=800 - Index used to define the order of execution */
    order: 800,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: hide
  },

  /**
   * Computes the style that will be applied to the popper element to gets
   * properly positioned.
   *
   * Note that this modifier will not touch the DOM, it just prepares the styles
   * so that `applyStyle` modifier can apply it. This separation is useful
   * in case you need to replace `applyStyle` with a custom implementation.
   *
   * This modifier has `850` as `order` value to maintain backward compatibility
   * with previous versions of Popper.js. Expect the modifiers ordering method
   * to change in future major versions of the library.
   *
   * @memberof modifiers
   * @inner
   */
  computeStyle: {
    /** @prop {number} order=850 - Index used to define the order of execution */
    order: 850,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: computeStyle,
    /**
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3D transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties
     */
    gpuAcceleration: true,
    /**
     * @prop {string} [x='bottom']
     * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
     * Change this if your popper should grow in a direction different from `bottom`
     */
    x: 'bottom',
    /**
     * @prop {string} [x='left']
     * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
     * Change this if your popper should grow in a direction different from `right`
     */
    y: 'right'
  },

  /**
   * Applies the computed styles to the popper element.
   *
   * All the DOM manipulations are limited to this modifier. This is useful in case
   * you want to integrate Popper.js inside a framework or view library and you
   * want to delegate all the DOM manipulations to it.
   *
   * Note that if you disable this modifier, you must make sure the popper element
   * has its position set to `absolute` before Popper.js can do its work!
   *
   * Just disable this modifier and define your own to achieve the desired effect.
   *
   * @memberof modifiers
   * @inner
   */
  applyStyle: {
    /** @prop {number} order=900 - Index used to define the order of execution */
    order: 900,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: applyStyle,
    /** @prop {Function} */
    onLoad: applyStyleOnLoad,
    /**
     * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3D transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties
     */
    gpuAcceleration: undefined
  }
};

/**
 * The `dataObject` is an object containing all the information used by Popper.js.
 * This object is passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
 * @name dataObject
 * @property {Object} data.instance The Popper.js instance
 * @property {String} data.placement Placement applied to popper
 * @property {String} data.originalPlacement Placement originally defined on init
 * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
 * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper
 * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
 * @property {Object} data.styles Any CSS property defined here will be applied to the popper. It expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.arrowStyles Any CSS property defined here will be applied to the popper arrow. It expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.boundaries Offsets of the popper boundaries
 * @property {Object} data.offsets The measurements of popper, reference and arrow elements
 * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
 */

/**
 * Default options provided to Popper.js constructor.<br />
 * These can be overridden using the `options` argument of Popper.js.<br />
 * To override an option, simply pass an object with the same
 * structure of the `options` object, as the 3rd argument. For example:
 * ```
 * new Popper(ref, pop, {
 *   modifiers: {
 *     preventOverflow: { enabled: false }
 *   }
 * })
 * ```
 * @type {Object}
 * @static
 * @memberof Popper
 */
var Defaults = {
  /**
   * Popper's placement.
   * @prop {Popper.placements} placement='bottom'
   */
  placement: 'bottom',

  /**
   * Set this to true if you want popper to position it self in 'fixed' mode
   * @prop {Boolean} positionFixed=false
   */
  positionFixed: false,

  /**
   * Whether events (resize, scroll) are initially enabled.
   * @prop {Boolean} eventsEnabled=true
   */
  eventsEnabled: true,

  /**
   * Set to true if you want to automatically remove the popper when
   * you call the `destroy` method.
   * @prop {Boolean} removeOnDestroy=false
   */
  removeOnDestroy: false,

  /**
   * Callback called when the popper is created.<br />
   * By default, it is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onCreate}
   */
  onCreate: function onCreate() {},

  /**
   * Callback called when the popper is updated. This callback is not called
   * on the initialization/creation of the popper, but only on subsequent
   * updates.<br />
   * By default, it is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onUpdate}
   */
  onUpdate: function onUpdate() {},

  /**
   * List of modifiers used to modify the offsets before they are applied to the popper.
   * They provide most of the functionalities of Popper.js.
   * @prop {modifiers}
   */
  modifiers: modifiers
};

/**
 * @callback onCreate
 * @param {dataObject} data
 */

/**
 * @callback onUpdate
 * @param {dataObject} data
 */

// Utils
// Methods
var Popper = function () {
  /**
   * Creates a new Popper.js instance.
   * @class Popper
   * @param {Element|referenceObject} reference - The reference element used to position the popper
   * @param {Element} popper - The HTML / XML element used as the popper
   * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
   * @return {Object} instance - The generated Popper.js instance
   */
  function Popper(reference, popper) {
    var _this = this;

    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    classCallCheck(this, Popper);

    this.scheduleUpdate = function () {
      return requestAnimationFrame(_this.update);
    };

    // make update() debounced, so that it only runs at most once-per-tick
    this.update = debounce(this.update.bind(this));

    // with {} we create a new object with the options inside it
    this.options = _extends$1({}, Popper.Defaults, options);

    // init state
    this.state = {
      isDestroyed: false,
      isCreated: false,
      scrollParents: []
    };

    // get reference and popper elements (allow jQuery wrappers)
    this.reference = reference && reference.jquery ? reference[0] : reference;
    this.popper = popper && popper.jquery ? popper[0] : popper;

    // Deep merge modifiers options
    this.options.modifiers = {};
    Object.keys(_extends$1({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) {
      _this.options.modifiers[name] = _extends$1({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
    });

    // Refactoring modifiers' list (Object => Array)
    this.modifiers = Object.keys(this.options.modifiers).map(function (name) {
      return _extends$1({
        name: name
      }, _this.options.modifiers[name]);
    })
    // sort the modifiers by order
    .sort(function (a, b) {
      return a.order - b.order;
    });

    // modifiers have the ability to execute arbitrary code when Popper.js get inited
    // such code is executed in the same order of its modifier
    // they could add new properties to their options configuration
    // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!
    this.modifiers.forEach(function (modifierOptions) {
      if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
        modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
      }
    });

    // fire the first update to position the popper in the right place
    this.update();

    var eventsEnabled = this.options.eventsEnabled;
    if (eventsEnabled) {
      // setup event listeners, they will take care of update the position in specific situations
      this.enableEventListeners();
    }

    this.state.eventsEnabled = eventsEnabled;
  }

  // We can't use class properties because they don't get listed in the
  // class prototype and break stuff like Sinon stubs


  createClass(Popper, [{
    key: 'update',
    value: function update$$1() {
      return update.call(this);
    }
  }, {
    key: 'destroy',
    value: function destroy$$1() {
      return destroy.call(this);
    }
  }, {
    key: 'enableEventListeners',
    value: function enableEventListeners$$1() {
      return enableEventListeners.call(this);
    }
  }, {
    key: 'disableEventListeners',
    value: function disableEventListeners$$1() {
      return disableEventListeners.call(this);
    }

    /**
     * Schedules an update. It will run on the next UI update available.
     * @method scheduleUpdate
     * @memberof Popper
     */


    /**
     * Collection of utilities useful when writing custom modifiers.
     * Starting from version 1.7, this method is available only if you
     * include `popper-utils.js` before `popper.js`.
     *
     * **DEPRECATION**: This way to access PopperUtils is deprecated
     * and will be removed in v2! Use the PopperUtils module directly instead.
     * Due to the high instability of the methods contained in Utils, we can't
     * guarantee them to follow semver. Use them at your own risk!
     * @static
     * @private
     * @type {Object}
     * @deprecated since version 1.8
     * @member Utils
     * @memberof Popper
     */

  }]);
  return Popper;
}();

/**
 * The `referenceObject` is an object that provides an interface compatible with Popper.js
 * and lets you use it as replacement of a real DOM node.<br />
 * You can use this method to position a popper relatively to a set of coordinates
 * in case you don't have a DOM node to use as reference.
 *
 * ```
 * new Popper(referenceObject, popperNode);
 * ```
 *
 * NB: This feature isn't supported in Internet Explorer 10.
 * @name referenceObject
 * @property {Function} data.getBoundingClientRect
 * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
 * @property {number} data.clientWidth
 * An ES6 getter that will return the width of the virtual reference element.
 * @property {number} data.clientHeight
 * An ES6 getter that will return the height of the virtual reference element.
 */


Popper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
Popper.placements = placements;
Popper.Defaults = Defaults;

var initialPopperStyles = {
  position: 'absolute',
  top: '0',
  left: '0',
  opacity: '0',
  pointerEvents: 'none'
};
var initialArrowStyles = {};
/**
 * Position an element relative some reference element using Popper.js
 *
 * @param {HTMLElement} referenceElement The element
 * @param {HTMLElement} popperElement
 * @param {Object}      options
 * @param {Object}      options.modifiers Popper.js modifiers
 * @param {Boolean}     options.enabled toggle the popper functionality on/off
 * @param {String}      options.placement The popper element placement relative to the reference element
 * @param {Boolean}     options.positionFixed use fixed positioning
 * @param {Boolean}     options.eventsEnabled have Popper listen on window resize events to reposition the element
 */

function usePopper(referenceElement, popperElement, _temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$enabled = _ref.enabled,
      enabled = _ref$enabled === void 0 ? true : _ref$enabled,
      _ref$placement = _ref.placement,
      placement = _ref$placement === void 0 ? 'bottom' : _ref$placement,
      _ref$positionFixed = _ref.positionFixed,
      positionFixed = _ref$positionFixed === void 0 ? false : _ref$positionFixed,
      _ref$eventsEnabled = _ref.eventsEnabled,
      eventsEnabled = _ref$eventsEnabled === void 0 ? true : _ref$eventsEnabled,
      _ref$modifiers = _ref.modifiers,
      modifiers = _ref$modifiers === void 0 ? {} : _ref$modifiers;

  var popperInstanceRef = React.useRef();
  var hasArrow = !!(modifiers.arrow && modifiers.arrow.element);
  var scheduleUpdate = React.useCallback(function () {
    if (popperInstanceRef.current) {
      popperInstanceRef.current.scheduleUpdate();
    }
  }, []);

  var _useState = React.useState({
    placement: placement,
    scheduleUpdate: scheduleUpdate,
    outOfBoundaries: false,
    styles: initialPopperStyles,
    arrowStyles: initialArrowStyles
  }),
      state = _useState[0],
      setState = _useState[1]; // A placement difference in state means popper determined a new placement
  // apart from the props value. By the time the popper element is rendered with
  // the new position Popper has already measured it, if the place change triggers
  // a size change it will result in a misaligned popper. So we schedule an update to be sure.


  React.useEffect(function () {
    scheduleUpdate();
  }, [state.placement, scheduleUpdate]);
  /** Toggle Events */

  React.useEffect(function () {
    if (popperInstanceRef.current) {
      // eslint-disable-next-line no-unused-expressions
      eventsEnabled ? popperInstanceRef.current.enableEventListeners() : popperInstanceRef.current.disableEventListeners();
    }
  }, [eventsEnabled]);
  React.useEffect(function () {
    if (!enabled || referenceElement == null || popperElement == null) {
      return undefined;
    }

    var arrow = modifiers.arrow && _extends({}, modifiers.arrow, {
      element: modifiers.arrow.element
    });

    popperInstanceRef.current = new Popper(referenceElement, popperElement, {
      placement: placement,
      positionFixed: positionFixed,
      modifiers: _extends({}, modifiers, {
        arrow: arrow,
        applyStyle: {
          enabled: false
        },
        updateStateModifier: {
          enabled: true,
          order: 900,
          fn: function fn(data) {
            setState({
              scheduleUpdate: scheduleUpdate,
              styles: _extends({
                position: data.offsets.popper.position
              }, data.styles),
              arrowStyles: data.arrowStyles,
              outOfBoundaries: data.hide,
              placement: data.placement
            });
          }
        }
      })
    });
    return function () {
      if (popperInstanceRef.current !== null) {
        popperInstanceRef.current.destroy();
        popperInstanceRef.current = null;
      }
    }; // intentionally NOT re-running on new modifiers
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, placement, positionFixed, referenceElement, popperElement, hasArrow]);
  return state;
}

/* eslint-disable no-bitwise, no-cond-assign */
// HTML DOM and SVG DOM may have different support levels,
// so we need to check on context instead of a document root element.
function contains(context, node) {
  if (context.contains) return context.contains(node);
  if (context.compareDocumentPosition) return context === node || !!(context.compareDocumentPosition(node) & 16);
}

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var __DEV__ = process.env.NODE_ENV !== 'production';

var warning = function() {};

if (__DEV__) {
  var printWarning = function printWarning(format, args) {
    var len = arguments.length;
    args = new Array(len > 1 ? len - 1 : 0);
    for (var key = 1; key < len; key++) {
      args[key - 1] = arguments[key];
    }
    var argIndex = 0;
    var message = 'Warning: ' +
      format.replace(/%s/g, function() {
        return args[argIndex++];
      });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function(condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);
    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }
    if (format === undefined) {
      throw new Error(
          '`warning(condition, format, ...args)` requires a warning ' +
          'message argument'
      );
    }
    if (!condition) {
      printWarning.apply(null, [format].concat(args));
    }
  };
}

var warning_1 = warning;

var escapeKeyCode = 27;

var noop$2 = function noop() {};

function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
/**
 * The `useRootClose` hook registers your callback on the document
 * when rendered. Powers the `<Overlay/>` component. This is used achieve modal
 * style behavior where your callback is triggered when the user tries to
 * interact with the rest of the document or hits the `esc` key.
 *
 * @param {Ref<HTMLElement>|HTMLElement} ref  The element boundary
 * @param {function} onRootClose
 * @param {object}  options
 * @param {boolean} options.disabled
 * @param {string}  options.clickTrigger The DOM event name (click, mousedown, etc) to attach listeners on
 */


function useRootClose(ref, onRootClose, _temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      disabled = _ref.disabled,
      _ref$clickTrigger = _ref.clickTrigger,
      clickTrigger = _ref$clickTrigger === void 0 ? 'click' : _ref$clickTrigger;

  var preventMouseRootCloseRef = React.useRef(false);
  var onClose = onRootClose || noop$2;
  var handleMouseCapture = React.useCallback(function (e) {
    var currentTarget = ref && ('current' in ref ? ref.current : ref);
    warning_1(!!currentTarget, 'RootClose captured a close event but does not have a ref to compare it to. ' + 'useRootClose(), should be passed a ref that resolves to a DOM node');
    preventMouseRootCloseRef.current = !currentTarget || isModifiedEvent(e) || !isLeftClickEvent(e) || contains(currentTarget, e.target);
  }, [ref]);
  var handleMouse = useEventCallback(function (e) {
    if (!preventMouseRootCloseRef.current) {
      onClose(e);
    }
  });
  var handleKeyUp = useEventCallback(function (e) {
    if (e.keyCode === escapeKeyCode) {
      onClose(e);
    }
  });
  React.useEffect(function () {
    if (disabled || ref == null) return undefined; // Use capture for this listener so it fires before React's listener, to
    // avoid false positives in the contains() check below if the target DOM
    // element is removed in the React mouse callback.

    var removeMouseCaptureListener = listen(document, clickTrigger, handleMouseCapture, true);
    var removeMouseListener = listen(document, clickTrigger, handleMouse);
    var removeKeyupListener = listen(document, 'keyup', handleKeyUp);
    var mobileSafariHackListeners = [];

    if ('ontouchstart' in document.documentElement) {
      mobileSafariHackListeners = [].slice.call(document.body.children).map(function (el) {
        return listen(el, 'mousemove', noop$2);
      });
    }

    return function () {
      removeMouseCaptureListener();
      removeMouseListener();
      removeKeyupListener();
      mobileSafariHackListeners.forEach(function (remove) {
        return remove();
      });
    };
  }, [ref, disabled, clickTrigger, handleMouseCapture, handleMouse, handleKeyUp]);
}

function useDropdownMenu(options) {
  if (options === void 0) {
    options = {};
  }

  var context = React.useContext(DropdownContext);

  var _useCallbackRef = useCallbackRef(),
      arrowElement = _useCallbackRef[0],
      attachArrowRef = _useCallbackRef[1];

  var hasShownRef = React.useRef(false);
  var _options = options,
      flip = _options.flip,
      rootCloseEvent = _options.rootCloseEvent,
      _options$popperConfig = _options.popperConfig,
      popperConfig = _options$popperConfig === void 0 ? {} : _options$popperConfig,
      _options$usePopper = _options.usePopper,
      shouldUsePopper = _options$usePopper === void 0 ? true : _options$usePopper;
  var show = context.show == null ? options.show : context.show;
  var alignEnd = context.alignEnd == null ? options.alignEnd : context.alignEnd;

  if (show && !hasShownRef.current) {
    hasShownRef.current = true;
  }

  var handleClose = function handleClose(e) {
    if (!context.toggle) return;
    context.toggle(false, e);
  };

  var drop = context.drop,
      setMenu = context.setMenu,
      menuElement = context.menuElement,
      toggleElement = context.toggleElement;
  var placement = alignEnd ? 'bottom-end' : 'bottom-start';
  if (drop === 'up') placement = alignEnd ? 'top-end' : 'top-start';else if (drop === 'right') placement = alignEnd ? 'right-end' : 'right-start';else if (drop === 'left') placement = alignEnd ? 'left-end' : 'left-start';
  var popper = usePopper(toggleElement, menuElement, {
    placement: placement,
    enabled: !!(shouldUsePopper && show),
    eventsEnabled: !!show,
    modifiers: _extends({
      flip: {
        enabled: !!flip
      },
      arrow: _extends({}, popperConfig.modifiers && popperConfig.modifiers.arrow, {
        enabled: !!arrowElement,
        element: arrowElement
      })
    }, popperConfig.modifiers)
  });
  var menu = null;
  var menuProps = {
    ref: setMenu,
    'aria-labelledby': toggleElement && toggleElement.id
  };
  var childArgs = {
    show: show,
    alignEnd: alignEnd,
    hasShown: hasShownRef.current,
    close: handleClose
  };

  if (!shouldUsePopper) {
    menu = _extends({}, childArgs, {
      props: menuProps
    });
  } else {
    menu = _extends({}, popper, {}, childArgs, {
      props: _extends({}, menuProps, {
        style: popper.styles
      }),
      arrowProps: {
        ref: attachArrowRef,
        style: popper.arrowStyles
      }
    });
  }

  useRootClose(menuElement, handleClose, {
    clickTrigger: rootCloseEvent,
    disabled: !(menu && show)
  });
  return menu;
}
var propTypes$1 = {
  /**
   * A render prop that returns a Menu element. The `props`
   * argument should spread through to **a component that can accept a ref**.
   *
   * @type {Function ({
   *   show: boolean,
   *   alignEnd: boolean,
   *   close: (?SyntheticEvent) => void,
   *   placement: Placement,
   *   outOfBoundaries: ?boolean,
   *   scheduleUpdate: () => void,
   *   props: {
   *     ref: (?HTMLElement) => void,
   *     style: { [string]: string | number },
   *     aria-labelledby: ?string
   *   },
   *   arrowProps: {
   *     ref: (?HTMLElement) => void,
   *     style: { [string]: string | number },
   *   },
   * }) => React.Element}
   */
  children: PropTypes.func.isRequired,

  /**
   * Controls the visible state of the menu, generally this is
   * provided by the parent `Dropdown` component,
   * but may also be specified as a prop directly.
   */
  show: PropTypes.bool,

  /**
   * Aligns the dropdown menu to the 'end' of it's placement position.
   * Generally this is provided by the parent `Dropdown` component,
   * but may also be specified as a prop directly.
   */
  alignEnd: PropTypes.bool,

  /**
   * Enables the Popper.js `flip` modifier, allowing the Dropdown to
   * automatically adjust it's placement in case of overlap with the viewport or toggle.
   * Refer to the [flip docs](https://popper.js.org/popper-documentation.html#modifiers..flip.enabled) for more info
   */
  flip: PropTypes.bool,
  usePopper: PropTypes.oneOf([true, false]),

  /**
   * A set of popper options and props passed directly to react-popper's Popper component.
   */
  popperConfig: PropTypes.object,

  /**
   * Override the default event used by RootCloseWrapper.
   */
  rootCloseEvent: PropTypes.string
};
var defaultProps$d = {
  usePopper: true
};

function DropdownMenu(_ref) {
  var children = _ref.children,
      options = _objectWithoutPropertiesLoose(_ref, ["children"]);

  var args = useDropdownMenu(options);
  return args.hasShown ? children(args) : null;
}

DropdownMenu.displayName = 'ReactOverlaysDropdownMenu';
DropdownMenu.propTypes = propTypes$1;
DropdownMenu.defaultProps = defaultProps$d;

/**
 * Wires up Dropdown toggle functinality, returning a set a props to attach
 * to the element that functions as the dropdown toggle (generally a button).
 */

function useDropdownToggle() {
  var _useContext = React.useContext(DropdownContext),
      show = _useContext.show,
      toggle = _useContext.toggle,
      setToggle = _useContext.setToggle;

  return [{
    ref: setToggle,
    'aria-haspopup': true,
    'aria-expanded': !!show
  }, {
    show: show,
    toggle: toggle
  }];
}
var propTypes$2 = {
  /**
   * A render prop that returns a Toggle element. The `props`
   * argument should spread through to **a component that can accept a ref**. Use
   * the `onToggle` argument to toggle the menu open or closed
   *
   * @type {Function ({
   *   show: boolean,
   *   toggle: (show: boolean) => void,
   *   props: {
   *     ref: (?HTMLElement) => void,
   *     aria-haspopup: true
   *     aria-expanded: boolean
   *   },
   * }) => React.Element}
   */
  children: PropTypes.func.isRequired
};

function DropdownToggle(_ref) {
  var children = _ref.children;

  var _useDropdownToggle = useDropdownToggle(),
      props = _useDropdownToggle[0],
      _useDropdownToggle$ = _useDropdownToggle[1],
      show = _useDropdownToggle$.show,
      toggle = _useDropdownToggle$.toggle;

  return children({
    show: show,
    toggle: toggle,
    props: props
  });
}

DropdownToggle.displayName = 'ReactOverlaysDropdownToggle';
DropdownToggle.propTypes = propTypes$2;

var propTypes$3 = {
  /**
   * A render prop that returns the root dropdown element. The `props`
   * argument should spread through to an element containing _both_ the
   * menu and toggle in order to handle keyboard events for focus management.
   *
   * @type {Function ({
   *   props: {
   *     onKeyDown: (SyntheticEvent) => void,
   *   },
   * }) => React.Element}
   */
  children: PropTypes.func.isRequired,

  /**
   * Determines the direction and location of the Menu in relation to it's Toggle.
   */
  drop: PropTypes.oneOf(['up', 'left', 'right', 'down']),

  /**
   * Controls the focus behavior for when the Dropdown is opened. Set to
   * `true` to always focus the first menu item, `keyboard` to focus only when
   * navigating via the keyboard, or `false` to disable completely
   *
   * The Default behavior is `false` **unless** the Menu has a `role="menu"`
   * where it will default to `keyboard` to match the recommended [ARIA Authoring practices](https://www.w3.org/TR/wai-aria-practices-1.1/#menubutton).
   */
  focusFirstItemOnShow: PropTypes.oneOf([false, true, 'keyboard']),

  /**
   * A css slector string that will return __focusable__ menu items.
   * Selectors should be relative to the menu component:
   * e.g. ` > li:not('.disabled')`
   */
  itemSelector: PropTypes.string.isRequired,

  /**
   * Align the menu to the 'end' side of the placement side of the Dropdown toggle. The default placement is `top-start` or `bottom-start`.
   */
  alignEnd: PropTypes.bool,

  /**
   * Whether or not the Dropdown is visible.
   *
   * @controllable onToggle
   */
  show: PropTypes.bool,

  /**
   * Sets the initial show position of the Dropdown.
   */
  defaultShow: PropTypes.bool,

  /**
   * A callback fired when the Dropdown wishes to change visibility. Called with the requested
   * `show` value, the DOM event, and the source that fired it: `'click'`,`'keydown'`,`'rootClose'`, or `'select'`.
   *
   * ```js
   * function(
   *   isOpen: boolean,
   *   event: SyntheticEvent,
   * ): void
   * ```
   *
   * @controllable show
   */
  onToggle: PropTypes.func
};
var defaultProps$e = {
  itemSelector: '* > *'
};
/**
 * `Dropdown` is set of structural components for building, accessible dropdown menus with close-on-click,
 * keyboard navigation, and correct focus handling. As with all the react-overlay's
 * components its BYOS (bring your own styles). Dropdown is primarily
 * built from three base components, you should compose to build your Dropdowns.
 *
 * - `Dropdown`, which wraps the menu and toggle, and handles keyboard navigation
 * - `Dropdown.Toggle` generally a button that triggers the menu opening
 * - `Dropdown.Menu` The overlaid, menu, positioned to the toggle with PopperJs
 */

function Dropdown(_ref) {
  var drop = _ref.drop,
      alignEnd = _ref.alignEnd,
      defaultShow = _ref.defaultShow,
      rawShow = _ref.show,
      rawOnToggle = _ref.onToggle,
      itemSelector = _ref.itemSelector,
      focusFirstItemOnShow = _ref.focusFirstItemOnShow,
      children = _ref.children;
  var forceUpdate = useForceUpdate();

  var _useUncontrolled = useUncontrolled({
    defaultShow: defaultShow,
    show: rawShow,
    onToggle: rawOnToggle
  }, {
    show: 'onToggle'
  }),
      show = _useUncontrolled.show,
      onToggle = _useUncontrolled.onToggle;

  var _useCallbackRef = useCallbackRef(),
      toggleElement = _useCallbackRef[0],
      setToggle = _useCallbackRef[1]; // We use normal refs instead of useCallbackRef in order to populate the
  // the value as quickly as possible, otherwise the effect to focus the element
  // may run before the state value is set


  var menuRef = React.useRef();
  var menuElement = menuRef.current;
  var setMenu = React.useCallback(function (ref) {
    menuRef.current = ref; // ensure that a menu set triggers an update for consumers

    forceUpdate();
  }, [forceUpdate]);
  var lastShow = usePrevious(show);
  var lastSourceEvent = React.useRef(null);
  var focusInDropdown = React.useRef(false);
  var toggle = React.useCallback(function (event) {
    onToggle(!show, event);
  }, [onToggle, show]);
  var context = React.useMemo(function () {
    return {
      toggle: toggle,
      drop: drop,
      show: show,
      alignEnd: alignEnd,
      menuElement: menuElement,
      toggleElement: toggleElement,
      setMenu: setMenu,
      setToggle: setToggle
    };
  }, [toggle, drop, show, alignEnd, menuElement, toggleElement, setMenu, setToggle]);

  if (menuElement && lastShow && !show) {
    focusInDropdown.current = menuElement.contains(document.activeElement);
  }

  var focusToggle = useEventCallback(function () {
    if (toggleElement && toggleElement.focus) {
      toggleElement.focus();
    }
  });
  var maybeFocusFirst = useEventCallback(function () {
    var type = lastSourceEvent.current;
    var focusType = focusFirstItemOnShow;

    if (focusType == null) {
      focusType = menuRef.current && matches(menuRef.current, '[role=menu]') ? 'keyboard' : false;
    }

    if (focusType === false || focusType === 'keyboard' && !/^key.+$/.test(type)) {
      return;
    }

    var first = qsa(menuRef.current, itemSelector)[0];
    if (first && first.focus) first.focus();
  });
  React.useEffect(function () {
    if (show) maybeFocusFirst();else if (focusInDropdown.current) {
      focusInDropdown.current = false;
      focusToggle();
    } // only `show` should be changing
  }, [show, focusInDropdown, focusToggle, maybeFocusFirst]);
  React.useEffect(function () {
    lastSourceEvent.current = null;
  });

  var getNextFocusedChild = function getNextFocusedChild(current, offset) {
    if (!menuRef.current) return null;
    var items = qsa(menuRef.current, itemSelector);
    var index = items.indexOf(current) + offset;
    index = Math.max(0, Math.min(index, items.length));
    return items[index];
  };

  var handleKeyDown = function handleKeyDown(event) {
    var key = event.key,
        target = event.target; // Second only to https://github.com/twbs/bootstrap/blob/8cfbf6933b8a0146ac3fbc369f19e520bd1ebdac/js/src/dropdown.js#L400
    // in inscrutability

    var isInput = /input|textarea/i.test(target.tagName);

    if (isInput && (key === ' ' || key !== 'Escape' && menuRef.current && menuRef.current.contains(target))) {
      return;
    }

    lastSourceEvent.current = event.type;

    switch (key) {
      case 'ArrowUp':
        {
          var next = getNextFocusedChild(target, -1);
          if (next && next.focus) next.focus();
          event.preventDefault();
          return;
        }

      case 'ArrowDown':
        event.preventDefault();

        if (!show) {
          toggle(event);
        } else {
          var _next = getNextFocusedChild(target, 1);

          if (_next && _next.focus) _next.focus();
        }

        return;

      case 'Escape':
      case 'Tab':
        onToggle(false, event);
        break;

      default:
    }
  };

  return React__default.createElement(DropdownContext.Provider, {
    value: context
  }, children({
    props: {
      onKeyDown: handleKeyDown
    }
  }));
}

Dropdown.displayName = 'ReactOverlaysDropdown';
Dropdown.propTypes = propTypes$3;
Dropdown.defaultProps = defaultProps$e;
Dropdown.Menu = DropdownMenu;
Dropdown.Toggle = DropdownToggle;

var NavContext = React__default.createContext(null);

var defaultProps$f = {
  as: SafeAnchor,
  disabled: false
};
var DropdownItem = React__default.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      children = _ref.children,
      eventKey = _ref.eventKey,
      disabled = _ref.disabled,
      href = _ref.href,
      onClick = _ref.onClick,
      onSelect = _ref.onSelect,
      propActive = _ref.active,
      Component = _ref.as,
      props = _objectWithoutPropertiesLoose(_ref, ["bsPrefix", "className", "children", "eventKey", "disabled", "href", "onClick", "onSelect", "active", "as"]);

  var prefix = useBootstrapPrefix(bsPrefix, 'dropdown-item');
  var onSelectCtx = React.useContext(SelectableContext);
  var navContext = React.useContext(NavContext);

  var _ref2 = navContext || {},
      activeKey = _ref2.activeKey;

  var key = makeEventKey(eventKey, href);
  var active = propActive == null && key != null ? makeEventKey(activeKey) === key : propActive;
  var handleClick = useEventCallback(function (event) {
    // SafeAnchor handles the disabled case, but we handle it here
    // for other components
    if (disabled) return;
    if (onClick) onClick(event);
    if (onSelectCtx) onSelectCtx(key, event);
    if (onSelect) onSelect(key, event);
  });
  return React__default.createElement(Component, _extends({}, props, {
    ref: ref,
    href: href,
    disabled: disabled,
    className: classnames(className, prefix, active && 'active', disabled && 'disabled'),
    onClick: handleClick
  }), children);
});
DropdownItem.displayName = 'DropdownItem';
DropdownItem.defaultProps = defaultProps$f;

var toFnRef = function toFnRef(ref) {
  return !ref || typeof ref === 'function' ? ref : function (value) {
    ref.current = value;
  };
};

function mergeRefs(refA, refB) {
  var a = toFnRef(refA);
  var b = toFnRef(refB);
  return function (value) {
    if (a) a(value);
    if (b) b(value);
  };
}
/**
 * Create and returns a single callback ref composed from two other Refs.
 *
 * ```tsx
 * const Button = React.forwardRef((props, ref) => {
 *   const [element, attachRef] = useCallbackRef<HTMLButtonElement>();
 *   const mergedRef = useMergedRefs(ref, attachRef);
 *
 *   return <button ref={mergedRef} {...props}/>
 * })
 * ```
 *
 * @param refA A Callback or mutable Ref
 * @param refB A Callback or mutable Ref
 */

function useMergedRefs(refA, refB) {
  return React.useMemo(function () {
    return mergeRefs(refA, refB);
  }, [refA, refB]);
}

var NavbarContext = React__default.createContext(null);

function useWrappedRefWithWarning(ref, componentName) {
  if (!(process.env.NODE_ENV !== "production")) return ref; // eslint-disable-next-line react-hooks/rules-of-hooks

  var warningRef = React.useCallback(function (refValue) {
    !(refValue == null || !refValue.isReactComponent) ? process.env.NODE_ENV !== "production" ? invariant_1(false, componentName + " injected a ref to a provided `as` component that resolved to a component instance instead of a DOM element. " + 'Use `React.forwardRef` to provide the injected ref to the class component as a prop in order to pass it directly to a DOM element') : invariant_1(false) : void 0;
  }, [componentName]); // eslint-disable-next-line react-hooks/rules-of-hooks

  return useMergedRefs(warningRef, ref);
}

var defaultProps$g = {
  alignRight: false,
  flip: true
};
var DropdownMenu$1 = React__default.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      alignRight = _ref.alignRight,
      rootCloseEvent = _ref.rootCloseEvent,
      flip = _ref.flip,
      popperConfig = _ref.popperConfig,
      showProps = _ref.show,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'div' : _ref$as,
      props = _objectWithoutPropertiesLoose(_ref, ["bsPrefix", "className", "alignRight", "rootCloseEvent", "flip", "popperConfig", "show", "as"]);

  var isNavbar = React.useContext(NavbarContext);
  var prefix = useBootstrapPrefix(bsPrefix, 'dropdown-menu');

  var _useDropdownMenu = useDropdownMenu({
    flip: flip,
    popperConfig: popperConfig,
    rootCloseEvent: rootCloseEvent,
    show: showProps,
    alignEnd: alignRight,
    usePopper: !isNavbar
  }),
      hasShown = _useDropdownMenu.hasShown,
      placement = _useDropdownMenu.placement,
      show = _useDropdownMenu.show,
      alignEnd = _useDropdownMenu.alignEnd,
      close = _useDropdownMenu.close,
      menuProps = _useDropdownMenu.props;

  menuProps.ref = useMergedRefs(menuProps.ref, useWrappedRefWithWarning(ref, 'DropdownMenu'));
  if (!hasShown) return null; // For custom components provide additional, non-DOM, props;

  if (typeof Component !== 'string') {
    menuProps.show = show;
    menuProps.close = close;
    menuProps.alignRight = alignEnd;
  }

  var style = props.style;

  if (placement) {
    // we don't need the default popper style,
    // menus are display: none when not shown.
    style = _extends({}, style, {}, menuProps.style);
    props['x-placement'] = placement;
  }

  return React__default.createElement(Component, _extends({}, props, menuProps, {
    style: style,
    className: classnames(className, prefix, show && 'show', alignEnd && prefix + "-right")
  }));
});
DropdownMenu$1.displayName = 'DropdownMenu';
DropdownMenu$1.defaultProps = defaultProps$g;

var isRequiredForA11y_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isRequiredForA11y;
function isRequiredForA11y(validator) {
  return function validate(props, propName, componentName, location, propFullName) {
    var componentNameSafe = componentName || '<<anonymous>>';
    var propFullNameSafe = propFullName || propName;

    if (props[propName] == null) {
      return new Error('The ' + location + ' `' + propFullNameSafe + '` is required to make ' + ('`' + componentNameSafe + '` accessible for users of assistive ') + 'technologies such as screen readers.');
    }

    for (var _len = arguments.length, args = Array(_len > 5 ? _len - 5 : 0), _key = 5; _key < _len; _key++) {
      args[_key - 5] = arguments[_key];
    }

    return validator.apply(undefined, [props, propName, componentName, location, propFullName].concat(args));
  };
}
module.exports = exports['default'];
});

unwrapExports(isRequiredForA11y_1);

var DropdownToggle$1 = React__default.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      split = _ref.split,
      className = _ref.className,
      children = _ref.children,
      childBsPrefix = _ref.childBsPrefix,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? Button : _ref$as,
      props = _objectWithoutPropertiesLoose(_ref, ["bsPrefix", "split", "className", "children", "childBsPrefix", "as"]);

  var prefix = useBootstrapPrefix(bsPrefix, 'dropdown-toggle');

  if (childBsPrefix !== undefined) {
    props.bsPrefix = childBsPrefix;
  }

  var _useDropdownToggle = useDropdownToggle(),
      toggleProps = _useDropdownToggle[0],
      toggle = _useDropdownToggle[1].toggle;

  toggleProps.ref = useMergedRefs(toggleProps.ref, useWrappedRefWithWarning(ref, 'DropdownToggle')); // This intentionally forwards size and variant (if set) to the
  // underlying component, to allow it to render size and style variants.

  return React__default.createElement(Component, _extends({
    onClick: toggle,
    className: classnames(className, prefix, split && prefix + "-split")
  }, toggleProps, props), children);
});
DropdownToggle$1.displayName = 'DropdownToggle';

var defaultProps$h = {
  navbar: false
};
var Dropdown$1 = React__default.forwardRef(function (uncontrolledProps, ref) {
  var _useUncontrolled = useUncontrolled(uncontrolledProps, {
    show: 'onToggle'
  }),
      bsPrefix = _useUncontrolled.bsPrefix,
      drop = _useUncontrolled.drop,
      show = _useUncontrolled.show,
      className = _useUncontrolled.className,
      alignRight = _useUncontrolled.alignRight,
      onSelect = _useUncontrolled.onSelect,
      onToggle = _useUncontrolled.onToggle,
      focusFirstItemOnShow = _useUncontrolled.focusFirstItemOnShow,
      _useUncontrolled$as = _useUncontrolled.as,
      Component = _useUncontrolled$as === void 0 ? 'div' : _useUncontrolled$as,
      _4 = _useUncontrolled.navbar,
      props = _objectWithoutPropertiesLoose(_useUncontrolled, ["bsPrefix", "drop", "show", "className", "alignRight", "onSelect", "onToggle", "focusFirstItemOnShow", "as", "navbar"]);

  var onSelectCtx = React.useContext(SelectableContext);
  var prefix = useBootstrapPrefix(bsPrefix, 'dropdown');
  var handleToggle = useEventCallback(function (nextShow, event, source) {
    if (source === void 0) {
      source = event.type;
    }

    if (event.currentTarget === document) source = 'rootClose';
    onToggle(nextShow, event, {
      source: source
    });
  });
  var handleSelect = useEventCallback(function (key, event) {
    if (onSelectCtx) onSelectCtx(key, event);
    if (onSelect) onSelect(key, event);
    handleToggle(false, event, 'select');
  });
  return React__default.createElement(SelectableContext.Provider, {
    value: handleSelect
  }, React__default.createElement(Dropdown, {
    drop: drop,
    show: show,
    alignEnd: alignRight,
    onToggle: handleToggle,
    focusFirstItemOnShow: focusFirstItemOnShow,
    itemSelector: "." + prefix + "-item:not(.disabled):not(:disabled)"
  }, function (_ref) {
    var dropdownProps = _ref.props;
    return React__default.createElement(Component, _extends({}, props, dropdownProps, {
      ref: ref,
      className: classnames(className, show && 'show', (!drop || drop === 'down') && prefix, drop === 'up' && 'dropup', drop === 'right' && 'dropright', drop === 'left' && 'dropleft')
    }));
  }));
});
Dropdown$1.displayName = 'Dropdown';
Dropdown$1.defaultProps = defaultProps$h;
Dropdown$1.Toggle = DropdownToggle$1;
Dropdown$1.Menu = DropdownMenu$1;
Dropdown$1.Item = DropdownItem;
Dropdown$1.Header = createWithBsPrefix('dropdown-header', {
  defaultProps: {
    role: 'heading'
  }
});
Dropdown$1.Divider = createWithBsPrefix('dropdown-divider', {
  defaultProps: {
    role: 'separator'
  }
});

var propTypes$4 = {
  /**
   * An html id attribute for the Toggle button, necessary for assistive technologies, such as screen readers.
   * @type {string|number}
   * @required
   */
  id: PropTypes.any,

  /** An `href` passed to the Toggle component */
  href: PropTypes.string,

  /** An `onClick` handler passed to the Toggle component */
  onClick: PropTypes.func,

  /** The content of the non-toggle Button.  */
  title: PropTypes.node.isRequired,

  /** Disables both Buttons  */
  disabled: PropTypes.bool,

  /** An ARIA accessible role applied to the Menu component. When set to 'menu', The dropdown */
  menuRole: PropTypes.string,

  /**
   *  Which event when fired outside the component will cause it to be closed.
   *
   * _see [DropdownMenu](#menu-props) for more details_
   */
  rootCloseEvent: PropTypes.string,

  /** @ignore */
  bsPrefix: PropTypes.string,

  /** @ignore */
  variant: PropTypes.string,

  /** @ignore */
  size: PropTypes.string
};
/**
 * A convenience component for simple or general use dropdowns. Renders a `Button` toggle and all `children`
 * are passed directly to the default `Dropdown.Menu`.
 *
 * _All unknown props are passed through to the `Dropdown` component._ Only
 * the Button `variant`, `size` and `bsPrefix` props are passed to the toggle,
 * along with menu related props are passed to the `Dropdown.Menu`
 */

var DropdownButton = React__default.forwardRef(function (_ref, ref) {
  var title = _ref.title,
      children = _ref.children,
      bsPrefix = _ref.bsPrefix,
      rootCloseEvent = _ref.rootCloseEvent,
      variant = _ref.variant,
      size = _ref.size,
      menuRole = _ref.menuRole,
      disabled = _ref.disabled,
      href = _ref.href,
      id = _ref.id,
      props = _objectWithoutPropertiesLoose(_ref, ["title", "children", "bsPrefix", "rootCloseEvent", "variant", "size", "menuRole", "disabled", "href", "id"]);

  return React__default.createElement(Dropdown$1, _extends({
    ref: ref
  }, props), React__default.createElement(Dropdown$1.Toggle, {
    id: id,
    href: href,
    size: size,
    variant: variant,
    disabled: disabled,
    childBsPrefix: bsPrefix
  }, title), React__default.createElement(Dropdown$1.Menu, {
    role: menuRole,
    rootCloseEvent: rootCloseEvent
  }, children));
});
DropdownButton.displayName = 'DropdownButton';
DropdownButton.propTypes = propTypes$4;

var createChainableTypeChecker_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createChainableTypeChecker;
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

// Mostly taken from ReactPropTypes.

function createChainableTypeChecker(validate) {
  function checkType(isRequired, props, propName, componentName, location, propFullName) {
    var componentNameSafe = componentName || '<<anonymous>>';
    var propFullNameSafe = propFullName || propName;

    if (props[propName] == null) {
      if (isRequired) {
        return new Error('Required ' + location + ' `' + propFullNameSafe + '` was not specified ' + ('in `' + componentNameSafe + '`.'));
      }

      return null;
    }

    for (var _len = arguments.length, args = Array(_len > 6 ? _len - 6 : 0), _key = 6; _key < _len; _key++) {
      args[_key - 6] = arguments[_key];
    }

    return validate.apply(undefined, [props, propName, componentNameSafe, location, propFullNameSafe].concat(args));
  }

  var chainedCheckType = checkType.bind(null, false);
  chainedCheckType.isRequired = checkType.bind(null, true);

  return chainedCheckType;
}
module.exports = exports['default'];
});

unwrapExports(createChainableTypeChecker_1);

var all_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = all;



var _createChainableTypeChecker2 = _interopRequireDefault(createChainableTypeChecker_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function all() {
  for (var _len = arguments.length, validators = Array(_len), _key = 0; _key < _len; _key++) {
    validators[_key] = arguments[_key];
  }

  function allPropTypes() {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    var error = null;

    validators.forEach(function (validator) {
      if (error != null) {
        return;
      }

      var result = validator.apply(undefined, args);
      if (result != null) {
        error = result;
      }
    });

    return error;
  }

  return (0, _createChainableTypeChecker2.default)(allPropTypes);
}
module.exports = exports['default'];
});

unwrapExports(all_1);

var propTypes$5 = {
  /**
   * Specify whether the feedback is for valid or invalid fields
   *
   * @type {('valid'|'invalid')}
   */
  type: PropTypes.string.isRequired,
  as: PropTypes.elementType
};
var defaultProps$i = {
  type: 'valid'
};
var Feedback = React__default.forwardRef( // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
function (_ref, ref) {
  var _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'div' : _ref$as,
      className = _ref.className,
      type = _ref.type,
      props = _objectWithoutPropertiesLoose(_ref, ["as", "className", "type"]);

  return React__default.createElement(Component, _extends({}, props, {
    ref: ref,
    className: classnames(className, type && type + "-feedback")
  }));
});
Feedback.displayName = 'Feedback';
Feedback.propTypes = propTypes$5;
Feedback.defaultProps = defaultProps$i;

var FormContext = React__default.createContext({
  controlId: undefined
});

var defaultProps$j = {
  type: 'checkbox'
};
var FormCheckInput = React__default.forwardRef(function (_ref, ref) {
  var id = _ref.id,
      bsPrefix = _ref.bsPrefix,
      bsCustomPrefix = _ref.bsCustomPrefix,
      className = _ref.className,
      isValid = _ref.isValid,
      isInvalid = _ref.isInvalid,
      isStatic = _ref.isStatic,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'input' : _ref$as,
      props = _objectWithoutPropertiesLoose(_ref, ["id", "bsPrefix", "bsCustomPrefix", "className", "isValid", "isInvalid", "isStatic", "as"]);

  var _useContext = React.useContext(FormContext),
      controlId = _useContext.controlId,
      custom = _useContext.custom;

  bsPrefix = custom ? useBootstrapPrefix(bsCustomPrefix, 'custom-control-input') : useBootstrapPrefix(bsPrefix, 'form-check-input');
  return React__default.createElement(Component, _extends({}, props, {
    ref: ref,
    id: id || controlId,
    className: classnames(className, bsPrefix, isValid && 'is-valid', isInvalid && 'is-invalid', isStatic && 'position-static')
  }));
});
FormCheckInput.displayName = 'FormCheckInput';
FormCheckInput.defaultProps = defaultProps$j;

var FormCheckLabel = React__default.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      bsCustomPrefix = _ref.bsCustomPrefix,
      className = _ref.className,
      htmlFor = _ref.htmlFor,
      props = _objectWithoutPropertiesLoose(_ref, ["bsPrefix", "bsCustomPrefix", "className", "htmlFor"]);

  var _useContext = React.useContext(FormContext),
      controlId = _useContext.controlId,
      custom = _useContext.custom;

  bsPrefix = custom ? useBootstrapPrefix(bsCustomPrefix, 'custom-control-label') : useBootstrapPrefix(bsPrefix, 'form-check-label');
  return React__default.createElement("label", _extends({}, props, {
    ref: ref,
    htmlFor: htmlFor || controlId,
    className: classnames(className, bsPrefix)
  }));
});
FormCheckLabel.displayName = 'FormCheckLabel';

var defaultProps$k = {
  type: 'checkbox',
  inline: false,
  disabled: false,
  isValid: false,
  isInvalid: false,
  title: ''
};
var FormCheck = React__default.forwardRef(function (_ref, ref) {
  var id = _ref.id,
      bsPrefix = _ref.bsPrefix,
      bsCustomPrefix = _ref.bsCustomPrefix,
      inline = _ref.inline,
      disabled = _ref.disabled,
      isValid = _ref.isValid,
      isInvalid = _ref.isInvalid,
      feedback = _ref.feedback,
      className = _ref.className,
      style = _ref.style,
      title = _ref.title,
      type = _ref.type,
      label = _ref.label,
      children = _ref.children,
      propCustom = _ref.custom,
      _ref$as = _ref.as,
      as = _ref$as === void 0 ? 'input' : _ref$as,
      props = _objectWithoutPropertiesLoose(_ref, ["id", "bsPrefix", "bsCustomPrefix", "inline", "disabled", "isValid", "isInvalid", "feedback", "className", "style", "title", "type", "label", "children", "custom", "as"]);

  var custom = type === 'switch' ? true : propCustom;
  bsPrefix = custom ? useBootstrapPrefix(bsCustomPrefix, 'custom-control') : useBootstrapPrefix(bsPrefix, 'form-check');

  var _useContext = React.useContext(FormContext),
      controlId = _useContext.controlId;

  var innerFormContext = React.useMemo(function () {
    return {
      controlId: id || controlId,
      custom: custom
    };
  }, [controlId, custom, id]);
  var hasLabel = label != null && label !== false && !children;
  var input = React__default.createElement(FormCheckInput, _extends({}, props, {
    type: type === 'switch' ? 'checkbox' : type,
    ref: ref,
    isValid: isValid,
    isInvalid: isInvalid,
    isStatic: !hasLabel,
    disabled: disabled,
    as: as
  }));
  return React__default.createElement(FormContext.Provider, {
    value: innerFormContext
  }, React__default.createElement("div", {
    style: style,
    className: classnames(className, bsPrefix, custom && "custom-" + type, inline && bsPrefix + "-inline")
  }, children || React__default.createElement(React__default.Fragment, null, input, hasLabel && React__default.createElement(FormCheckLabel, {
    title: title
  }, label), (isValid || isInvalid) && React__default.createElement(Feedback, {
    type: isValid ? 'valid' : 'invalid'
  }, feedback))));
});
FormCheck.displayName = 'FormCheck';
FormCheck.defaultProps = defaultProps$k;
FormCheck.Input = FormCheckInput;
FormCheck.Label = FormCheckLabel;

var FormControl = React__default.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      type = _ref.type,
      size = _ref.size,
      id = _ref.id,
      className = _ref.className,
      isValid = _ref.isValid,
      isInvalid = _ref.isInvalid,
      plaintext = _ref.plaintext,
      readOnly = _ref.readOnly,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'input' : _ref$as,
      props = _objectWithoutPropertiesLoose(_ref, ["bsPrefix", "type", "size", "id", "className", "isValid", "isInvalid", "plaintext", "readOnly", "as"]);

  var _useContext = React.useContext(FormContext),
      controlId = _useContext.controlId;

  bsPrefix = useBootstrapPrefix(bsPrefix, 'form-control');
  var classes;

  if (plaintext) {
    var _classes;

    classes = (_classes = {}, _classes[bsPrefix + "-plaintext"] = true, _classes);
  } else if (type === 'file') {
    var _classes2;

    classes = (_classes2 = {}, _classes2[bsPrefix + "-file"] = true, _classes2);
  } else {
    var _classes3;

    classes = (_classes3 = {}, _classes3[bsPrefix] = true, _classes3[bsPrefix + "-" + size] = size, _classes3);
  }

  process.env.NODE_ENV !== "production" ? warning_1(controlId == null || !id, '`controlId` is ignored on `<FormControl>` when `id` is specified.') : void 0;
  return React__default.createElement(Component, _extends({}, props, {
    type: type,
    ref: ref,
    readOnly: readOnly,
    id: id || controlId,
    className: classnames(className, classes, isValid && "is-valid", isInvalid && "is-invalid")
  }));
});
FormControl.displayName = 'FormControl';
FormControl.Feedback = Feedback;

var FormGroup = React__default.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      children = _ref.children,
      controlId = _ref.controlId,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'div' : _ref$as,
      props = _objectWithoutPropertiesLoose(_ref, ["bsPrefix", "className", "children", "controlId", "as"]);

  bsPrefix = useBootstrapPrefix(bsPrefix, 'form-group');
  var context = React.useMemo(function () {
    return {
      controlId: controlId
    };
  }, [controlId]);
  return React__default.createElement(FormContext.Provider, {
    value: context
  }, React__default.createElement(Component, _extends({}, props, {
    ref: ref,
    className: classnames(className, bsPrefix)
  }), children));
});
FormGroup.displayName = 'FormGroup';

var defaultProps$l = {
  column: false,
  srOnly: false
};
var FormLabel = React__default.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      column = _ref.column,
      srOnly = _ref.srOnly,
      className = _ref.className,
      htmlFor = _ref.htmlFor,
      props = _objectWithoutPropertiesLoose(_ref, ["bsPrefix", "column", "srOnly", "className", "htmlFor"]);

  var _useContext = React.useContext(FormContext),
      controlId = _useContext.controlId;

  bsPrefix = useBootstrapPrefix(bsPrefix, 'form-label');
  var classes = classnames(className, bsPrefix, srOnly && 'sr-only', column && 'col-form-label');
  process.env.NODE_ENV !== "production" ? warning_1(controlId == null || !htmlFor, '`controlId` is ignored on `<FormLabel>` when `htmlFor` is specified.') : void 0;
  htmlFor = htmlFor || controlId;
  if (column) return React__default.createElement(Col, _extends({
    as: "label",
    className: classes,
    htmlFor: htmlFor
  }, props));
  return (// eslint-disable-next-line jsx-a11y/label-has-for, jsx-a11y/label-has-associated-control
    React__default.createElement("label", _extends({
      ref: ref,
      className: classes,
      htmlFor: htmlFor
    }, props))
  );
});
FormLabel.displayName = 'FormLabel';
FormLabel.defaultProps = defaultProps$l;

var FormText = React__default.forwardRef( // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'small' : _ref$as,
      muted = _ref.muted,
      props = _objectWithoutPropertiesLoose(_ref, ["bsPrefix", "className", "as", "muted"]);

  bsPrefix = useBootstrapPrefix(bsPrefix, 'form-text');
  return React__default.createElement(Component, _extends({}, props, {
    ref: ref,
    className: classnames(className, bsPrefix, muted && 'text-muted')
  }));
});
FormText.displayName = 'FormText';

var Switch = React__default.forwardRef(function (props, ref) {
  return React__default.createElement(FormCheck, _extends({}, props, {
    ref: ref,
    type: "switch"
  }));
});
Switch.displayName = 'Switch';
Switch.Input = FormCheck.Input;
Switch.Label = FormCheck.Label;

var defaultProps$m = {
  inline: false
};
var Form = React__default.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      inline = _ref.inline,
      className = _ref.className,
      validated = _ref.validated,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'form' : _ref$as,
      props = _objectWithoutPropertiesLoose(_ref, ["bsPrefix", "inline", "className", "validated", "as"]);

  bsPrefix = useBootstrapPrefix(bsPrefix, 'form');
  return React__default.createElement(Component, _extends({}, props, {
    ref: ref,
    className: classnames(className, validated && 'was-validated', inline && bsPrefix + "-inline")
  }));
});
Form.displayName = 'Form';
Form.defaultProps = defaultProps$m;
Form.Row = createWithBsPrefix('form-row');
Form.Group = FormGroup;
Form.Control = FormControl;
Form.Check = FormCheck;
Form.Switch = Switch;
Form.Label = FormLabel;
Form.Text = FormText;

var defaultProps$n = {
  fluid: false
};
var Container = React__default.forwardRef( // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      fluid = _ref.fluid,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'div' : _ref$as,
      className = _ref.className,
      props = _objectWithoutPropertiesLoose(_ref, ["bsPrefix", "fluid", "as", "className"]);

  var prefix = useBootstrapPrefix(bsPrefix, 'container');
  return React__default.createElement(Component, _extends({
    ref: ref
  }, props, {
    className: classnames(className, fluid ? prefix + "-fluid" : prefix)
  }));
});
Container.displayName = 'Container';
Container.defaultProps = defaultProps$n;

var defaultProps$o = {
  fluid: false,
  rounded: false,
  roundedCircle: false,
  thumbnail: false
};
var Image = React__default.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      fluid = _ref.fluid,
      rounded = _ref.rounded,
      roundedCircle = _ref.roundedCircle,
      thumbnail = _ref.thumbnail,
      props = _objectWithoutPropertiesLoose(_ref, ["bsPrefix", "className", "fluid", "rounded", "roundedCircle", "thumbnail"]);

  bsPrefix = useBootstrapPrefix(bsPrefix, 'img');
  var classes = classnames(fluid && bsPrefix + "-fluid", rounded && "rounded", roundedCircle && "rounded-circle", thumbnail && bsPrefix + "-thumbnail");
  return React__default.createElement("img", _extends({
    // eslint-disable-line jsx-a11y/alt-text
    ref: ref
  }, props, {
    className: classnames(className, classes)
  }));
});
Image.displayName = 'Image';
Image.defaultProps = defaultProps$o;

var propTypes$6 = {
  /**
   * @default 'img'
   */
  bsPrefix: PropTypes.string,

  /**
   * Sets image as fluid image.
   */
  fluid: PropTypes.bool,

  /**
   * Sets image shape as rounded.
   */
  rounded: PropTypes.bool,

  /**
   * Sets image shape as circle.
   */
  roundedCircle: PropTypes.bool,

  /**
   * Sets image shape as thumbnail.
   */
  thumbnail: PropTypes.bool
};
var defaultProps$p = {
  fluid: true
};
var FigureImage = React__default.forwardRef(function (_ref, ref) {
  var className = _ref.className,
      props = _objectWithoutPropertiesLoose(_ref, ["className"]);

  return React__default.createElement(Image, _extends({
    ref: ref
  }, props, {
    className: classnames(className, 'figure-img')
  }));
});
FigureImage.displayName = 'FigureImage';
FigureImage.propTypes = propTypes$6;
FigureImage.defaultProps = defaultProps$p;

var FigureCaption = createWithBsPrefix('figure-caption', {
  Component: 'figcaption'
});

var Figure = createWithBsPrefix('figure', {
  Component: 'figure'
});
Figure.Image = FigureImage;
Figure.Caption = FigureCaption;

/**
 *
 * @property {InputGroupAppend} Append
 * @property {InputGroupPrepend} Prepend
 * @property {InputGroupText} Text
 * @property {InputGroupRadio} Radio
 * @property {InputGroupCheckbox} Checkbox
 */
var InputGroup = React__default.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      size = _ref.size,
      className = _ref.className,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'div' : _ref$as,
      props = _objectWithoutPropertiesLoose(_ref, ["bsPrefix", "size", "className", "as"]);

  bsPrefix = useBootstrapPrefix(bsPrefix, 'input-group');
  return React__default.createElement(Component, _extends({
    ref: ref
  }, props, {
    className: classnames(className, bsPrefix, size && bsPrefix + "-" + size)
  }));
});
var InputGroupAppend = createWithBsPrefix('input-group-append');
var InputGroupPrepend = createWithBsPrefix('input-group-prepend');
var InputGroupText = createWithBsPrefix('input-group-text', {
  Component: 'span'
});

var InputGroupCheckbox = function InputGroupCheckbox(props) {
  return React__default.createElement(InputGroupText, null, React__default.createElement("input", _extends({
    type: "checkbox"
  }, props)));
};

var InputGroupRadio = function InputGroupRadio(props) {
  return React__default.createElement(InputGroupText, null, React__default.createElement("input", _extends({
    type: "radio"
  }, props)));
};

InputGroup.displayName = 'InputGroup';
InputGroup.Text = InputGroupText;
InputGroup.Radio = InputGroupRadio;
InputGroup.Checkbox = InputGroupCheckbox;
InputGroup.Append = InputGroupAppend;
InputGroup.Prepend = InputGroupPrepend;

var defaultProps$q = {
  fluid: false
};
var Jumbotron = React__default.forwardRef(function (_ref, ref) {
  var _classes;

  var _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'div' : _ref$as,
      className = _ref.className,
      fluid = _ref.fluid,
      bsPrefix = _ref.bsPrefix,
      props = _objectWithoutPropertiesLoose(_ref, ["as", "className", "fluid", "bsPrefix"]);

  bsPrefix = useBootstrapPrefix(bsPrefix, 'jumbotron');
  var classes = (_classes = {}, _classes[bsPrefix] = true, _classes[bsPrefix + "-fluid"] = fluid, _classes);
  return React__default.createElement(Component, _extends({
    ref: ref
  }, props, {
    className: classnames(className, classes)
  }));
});
Jumbotron.defaultProps = defaultProps$q;
Jumbotron.displayName = 'Jumbotron';

var TabContext = React__default.createContext(null);

var noop$3 = function noop() {};

var AbstractNav = React__default.forwardRef(function (_ref, ref) {
  var _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'ul' : _ref$as,
      onSelect = _ref.onSelect,
      activeKey = _ref.activeKey,
      role = _ref.role,
      onKeyDown = _ref.onKeyDown,
      props = _objectWithoutPropertiesLoose(_ref, ["as", "onSelect", "activeKey", "role", "onKeyDown"]);

  // A ref and forceUpdate for refocus, b/c we only want to trigger when needed
  // and don't want to reset the set in the effect
  var forceUpdate = useForceUpdate();
  var needsRefocusRef = React.useRef(false);
  var parentOnSelect = React.useContext(SelectableContext);
  var tabContext = React.useContext(TabContext);
  var getControlledId, getControllerId;

  if (tabContext) {
    role = role || 'tablist';
    activeKey = tabContext.activeKey;
    getControlledId = tabContext.getControlledId;
    getControllerId = tabContext.getControllerId;
  }

  var listNode = React.useRef(null);

  var getNextActiveChild = function getNextActiveChild(offset) {
    if (!listNode.current) return null;
    var items = qsa(listNode.current, '[data-rb-event-key]:not(.disabled)');
    var activeChild = listNode.current.querySelector('.active');
    var index = items.indexOf(activeChild);
    if (index === -1) return null;
    var nextIndex = index + offset;
    if (nextIndex >= items.length) nextIndex = 0;
    if (nextIndex < 0) nextIndex = items.length - 1;
    return items[nextIndex];
  };

  var handleSelect = function handleSelect(key, event) {
    if (key == null) return;
    if (onSelect) onSelect(key, event);
    if (parentOnSelect) parentOnSelect(key, event);
  };

  var handleKeyDown = function handleKeyDown(event) {
    if (onKeyDown) onKeyDown(event);
    var nextActiveChild;

    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        nextActiveChild = getNextActiveChild(-1);
        break;

      case 'ArrowRight':
      case 'ArrowDown':
        nextActiveChild = getNextActiveChild(1);
        break;

      default:
        return;
    }

    if (!nextActiveChild) return;
    event.preventDefault();
    handleSelect(nextActiveChild.dataset.rbEventKey, event);
    needsRefocusRef.current = true;
    forceUpdate();
  };

  React.useEffect(function () {
    if (listNode.current && needsRefocusRef.current) {
      var activeChild = listNode.current.querySelector('[data-rb-event-key].active');
      if (activeChild) activeChild.focus();
    }

    needsRefocusRef.current = false;
  });
  var mergedRef = useMergedRefs(ref, listNode);
  return React__default.createElement(SelectableContext.Provider, {
    value: handleSelect
  }, React__default.createElement(NavContext.Provider, {
    value: {
      role: role,
      // used by NavLink to determine it's role
      activeKey: makeEventKey(activeKey),
      getControlledId: getControlledId || noop$3,
      getControllerId: getControllerId || noop$3
    }
  }, React__default.createElement(Component, _extends({}, props, {
    onKeyDown: handleKeyDown,
    ref: mergedRef,
    role: role
  }))));
});

var defaultProps$r = {
  disabled: false
};
var AbstractNavItem = React__default.forwardRef(function (_ref, ref) {
  var active = _ref.active,
      className = _ref.className,
      tabIndex = _ref.tabIndex,
      eventKey = _ref.eventKey,
      onSelect = _ref.onSelect,
      onClick = _ref.onClick,
      Component = _ref.as,
      props = _objectWithoutPropertiesLoose(_ref, ["active", "className", "tabIndex", "eventKey", "onSelect", "onClick", "as"]);

  var navKey = makeEventKey(eventKey, props.href);
  var parentOnSelect = React.useContext(SelectableContext);
  var navContext = React.useContext(NavContext);
  var isActive = active;

  if (navContext) {
    if (!props.role && navContext.role === 'tablist') props.role = 'tab';
    props['data-rb-event-key'] = navKey;
    props.id = navContext.getControllerId(navKey);
    props['aria-controls'] = navContext.getControlledId(navKey);
    isActive = active == null && navKey != null ? navContext.activeKey === navKey : active;
  }

  if (props.role === 'tab') {
    props.tabIndex = isActive ? tabIndex : -1;
    props['aria-selected'] = isActive;
  }

  var handleOnclick = useEventCallback(function (e) {
    if (onClick) onClick(e);
    if (navKey == null) return;
    if (onSelect) onSelect(navKey, e);
    if (parentOnSelect) parentOnSelect(navKey, e);
  });
  return React__default.createElement(Component, _extends({}, props, {
    ref: ref,
    onClick: handleOnclick,
    className: classnames(className, isActive && 'active')
  }));
});
AbstractNavItem.defaultProps = defaultProps$r;

var defaultProps$s = {
  variant: null,
  active: false,
  disabled: false
};
var ListGroupItem = React__default.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      active = _ref.active,
      disabled = _ref.disabled,
      className = _ref.className,
      variant = _ref.variant,
      action = _ref.action,
      as = _ref.as,
      eventKey = _ref.eventKey,
      onClick = _ref.onClick,
      props = _objectWithoutPropertiesLoose(_ref, ["bsPrefix", "active", "disabled", "className", "variant", "action", "as", "eventKey", "onClick"]);

  bsPrefix = useBootstrapPrefix(bsPrefix, 'list-group-item');
  var handleClick = React.useCallback(function (event) {
    if (disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    if (onClick) onClick(event);
  }, [disabled, onClick]);
  return React__default.createElement(AbstractNavItem, _extends({
    ref: ref
  }, props, {
    eventKey: makeEventKey(eventKey, props.href) // eslint-disable-next-line
    ,
    as: as || (action ? props.href ? 'a' : 'button' : 'div'),
    onClick: handleClick,
    className: classnames(className, bsPrefix, active && 'active', disabled && 'disabled', variant && bsPrefix + "-" + variant, action && bsPrefix + "-action")
  }));
});
ListGroupItem.defaultProps = defaultProps$s;
ListGroupItem.displayName = 'ListGroupItem';

var defaultProps$t = {
  variant: null,
  horizontal: null
};
var ListGroup = React__default.forwardRef(function (props, ref) {
  var _useUncontrolled = useUncontrolled(props, {
    activeKey: 'onSelect'
  }),
      className = _useUncontrolled.className,
      bsPrefix = _useUncontrolled.bsPrefix,
      variant = _useUncontrolled.variant,
      horizontal = _useUncontrolled.horizontal,
      _useUncontrolled$as = _useUncontrolled.as,
      as = _useUncontrolled$as === void 0 ? 'div' : _useUncontrolled$as,
      controlledProps = _objectWithoutPropertiesLoose(_useUncontrolled, ["className", "bsPrefix", "variant", "horizontal", "as"]);

  bsPrefix = useBootstrapPrefix(bsPrefix, 'list-group');
  var horizontalVariant;

  if (horizontal) {
    horizontalVariant = horizontal === true ? 'horizontal' : "horizontal-" + horizontal;
  } else {
    horizontalVariant = null;
  }

  process.env.NODE_ENV !== "production" ? warning_1(!(horizontal && variant === 'flush'), '`variant="flush"` and `horizontal` should not be used together.') : void 0;
  return React__default.createElement(AbstractNav, _extends({
    ref: ref
  }, controlledProps, {
    as: as,
    className: classnames(className, bsPrefix, variant && bsPrefix + "-" + variant, horizontalVariant && bsPrefix + "-" + horizontalVariant)
  }));
});
ListGroup.defaultProps = defaultProps$t;
ListGroup.displayName = 'ListGroup';
ListGroup.Item = ListGroupItem;

var Media = React__default.forwardRef( // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'div' : _ref$as,
      props = _objectWithoutPropertiesLoose(_ref, ["bsPrefix", "className", "as"]);

  var prefix = useBootstrapPrefix(bsPrefix, 'media');
  return React__default.createElement(Component, _extends({}, props, {
    ref: ref,
    className: classnames(className, prefix)
  }));
});
Media.displayName = 'Media';
Media.Body = createWithBsPrefix('media-body');

var size;
function scrollbarSize(recalc) {
  if (!size && size !== 0 || recalc) {
    if (canUseDOM) {
      var scrollDiv = document.createElement('div');
      scrollDiv.style.position = 'absolute';
      scrollDiv.style.top = '-9999px';
      scrollDiv.style.width = '50px';
      scrollDiv.style.height = '50px';
      scrollDiv.style.overflow = 'scroll';
      document.body.appendChild(scrollDiv);
      size = scrollDiv.offsetWidth - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
    }
  }

  return size;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

/**
 * Return the actively focused element safely.
 *
 * @param doc the document to checl
 */

function activeElement(doc) {
  if (doc === void 0) {
    doc = ownerDocument();
  }

  // Support: IE 9 only
  // IE9 throws an "Unspecified error" accessing document.activeElement from an <iframe>
  try {
    var active = doc.activeElement; // IE11 returns a seemingly empty object in some cases when accessing
    // document.activeElement from an <iframe>

    if (!active || !active.nodeName) return null;
    return active;
  } catch (e) {
    /* ie throws if no active element */
    return doc.body;
  }
}

function hasClass(element, className) {
  if (element.classList) return !!className && element.classList.contains(className);
  return (" " + (element.className.baseVal || element.className) + " ").indexOf(" " + className + " ") !== -1;
}

function addClass(element, className) {
  if (element.classList) element.classList.add(className);else if (!hasClass(element, className)) if (typeof element.className === 'string') element.className = element.className + " " + className;else element.setAttribute('class', (element.className && element.className.baseVal || '') + " " + className);
}

function replaceClassName(origClass, classToRemove) {
  return origClass.replace(new RegExp("(^|\\s)" + classToRemove + "(?:\\s|$)", 'g'), '$1').replace(/\s+/g, ' ').replace(/^\s*|\s*$/g, '');
}

function removeClass(element, className) {
  if (element.classList) {
    element.classList.remove(className);
  } else if (typeof element.className === 'string') {
    element.className = replaceClassName(element.className, className);
  } else {
    element.setAttribute('class', replaceClassName(element.className && element.className.baseVal || '', className));
  }
}

function isDocument(element) {
  return 'nodeType' in element && element.nodeType === document.DOCUMENT_NODE;
}

function isWindow(node) {
  if ('window' in node && node.window === node) return node;
  if (isDocument(node)) return node.defaultView || false;
  return false;
}

function isBody(node) {
  return node && node.tagName.toLowerCase() === 'body';
}

function bodyIsOverflowing(node) {
  var doc = ownerDocument(node);
  var win = isWindow(doc);
  return doc.body.clientWidth < win.innerWidth;
}

function isOverflowing(container) {
  var win = isWindow(container);
  return win || isBody(container) ? bodyIsOverflowing(container) : container.scrollHeight > container.clientHeight;
}

var BLACKLIST = ['template', 'script', 'style'];

var isHidable = function isHidable(_ref) {
  var nodeType = _ref.nodeType,
      tagName = _ref.tagName;
  return nodeType === 1 && BLACKLIST.indexOf(tagName.toLowerCase()) === -1;
};

var siblings = function siblings(container, exclude, cb) {
  exclude = [].concat(exclude);
  [].forEach.call(container.children, function (node) {
    if (exclude.indexOf(node) === -1 && isHidable(node)) {
      cb(node);
    }
  });
};

function ariaHidden(show, node) {
  if (!node) return;

  if (show) {
    node.setAttribute('aria-hidden', 'true');
  } else {
    node.removeAttribute('aria-hidden');
  }
}
function hideSiblings(container, _ref2) {
  var dialog = _ref2.dialog,
      backdrop = _ref2.backdrop;
  siblings(container, [dialog, backdrop], function (node) {
    return ariaHidden(true, node);
  });
}
function showSiblings(container, _ref3) {
  var dialog = _ref3.dialog,
      backdrop = _ref3.backdrop;
  siblings(container, [dialog, backdrop], function (node) {
    return ariaHidden(false, node);
  });
}

function findIndexOf(arr, cb) {
  var idx = -1;
  arr.some(function (d, i) {
    if (cb(d, i)) {
      idx = i;
      return true;
    }

    return false;
  });
  return idx;
}
/**
 * Proper state management for containers and the modals in those containers.
 *
 * @internal Used by the Modal to ensure proper styling of containers.
 */


var ModalManager =
/*#__PURE__*/
function () {
  function ModalManager(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$hideSiblingNodes = _ref.hideSiblingNodes,
        hideSiblingNodes = _ref$hideSiblingNodes === void 0 ? true : _ref$hideSiblingNodes,
        _ref$handleContainerO = _ref.handleContainerOverflow,
        handleContainerOverflow = _ref$handleContainerO === void 0 ? true : _ref$handleContainerO;

    this.hideSiblingNodes = hideSiblingNodes;
    this.handleContainerOverflow = handleContainerOverflow;
    this.modals = [];
    this.containers = [];
    this.data = [];
    this.scrollbarSize = scrollbarSize();
  }

  var _proto = ModalManager.prototype;

  _proto.isContainerOverflowing = function isContainerOverflowing(modal) {
    var data = this.data[this.containerIndexFromModal(modal)];
    return data && data.overflowing;
  };

  _proto.containerIndexFromModal = function containerIndexFromModal(modal) {
    return findIndexOf(this.data, function (d) {
      return d.modals.indexOf(modal) !== -1;
    });
  };

  _proto.setContainerStyle = function setContainerStyle(containerState, container) {
    var style$$1 = {
      overflow: 'hidden'
    }; // we are only interested in the actual `style` here
    // because we will override it

    containerState.style = {
      overflow: container.style.overflow,
      paddingRight: container.style.paddingRight
    };

    if (containerState.overflowing) {
      // use computed style, here to get the real padding
      // to add our scrollbar width
      style$$1.paddingRight = parseInt(style(container, 'paddingRight') || 0, 10) + this.scrollbarSize + "px";
    }

    style(container, style$$1);
  };

  _proto.removeContainerStyle = function removeContainerStyle(containerState, container) {
    var style$$1 = containerState.style;
    Object.keys(style$$1).forEach(function (key) {
      container.style[key] = style$$1[key];
    });
  };

  _proto.add = function add(modal, container, className) {
    var modalIdx = this.modals.indexOf(modal);
    var containerIdx = this.containers.indexOf(container);

    if (modalIdx !== -1) {
      return modalIdx;
    }

    modalIdx = this.modals.length;
    this.modals.push(modal);

    if (this.hideSiblingNodes) {
      hideSiblings(container, modal);
    }

    if (containerIdx !== -1) {
      this.data[containerIdx].modals.push(modal);
      return modalIdx;
    }

    var data = {
      modals: [modal],
      // right now only the first modal of a container will have its classes applied
      classes: className ? className.split(/\s+/) : [],
      overflowing: isOverflowing(container)
    };

    if (this.handleContainerOverflow) {
      this.setContainerStyle(data, container);
    }

    data.classes.forEach(addClass.bind(null, container));
    this.containers.push(container);
    this.data.push(data);
    return modalIdx;
  };

  _proto.remove = function remove(modal) {
    var modalIdx = this.modals.indexOf(modal);

    if (modalIdx === -1) {
      return;
    }

    var containerIdx = this.containerIndexFromModal(modal);
    var data = this.data[containerIdx];
    var container = this.containers[containerIdx];
    data.modals.splice(data.modals.indexOf(modal), 1);
    this.modals.splice(modalIdx, 1); // if that was the last modal in a container,
    // clean up the container

    if (data.modals.length === 0) {
      data.classes.forEach(removeClass.bind(null, container));

      if (this.handleContainerOverflow) {
        this.removeContainerStyle(data, container);
      }

      if (this.hideSiblingNodes) {
        showSiblings(container, modal);
      }

      this.containers.splice(containerIdx, 1);
      this.data.splice(containerIdx, 1);
    } else if (this.hideSiblingNodes) {
      // otherwise make sure the next top modal is visible to a SR
      var _data$modals = data.modals[data.modals.length - 1],
          backdrop = _data$modals.backdrop,
          dialog = _data$modals.dialog;
      ariaHidden(false, dialog);
      ariaHidden(false, backdrop);
    }
  };

  _proto.isTopModal = function isTopModal(modal) {
    return !!this.modals.length && this.modals[this.modals.length - 1] === modal;
  };

  return ModalManager;
}();

function ownerDocument$1 (componentOrElement) {
  return ownerDocument(ReactDOM__default.findDOMNode(componentOrElement));
}

var resolveRef = function resolveRef(ref) {
  if (typeof document === 'undefined') return undefined;
  if (ref == null) return ownerDocument().body;
  if (typeof ref === 'function') ref = ref();
  if (ref && ref.current) ref = ref.current;
  if (ref && ref.nodeType) return ref;
  return null;
};

function useWaitForDOMRef(ref, onResolved) {
  var _useState = React.useState(function () {
    return resolveRef(ref);
  }),
      resolvedRef = _useState[0],
      setRef = _useState[1];

  if (!resolvedRef) {
    var earlyRef = resolveRef(ref);
    if (earlyRef) setRef(earlyRef);
  }

  React.useEffect(function () {
    if (onResolved && resolvedRef) {
      onResolved(resolvedRef);
    }
  }, [onResolved, resolvedRef]);
  React.useEffect(function () {
    var nextRef = resolveRef(ref);

    if (nextRef !== resolvedRef) {
      setRef(nextRef);
    }
  }, [ref, resolvedRef]);
  return resolvedRef;
}

var modalManager = new ModalManager();

function omitProps(props, propTypes) {
  var keys = Object.keys(props);
  var newProps = {};
  keys.forEach(function (prop) {
    if (!Object.prototype.hasOwnProperty.call(propTypes, prop)) {
      newProps[prop] = props[prop];
    }
  });
  return newProps;
}
/**
 * Love them or hate them, `<Modal />` provides a solid foundation for creating dialogs, lightboxes, or whatever else.
 * The Modal component renders its `children` node in front of a backdrop component.
 *
 * The Modal offers a few helpful features over using just a `<Portal/>` component and some styles:
 *
 * - Manages dialog stacking when one-at-a-time just isn't enough.
 * - Creates a backdrop, for disabling interaction below the modal.
 * - It properly manages focus; moving to the modal content, and keeping it there until the modal is closed.
 * - It disables scrolling of the page content while open.
 * - Adds the appropriate ARIA roles are automatically.
 * - Easily pluggable animations via a `<Transition/>` component.
 *
 * Note that, in the same way the backdrop element prevents users from clicking or interacting
 * with the page content underneath the Modal, Screen readers also need to be signaled to not to
 * interact with page content while the Modal is open. To do this, we use a common technique of applying
 * the `aria-hidden='true'` attribute to the non-Modal elements in the Modal `container`. This means that for
 * a Modal to be truly modal, it should have a `container` that is _outside_ your app's
 * React hierarchy (such as the default: document.body).
 */


var Modal =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Modal, _React$Component);

  function Modal() {
    var _this;

    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(_args)) || this;
    _this.state = {
      exited: !_this.props.show
    };

    _this.onShow = function () {
      var _this$props = _this.props,
          container = _this$props.container,
          containerClassName = _this$props.containerClassName,
          manager = _this$props.manager,
          onShow = _this$props.onShow;
      manager.add(_assertThisInitialized(_this), container, containerClassName);
      _this.removeKeydownListener = listen(document, 'keydown', _this.handleDocumentKeyDown);
      _this.removeFocusListener = listen(document, 'focus', // the timeout is necessary b/c this will run before the new modal is mounted
      // and so steals focus from it
      function () {
        return setTimeout(_this.enforceFocus);
      }, true);

      if (onShow) {
        onShow();
      } // autofocus after onShow, to not trigger a focus event for previous
      // modals before this one is shown.


      _this.autoFocus();
    };

    _this.onHide = function () {
      _this.props.manager.remove(_assertThisInitialized(_this));

      _this.removeKeydownListener();

      _this.removeFocusListener();

      if (_this.props.restoreFocus) {
        _this.restoreLastFocus();
      }
    };

    _this.setDialogRef = function (ref) {
      _this.dialog = ref;
    };

    _this.setBackdropRef = function (ref) {
      _this.backdrop = ref && ReactDOM__default.findDOMNode(ref);
    };

    _this.handleHidden = function () {
      _this.setState({
        exited: true
      });

      _this.onHide();

      if (_this.props.onExited) {
        var _this$props2;

        (_this$props2 = _this.props).onExited.apply(_this$props2, arguments);
      }
    };

    _this.handleBackdropClick = function (e) {
      if (e.target !== e.currentTarget) {
        return;
      }

      if (_this.props.onBackdropClick) {
        _this.props.onBackdropClick(e);
      }

      if (_this.props.backdrop === true) {
        _this.props.onHide();
      }
    };

    _this.handleDocumentKeyDown = function (e) {
      if (_this.props.keyboard && e.keyCode === 27 && _this.isTopModal()) {
        if (_this.props.onEscapeKeyDown) {
          _this.props.onEscapeKeyDown(e);
        }

        _this.props.onHide();
      }
    };

    _this.enforceFocus = function () {
      if (!_this.props.enforceFocus || !_this._isMounted || !_this.isTopModal()) {
        return;
      }

      var currentActiveElement = activeElement(ownerDocument$1(_assertThisInitialized(_this)));

      if (_this.dialog && !contains(_this.dialog, currentActiveElement)) {
        _this.dialog.focus();
      }
    };

    _this.renderBackdrop = function () {
      var _this$props3 = _this.props,
          renderBackdrop = _this$props3.renderBackdrop,
          Transition = _this$props3.backdropTransition;
      var backdrop = renderBackdrop({
        ref: _this.setBackdropRef,
        onClick: _this.handleBackdropClick
      });

      if (Transition) {
        backdrop = React__default.createElement(Transition, {
          appear: true,
          "in": _this.props.show
        }, backdrop);
      }

      return backdrop;
    };

    return _this;
  }

  Modal.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps) {
    if (nextProps.show) {
      return {
        exited: false
      };
    }

    if (!nextProps.transition) {
      // Otherwise let handleHidden take care of marking exited.
      return {
        exited: true
      };
    }

    return null;
  };

  var _proto = Modal.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this._isMounted = true;

    if (this.props.show) {
      this.onShow();
    }
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var transition = this.props.transition;

    if (prevProps.show && !this.props.show && !transition) {
      // Otherwise handleHidden will call this.
      this.onHide();
    } else if (!prevProps.show && this.props.show) {
      this.onShow();
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    var _this$props4 = this.props,
        show = _this$props4.show,
        transition = _this$props4.transition;
    this._isMounted = false;

    if (show || transition && !this.state.exited) {
      this.onHide();
    }
  };

  _proto.getSnapshotBeforeUpdate = function getSnapshotBeforeUpdate(prevProps) {
    if (canUseDOM && !prevProps.show && this.props.show) {
      this.lastFocus = activeElement();
    }

    return null;
  };

  _proto.restoreLastFocus = function restoreLastFocus() {
    // Support: <=IE11 doesn't support `focus()` on svg elements (RB: #917)
    if (this.lastFocus && this.lastFocus.focus) {
      this.lastFocus.focus(this.props.restoreFocusOptions);
      this.lastFocus = null;
    }
  };

  _proto.autoFocus = function autoFocus() {
    if (!this.props.autoFocus) return;
    var currentActiveElement = activeElement(ownerDocument$1(this));

    if (this.dialog && !contains(this.dialog, currentActiveElement)) {
      this.lastFocus = currentActiveElement;
      this.dialog.focus();
    }
  };

  _proto.isTopModal = function isTopModal() {
    return this.props.manager.isTopModal(this);
  };

  _proto.render = function render() {
    var _this$props5 = this.props,
        show = _this$props5.show,
        container = _this$props5.container,
        children = _this$props5.children,
        renderDialog = _this$props5.renderDialog,
        _this$props5$role = _this$props5.role,
        role = _this$props5$role === void 0 ? 'dialog' : _this$props5$role,
        Transition = _this$props5.transition,
        backdrop = _this$props5.backdrop,
        className = _this$props5.className,
        style = _this$props5.style,
        onExit = _this$props5.onExit,
        onExiting = _this$props5.onExiting,
        onEnter = _this$props5.onEnter,
        onEntering = _this$props5.onEntering,
        onEntered = _this$props5.onEntered,
        props = _objectWithoutPropertiesLoose(_this$props5, ["show", "container", "children", "renderDialog", "role", "transition", "backdrop", "className", "style", "onExit", "onExiting", "onEnter", "onEntering", "onEntered"]);

    if (!(show || Transition && !this.state.exited)) {
      return null;
    }

    var dialogProps = _extends({
      role: role,
      ref: this.setDialogRef,
      // apparently only works on the dialog role element
      'aria-modal': role === 'dialog' ? true : undefined
    }, omitProps(props, Modal.propTypes), {
      style: style,
      className: className,
      tabIndex: '-1'
    });

    var dialog = renderDialog ? renderDialog(dialogProps) : React__default.createElement("div", dialogProps, React__default.cloneElement(children, {
      role: 'document'
    }));

    if (Transition) {
      dialog = React__default.createElement(Transition, {
        appear: true,
        unmountOnExit: true,
        "in": show,
        onExit: onExit,
        onExiting: onExiting,
        onExited: this.handleHidden,
        onEnter: onEnter,
        onEntering: onEntering,
        onEntered: onEntered
      }, dialog);
    }

    return ReactDOM__default.createPortal(React__default.createElement(React__default.Fragment, null, backdrop && this.renderBackdrop(), dialog), container);
  };

  return Modal;
}(React__default.Component); // dumb HOC for the sake react-docgen


Modal.propTypes = {
  /**
   * Set the visibility of the Modal
   */
  show: PropTypes.bool,

  /**
   * A DOM element, a `ref` to an element, or function that returns either. The Modal is appended to it's `container` element.
   *
   * For the sake of assistive technologies, the container should usually be the document body, so that the rest of the
   * page content can be placed behind a virtual backdrop as well as a visual one.
   */
  container: PropTypes.any,

  /**
   * A callback fired when the Modal is opening.
   */
  onShow: PropTypes.func,

  /**
   * A callback fired when either the backdrop is clicked, or the escape key is pressed.
   *
   * The `onHide` callback only signals intent from the Modal,
   * you must actually set the `show` prop to `false` for the Modal to close.
   */
  onHide: PropTypes.func,

  /**
   * Include a backdrop component.
   */
  backdrop: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['static'])]),

  /**
   * A function that returns the dialog component. Useful for custom
   * rendering. **Note:** the component should make sure to apply the provided ref.
   *
   * ```js
   *  renderDialog={props => <MyDialog {...props} />}
   * ```
   */
  renderDialog: PropTypes.func,

  /**
   * A function that returns a backdrop component. Useful for custom
   * backdrop rendering.
   *
   * ```js
   *  renderBackdrop={props => <MyBackdrop {...props} />}
   * ```
   */
  renderBackdrop: PropTypes.func,

  /**
   * A callback fired when the escape key, if specified in `keyboard`, is pressed.
   */
  onEscapeKeyDown: PropTypes.func,

  /**
   * A callback fired when the backdrop, if specified, is clicked.
   */
  onBackdropClick: PropTypes.func,

  /**
   * A css class or set of classes applied to the modal container when the modal is open,
   * and removed when it is closed.
   */
  containerClassName: PropTypes.string,

  /**
   * Close the modal when escape key is pressed
   */
  keyboard: PropTypes.bool,

  /**
   * A `react-transition-group@2.0.0` `<Transition/>` component used
   * to control animations for the dialog component.
   */
  transition: PropTypes.elementType,

  /**
   * A `react-transition-group@2.0.0` `<Transition/>` component used
   * to control animations for the backdrop components.
   */
  backdropTransition: PropTypes.elementType,

  /**
   * When `true` The modal will automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes. This also
   * works correctly with any Modal children that have the `autoFocus` prop.
   *
   * Generally this should never be set to `false` as it makes the Modal less
   * accessible to assistive technologies, like screen readers.
   */
  autoFocus: PropTypes.bool,

  /**
   * When `true` The modal will prevent focus from leaving the Modal while open.
   *
   * Generally this should never be set to `false` as it makes the Modal less
   * accessible to assistive technologies, like screen readers.
   */
  enforceFocus: PropTypes.bool,

  /**
   * When `true` The modal will restore focus to previously focused element once
   * modal is hidden
   */
  restoreFocus: PropTypes.bool,

  /**
   * Options passed to focus function when `restoreFocus` is set to `true`
   *
   * @link  https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#Parameters
   */
  restoreFocusOptions: PropTypes.shape({
    preventScroll: PropTypes.bool
  }),

  /**
   * Callback fired before the Modal transitions in
   */
  onEnter: PropTypes.func,

  /**
   * Callback fired as the Modal begins to transition in
   */
  onEntering: PropTypes.func,

  /**
   * Callback fired after the Modal finishes transitioning in
   */
  onEntered: PropTypes.func,

  /**
   * Callback fired right before the Modal transitions out
   */
  onExit: PropTypes.func,

  /**
   * Callback fired as the Modal begins to transition out
   */
  onExiting: PropTypes.func,

  /**
   * Callback fired after the Modal finishes transitioning out
   */
  onExited: PropTypes.func,

  /**
   * A ModalManager instance used to track and manage the state of open
   * Modals. Useful when customizing how modals interact within a container
   */
  manager: PropTypes.object.isRequired
};
Modal.defaultProps = {
  show: false,
  role: 'dialog',
  backdrop: true,
  keyboard: true,
  autoFocus: true,
  enforceFocus: true,
  restoreFocus: true,
  onHide: function onHide() {},
  manager: modalManager,
  renderBackdrop: function renderBackdrop(props) {
    return React__default.createElement("div", props);
  }
};

function forwardRef$1(Component) {
  // eslint-disable-next-line react/display-name
  var ModalWithContainer = React__default.forwardRef(function (props, ref) {
    var resolved = useWaitForDOMRef(props.container);
    return resolved ? React__default.createElement(Component, _extends({}, props, {
      ref: ref,
      container: resolved
    })) : null;
  });
  ModalWithContainer.Manager = ModalManager;
  ModalWithContainer._Inner = Component;
  return ModalWithContainer;
}

var ModalWithContainer = forwardRef$1(Modal);
ModalWithContainer.Manager = ModalManager;

var Selector = {
  FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
  STICKY_CONTENT: '.sticky-top',
  NAVBAR_TOGGLER: '.navbar-toggler'
};

var BootstrapModalManager =
/*#__PURE__*/
function (_ModalManager) {
  _inheritsLoose(BootstrapModalManager, _ModalManager);

  function BootstrapModalManager() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _ModalManager.call.apply(_ModalManager, [this].concat(args)) || this;

    _this.adjustAndStore = function (prop, element, adjust) {
      var _css;

      var actual = element.style[prop];
      element.dataset[prop] = actual;
      style(element, (_css = {}, _css[prop] = parseFloat(style(element, prop)) + adjust + "px", _css));
    };

    _this.restore = function (prop, element) {
      var value = element.dataset[prop];

      if (value !== undefined) {
        var _css2;

        delete element.dataset[prop];
        style(element, (_css2 = {}, _css2[prop] = value, _css2));
      }
    };

    return _this;
  }

  var _proto = BootstrapModalManager.prototype;

  _proto.setContainerStyle = function setContainerStyle(containerState, container) {
    var _this2 = this;

    _ModalManager.prototype.setContainerStyle.call(this, containerState, container);

    if (!containerState.overflowing) return;
    var size = scrollbarSize();
    qsa(container, Selector.FIXED_CONTENT).forEach(function (el) {
      return _this2.adjustAndStore('paddingRight', el, size);
    });
    qsa(container, Selector.STICKY_CONTENT).forEach(function (el) {
      return _this2.adjustAndStore('margingRight', el, -size);
    });
    qsa(container, Selector.NAVBAR_TOGGLER).forEach(function (el) {
      return _this2.adjustAndStore('margingRight', el, size);
    });
  };

  _proto.removeContainerStyle = function removeContainerStyle(containerState, container) {
    var _this3 = this;

    _ModalManager.prototype.removeContainerStyle.call(this, containerState, container);

    qsa(container, Selector.FIXED_CONTENT).forEach(function (el) {
      return _this3.restore('paddingRight', el);
    });
    qsa(container, Selector.STICKY_CONTENT).forEach(function (el) {
      return _this3.restore('margingRight', el);
    });
    qsa(container, Selector.NAVBAR_TOGGLER).forEach(function (el) {
      return _this3.restore('margingRight', el);
    });
  };

  return BootstrapModalManager;
}(ModalManager);

var Body = createWithBsPrefix('modal-body');

var ModalContext = React__default.createContext({
  onHide: function onHide() {}
});

var ModalDialog = React__default.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      centered = _ref.centered,
      size = _ref.size,
      children = _ref.children,
      scrollable = _ref.scrollable,
      props = _objectWithoutPropertiesLoose(_ref, ["bsPrefix", "className", "centered", "size", "children", "scrollable"]);

  bsPrefix = useBootstrapPrefix(bsPrefix, 'modal');
  var dialogClass = bsPrefix + "-dialog";
  return React__default.createElement("div", _extends({}, props, {
    ref: ref,
    className: classnames(dialogClass, className, size && bsPrefix + "-" + size, centered && dialogClass + "-centered", scrollable && dialogClass + "-scrollable")
  }), React__default.createElement("div", {
    className: bsPrefix + "-content"
  }, children));
});
ModalDialog.displayName = 'ModalDialog';

var Footer = createWithBsPrefix('modal-footer');

var defaultProps$u = {
  closeLabel: 'Close',
  closeButton: false
};
var ModalHeader = React__default.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      closeLabel = _ref.closeLabel,
      closeButton = _ref.closeButton,
      onHide = _ref.onHide,
      className = _ref.className,
      children = _ref.children,
      props = _objectWithoutPropertiesLoose(_ref, ["bsPrefix", "closeLabel", "closeButton", "onHide", "className", "children"]);

  bsPrefix = useBootstrapPrefix(bsPrefix, 'modal-header');
  var context = React.useContext(ModalContext);
  var handleClick = useEventCallback(function () {
    if (context) context.onHide();
    if (onHide) onHide();
  });
  return React__default.createElement("div", _extends({
    ref: ref
  }, props, {
    className: classnames(className, bsPrefix)
  }), children, closeButton && React__default.createElement(CloseButton, {
    label: closeLabel,
    onClick: handleClick
  }));
});
ModalHeader.displayName = 'ModalHeader';
ModalHeader.defaultProps = defaultProps$u;

var DivStyledAsH4$1 = divWithClassName('h4');
var Title = createWithBsPrefix('modal-title', {
  Component: DivStyledAsH4$1
});

var defaultProps$v = {
  show: false,
  backdrop: true,
  keyboard: true,
  autoFocus: true,
  enforceFocus: true,
  restoreFocus: true,
  animation: true,
  dialogAs: ModalDialog,
  manager: new BootstrapModalManager()
};
/* eslint-disable no-use-before-define, react/no-multi-comp */

function DialogTransition(props) {
  return React__default.createElement(Fade, props);
}

function BackdropTransition(props) {
  return React__default.createElement(Fade, props);
}
/* eslint-enable no-use-before-define */


var Modal$1 =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Modal, _React$Component);

  function Modal() {
    var _this;

    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(_args)) || this;
    _this.state = {
      style: {}
    };
    _this.modalContext = {
      onHide: function onHide() {
        return _this.props.onHide();
      }
    };

    _this.setModalRef = function (ref) {
      _this._modal = ref;
    };

    _this.handleDialogMouseDown = function () {
      _this._waitingForMouseUp = true;
    };

    _this.handleMouseUp = function (e) {
      if (_this._waitingForMouseUp && e.target === _this._modal.dialog) {
        _this._ignoreBackdropClick = true;
      }

      _this._waitingForMouseUp = false;
    };

    _this.handleClick = function (e) {
      if (_this._ignoreBackdropClick || e.target !== e.currentTarget) {
        _this._ignoreBackdropClick = false;
        return;
      }

      _this.props.onHide();
    };

    _this.handleEnter = function (node) {
      var _this$props;

      if (node) {
        node.style.display = 'block';

        _this.updateDialogStyle(node);
      }

      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      if (_this.props.onEnter) (_this$props = _this.props).onEnter.apply(_this$props, [node].concat(args));
    };

    _this.handleEntering = function (node) {
      var _this$props2;

      for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }

      if (_this.props.onEntering) (_this$props2 = _this.props).onEntering.apply(_this$props2, [node].concat(args)); // FIXME: This should work even when animation is disabled.

      addEventListener(window, 'resize', _this.handleWindowResize);
    };

    _this.handleExited = function (node) {
      var _this$props3;

      if (node) node.style.display = ''; // RHL removes it sometimes

      for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        args[_key4 - 1] = arguments[_key4];
      }

      if (_this.props.onExited) (_this$props3 = _this.props).onExited.apply(_this$props3, args); // FIXME: This should work even when animation is disabled.

      removeEventListener(window, 'resize', _this.handleWindowResize);
    };

    _this.handleWindowResize = function () {
      _this.updateDialogStyle(_this._modal.dialog);
    };

    _this.renderBackdrop = function (props) {
      var _this$props4 = _this.props,
          bsPrefix = _this$props4.bsPrefix,
          backdropClassName = _this$props4.backdropClassName,
          animation = _this$props4.animation;
      return React__default.createElement("div", _extends({}, props, {
        className: classnames(bsPrefix + "-backdrop", backdropClassName, !animation && 'show')
      }));
    };

    return _this;
  }

  var _proto = Modal.prototype;

  _proto.componentWillUnmount = function componentWillUnmount() {
    // Clean up the listener if we need to.
    removeEventListener(window, 'resize', this.handleWindowResize);
  };

  _proto.updateDialogStyle = function updateDialogStyle(node) {
    if (!canUseDOM) return;
    var manager = this.props.manager;
    var containerIsOverflowing = manager.isContainerOverflowing(this._modal);
    var modalIsOverflowing = node.scrollHeight > ownerDocument(node).documentElement.clientHeight;
    this.setState({
      style: {
        paddingRight: containerIsOverflowing && !modalIsOverflowing ? scrollbarSize() : undefined,
        paddingLeft: !containerIsOverflowing && modalIsOverflowing ? scrollbarSize() : undefined
      }
    });
  };

  _proto.render = function render() {
    var _this$props5 = this.props,
        bsPrefix = _this$props5.bsPrefix,
        className = _this$props5.className,
        style = _this$props5.style,
        dialogClassName = _this$props5.dialogClassName,
        children = _this$props5.children,
        Dialog = _this$props5.dialogAs,
        show = _this$props5.show,
        animation = _this$props5.animation,
        backdrop = _this$props5.backdrop,
        keyboard = _this$props5.keyboard,
        manager = _this$props5.manager,
        onEscapeKeyDown = _this$props5.onEscapeKeyDown,
        onShow = _this$props5.onShow,
        onHide = _this$props5.onHide,
        container = _this$props5.container,
        autoFocus = _this$props5.autoFocus,
        enforceFocus = _this$props5.enforceFocus,
        restoreFocus = _this$props5.restoreFocus,
        onEntered = _this$props5.onEntered,
        onExit = _this$props5.onExit,
        onExiting = _this$props5.onExiting,
        _ = _this$props5.onExited,
        _1 = _this$props5.onEntering,
        _6 = _this$props5.onEnter,
        _4 = _this$props5.onEntering,
        _2 = _this$props5.backdropClassName,
        props = _objectWithoutPropertiesLoose(_this$props5, ["bsPrefix", "className", "style", "dialogClassName", "children", "dialogAs", "show", "animation", "backdrop", "keyboard", "manager", "onEscapeKeyDown", "onShow", "onHide", "container", "autoFocus", "enforceFocus", "restoreFocus", "onEntered", "onExit", "onExiting", "onExited", "onEntering", "onEnter", "onEntering", "backdropClassName"]);

    var clickHandler = backdrop === true ? this.handleClick : null;

    var baseModalStyle = _extends({}, style, {}, this.state.style); // Sets `display` always block when `animation` is false


    if (!animation) baseModalStyle.display = 'block';
    return React__default.createElement(ModalContext.Provider, {
      value: this.modalContext
    }, React__default.createElement(ModalWithContainer, {
      show: show,
      backdrop: backdrop,
      container: container,
      keyboard: keyboard,
      autoFocus: autoFocus,
      enforceFocus: enforceFocus,
      restoreFocus: restoreFocus,
      onEscapeKeyDown: onEscapeKeyDown,
      onShow: onShow,
      onHide: onHide,
      onEntered: onEntered,
      onExit: onExit,
      onExiting: onExiting,
      manager: manager,
      ref: this.setModalRef,
      style: baseModalStyle,
      className: classnames(className, bsPrefix),
      containerClassName: bsPrefix + "-open",
      transition: animation ? DialogTransition : undefined,
      backdropTransition: animation ? BackdropTransition : undefined,
      renderBackdrop: this.renderBackdrop,
      onClick: clickHandler,
      onMouseUp: this.handleMouseUp,
      onEnter: this.handleEnter,
      onEntering: this.handleEntering,
      onExited: this.handleExited
    }, React__default.createElement(Dialog, _extends({}, props, {
      onMouseDown: this.handleDialogMouseDown,
      className: dialogClassName
    }), children)));
  };

  return Modal;
}(React__default.Component);

Modal$1.defaultProps = defaultProps$v;
var DecoratedModal = createBootstrapComponent(Modal$1, 'modal');
DecoratedModal.Body = Body;
DecoratedModal.Header = ModalHeader;
DecoratedModal.Title = Title;
DecoratedModal.Footer = Footer;
DecoratedModal.Dialog = ModalDialog;
DecoratedModal.TRANSITION_DURATION = 300;
DecoratedModal.BACKDROP_TRANSITION_DURATION = 150;

var NavItem = React__default.forwardRef( // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      children = _ref.children,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'div' : _ref$as,
      props = _objectWithoutPropertiesLoose(_ref, ["bsPrefix", "className", "children", "as"]);

  bsPrefix = useBootstrapPrefix(bsPrefix, 'nav-item');
  return React__default.createElement(Component, _extends({}, props, {
    ref: ref,
    className: classnames(className, bsPrefix)
  }), children);
});
NavItem.displayName = 'NavItem';

var defaultProps$w = {
  disabled: false,
  as: SafeAnchor
};
var NavLink = React__default.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      disabled = _ref.disabled,
      className = _ref.className,
      href = _ref.href,
      eventKey = _ref.eventKey,
      onSelect = _ref.onSelect,
      as = _ref.as,
      props = _objectWithoutPropertiesLoose(_ref, ["bsPrefix", "disabled", "className", "href", "eventKey", "onSelect", "as"]);

  bsPrefix = useBootstrapPrefix(bsPrefix, 'nav-link');
  return React__default.createElement(AbstractNavItem, _extends({}, props, {
    href: href,
    ref: ref,
    eventKey: eventKey,
    as: as,
    disabled: disabled,
    onSelect: onSelect,
    className: classnames(className, bsPrefix, disabled && 'disabled')
  }));
});
NavLink.displayName = 'NavLink';
NavLink.defaultProps = defaultProps$w;

var defaultProps$x = {
  justify: false,
  fill: false
};
var Nav = React__default.forwardRef(function (uncontrolledProps, ref) {
  var _classNames;

  var _useUncontrolled = useUncontrolled(uncontrolledProps, {
    activeKey: 'onSelect'
  }),
      _useUncontrolled$as = _useUncontrolled.as,
      as = _useUncontrolled$as === void 0 ? 'div' : _useUncontrolled$as,
      bsPrefix = _useUncontrolled.bsPrefix,
      variant = _useUncontrolled.variant,
      fill = _useUncontrolled.fill,
      justify = _useUncontrolled.justify,
      navbar = _useUncontrolled.navbar,
      className = _useUncontrolled.className,
      children = _useUncontrolled.children,
      activeKey = _useUncontrolled.activeKey,
      props = _objectWithoutPropertiesLoose(_useUncontrolled, ["as", "bsPrefix", "variant", "fill", "justify", "navbar", "className", "children", "activeKey"]);

  bsPrefix = useBootstrapPrefix(bsPrefix, 'nav');
  var navbarBsPrefix, cardHeaderBsPrefix;
  var navbarContext = React.useContext(NavbarContext);
  var cardContext = React.useContext(CardContext);

  if (navbarContext) {
    navbarBsPrefix = navbarContext.bsPrefix;
    navbar = navbar == null ? true : navbar;
  } else if (cardContext) {
    cardHeaderBsPrefix = cardContext.cardHeaderBsPrefix;
  }

  return React__default.createElement(AbstractNav, _extends({
    as: as,
    ref: ref,
    activeKey: activeKey,
    className: classnames(className, (_classNames = {}, _classNames[bsPrefix] = !navbar, _classNames[navbarBsPrefix + "-nav"] = navbar, _classNames[cardHeaderBsPrefix + "-" + variant] = !!cardHeaderBsPrefix, _classNames[bsPrefix + "-" + variant] = !!variant, _classNames[bsPrefix + "-fill"] = fill, _classNames[bsPrefix + "-justified"] = justify, _classNames))
  }, props), children);
});
Nav.displayName = 'Nav';
Nav.defaultProps = defaultProps$x;
Nav.Item = NavItem;
Nav.Link = NavLink;

var NavbarBrand = React__default.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      as = _ref.as,
      props = _objectWithoutPropertiesLoose(_ref, ["bsPrefix", "className", "as"]);

  bsPrefix = useBootstrapPrefix(bsPrefix, 'navbar-brand');
  var Component = as || (props.href ? 'a' : 'span');
  return React__default.createElement(Component, _extends({}, props, {
    ref: ref,
    className: classnames(className, bsPrefix)
  }));
});
NavbarBrand.displayName = 'NavbarBrand';

var NavbarCollapse = React__default.forwardRef(function (_ref, ref) {
  var children = _ref.children,
      bsPrefix = _ref.bsPrefix,
      props = _objectWithoutPropertiesLoose(_ref, ["children", "bsPrefix"]);

  bsPrefix = useBootstrapPrefix(bsPrefix, 'navbar-collapse');
  return React__default.createElement(NavbarContext.Consumer, null, function (context) {
    return React__default.createElement(Collapse, _extends({
      in: !!(context && context.expanded)
    }, props), React__default.createElement("div", {
      ref: ref,
      className: bsPrefix
    }, children));
  });
});
NavbarCollapse.displayName = 'NavbarCollapse';

var defaultProps$y = {
  label: 'Toggle navigation'
};
var NavbarToggle = React__default.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      children = _ref.children,
      label = _ref.label,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'button' : _ref$as,
      onClick = _ref.onClick,
      props = _objectWithoutPropertiesLoose(_ref, ["bsPrefix", "className", "children", "label", "as", "onClick"]);

  bsPrefix = useBootstrapPrefix(bsPrefix, 'navbar-toggler');

  var _ref2 = React.useContext(NavbarContext) || {},
      onToggle = _ref2.onToggle,
      expanded = _ref2.expanded;

  var handleClick = useEventCallback(function (e) {
    if (onClick) onClick(e);
    if (onToggle) onToggle();
  });

  if (Component === 'button') {
    props.type = 'button';
  }

  return React__default.createElement(Component, _extends({}, props, {
    ref: ref,
    onClick: handleClick,
    "aria-label": label,
    className: classnames(className, bsPrefix, !expanded && 'collapsed')
  }), children || React__default.createElement("span", {
    className: bsPrefix + "-icon"
  }));
});
NavbarToggle.displayName = 'NavbarToggle';
NavbarToggle.defaultProps = defaultProps$y;

var defaultProps$z = {
  expand: true,
  variant: 'light',
  collapseOnSelect: false
};
var Navbar = React__default.forwardRef(function (props, ref) {
  var _useUncontrolled = useUncontrolled(props, {
    expanded: 'onToggle'
  }),
      bsPrefix = _useUncontrolled.bsPrefix,
      expand = _useUncontrolled.expand,
      variant = _useUncontrolled.variant,
      bg = _useUncontrolled.bg,
      fixed = _useUncontrolled.fixed,
      sticky = _useUncontrolled.sticky,
      className = _useUncontrolled.className,
      children = _useUncontrolled.children,
      _useUncontrolled$as = _useUncontrolled.as,
      Component = _useUncontrolled$as === void 0 ? 'nav' : _useUncontrolled$as,
      expanded = _useUncontrolled.expanded,
      _onToggle = _useUncontrolled.onToggle,
      onSelect = _useUncontrolled.onSelect,
      collapseOnSelect = _useUncontrolled.collapseOnSelect,
      controlledProps = _objectWithoutPropertiesLoose(_useUncontrolled, ["bsPrefix", "expand", "variant", "bg", "fixed", "sticky", "className", "children", "as", "expanded", "onToggle", "onSelect", "collapseOnSelect"]);

  bsPrefix = useBootstrapPrefix(bsPrefix, 'navbar');
  var handleCollapse = React.useCallback(function () {
    if (onSelect) onSelect.apply(void 0, arguments);

    if (collapseOnSelect && expanded) {
      _onToggle(false);
    }
  }, [onSelect, collapseOnSelect, expanded, _onToggle]); // will result in some false positives but that seems better
  // than false negatives. strict `undefined` check allows explicit
  // "nulling" of the role if the user really doesn't want one

  if (controlledProps.role === undefined && Component !== 'nav') {
    controlledProps.role = 'navigation';
  }

  var expandClass = bsPrefix + "-expand";
  if (typeof expand === 'string') expandClass = expandClass + "-" + expand;
  var navbarContext = React.useMemo(function () {
    return {
      onToggle: function onToggle() {
        return _onToggle(!expanded);
      },
      bsPrefix: bsPrefix,
      expanded: expanded
    };
  }, [bsPrefix, expanded, _onToggle]);
  return React__default.createElement(NavbarContext.Provider, {
    value: navbarContext
  }, React__default.createElement(SelectableContext.Provider, {
    value: handleCollapse
  }, React__default.createElement(Component, _extends({
    ref: ref
  }, controlledProps, {
    className: classnames(className, bsPrefix, expand && expandClass, variant && bsPrefix + "-" + variant, bg && "bg-" + bg, sticky && "sticky-" + sticky, fixed && "fixed-" + fixed)
  }), children)));
});
Navbar.defaultProps = defaultProps$z;
Navbar.displayName = 'Navbar';
Navbar.Brand = NavbarBrand;
Navbar.Toggle = NavbarToggle;
Navbar.Collapse = NavbarCollapse;
Navbar.Text = createWithBsPrefix('navbar-text', {
  Component: 'span'
});

var propTypes$7 = {
  /**
   * An html id attribute for the Toggle button, necessary for assistive technologies, such as screen readers.
   * @type {string|number}
   * @required
   */
  id: PropTypes.any,

  /** An `onClick` handler passed to the Toggle component */
  onClick: PropTypes.func,

  /** The content of the non-toggle Button.  */
  title: PropTypes.node.isRequired,

  /** Disables the toggle NavLink  */
  disabled: PropTypes.bool,

  /** Style the toggle NavLink as active  */
  active: PropTypes.bool,

  /** An ARIA accessible role applied to the Menu component. When set to 'menu', The dropdown */
  menuRole: PropTypes.string,

  /**
   *  Which event when fired outside the component will cause it to be closed.
   *
   * _see [DropdownMenu](#menu-props) for more details_
   */
  rootCloseEvent: PropTypes.string,

  /** @ignore */
  bsPrefix: PropTypes.string
};
var NavDropdown = React__default.forwardRef(function (_ref, ref) {
  var id = _ref.id,
      title = _ref.title,
      children = _ref.children,
      bsPrefix = _ref.bsPrefix,
      rootCloseEvent = _ref.rootCloseEvent,
      menuRole = _ref.menuRole,
      disabled = _ref.disabled,
      active = _ref.active,
      props = _objectWithoutPropertiesLoose(_ref, ["id", "title", "children", "bsPrefix", "rootCloseEvent", "menuRole", "disabled", "active"]);

  return React__default.createElement(Dropdown$1, _extends({
    ref: ref
  }, props, {
    as: NavItem
  }), React__default.createElement(Dropdown$1.Toggle, {
    id: id,
    eventKey: null,
    active: active,
    disabled: disabled,
    childBsPrefix: bsPrefix,
    as: NavLink
  }, title), React__default.createElement(Dropdown$1.Menu, {
    role: menuRole,
    rootCloseEvent: rootCloseEvent
  }, children));
});
NavDropdown.displayName = 'NavDropdown';
NavDropdown.propTypes = propTypes$7;
NavDropdown.Item = Dropdown$1.Item;
NavDropdown.Divider = Dropdown$1.Divider;
NavDropdown.Header = Dropdown$1.Header;

/**
 * Built on top of `Popper.js`, the overlay component is
 * great for custom tooltip overlays.
 */

var Overlay = React__default.forwardRef(function (props, outerRef) {
  var flip = props.flip,
      placement = props.placement,
      containerPadding = props.containerPadding,
      _props$popperConfig = props.popperConfig,
      popperConfig = _props$popperConfig === void 0 ? {} : _props$popperConfig,
      Transition = props.transition;

  var _useCallbackRef = useCallbackRef(),
      rootElement = _useCallbackRef[0],
      attachRef = _useCallbackRef[1];

  var _useCallbackRef2 = useCallbackRef(),
      arrowElement = _useCallbackRef2[0],
      attachArrowRef = _useCallbackRef2[1];

  var mergedRef = useMergedRefs(attachRef, outerRef);
  var container = useWaitForDOMRef(props.container);
  var target = useWaitForDOMRef(props.target);

  var _useState = React.useState(!props.show),
      exited = _useState[0],
      setExited = _useState[1];

  var _popperConfig$modifie = popperConfig.modifiers,
      modifiers = _popperConfig$modifie === void 0 ? {} : _popperConfig$modifie;

  var _usePopper = usePopper(target, rootElement, _extends({}, popperConfig, {
    placement: placement || 'bottom',
    enableEvents: props.show,
    modifiers: _extends({}, modifiers, {
      preventOverflow: _extends({
        padding: containerPadding || 5
      }, modifiers.preventOverflow),
      arrow: _extends({}, modifiers.arrow, {
        enabled: !!arrowElement,
        element: arrowElement
      }),
      flip: _extends({
        enabled: !!flip
      }, modifiers.preventOverflow)
    })
  })),
      styles = _usePopper.styles,
      arrowStyles = _usePopper.arrowStyles,
      popper = _objectWithoutPropertiesLoose(_usePopper, ["styles", "arrowStyles"]);

  if (props.show) {
    if (exited) setExited(false);
  } else if (!props.transition && !exited) {
    setExited(true);
  }

  var handleHidden = function handleHidden() {
    setExited(true);

    if (props.onExited) {
      props.onExited.apply(props, arguments);
    }
  }; // Don't un-render the overlay while it's transitioning out.


  var mountOverlay = props.show || Transition && !exited;
  useRootClose(rootElement, props.onHide, {
    disabled: !props.rootClose || props.rootCloseDisabled,
    clickTrigger: props.rootCloseEvent
  });

  if (!mountOverlay) {
    // Don't bother showing anything if we don't have to.
    return null;
  }

  var child = props.children(_extends({}, popper, {
    show: props.show,
    props: {
      style: styles,
      ref: mergedRef
    },
    arrowProps: {
      style: arrowStyles,
      ref: attachArrowRef
    }
  }));

  if (Transition) {
    var onExit = props.onExit,
        onExiting = props.onExiting,
        onEnter = props.onEnter,
        onEntering = props.onEntering,
        onEntered = props.onEntered;
    child = React__default.createElement(Transition, {
      "in": props.show,
      appear: true,
      onExit: onExit,
      onExiting: onExiting,
      onExited: handleHidden,
      onEnter: onEnter,
      onEntering: onEntering,
      onEntered: onEntered
    }, child);
  }

  return container ? ReactDOM__default.createPortal(child, container) : null;
});
Overlay.displayName = 'Overlay';
Overlay.propTypes = {
  /**
   * Set the visibility of the Overlay
   */
  show: PropTypes.bool,

  /** Specify where the overlay element is positioned in relation to the target element */
  placement: PropTypes.oneOf(Popper.placements),

  /**
   * A DOM Element, Ref to an element, or function that returns either. The `target` element is where
   * the overlay is positioned relative to.
   */
  target: PropTypes.any,

  /**
   * A DOM Element, Ref to an element, or function that returns either. The `container` will have the Portal children
   * appended to it.
   */
  container: PropTypes.any,

  /**
   * Enables the Popper.js `flip` modifier, allowing the Overlay to
   * automatically adjust it's placement in case of overlap with the viewport or toggle.
   * Refer to the [flip docs](https://popper.js.org/popper-documentation.html#modifiers..flip.enabled) for more info
   */
  flip: PropTypes.bool,

  /**
   * A render prop that returns an element to overlay and position. See
   * the [react-popper documentation](https://github.com/FezVrasta/react-popper#children) for more info.
   *
   * @type {Function ({
   *   show: boolean,
   *   placement: Placement,
   *   outOfBoundaries: ?boolean,
   *   scheduleUpdate: () => void,
   *   props: {
   *     ref: (?HTMLElement) => void,
   *     style: { [string]: string | number },
   *     aria-labelledby: ?string
   *   },
   *   arrowProps: {
   *     ref: (?HTMLElement) => void,
   *     style: { [string]: string | number },
   *   },
   * }) => React.Element}
   */
  children: PropTypes.func.isRequired,

  /**
   * Control how much space there is between the edge of the boundary element and overlay.
   * A convenience shortcut to setting `popperConfig.modfiers.preventOverflow.padding`
   */
  containerPadding: PropTypes.number,

  /**
   * A set of popper options and props passed directly to react-popper's Popper component.
   */
  popperConfig: PropTypes.object,

  /**
   * Specify whether the overlay should trigger `onHide` when the user clicks outside the overlay
   */
  rootClose: PropTypes.bool,

  /**
   * Specify event for toggling overlay
   */
  rootCloseEvent: PropTypes.oneOf(['click', 'mousedown']),

  /**
   * Specify disabled for disable RootCloseWrapper
   */
  rootCloseDisabled: PropTypes.bool,

  /**
   * A Callback fired by the Overlay when it wishes to be hidden.
   *
   * __required__ when `rootClose` is `true`.
   *
   * @type func
   */
  onHide: function onHide(props) {
    var propType = PropTypes.func;

    if (props.rootClose) {
      propType = propType.isRequired;
    }

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return propType.apply(void 0, [props].concat(args));
  },

  /**
   * A `react-transition-group@2.0.0` `<Transition/>` component
   * used to animate the overlay as it changes visibility.
   */
  transition: PropTypes.elementType,

  /**
   * Callback fired before the Overlay transitions in
   */
  onEnter: PropTypes.func,

  /**
   * Callback fired as the Overlay begins to transition in
   */
  onEntering: PropTypes.func,

  /**
   * Callback fired after the Overlay finishes transitioning in
   */
  onEntered: PropTypes.func,

  /**
   * Callback fired right before the Overlay transitions out
   */
  onExit: PropTypes.func,

  /**
   * Callback fired as the Overlay begins to transition out
   */
  onExiting: PropTypes.func,

  /**
   * Callback fired after the Overlay finishes transitioning out
   */
  onExited: PropTypes.func
};
Overlay.defaultProps = {
  containerPadding: 5
};

var defaultProps$A = {
  transition: Fade,
  rootClose: false,
  show: false,
  placement: 'top'
};

function wrapRefs(props, arrowProps) {
  var ref = props.ref;
  var aRef = arrowProps.ref;

  props.ref = ref.__wrapped || (ref.__wrapped = function (r) {
    return ref(ReactDOM.findDOMNode(r));
  });

  arrowProps.ref = aRef.__wrapped || (aRef.__wrapped = function (r) {
    return aRef(ReactDOM.findDOMNode(r));
  });
}

function Overlay$1(_ref) {
  var overlay = _ref.children,
      transition = _ref.transition,
      outerProps = _objectWithoutPropertiesLoose(_ref, ["children", "transition"]);

  transition = transition === true ? Fade : transition || null;
  return React__default.createElement(Overlay, _extends({}, outerProps, {
    transition: transition
  }), function (_ref2) {
    var overlayProps = _ref2.props,
        arrowProps = _ref2.arrowProps,
        show = _ref2.show,
        props = _objectWithoutPropertiesLoose(_ref2, ["props", "arrowProps", "show"]);

    wrapRefs(overlayProps, arrowProps);
    if (typeof overlay === 'function') return overlay(_extends({}, props, {}, overlayProps, {
      show: show,
      arrowProps: arrowProps
    }));
    return React__default.cloneElement(overlay, _extends({}, props, {}, overlayProps, {
      arrowProps: arrowProps,
      className: classnames(overlay.props.className, !transition && show && 'show'),
      style: _extends({}, overlay.props.style, {}, overlayProps.style)
    }));
  });
}

Overlay$1.defaultProps = defaultProps$A;

var RefHolder =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(RefHolder, _React$Component);

  function RefHolder() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = RefHolder.prototype;

  _proto.render = function render() {
    return this.props.children;
  };

  return RefHolder;
}(React__default.Component);

var normalizeDelay = function normalizeDelay(delay) {
  return delay && typeof delay === 'object' ? delay : {
    show: delay,
    hide: delay
  };
};

var defaultProps$B = {
  defaultOverlayShown: false,
  trigger: ['hover', 'focus']
}; // eslint-disable-next-line react/no-multi-comp

var OverlayTrigger =
/*#__PURE__*/
function (_React$Component2) {
  _inheritsLoose(OverlayTrigger, _React$Component2);

  function OverlayTrigger(props, context) {
    var _this;

    _this = _React$Component2.call(this, props, context) || this;

    _this.getTarget = function () {
      return ReactDOM__default.findDOMNode(_this.trigger.current);
    };

    _this.handleShow = function () {
      clearTimeout(_this._timeout);
      _this._hoverState = 'show';
      var delay = normalizeDelay(_this.props.delay);

      if (!delay.show) {
        _this.show();

        return;
      }

      _this._timeout = setTimeout(function () {
        if (_this._hoverState === 'show') _this.show();
      }, delay.show);
    };

    _this.handleHide = function () {
      clearTimeout(_this._timeout);
      _this._hoverState = 'hide';
      var delay = normalizeDelay(_this.props.delay);

      if (!delay.hide) {
        _this.hide();

        return;
      }

      _this._timeout = setTimeout(function () {
        if (_this._hoverState === 'hide') _this.hide();
      }, delay.hide);
    };

    _this.handleFocus = function (e) {
      var _this$getChildProps = _this.getChildProps(),
          onFocus = _this$getChildProps.onFocus;

      _this.handleShow(e);

      if (onFocus) onFocus(e);
    };

    _this.handleBlur = function (e) {
      var _this$getChildProps2 = _this.getChildProps(),
          onBlur = _this$getChildProps2.onBlur;

      _this.handleHide(e);

      if (onBlur) onBlur(e);
    };

    _this.handleClick = function (e) {
      var _this$getChildProps3 = _this.getChildProps(),
          onClick = _this$getChildProps3.onClick;

      if (_this.state.show) _this.hide();else _this.show();
      if (onClick) onClick(e);
    };

    _this.handleMouseOver = function (e) {
      _this.handleMouseOverOut(_this.handleShow, e, 'fromElement');
    };

    _this.handleMouseOut = function (e) {
      return _this.handleMouseOverOut(_this.handleHide, e, 'toElement');
    };

    _this.trigger = React__default.createRef();
    _this.state = {
      show: !!props.defaultShow
    }; // We add aria-describedby in the case where the overlay is a role="tooltip"
    // for other cases describedby isn't appropriate (e.g. a popover with inputs) so we don't add it.

    _this.ariaModifier = {
      enabled: true,
      order: 900,
      fn: function fn(data) {
        var popper = data.instance.popper;

        var target = _this.getTarget();

        if (!_this.state.show || !target) return data;
        var role = popper.getAttribute('role') || '';

        if (popper.id && role.toLowerCase() === 'tooltip') {
          target.setAttribute('aria-describedby', popper.id);
        }

        return data;
      }
    };
    return _this;
  }

  var _proto2 = OverlayTrigger.prototype;

  _proto2.componentWillUnmount = function componentWillUnmount() {
    clearTimeout(this._timeout);
  };

  _proto2.getChildProps = function getChildProps() {
    return React__default.Children.only(this.props.children).props;
  };

  // Simple implementation of mouseEnter and mouseLeave.
  // React's built version is broken: https://github.com/facebook/react/issues/4251
  // for cases when the trigger is disabled and mouseOut/Over can cause flicker
  // moving from one child element to another.
  _proto2.handleMouseOverOut = function handleMouseOverOut(handler, e, relatedNative) {
    var target = e.currentTarget;
    var related = e.relatedTarget || e.nativeEvent[relatedNative];

    if ((!related || related !== target) && !contains(target, related)) {
      handler(e);
    }
  };

  _proto2.hide = function hide() {
    this.setState({
      show: false
    });
  };

  _proto2.show = function show() {
    this.setState({
      show: true
    });
  };

  _proto2.render = function render() {
    var _this$props = this.props,
        trigger = _this$props.trigger,
        overlay = _this$props.overlay,
        children = _this$props.children,
        _this$props$popperCon = _this$props.popperConfig,
        popperConfig = _this$props$popperCon === void 0 ? {} : _this$props$popperCon,
        props = _objectWithoutPropertiesLoose(_this$props, ["trigger", "overlay", "children", "popperConfig"]);

    delete props.delay;
    delete props.defaultShow;
    var child = React__default.Children.only(children);
    var triggerProps = {};
    var triggers = trigger == null ? [] : [].concat(trigger);

    if (triggers.indexOf('click') !== -1) {
      triggerProps.onClick = this.handleClick;
    }

    if (triggers.indexOf('focus') !== -1) {
      triggerProps.onFocus = this.handleShow;
      triggerProps.onBlur = this.handleHide;
    }

    if (triggers.indexOf('hover') !== -1) {
      process.env.NODE_ENV !== "production" ? warning_1(triggers.length >= 1, '[react-bootstrap] Specifying only the `"hover"` trigger limits the ' + 'visibility of the overlay to just mouse users. Consider also ' + 'including the `"focus"` trigger so that touch and keyboard only ' + 'users can see the overlay as well.') : void 0;
      triggerProps.onMouseOver = this.handleMouseOver;
      triggerProps.onMouseOut = this.handleMouseOut;
    }

    return React__default.createElement(React__default.Fragment, null, React__default.createElement(RefHolder, {
      ref: this.trigger
    }, React.cloneElement(child, triggerProps)), React__default.createElement(Overlay$1, _extends({}, props, {
      popperConfig: _extends({}, popperConfig, {
        modifiers: _extends({}, popperConfig.modifiers, {
          ariaModifier: this.ariaModifier
        })
      }),
      show: this.state.show,
      onHide: this.handleHide,
      target: this.getTarget
    }), overlay));
  };

  return OverlayTrigger;
}(React__default.Component);

OverlayTrigger.defaultProps = defaultProps$B;

var defaultProps$C = {
  active: false,
  disabled: false,
  activeLabel: '(current)'
};
var PageItem = React__default.forwardRef(function (_ref, ref) {
  var active = _ref.active,
      disabled = _ref.disabled,
      className = _ref.className,
      style = _ref.style,
      activeLabel = _ref.activeLabel,
      children = _ref.children,
      props = _objectWithoutPropertiesLoose(_ref, ["active", "disabled", "className", "style", "activeLabel", "children"]);

  var Component = active || disabled ? 'span' : SafeAnchor;
  return React__default.createElement("li", {
    ref: ref,
    style: style,
    className: classnames(className, 'page-item', {
      active: active,
      disabled: disabled
    })
  }, React__default.createElement(Component, _extends({
    className: "page-link",
    disabled: disabled
  }, props), children, active && activeLabel && React__default.createElement("span", {
    className: "sr-only"
  }, activeLabel)));
});
PageItem.defaultProps = defaultProps$C;
PageItem.displayName = 'PageItem';

function createButton(name, defaultValue, label) {
  var _class, _temp;

  if (label === void 0) {
    label = name;
  }

  return _temp = _class =
  /*#__PURE__*/
  function (_React$Component) {
    _inheritsLoose(_class, _React$Component);

    function _class() {
      return _React$Component.apply(this, arguments) || this;
    }

    var _proto = _class.prototype;

    _proto.render = function render() {
      var _this$props = this.props,
          children = _this$props.children,
          props = _objectWithoutPropertiesLoose(_this$props, ["children"]);

      delete props.active;
      return React__default.createElement(PageItem, props, React__default.createElement("span", {
        "aria-hidden": "true"
      }, children || defaultValue), React__default.createElement("span", {
        className: "sr-only"
      }, label));
    };

    return _class;
  }(React__default.Component), _class.displayName = name, _temp;
}

var First = createButton('First', '«');
var Prev = createButton('Prev', '‹', 'Previous');
var Ellipsis = createButton('Ellipsis', '…', 'More');
var Next = createButton('Next', '›');
var Last = createButton('Last', '»');

/**
 * @property {PageItem} Item
 * @property {PageItem} First
 * @property {PageItem} Prev
 * @property {PageItem} Ellipsis
 * @property {PageItem} Next
 * @property {PageItem} Last
 */
var Pagination = React__default.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      children = _ref.children,
      size = _ref.size,
      props = _objectWithoutPropertiesLoose(_ref, ["bsPrefix", "className", "children", "size"]);

  var decoratedBsPrefix = useBootstrapPrefix(bsPrefix, 'pagination');
  return React__default.createElement("ul", _extends({
    ref: ref
  }, props, {
    className: classnames(className, decoratedBsPrefix, size && decoratedBsPrefix + "-" + size)
  }), children);
});
Pagination.First = First;
Pagination.Prev = Prev;
Pagination.Ellipsis = Ellipsis;
Pagination.Item = PageItem;
Pagination.Next = Next;
Pagination.Last = Last;

var PopoverTitle = React__default.forwardRef(function (_ref, ref) {
  var _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'div' : _ref$as,
      bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      children = _ref.children,
      props = _objectWithoutPropertiesLoose(_ref, ["as", "bsPrefix", "className", "children"]);

  bsPrefix = useBootstrapPrefix(bsPrefix, 'popover-header');
  return React__default.createElement(Component, _extends({
    ref: ref
  }, props, {
    className: classnames(bsPrefix, className)
  }), children);
});

var PopoverContent = React__default.forwardRef(function (_ref, ref) {
  var _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'div' : _ref$as,
      bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      children = _ref.children,
      props = _objectWithoutPropertiesLoose(_ref, ["as", "bsPrefix", "className", "children"]);

  bsPrefix = useBootstrapPrefix(bsPrefix, 'popover-body');
  return React__default.createElement(Component, _extends({
    ref: ref
  }, props, {
    className: classnames(className, bsPrefix)
  }), children);
});

var defaultProps$D = {
  placement: 'right'
};
var Popover = React__default.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      placement = _ref.placement,
      className = _ref.className,
      style = _ref.style,
      children = _ref.children,
      content = _ref.content,
      arrowProps = _ref.arrowProps,
      _ = _ref.scheduleUpdate,
      _1 = _ref.outOfBoundaries,
      props = _objectWithoutPropertiesLoose(_ref, ["bsPrefix", "placement", "className", "style", "children", "content", "arrowProps", "scheduleUpdate", "outOfBoundaries"]);

  var decoratedBsPrefix = useBootstrapPrefix(bsPrefix, 'popover');
  return React__default.createElement("div", _extends({
    ref: ref,
    role: "tooltip",
    style: style,
    "x-placement": placement,
    className: classnames(className, decoratedBsPrefix, "bs-popover-" + placement)
  }, props), React__default.createElement("div", _extends({
    className: "arrow"
  }, arrowProps)), content ? React__default.createElement(PopoverContent, null, children) : children);
});
Popover.defaultProps = defaultProps$D;
Popover.Title = PopoverTitle;
Popover.Content = PopoverContent;

var ROUND_PRECISION = 1000;

var defaultProps$E = {
  min: 0,
  max: 100,
  animated: false,
  isChild: false,
  srOnly: false,
  striped: false
};

function getPercentage(now, min, max) {
  var percentage = (now - min) / (max - min) * 100;
  return Math.round(percentage * ROUND_PRECISION) / ROUND_PRECISION;
}

function renderProgressBar(_ref, ref) {
  var _classNames;

  var min = _ref.min,
      now = _ref.now,
      max = _ref.max,
      label = _ref.label,
      srOnly = _ref.srOnly,
      striped = _ref.striped,
      animated = _ref.animated,
      className = _ref.className,
      style = _ref.style,
      variant = _ref.variant,
      bsPrefix = _ref.bsPrefix,
      props = _objectWithoutPropertiesLoose(_ref, ["min", "now", "max", "label", "srOnly", "striped", "animated", "className", "style", "variant", "bsPrefix"]);

  return React__default.createElement("div", _extends({
    ref: ref
  }, props, {
    role: "progressbar",
    className: classnames(className, bsPrefix + "-bar", (_classNames = {}, _classNames["bg-" + variant] = variant, _classNames[bsPrefix + "-bar-animated"] = animated, _classNames[bsPrefix + "-bar-striped"] = animated || striped, _classNames)),
    style: _extends({
      width: getPercentage(now, min, max) + "%"
    }, style),
    "aria-valuenow": now,
    "aria-valuemin": min,
    "aria-valuemax": max
  }), srOnly ? React__default.createElement("span", {
    className: "sr-only"
  }, label) : label);
}

var ProgressBar = React__default.forwardRef(function (_ref2, ref) {
  var isChild = _ref2.isChild,
      props = _objectWithoutPropertiesLoose(_ref2, ["isChild"]);

  props.bsPrefix = useBootstrapPrefix(props.bsPrefix, 'progress');

  if (isChild) {
    return renderProgressBar(props, ref);
  }

  var min = props.min,
      now = props.now,
      max = props.max,
      label = props.label,
      srOnly = props.srOnly,
      striped = props.striped,
      animated = props.animated,
      bsPrefix = props.bsPrefix,
      variant = props.variant,
      className = props.className,
      children = props.children,
      wrapperProps = _objectWithoutPropertiesLoose(props, ["min", "now", "max", "label", "srOnly", "striped", "animated", "bsPrefix", "variant", "className", "children"]);

  return React__default.createElement("div", _extends({
    ref: ref
  }, wrapperProps, {
    className: classnames(className, bsPrefix)
  }), children ? map(children, function (child) {
    return React.cloneElement(child, {
      isChild: true
    });
  }) : renderProgressBar({
    min: min,
    now: now,
    max: max,
    label: label,
    srOnly: srOnly,
    striped: striped,
    animated: animated,
    bsPrefix: bsPrefix,
    variant: variant
  }, ref));
});
ProgressBar.displayName = 'ProgressBar';
ProgressBar.defaultProps = defaultProps$E;

var defaultProps$F = {
  aspectRatio: '1by1'
};
var ResponsiveEmbed = React__default.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      children = _ref.children,
      aspectRatio = _ref.aspectRatio,
      props = _objectWithoutPropertiesLoose(_ref, ["bsPrefix", "className", "children", "aspectRatio"]);

  var decoratedBsPrefix = useBootstrapPrefix(bsPrefix, 'embed-responsive');
  var child = React__default.Children.only(children);
  return React__default.createElement("div", _extends({
    ref: ref
  }, props, {
    className: classnames(decoratedBsPrefix, className, aspectRatio && decoratedBsPrefix + "-" + aspectRatio)
  }), React__default.cloneElement(child, {
    className: classnames(child.props.className, decoratedBsPrefix + "-item")
  }));
});
ResponsiveEmbed.defaultProps = defaultProps$F;

var defaultProps$G = {
  noGutters: false
};
var Row = React__default.forwardRef(function (props, ref) {
  var bsPrefix = props.bsPrefix,
      noGutters = props.noGutters,
      _props$as = props.as,
      Component = _props$as === void 0 ? 'div' : _props$as,
      className = props.className,
      otherProps = _objectWithoutPropertiesLoose(props, ["bsPrefix", "noGutters", "as", "className"]);

  var decoratedBsPrefix = useBootstrapPrefix(bsPrefix, 'row');
  return React__default.createElement(Component, _extends({
    ref: ref
  }, otherProps, {
    className: classnames(className, decoratedBsPrefix, noGutters && 'no-gutters')
  }));
});
Row.defaultProps = defaultProps$G;

var Spinner = React__default.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      variant = _ref.variant,
      animation = _ref.animation,
      size = _ref.size,
      children = _ref.children,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'div' : _ref$as,
      className = _ref.className,
      props = _objectWithoutPropertiesLoose(_ref, ["bsPrefix", "variant", "animation", "size", "children", "as", "className"]);

  bsPrefix = useBootstrapPrefix(bsPrefix, 'spinner');
  var bsSpinnerPrefix = bsPrefix + "-" + animation;
  return React__default.createElement(Component, _extends({
    ref: ref
  }, props, {
    className: classnames(className, bsSpinnerPrefix, size && bsSpinnerPrefix + "-" + size, variant && "text-" + variant)
  }), children);
});
Spinner.displayName = 'Spinner';

var propTypes$8 = {
  /**
   * An html id attribute for the Toggle button, necessary for assistive technologies, such as screen readers.
   * @type {string|number}
   * @required
   */
  id: PropTypes.any,

  /**
   * Accessible label for the toggle; the value of `title` if not specified.
   */
  toggleLabel: PropTypes.string,

  /** An `href` passed to the non-toggle Button */
  href: PropTypes.string,

  /** An anchor `target` passed to the non-toggle Button */
  target: PropTypes.string,

  /** An `onClick` handler passed to the non-toggle Button */
  onClick: PropTypes.func,

  /** The content of the non-toggle Button.  */
  title: PropTypes.node.isRequired,

  /** Disables both Buttons  */
  disabled: PropTypes.bool,

  /** An ARIA accessible role applied to the Menu component. When set to 'menu', The dropdown */
  menuRole: PropTypes.string,

  /**
   *  Which event when fired outside the component will cause it to be closed.
   *
   * _see [DropdownMenu](#menu-props) for more details_
   */
  rootCloseEvent: PropTypes.string,

  /** @ignore */
  bsPrefix: PropTypes.string,

  /** @ignore */
  variant: PropTypes.string,

  /** @ignore */
  size: PropTypes.string
};
var defaultProps$H = {
  toggleLabel: 'Toggle dropdown'
};
var SplitButton = React__default.forwardRef(function (_ref, ref) {
  var id = _ref.id,
      bsPrefix = _ref.bsPrefix,
      size = _ref.size,
      variant = _ref.variant,
      title = _ref.title,
      toggleLabel = _ref.toggleLabel,
      children = _ref.children,
      onClick = _ref.onClick,
      href = _ref.href,
      target = _ref.target,
      menuRole = _ref.menuRole,
      rootCloseEvent = _ref.rootCloseEvent,
      props = _objectWithoutPropertiesLoose(_ref, ["id", "bsPrefix", "size", "variant", "title", "toggleLabel", "children", "onClick", "href", "target", "menuRole", "rootCloseEvent"]);

  return React__default.createElement(Dropdown$1, _extends({
    ref: ref
  }, props, {
    as: ButtonGroup
  }), React__default.createElement(Button, {
    size: size,
    variant: variant,
    disabled: props.disabled,
    bsPrefix: bsPrefix,
    href: href,
    target: target,
    onClick: onClick
  }, title), React__default.createElement(Dropdown$1.Toggle, {
    split: true,
    id: id,
    size: size,
    variant: variant,
    disabled: props.disabled,
    childBsPrefix: bsPrefix
  }, React__default.createElement("span", {
    className: "sr-only"
  }, toggleLabel)), React__default.createElement(Dropdown$1.Menu, {
    role: menuRole,
    rootCloseEvent: rootCloseEvent
  }, children));
});
SplitButton.propTypes = propTypes$8;
SplitButton.defaultProps = defaultProps$H;
SplitButton.displayName = 'SplitButton';

/* eslint-disable react/no-unused-prop-types */

var TabContainer = function TabContainer(props) {
  var _useUncontrolled = useUncontrolled(props, {
    activeKey: 'onSelect'
  }),
      id = _useUncontrolled.id,
      generateCustomChildId = _useUncontrolled.generateChildId,
      onSelect = _useUncontrolled.onSelect,
      activeKey = _useUncontrolled.activeKey,
      transition = _useUncontrolled.transition,
      mountOnEnter = _useUncontrolled.mountOnEnter,
      unmountOnExit = _useUncontrolled.unmountOnExit,
      children = _useUncontrolled.children;

  var generateChildId = React.useMemo(function () {
    return generateCustomChildId || function (key, type) {
      return id ? id + "-" + type + "-" + key : null;
    };
  }, [id, generateCustomChildId]);
  var tabContext = React.useMemo(function () {
    return {
      onSelect: onSelect,
      activeKey: activeKey,
      transition: transition,
      mountOnEnter: mountOnEnter,
      unmountOnExit: unmountOnExit,
      getControlledId: function getControlledId(key) {
        return generateChildId(key, 'tabpane');
      },
      getControllerId: function getControllerId(key) {
        return generateChildId(key, 'tab');
      }
    };
  }, [onSelect, activeKey, transition, mountOnEnter, unmountOnExit, generateChildId]);
  return React__default.createElement(TabContext.Provider, {
    value: tabContext
  }, React__default.createElement(SelectableContext.Provider, {
    value: onSelect
  }, children));
};

var TabContent = React__default.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'div' : _ref$as,
      className = _ref.className,
      props = _objectWithoutPropertiesLoose(_ref, ["bsPrefix", "as", "className"]);

  var decoratedBsPrefix = useBootstrapPrefix(bsPrefix, 'tab-content');
  return React__default.createElement(Component, _extends({
    ref: ref
  }, props, {
    className: classnames(className, decoratedBsPrefix)
  }));
});

function useTabContext(props) {
  var context = React.useContext(TabContext);
  if (!context) return props;

  var activeKey = context.activeKey,
      getControlledId = context.getControlledId,
      getControllerId = context.getControllerId,
      rest = _objectWithoutPropertiesLoose(context, ["activeKey", "getControlledId", "getControllerId"]);

  var shouldTransition = props.transition !== false && rest.transition !== false;
  var key = makeEventKey(props.eventKey);
  return _extends({}, props, {
    active: props.active == null && key != null ? makeEventKey(activeKey) === key : props.active,
    id: getControlledId(props.eventKey),
    'aria-labelledby': getControllerId(props.eventKey),
    transition: shouldTransition && (props.transition || rest.transition || Fade),
    mountOnEnter: props.mountOnEnter != null ? props.mountOnEnter : rest.mountOnEnter,
    unmountOnExit: props.unmountOnExit != null ? props.unmountOnExit : rest.unmountOnExit
  });
}

var TabPane = React__default.forwardRef(function (props, ref) {
  var _useTabContext = useTabContext(props),
      bsPrefix = _useTabContext.bsPrefix,
      className = _useTabContext.className,
      active = _useTabContext.active,
      onEnter = _useTabContext.onEnter,
      onEntering = _useTabContext.onEntering,
      onEntered = _useTabContext.onEntered,
      onExit = _useTabContext.onExit,
      onExiting = _useTabContext.onExiting,
      onExited = _useTabContext.onExited,
      mountOnEnter = _useTabContext.mountOnEnter,
      unmountOnExit = _useTabContext.unmountOnExit,
      Transition = _useTabContext.transition,
      _useTabContext$as = _useTabContext.as,
      Component = _useTabContext$as === void 0 ? 'div' : _useTabContext$as,
      _ = _useTabContext.eventKey,
      rest = _objectWithoutPropertiesLoose(_useTabContext, ["bsPrefix", "className", "active", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "mountOnEnter", "unmountOnExit", "transition", "as", "eventKey"]);

  var prefix = useBootstrapPrefix(bsPrefix, 'tab-pane');
  if (!active && unmountOnExit) return null;
  var pane = React__default.createElement(Component, _extends({}, rest, {
    ref: ref,
    role: "tabpanel",
    "aria-hidden": !active,
    className: classnames(className, prefix, {
      active: active
    })
  }));
  if (Transition) pane = React__default.createElement(Transition, {
    in: active,
    onEnter: onEnter,
    onEntering: onEntering,
    onEntered: onEntered,
    onExit: onExit,
    onExiting: onExiting,
    onExited: onExited,
    mountOnEnter: mountOnEnter,
    unmountOnExit: unmountOnExit
  }, pane); // We provide an empty the TabContext so `<Nav>`s in `<TabPane>`s don't
  // conflict with the top level one.

  return React__default.createElement(TabContext.Provider, {
    value: null
  }, React__default.createElement(SelectableContext.Provider, {
    value: null
  }, pane));
});
TabPane.displayName = 'TabPane';

/* eslint-disable react/require-render-return, react/no-unused-prop-types */

var Tab =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Tab, _React$Component);

  function Tab() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Tab.prototype;

  _proto.render = function render() {
    throw new Error('ReactBootstrap: The `Tab` component is not meant to be rendered! ' + "It's an abstract component that is only valid as a direct Child of the `Tabs` Component. " + 'For custom tabs components use TabPane and TabsContainer directly');
  };

  return Tab;
}(React__default.Component);

Tab.Container = TabContainer;
Tab.Content = TabContent;
Tab.Pane = TabPane;

var Table = React__default.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      striped = _ref.striped,
      bordered = _ref.bordered,
      borderless = _ref.borderless,
      hover = _ref.hover,
      size = _ref.size,
      variant = _ref.variant,
      responsive = _ref.responsive,
      props = _objectWithoutPropertiesLoose(_ref, ["bsPrefix", "className", "striped", "bordered", "borderless", "hover", "size", "variant", "responsive"]);

  var decoratedBsPrefix = useBootstrapPrefix(bsPrefix, 'table');
  var classes = classnames(className, decoratedBsPrefix, variant && decoratedBsPrefix + "-" + variant, size && decoratedBsPrefix + "-" + size, striped && decoratedBsPrefix + "-striped", bordered && decoratedBsPrefix + "-bordered", borderless && decoratedBsPrefix + "-borderless", hover && decoratedBsPrefix + "-hover");
  var table = React__default.createElement("table", _extends({}, props, {
    className: classes,
    ref: ref
  }));

  if (responsive) {
    var responsiveClass = decoratedBsPrefix + "-responsive";

    if (typeof responsive === 'string') {
      responsiveClass = responsiveClass + "-" + responsive;
    }

    return React__default.createElement("div", {
      className: responsiveClass
    }, table);
  }

  return table;
});

var defaultProps$I = {
  variant: 'tabs',
  mountOnEnter: false,
  unmountOnExit: false
};

function getDefaultActiveKey(children) {
  var defaultActiveKey;
  forEach(children, function (child) {
    if (defaultActiveKey == null) {
      defaultActiveKey = child.props.eventKey;
    }
  });
  return defaultActiveKey;
}

function renderTab(child) {
  var _child$props = child.props,
      title = _child$props.title,
      eventKey = _child$props.eventKey,
      disabled = _child$props.disabled,
      tabClassName = _child$props.tabClassName;

  if (title == null) {
    return null;
  }

  return React__default.createElement(NavItem, {
    as: NavLink,
    eventKey: eventKey,
    disabled: disabled,
    className: tabClassName
  }, title);
}

var Tabs = React__default.forwardRef(function (props, ref) {
  var _useUncontrolled = useUncontrolled(props, {
    activeKey: 'onSelect'
  }),
      id = _useUncontrolled.id,
      onSelect = _useUncontrolled.onSelect,
      transition = _useUncontrolled.transition,
      mountOnEnter = _useUncontrolled.mountOnEnter,
      unmountOnExit = _useUncontrolled.unmountOnExit,
      children = _useUncontrolled.children,
      _useUncontrolled$acti = _useUncontrolled.activeKey,
      activeKey = _useUncontrolled$acti === void 0 ? getDefaultActiveKey(children) : _useUncontrolled$acti,
      controlledProps = _objectWithoutPropertiesLoose(_useUncontrolled, ["id", "onSelect", "transition", "mountOnEnter", "unmountOnExit", "children", "activeKey"]);

  return React__default.createElement(TabContainer, {
    ref: ref,
    id: id,
    activeKey: activeKey,
    onSelect: onSelect,
    transition: transition,
    mountOnEnter: mountOnEnter,
    unmountOnExit: unmountOnExit
  }, React__default.createElement(Nav, _extends({}, controlledProps, {
    role: "tablist",
    as: "nav"
  }), map(children, renderTab)), React__default.createElement(TabContent, null, map(children, function (child) {
    var childProps = _extends({}, child.props);

    delete childProps.title;
    delete childProps.disabled;
    delete childProps.tabClassName;
    return React__default.createElement(TabPane, childProps);
  })));
});
Tabs.defaultProps = defaultProps$I;
Tabs.displayName = 'Tabs';

var noop$4 = function noop() {};

var ToggleButton = React__default.forwardRef(function (_ref, ref) {
  var children = _ref.children,
      name = _ref.name,
      className = _ref.className,
      checked = _ref.checked,
      type = _ref.type,
      onChange = _ref.onChange,
      value = _ref.value,
      disabled = _ref.disabled,
      inputRef = _ref.inputRef,
      props = _objectWithoutPropertiesLoose(_ref, ["children", "name", "className", "checked", "type", "onChange", "value", "disabled", "inputRef"]);

  var _useState = React.useState(false),
      focused = _useState[0],
      setFocused = _useState[1];

  var handleFocus = React.useCallback(function (e) {
    if (e.target.tagName === 'INPUT') setFocused(true);
  }, []);
  var handleBlur = React.useCallback(function (e) {
    if (e.target.tagName === 'INPUT') setFocused(false);
  }, []);
  return React__default.createElement(Button, _extends({}, props, {
    ref: ref,
    className: classnames(className, focused && 'focus', disabled && 'disabled'),
    type: null,
    active: !!checked,
    as: "label"
  }), React__default.createElement("input", {
    name: name,
    type: type,
    value: value,
    ref: inputRef,
    autoComplete: "off",
    checked: !!checked,
    disabled: !!disabled,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onChange: onChange || noop$4
  }), children);
});
ToggleButton.displayName = 'ToggleButton';

var defaultProps$J = {
  type: 'radio'
};
var ToggleButtonGroup = React__default.forwardRef(function (props, ref) {
  var _useUncontrolled = useUncontrolled(props, {
    value: 'onChange'
  }),
      children = _useUncontrolled.children,
      type = _useUncontrolled.type,
      name = _useUncontrolled.name,
      value = _useUncontrolled.value,
      onChange = _useUncontrolled.onChange,
      controlledProps = _objectWithoutPropertiesLoose(_useUncontrolled, ["children", "type", "name", "value", "onChange"]);

  var getValues = function getValues() {
    return value == null ? [] : [].concat(value);
  };

  var handleToggle = function handleToggle(inputVal, event) {
    var values = getValues();
    var isActive = values.indexOf(inputVal) !== -1;

    if (type === 'radio') {
      if (!isActive) onChange(inputVal, event);
      return;
    }

    if (isActive) {
      onChange(values.filter(function (n) {
        return n !== inputVal;
      }), event);
    } else {
      onChange([].concat(values, [inputVal]), event);
    }
  };

  !(type !== 'radio' || !!name) ? process.env.NODE_ENV !== "production" ? invariant_1(false, 'A `name` is required to group the toggle buttons when the `type` ' + 'is set to "radio"') : invariant_1(false) : void 0;
  return React__default.createElement(ButtonGroup, _extends({}, controlledProps, {
    ref: ref,
    toggle: true
  }), map(children, function (child) {
    var values = getValues();
    var _child$props = child.props,
        childVal = _child$props.value,
        childOnChange = _child$props.onChange;

    var handler = function handler(e) {
      return handleToggle(childVal, e);
    };

    return React__default.cloneElement(child, {
      type: type,
      name: child.name || name,
      checked: values.indexOf(childVal) !== -1,
      onChange: createChainedFunction(childOnChange, handler)
    });
  }));
});
ToggleButtonGroup.defaultProps = defaultProps$J;
ToggleButtonGroup.Button = ToggleButton;

var defaultProps$K = {
  placement: 'right'
};
var Tooltip = React__default.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      placement = _ref.placement,
      className = _ref.className,
      style = _ref.style,
      children = _ref.children,
      arrowProps = _ref.arrowProps,
      _ = _ref.scheduleUpdate,
      _1 = _ref.outOfBoundaries,
      props = _objectWithoutPropertiesLoose(_ref, ["bsPrefix", "placement", "className", "style", "children", "arrowProps", "scheduleUpdate", "outOfBoundaries"]);

  bsPrefix = useBootstrapPrefix(bsPrefix, 'tooltip');
  return React__default.createElement("div", _extends({
    ref: ref,
    style: style,
    role: "tooltip",
    "x-placement": placement,
    className: classnames(className, bsPrefix, "bs-tooltip-" + placement)
  }, props), React__default.createElement("div", _extends({
    className: "arrow"
  }, arrowProps)), React__default.createElement("div", {
    className: bsPrefix + "-inner"
  }, children));
});
Tooltip.defaultProps = defaultProps$K;
Tooltip.displayName = 'Tooltip';

/**
 * Returns a ref that is immediately updated with the new value
 *
 * @param value The Ref value
 */

function useUpdatedRef(value) {
  var valueRef = React.useRef(value);
  valueRef.current = value;
  return valueRef;
}

/**
 * Attach a callback that fires when a component unmounts
 *
 * @param fn Handler to run when the component unmounts
 */

function useWillUnmount(fn) {
  var onUnmount = useUpdatedRef(fn);
  React.useEffect(function () {
    return function () {
      return onUnmount.current();
    };
  }, []);
}

/**
 * Track whether a component is current mounted. Generally less preferable than
 * properlly canceling effects so they don't run after a component is unmounted,
 * but helpful in cases where that isn't feasible, such as a `Promise` resolution.
 *
 * @returns a function that returns the current isMounted state of the component
 *
 * ```ts
 * const [data, setData] = useState(null)
 * const isMounted = useMounted()
 *
 * useEffect(() => {
 *   fetchdata().then((newData) => {
 *      if (isMounted()) {
 *        setData(newData);
 *      }
 *   })
 * })
 * ```
 */

function useMounted() {
  var mounted = React.useRef(true);
  var isMounted = React.useRef(function () {
    return mounted.current;
  });
  React.useEffect(function () {
    return function () {
      mounted.current = false;
    };
  }, []);
  return isMounted.current;
}

/**
 * Returns a controller object for setting a timeout that is properly cleaned up
 * once the component unmounts. New timeouts cancel and replace existing ones.
 */

function useTimeout() {
  var isMounted = useMounted();
  var handle = React.useRef();

  var clear = function clear() {
    return clearTimeout(handle.current);
  };

  useWillUnmount(clear);
  return {
    set: function set(fn, ms) {
      if (!isMounted()) return;
      clear();
      handle.current = setTimeout(fn, ms);
    },
    clear: clear
  };
}

var ToastContext = React__default.createContext({
  onClose: function onClose() {}
});

var defaultProps$L = {
  closeLabel: 'Close',
  closeButton: true
};
var ToastHeader = React__default.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      closeLabel = _ref.closeLabel,
      closeButton = _ref.closeButton,
      className = _ref.className,
      children = _ref.children,
      props = _objectWithoutPropertiesLoose(_ref, ["bsPrefix", "closeLabel", "closeButton", "className", "children"]);

  bsPrefix = useBootstrapPrefix(bsPrefix, 'toast-header');
  var context = React.useContext(ToastContext);
  var handleClick = useEventCallback(function () {
    if (context) {
      context.onClose();
    }
  });
  return React__default.createElement("div", _extends({
    ref: ref
  }, props, {
    className: classnames(bsPrefix, className)
  }), children, closeButton && React__default.createElement(CloseButton, {
    label: closeLabel,
    onClick: handleClick,
    className: "ml-2 mb-1",
    "data-dismiss": "toast"
  }));
});
ToastHeader.displayName = 'ToastHeader';
ToastHeader.defaultProps = defaultProps$L;

var Body$1 = createWithBsPrefix('toast-body');

var defaultProps$M = {
  animation: true,
  autohide: false,
  delay: 3000,
  show: true,
  transition: Fade
};
var Toast = React__default.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      children = _ref.children,
      Transition = _ref.transition,
      show = _ref.show,
      animation = _ref.animation,
      delay = _ref.delay,
      autohide = _ref.autohide,
      onClose = _ref.onClose,
      props = _objectWithoutPropertiesLoose(_ref, ["bsPrefix", "className", "children", "transition", "show", "animation", "delay", "autohide", "onClose"]);

  bsPrefix = useBootstrapPrefix('toast');
  var delayRef = React.useRef(delay);
  var onCloseRef = React.useRef(onClose);
  React.useEffect(function () {
    // We use refs for these, because we don't want to restart the autohide
    // timer in case these values change.
    delayRef.current = delay;
    onCloseRef.current = onClose;
  }, [delay, onClose]);
  var autohideTimeout = useTimeout();
  var autohideFunc = React.useCallback(function () {
    if (!(autohide && show)) {
      return;
    }

    onCloseRef.current();
  }, [autohide, show]);
  autohideTimeout.set(autohideFunc, delayRef.current);
  var useAnimation = React.useMemo(function () {
    return Transition && animation;
  }, [Transition, animation]);
  var toast = React__default.createElement("div", _extends({}, props, {
    ref: ref,
    className: classnames(bsPrefix, className, !useAnimation && show && 'show'),
    role: "alert",
    "aria-live": "assertive",
    "aria-atomic": "true"
  }), children);
  var toastContext = {
    onClose: onClose
  };
  return React__default.createElement(ToastContext.Provider, {
    value: toastContext
  }, useAnimation ? React__default.createElement(Transition, {
    in: show
  }, toast) : toast);
});
Toast.defaultProps = defaultProps$M;
Toast.displayName = 'Toast';
Toast.Body = Body$1;
Toast.Header = ToastHeader;

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = "";
styleInject(css);

var Header$1 = function Header(props) {
    var getTabsView = function getTabsView(tabs) {
        return tabs.map(function (tab, index) {
            if (!tab.subtabs) {
                return React__default.createElement(
                    Nav.Link,
                    { key: index, href: tab.path },
                    tab.title
                );
            }
            return React__default.createElement(
                NavDropdown,
                { key: index, title: tab.title, id: 'collasible-nav-dropdown' },
                tab.subtabs.map(function (subtab, idx) {
                    return React__default.createElement(
                        NavDropdown.Item,
                        { key: idx, href: subtab.path },
                        subtab.title
                    );
                })
            );
        });
    };
    return React__default.createElement(
        Navbar,
        { collapseOnSelect: true, expand: 'lg', bg: 'dark', variant: 'dark' },
        React__default.createElement(
            Navbar.Brand,
            { href: '/' },
            React__default.createElement('img', { className: 'product-logo', src: props.logo }),
            props.productFamily,
            ' ',
            props.productName
        ),
        React__default.createElement(Navbar.Toggle, { 'aria-controls': 'responsive-navbar-nav' }),
        React__default.createElement(
            Navbar.Collapse,
            { id: 'responsive-navbar-nav' },
            React__default.createElement(
                Nav,
                { className: 'mr-auto' },
                getTabsView(props.tabs)
            ),
            React__default.createElement(
                Nav,
                null,
                getTabsView(props.rightTabs)
            )
        )
    );
};

var css$1 = "/* add css styles here (optional) */\n/*!\n * Bootstrap v4.4.1 (https://getbootstrap.com/)\n * Copyright 2011-2019 The Bootstrap Authors\n * Copyright 2011-2019 Twitter, Inc.\n * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)\n */\n:root {\n  --blue: #007bff;\n  --indigo: #6610f2;\n  --purple: #6f42c1;\n  --pink: #e83e8c;\n  --red: #dc3545;\n  --orange: #fd7e14;\n  --yellow: #ffc107;\n  --green: #28a745;\n  --teal: #20c997;\n  --cyan: #17a2b8;\n  --white: #fff;\n  --gray: #6c757d;\n  --gray-dark: #343a40;\n  --primary: #007bff;\n  --secondary: #6c757d;\n  --success: #28a745;\n  --info: #17a2b8;\n  --warning: #ffc107;\n  --danger: #dc3545;\n  --light: #f8f9fa;\n  --dark: #343a40;\n  --breakpoint-xs: 0;\n  --breakpoint-sm: 576px;\n  --breakpoint-md: 768px;\n  --breakpoint-lg: 992px;\n  --breakpoint-xl: 1200px;\n  --font-family-sans-serif: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\";\n  --font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace; }\n\n*,\n*::before,\n*::after {\n  box-sizing: border-box; }\n\nhtml {\n  font-family: sans-serif;\n  line-height: 1.15;\n  -webkit-text-size-adjust: 100%;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0); }\n\narticle, aside, figcaption, figure, footer, header, hgroup, main, nav, section {\n  display: block; }\n\nbody {\n  margin: 0;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\";\n  font-size: 1rem;\n  font-weight: 400;\n  line-height: 1.5;\n  color: #212529;\n  text-align: left;\n  background-color: #fff; }\n\n[tabindex=\"-1\"]:focus:not(:focus-visible) {\n  outline: 0 !important; }\n\nhr {\n  box-sizing: content-box;\n  height: 0;\n  overflow: visible; }\n\nh1, h2, h3, h4, h5, h6 {\n  margin-top: 0;\n  margin-bottom: 0.5rem; }\n\np {\n  margin-top: 0;\n  margin-bottom: 1rem; }\n\nabbr[title],\nabbr[data-original-title] {\n  text-decoration: underline;\n  text-decoration: underline dotted;\n  cursor: help;\n  border-bottom: 0;\n  text-decoration-skip-ink: none; }\n\naddress {\n  margin-bottom: 1rem;\n  font-style: normal;\n  line-height: inherit; }\n\nol,\nul,\ndl {\n  margin-top: 0;\n  margin-bottom: 1rem; }\n\nol ol,\nul ul,\nol ul,\nul ol {\n  margin-bottom: 0; }\n\ndt {\n  font-weight: 700; }\n\ndd {\n  margin-bottom: .5rem;\n  margin-left: 0; }\n\nblockquote {\n  margin: 0 0 1rem; }\n\nb,\nstrong {\n  font-weight: bolder; }\n\nsmall {\n  font-size: 80%; }\n\nsub,\nsup {\n  position: relative;\n  font-size: 75%;\n  line-height: 0;\n  vertical-align: baseline; }\n\nsub {\n  bottom: -.25em; }\n\nsup {\n  top: -.5em; }\n\na {\n  color: #007bff;\n  text-decoration: none;\n  background-color: transparent; }\n  a:hover {\n    color: #0056b3;\n    text-decoration: underline; }\n\na:not([href]) {\n  color: inherit;\n  text-decoration: none; }\n  a:not([href]):hover {\n    color: inherit;\n    text-decoration: none; }\n\npre,\ncode,\nkbd,\nsamp {\n  font-family: SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace;\n  font-size: 1em; }\n\npre {\n  margin-top: 0;\n  margin-bottom: 1rem;\n  overflow: auto; }\n\nfigure {\n  margin: 0 0 1rem; }\n\nimg {\n  vertical-align: middle;\n  border-style: none; }\n\nsvg {\n  overflow: hidden;\n  vertical-align: middle; }\n\ntable {\n  border-collapse: collapse; }\n\ncaption {\n  padding-top: 0.75rem;\n  padding-bottom: 0.75rem;\n  color: #6c757d;\n  text-align: left;\n  caption-side: bottom; }\n\nth {\n  text-align: inherit; }\n\nlabel {\n  display: inline-block;\n  margin-bottom: 0.5rem; }\n\nbutton {\n  border-radius: 0; }\n\nbutton:focus {\n  outline: 1px dotted;\n  outline: 5px auto -webkit-focus-ring-color; }\n\ninput,\nbutton,\nselect,\noptgroup,\ntextarea {\n  margin: 0;\n  font-family: inherit;\n  font-size: inherit;\n  line-height: inherit; }\n\nbutton,\ninput {\n  overflow: visible; }\n\nbutton,\nselect {\n  text-transform: none; }\n\nselect {\n  word-wrap: normal; }\n\nbutton,\n[type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button; }\n\nbutton:not(:disabled),\n[type=\"button\"]:not(:disabled),\n[type=\"reset\"]:not(:disabled),\n[type=\"submit\"]:not(:disabled) {\n  cursor: pointer; }\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  padding: 0;\n  border-style: none; }\n\ninput[type=\"radio\"],\ninput[type=\"checkbox\"] {\n  box-sizing: border-box;\n  padding: 0; }\n\ninput[type=\"date\"],\ninput[type=\"time\"],\ninput[type=\"datetime-local\"],\ninput[type=\"month\"] {\n  -webkit-appearance: listbox; }\n\ntextarea {\n  overflow: auto;\n  resize: vertical; }\n\nfieldset {\n  min-width: 0;\n  padding: 0;\n  margin: 0;\n  border: 0; }\n\nlegend {\n  display: block;\n  width: 100%;\n  max-width: 100%;\n  padding: 0;\n  margin-bottom: .5rem;\n  font-size: 1.5rem;\n  line-height: inherit;\n  color: inherit;\n  white-space: normal; }\n\nprogress {\n  vertical-align: baseline; }\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto; }\n\n[type=\"search\"] {\n  outline-offset: -2px;\n  -webkit-appearance: none; }\n\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none; }\n\n::-webkit-file-upload-button {\n  font: inherit;\n  -webkit-appearance: button; }\n\noutput {\n  display: inline-block; }\n\nsummary {\n  display: list-item;\n  cursor: pointer; }\n\ntemplate {\n  display: none; }\n\n[hidden] {\n  display: none !important; }\n\nh1, h2, h3, h4, h5, h6,\n.styles_h1__394_w, .styles_h2__3ZFMk, .styles_h3__NSiAb, .styles_h4__L8fWE, .styles_h5__hyMdf, .styles_h6__2H05h {\n  margin-bottom: 0.5rem;\n  font-weight: 500;\n  line-height: 1.2; }\n\nh1, .styles_h1__394_w {\n  font-size: 2.5rem; }\n\nh2, .styles_h2__3ZFMk {\n  font-size: 2rem; }\n\nh3, .styles_h3__NSiAb {\n  font-size: 1.75rem; }\n\nh4, .styles_h4__L8fWE {\n  font-size: 1.5rem; }\n\nh5, .styles_h5__hyMdf {\n  font-size: 1.25rem; }\n\nh6, .styles_h6__2H05h {\n  font-size: 1rem; }\n\n.styles_lead__3NHXf {\n  font-size: 1.25rem;\n  font-weight: 300; }\n\n.styles_display-1__3yRgi {\n  font-size: 6rem;\n  font-weight: 300;\n  line-height: 1.2; }\n\n.styles_display-2__-hRNr {\n  font-size: 5.5rem;\n  font-weight: 300;\n  line-height: 1.2; }\n\n.styles_display-3__ngXLY {\n  font-size: 4.5rem;\n  font-weight: 300;\n  line-height: 1.2; }\n\n.styles_display-4__s4rKs {\n  font-size: 3.5rem;\n  font-weight: 300;\n  line-height: 1.2; }\n\nhr {\n  margin-top: 1rem;\n  margin-bottom: 1rem;\n  border: 0;\n  border-top: 1px solid rgba(0, 0, 0, 0.1); }\n\nsmall,\n.styles_small__2hLWF {\n  font-size: 80%;\n  font-weight: 400; }\n\nmark,\n.styles_mark__2ApxY {\n  padding: 0.2em;\n  background-color: #fcf8e3; }\n\n.styles_list-unstyled__2qTiZ {\n  padding-left: 0;\n  list-style: none; }\n\n.styles_list-inline__YRJ07 {\n  padding-left: 0;\n  list-style: none; }\n\n.styles_list-inline-item__2-54_ {\n  display: inline-block; }\n  .styles_list-inline-item__2-54_:not(:last-child) {\n    margin-right: 0.5rem; }\n\n.styles_initialism__125yZ {\n  font-size: 90%;\n  text-transform: uppercase; }\n\n.styles_blockquote__3XEZc {\n  margin-bottom: 1rem;\n  font-size: 1.25rem; }\n\n.styles_blockquote-footer__2QCSL {\n  display: block;\n  font-size: 80%;\n  color: #6c757d; }\n  .styles_blockquote-footer__2QCSL::before {\n    content: \"\\2014\\A0\"; }\n\n.styles_img-fluid__1ywYX {\n  max-width: 100%;\n  height: auto; }\n\n.styles_img-thumbnail__29tZp {\n  padding: 0.25rem;\n  background-color: #fff;\n  border: 1px solid #dee2e6;\n  border-radius: 0.25rem;\n  max-width: 100%;\n  height: auto; }\n\n.styles_figure__3rCOq {\n  display: inline-block; }\n\n.styles_figure-img__wOWLk {\n  margin-bottom: 0.5rem;\n  line-height: 1; }\n\n.styles_figure-caption__hYfw_ {\n  font-size: 90%;\n  color: #6c757d; }\n\ncode {\n  font-size: 87.5%;\n  color: #e83e8c;\n  word-wrap: break-word; }\n  a > code {\n    color: inherit; }\n\nkbd {\n  padding: 0.2rem 0.4rem;\n  font-size: 87.5%;\n  color: #fff;\n  background-color: #212529;\n  border-radius: 0.2rem; }\n  kbd kbd {\n    padding: 0;\n    font-size: 100%;\n    font-weight: 700; }\n\npre {\n  display: block;\n  font-size: 87.5%;\n  color: #212529; }\n  pre code {\n    font-size: inherit;\n    color: inherit;\n    word-break: normal; }\n\n.styles_pre-scrollable__2i5DI {\n  max-height: 340px;\n  overflow-y: scroll; }\n\n.styles_container__1H7C6 {\n  width: 100%;\n  padding-right: 15px;\n  padding-left: 15px;\n  margin-right: auto;\n  margin-left: auto; }\n  @media (min-width: 576px) {\n    .styles_container__1H7C6 {\n      max-width: 540px; } }\n  @media (min-width: 768px) {\n    .styles_container__1H7C6 {\n      max-width: 720px; } }\n  @media (min-width: 992px) {\n    .styles_container__1H7C6 {\n      max-width: 960px; } }\n  @media (min-width: 1200px) {\n    .styles_container__1H7C6 {\n      max-width: 1140px; } }\n\n.styles_container-fluid__14efH, .styles_container-sm__1NrLH, .styles_container-md__3Qdym, .styles_container-lg__1Vyon, .styles_container-xl__3JIrQ {\n  width: 100%;\n  padding-right: 15px;\n  padding-left: 15px;\n  margin-right: auto;\n  margin-left: auto; }\n\n@media (min-width: 576px) {\n  .styles_container__1H7C6, .styles_container-sm__1NrLH {\n    max-width: 540px; } }\n\n@media (min-width: 768px) {\n  .styles_container__1H7C6, .styles_container-sm__1NrLH, .styles_container-md__3Qdym {\n    max-width: 720px; } }\n\n@media (min-width: 992px) {\n  .styles_container__1H7C6, .styles_container-sm__1NrLH, .styles_container-md__3Qdym, .styles_container-lg__1Vyon {\n    max-width: 960px; } }\n\n@media (min-width: 1200px) {\n  .styles_container__1H7C6, .styles_container-sm__1NrLH, .styles_container-md__3Qdym, .styles_container-lg__1Vyon, .styles_container-xl__3JIrQ {\n    max-width: 1140px; } }\n\n.styles_row__3gGWe {\n  display: flex;\n  flex-wrap: wrap;\n  margin-right: -15px;\n  margin-left: -15px; }\n\n.styles_no-gutters__1Q7wN {\n  margin-right: 0;\n  margin-left: 0; }\n  .styles_no-gutters__1Q7wN > .styles_col__1CWhf,\n  .styles_no-gutters__1Q7wN > [class*=\"col-\"] {\n    padding-right: 0;\n    padding-left: 0; }\n\n.styles_col-1__2J-uv, .styles_col-2__2v10P, .styles_col-3__ei0EL, .styles_col-4__1NrzB, .styles_col-5__1FtRe, .styles_col-6__2-uW5, .styles_col-7__xQuAb, .styles_col-8__sJjag, .styles_col-9__Z_Uum, .styles_col-10__2_Sqi, .styles_col-11__34HgJ, .styles_col-12__xQ0WL, .styles_col__1CWhf,\n.styles_col-auto__3Hxf7, .styles_col-sm-1__38gwM, .styles_col-sm-2__3DUKd, .styles_col-sm-3__1uxrP, .styles_col-sm-4__2ToeW, .styles_col-sm-5__1lQ-t, .styles_col-sm-6__PQ7VK, .styles_col-sm-7__1R0sE, .styles_col-sm-8__28qR0, .styles_col-sm-9__1CDHk, .styles_col-sm-10__15DjN, .styles_col-sm-11__1crXZ, .styles_col-sm-12__3gEJU, .styles_col-sm__3YaVT,\n.styles_col-sm-auto__5fEAK, .styles_col-md-1__bmAQF, .styles_col-md-2__2mBqs, .styles_col-md-3__3eXda, .styles_col-md-4__2lTEy, .styles_col-md-5__4Zfm_, .styles_col-md-6__q0cVk, .styles_col-md-7__3ks38, .styles_col-md-8__3e0bQ, .styles_col-md-9__3Ne4v, .styles_col-md-10__5_Pmh, .styles_col-md-11__CL9u2, .styles_col-md-12__yQ41V, .styles_col-md__QXE8r,\n.styles_col-md-auto__2z-Tb, .styles_col-lg-1__3Sogg, .styles_col-lg-2__3nPEC, .styles_col-lg-3__1mKqq, .styles_col-lg-4__2x4ts, .styles_col-lg-5__JKLBX, .styles_col-lg-6__CWBKD, .styles_col-lg-7__uAWPz, .styles_col-lg-8__3mnxv, .styles_col-lg-9__178ed, .styles_col-lg-10__1bcrq, .styles_col-lg-11__11CpQ, .styles_col-lg-12__hwdF_, .styles_col-lg__2suFK,\n.styles_col-lg-auto__3Ii5f, .styles_col-xl-1__2zQ4F, .styles_col-xl-2__zPJae, .styles_col-xl-3__3Pyk2, .styles_col-xl-4__3DlNj, .styles_col-xl-5__1Mhb3, .styles_col-xl-6__1oj8p, .styles_col-xl-7__QjP25, .styles_col-xl-8__UE5yc, .styles_col-xl-9__17PsW, .styles_col-xl-10__3PdJN, .styles_col-xl-11__grGRT, .styles_col-xl-12__FFX-b, .styles_col-xl__1TJAD,\n.styles_col-xl-auto__3wJKQ {\n  position: relative;\n  width: 100%;\n  padding-right: 15px;\n  padding-left: 15px; }\n\n.styles_col__1CWhf {\n  flex-basis: 0;\n  flex-grow: 1;\n  max-width: 100%; }\n\n.styles_row-cols-1__3yxMU > * {\n  flex: 0 0 100%;\n  max-width: 100%; }\n\n.styles_row-cols-2__5bUIJ > * {\n  flex: 0 0 50%;\n  max-width: 50%; }\n\n.styles_row-cols-3__aRgaa > * {\n  flex: 0 0 33.33333%;\n  max-width: 33.33333%; }\n\n.styles_row-cols-4__Yc1Ew > * {\n  flex: 0 0 25%;\n  max-width: 25%; }\n\n.styles_row-cols-5__1Qak4 > * {\n  flex: 0 0 20%;\n  max-width: 20%; }\n\n.styles_row-cols-6__3Cluf > * {\n  flex: 0 0 16.66667%;\n  max-width: 16.66667%; }\n\n.styles_col-auto__3Hxf7 {\n  flex: 0 0 auto;\n  width: auto;\n  max-width: 100%; }\n\n.styles_col-1__2J-uv {\n  flex: 0 0 8.33333%;\n  max-width: 8.33333%; }\n\n.styles_col-2__2v10P {\n  flex: 0 0 16.66667%;\n  max-width: 16.66667%; }\n\n.styles_col-3__ei0EL {\n  flex: 0 0 25%;\n  max-width: 25%; }\n\n.styles_col-4__1NrzB {\n  flex: 0 0 33.33333%;\n  max-width: 33.33333%; }\n\n.styles_col-5__1FtRe {\n  flex: 0 0 41.66667%;\n  max-width: 41.66667%; }\n\n.styles_col-6__2-uW5 {\n  flex: 0 0 50%;\n  max-width: 50%; }\n\n.styles_col-7__xQuAb {\n  flex: 0 0 58.33333%;\n  max-width: 58.33333%; }\n\n.styles_col-8__sJjag {\n  flex: 0 0 66.66667%;\n  max-width: 66.66667%; }\n\n.styles_col-9__Z_Uum {\n  flex: 0 0 75%;\n  max-width: 75%; }\n\n.styles_col-10__2_Sqi {\n  flex: 0 0 83.33333%;\n  max-width: 83.33333%; }\n\n.styles_col-11__34HgJ {\n  flex: 0 0 91.66667%;\n  max-width: 91.66667%; }\n\n.styles_col-12__xQ0WL {\n  flex: 0 0 100%;\n  max-width: 100%; }\n\n.styles_order-first__XE7vm {\n  order: -1; }\n\n.styles_order-last__lwCCT {\n  order: 13; }\n\n.styles_order-0__29yMx {\n  order: 0; }\n\n.styles_order-1__1DlSd {\n  order: 1; }\n\n.styles_order-2__zSNe5 {\n  order: 2; }\n\n.styles_order-3__1llne {\n  order: 3; }\n\n.styles_order-4__3W6IE {\n  order: 4; }\n\n.styles_order-5__3cazt {\n  order: 5; }\n\n.styles_order-6__12foP {\n  order: 6; }\n\n.styles_order-7__3hpdr {\n  order: 7; }\n\n.styles_order-8__1S9xN {\n  order: 8; }\n\n.styles_order-9__2rgZY {\n  order: 9; }\n\n.styles_order-10__eSn4Q {\n  order: 10; }\n\n.styles_order-11__2actw {\n  order: 11; }\n\n.styles_order-12__3Av1q {\n  order: 12; }\n\n.styles_offset-1__uc5rZ {\n  margin-left: 8.33333%; }\n\n.styles_offset-2__GE742 {\n  margin-left: 16.66667%; }\n\n.styles_offset-3__2udm3 {\n  margin-left: 25%; }\n\n.styles_offset-4__127YQ {\n  margin-left: 33.33333%; }\n\n.styles_offset-5__2M0FL {\n  margin-left: 41.66667%; }\n\n.styles_offset-6__1OBC5 {\n  margin-left: 50%; }\n\n.styles_offset-7__NOGlN {\n  margin-left: 58.33333%; }\n\n.styles_offset-8__1TysZ {\n  margin-left: 66.66667%; }\n\n.styles_offset-9__1bbpq {\n  margin-left: 75%; }\n\n.styles_offset-10__37rIE {\n  margin-left: 83.33333%; }\n\n.styles_offset-11__1O3JG {\n  margin-left: 91.66667%; }\n\n@media (min-width: 576px) {\n  .styles_col-sm__3YaVT {\n    flex-basis: 0;\n    flex-grow: 1;\n    max-width: 100%; }\n  .styles_row-cols-sm-1__1A7st > * {\n    flex: 0 0 100%;\n    max-width: 100%; }\n  .styles_row-cols-sm-2__25QKQ > * {\n    flex: 0 0 50%;\n    max-width: 50%; }\n  .styles_row-cols-sm-3__20TmY > * {\n    flex: 0 0 33.33333%;\n    max-width: 33.33333%; }\n  .styles_row-cols-sm-4__3qcx_ > * {\n    flex: 0 0 25%;\n    max-width: 25%; }\n  .styles_row-cols-sm-5__vCAu_ > * {\n    flex: 0 0 20%;\n    max-width: 20%; }\n  .styles_row-cols-sm-6__3Pvm1 > * {\n    flex: 0 0 16.66667%;\n    max-width: 16.66667%; }\n  .styles_col-sm-auto__5fEAK {\n    flex: 0 0 auto;\n    width: auto;\n    max-width: 100%; }\n  .styles_col-sm-1__38gwM {\n    flex: 0 0 8.33333%;\n    max-width: 8.33333%; }\n  .styles_col-sm-2__3DUKd {\n    flex: 0 0 16.66667%;\n    max-width: 16.66667%; }\n  .styles_col-sm-3__1uxrP {\n    flex: 0 0 25%;\n    max-width: 25%; }\n  .styles_col-sm-4__2ToeW {\n    flex: 0 0 33.33333%;\n    max-width: 33.33333%; }\n  .styles_col-sm-5__1lQ-t {\n    flex: 0 0 41.66667%;\n    max-width: 41.66667%; }\n  .styles_col-sm-6__PQ7VK {\n    flex: 0 0 50%;\n    max-width: 50%; }\n  .styles_col-sm-7__1R0sE {\n    flex: 0 0 58.33333%;\n    max-width: 58.33333%; }\n  .styles_col-sm-8__28qR0 {\n    flex: 0 0 66.66667%;\n    max-width: 66.66667%; }\n  .styles_col-sm-9__1CDHk {\n    flex: 0 0 75%;\n    max-width: 75%; }\n  .styles_col-sm-10__15DjN {\n    flex: 0 0 83.33333%;\n    max-width: 83.33333%; }\n  .styles_col-sm-11__1crXZ {\n    flex: 0 0 91.66667%;\n    max-width: 91.66667%; }\n  .styles_col-sm-12__3gEJU {\n    flex: 0 0 100%;\n    max-width: 100%; }\n  .styles_order-sm-first__1biU7 {\n    order: -1; }\n  .styles_order-sm-last__1TWu1 {\n    order: 13; }\n  .styles_order-sm-0__rO5WE {\n    order: 0; }\n  .styles_order-sm-1__F9Oz3 {\n    order: 1; }\n  .styles_order-sm-2__1-v81 {\n    order: 2; }\n  .styles_order-sm-3__1vd4l {\n    order: 3; }\n  .styles_order-sm-4__3C5I3 {\n    order: 4; }\n  .styles_order-sm-5__3Q_VL {\n    order: 5; }\n  .styles_order-sm-6__2g7hu {\n    order: 6; }\n  .styles_order-sm-7__Nq6Fs {\n    order: 7; }\n  .styles_order-sm-8__25zoD {\n    order: 8; }\n  .styles_order-sm-9__2oumM {\n    order: 9; }\n  .styles_order-sm-10__2O_cr {\n    order: 10; }\n  .styles_order-sm-11__3Kt3U {\n    order: 11; }\n  .styles_order-sm-12___9Pzx {\n    order: 12; }\n  .styles_offset-sm-0__2EgJM {\n    margin-left: 0; }\n  .styles_offset-sm-1__3pYwf {\n    margin-left: 8.33333%; }\n  .styles_offset-sm-2__3Mwro {\n    margin-left: 16.66667%; }\n  .styles_offset-sm-3__-EIGi {\n    margin-left: 25%; }\n  .styles_offset-sm-4__3Pc37 {\n    margin-left: 33.33333%; }\n  .styles_offset-sm-5__J1Zr_ {\n    margin-left: 41.66667%; }\n  .styles_offset-sm-6__1NJDc {\n    margin-left: 50%; }\n  .styles_offset-sm-7__2nqL3 {\n    margin-left: 58.33333%; }\n  .styles_offset-sm-8__3n7CL {\n    margin-left: 66.66667%; }\n  .styles_offset-sm-9__1ITLA {\n    margin-left: 75%; }\n  .styles_offset-sm-10__GaaL_ {\n    margin-left: 83.33333%; }\n  .styles_offset-sm-11__1mcta {\n    margin-left: 91.66667%; } }\n\n@media (min-width: 768px) {\n  .styles_col-md__QXE8r {\n    flex-basis: 0;\n    flex-grow: 1;\n    max-width: 100%; }\n  .styles_row-cols-md-1__cx-Ng > * {\n    flex: 0 0 100%;\n    max-width: 100%; }\n  .styles_row-cols-md-2__3UdLd > * {\n    flex: 0 0 50%;\n    max-width: 50%; }\n  .styles_row-cols-md-3__2QouW > * {\n    flex: 0 0 33.33333%;\n    max-width: 33.33333%; }\n  .styles_row-cols-md-4__vV5PI > * {\n    flex: 0 0 25%;\n    max-width: 25%; }\n  .styles_row-cols-md-5__3HWYD > * {\n    flex: 0 0 20%;\n    max-width: 20%; }\n  .styles_row-cols-md-6__1KI2W > * {\n    flex: 0 0 16.66667%;\n    max-width: 16.66667%; }\n  .styles_col-md-auto__2z-Tb {\n    flex: 0 0 auto;\n    width: auto;\n    max-width: 100%; }\n  .styles_col-md-1__bmAQF {\n    flex: 0 0 8.33333%;\n    max-width: 8.33333%; }\n  .styles_col-md-2__2mBqs {\n    flex: 0 0 16.66667%;\n    max-width: 16.66667%; }\n  .styles_col-md-3__3eXda {\n    flex: 0 0 25%;\n    max-width: 25%; }\n  .styles_col-md-4__2lTEy {\n    flex: 0 0 33.33333%;\n    max-width: 33.33333%; }\n  .styles_col-md-5__4Zfm_ {\n    flex: 0 0 41.66667%;\n    max-width: 41.66667%; }\n  .styles_col-md-6__q0cVk {\n    flex: 0 0 50%;\n    max-width: 50%; }\n  .styles_col-md-7__3ks38 {\n    flex: 0 0 58.33333%;\n    max-width: 58.33333%; }\n  .styles_col-md-8__3e0bQ {\n    flex: 0 0 66.66667%;\n    max-width: 66.66667%; }\n  .styles_col-md-9__3Ne4v {\n    flex: 0 0 75%;\n    max-width: 75%; }\n  .styles_col-md-10__5_Pmh {\n    flex: 0 0 83.33333%;\n    max-width: 83.33333%; }\n  .styles_col-md-11__CL9u2 {\n    flex: 0 0 91.66667%;\n    max-width: 91.66667%; }\n  .styles_col-md-12__yQ41V {\n    flex: 0 0 100%;\n    max-width: 100%; }\n  .styles_order-md-first__307A6 {\n    order: -1; }\n  .styles_order-md-last__V9oJk {\n    order: 13; }\n  .styles_order-md-0__xfC5Y {\n    order: 0; }\n  .styles_order-md-1__2tFLU {\n    order: 1; }\n  .styles_order-md-2__gBnTW {\n    order: 2; }\n  .styles_order-md-3__1J_JS {\n    order: 3; }\n  .styles_order-md-4__xxmYy {\n    order: 4; }\n  .styles_order-md-5__38LYe {\n    order: 5; }\n  .styles_order-md-6__2Ntw0 {\n    order: 6; }\n  .styles_order-md-7__2Gpcg {\n    order: 7; }\n  .styles_order-md-8__nau8g {\n    order: 8; }\n  .styles_order-md-9__10P6E {\n    order: 9; }\n  .styles_order-md-10__1dcOu {\n    order: 10; }\n  .styles_order-md-11__2fULT {\n    order: 11; }\n  .styles_order-md-12__29G4t {\n    order: 12; }\n  .styles_offset-md-0__B2xio {\n    margin-left: 0; }\n  .styles_offset-md-1__2zXtP {\n    margin-left: 8.33333%; }\n  .styles_offset-md-2__1Dizb {\n    margin-left: 16.66667%; }\n  .styles_offset-md-3__1W5Kn {\n    margin-left: 25%; }\n  .styles_offset-md-4__2X2kC {\n    margin-left: 33.33333%; }\n  .styles_offset-md-5__2OthJ {\n    margin-left: 41.66667%; }\n  .styles_offset-md-6__PfT5i {\n    margin-left: 50%; }\n  .styles_offset-md-7__3D3sB {\n    margin-left: 58.33333%; }\n  .styles_offset-md-8__1NWGX {\n    margin-left: 66.66667%; }\n  .styles_offset-md-9__3SrdT {\n    margin-left: 75%; }\n  .styles_offset-md-10__3SllT {\n    margin-left: 83.33333%; }\n  .styles_offset-md-11__2p5j3 {\n    margin-left: 91.66667%; } }\n\n@media (min-width: 992px) {\n  .styles_col-lg__2suFK {\n    flex-basis: 0;\n    flex-grow: 1;\n    max-width: 100%; }\n  .styles_row-cols-lg-1__1Ia_i > * {\n    flex: 0 0 100%;\n    max-width: 100%; }\n  .styles_row-cols-lg-2__1-K9l > * {\n    flex: 0 0 50%;\n    max-width: 50%; }\n  .styles_row-cols-lg-3__3y5c0 > * {\n    flex: 0 0 33.33333%;\n    max-width: 33.33333%; }\n  .styles_row-cols-lg-4__3l3ws > * {\n    flex: 0 0 25%;\n    max-width: 25%; }\n  .styles_row-cols-lg-5__VXjxO > * {\n    flex: 0 0 20%;\n    max-width: 20%; }\n  .styles_row-cols-lg-6__1JJuG > * {\n    flex: 0 0 16.66667%;\n    max-width: 16.66667%; }\n  .styles_col-lg-auto__3Ii5f {\n    flex: 0 0 auto;\n    width: auto;\n    max-width: 100%; }\n  .styles_col-lg-1__3Sogg {\n    flex: 0 0 8.33333%;\n    max-width: 8.33333%; }\n  .styles_col-lg-2__3nPEC {\n    flex: 0 0 16.66667%;\n    max-width: 16.66667%; }\n  .styles_col-lg-3__1mKqq {\n    flex: 0 0 25%;\n    max-width: 25%; }\n  .styles_col-lg-4__2x4ts {\n    flex: 0 0 33.33333%;\n    max-width: 33.33333%; }\n  .styles_col-lg-5__JKLBX {\n    flex: 0 0 41.66667%;\n    max-width: 41.66667%; }\n  .styles_col-lg-6__CWBKD {\n    flex: 0 0 50%;\n    max-width: 50%; }\n  .styles_col-lg-7__uAWPz {\n    flex: 0 0 58.33333%;\n    max-width: 58.33333%; }\n  .styles_col-lg-8__3mnxv {\n    flex: 0 0 66.66667%;\n    max-width: 66.66667%; }\n  .styles_col-lg-9__178ed {\n    flex: 0 0 75%;\n    max-width: 75%; }\n  .styles_col-lg-10__1bcrq {\n    flex: 0 0 83.33333%;\n    max-width: 83.33333%; }\n  .styles_col-lg-11__11CpQ {\n    flex: 0 0 91.66667%;\n    max-width: 91.66667%; }\n  .styles_col-lg-12__hwdF_ {\n    flex: 0 0 100%;\n    max-width: 100%; }\n  .styles_order-lg-first___bkZB {\n    order: -1; }\n  .styles_order-lg-last__2PS9q {\n    order: 13; }\n  .styles_order-lg-0__14Xdv {\n    order: 0; }\n  .styles_order-lg-1__1v1Gg {\n    order: 1; }\n  .styles_order-lg-2__dPXVq {\n    order: 2; }\n  .styles_order-lg-3__3L0-E {\n    order: 3; }\n  .styles_order-lg-4__15szA {\n    order: 4; }\n  .styles_order-lg-5__2Yuc6 {\n    order: 5; }\n  .styles_order-lg-6__WNicn {\n    order: 6; }\n  .styles_order-lg-7__3-MHD {\n    order: 7; }\n  .styles_order-lg-8__31vd9 {\n    order: 8; }\n  .styles_order-lg-9__pVIzp {\n    order: 9; }\n  .styles_order-lg-10__1fiG0 {\n    order: 10; }\n  .styles_order-lg-11__1gwPk {\n    order: 11; }\n  .styles_order-lg-12__1htiM {\n    order: 12; }\n  .styles_offset-lg-0__1uX_U {\n    margin-left: 0; }\n  .styles_offset-lg-1__2Y_QR {\n    margin-left: 8.33333%; }\n  .styles_offset-lg-2__uHtcw {\n    margin-left: 16.66667%; }\n  .styles_offset-lg-3__10keY {\n    margin-left: 25%; }\n  .styles_offset-lg-4__B6WAv {\n    margin-left: 33.33333%; }\n  .styles_offset-lg-5__xh7S3 {\n    margin-left: 41.66667%; }\n  .styles_offset-lg-6__2tO9I {\n    margin-left: 50%; }\n  .styles_offset-lg-7__1nNkR {\n    margin-left: 58.33333%; }\n  .styles_offset-lg-8__3Pqwn {\n    margin-left: 66.66667%; }\n  .styles_offset-lg-9__1XxXo {\n    margin-left: 75%; }\n  .styles_offset-lg-10__oyHcH {\n    margin-left: 83.33333%; }\n  .styles_offset-lg-11__1Z-LT {\n    margin-left: 91.66667%; } }\n\n@media (min-width: 1200px) {\n  .styles_col-xl__1TJAD {\n    flex-basis: 0;\n    flex-grow: 1;\n    max-width: 100%; }\n  .styles_row-cols-xl-1__2cn3m > * {\n    flex: 0 0 100%;\n    max-width: 100%; }\n  .styles_row-cols-xl-2__3W6pd > * {\n    flex: 0 0 50%;\n    max-width: 50%; }\n  .styles_row-cols-xl-3__2endo > * {\n    flex: 0 0 33.33333%;\n    max-width: 33.33333%; }\n  .styles_row-cols-xl-4__1NRbq > * {\n    flex: 0 0 25%;\n    max-width: 25%; }\n  .styles_row-cols-xl-5__3qago > * {\n    flex: 0 0 20%;\n    max-width: 20%; }\n  .styles_row-cols-xl-6__1aeC- > * {\n    flex: 0 0 16.66667%;\n    max-width: 16.66667%; }\n  .styles_col-xl-auto__3wJKQ {\n    flex: 0 0 auto;\n    width: auto;\n    max-width: 100%; }\n  .styles_col-xl-1__2zQ4F {\n    flex: 0 0 8.33333%;\n    max-width: 8.33333%; }\n  .styles_col-xl-2__zPJae {\n    flex: 0 0 16.66667%;\n    max-width: 16.66667%; }\n  .styles_col-xl-3__3Pyk2 {\n    flex: 0 0 25%;\n    max-width: 25%; }\n  .styles_col-xl-4__3DlNj {\n    flex: 0 0 33.33333%;\n    max-width: 33.33333%; }\n  .styles_col-xl-5__1Mhb3 {\n    flex: 0 0 41.66667%;\n    max-width: 41.66667%; }\n  .styles_col-xl-6__1oj8p {\n    flex: 0 0 50%;\n    max-width: 50%; }\n  .styles_col-xl-7__QjP25 {\n    flex: 0 0 58.33333%;\n    max-width: 58.33333%; }\n  .styles_col-xl-8__UE5yc {\n    flex: 0 0 66.66667%;\n    max-width: 66.66667%; }\n  .styles_col-xl-9__17PsW {\n    flex: 0 0 75%;\n    max-width: 75%; }\n  .styles_col-xl-10__3PdJN {\n    flex: 0 0 83.33333%;\n    max-width: 83.33333%; }\n  .styles_col-xl-11__grGRT {\n    flex: 0 0 91.66667%;\n    max-width: 91.66667%; }\n  .styles_col-xl-12__FFX-b {\n    flex: 0 0 100%;\n    max-width: 100%; }\n  .styles_order-xl-first__3y9qK {\n    order: -1; }\n  .styles_order-xl-last__2o2dM {\n    order: 13; }\n  .styles_order-xl-0__1xzcy {\n    order: 0; }\n  .styles_order-xl-1__1Csyb {\n    order: 1; }\n  .styles_order-xl-2__128sA {\n    order: 2; }\n  .styles_order-xl-3__2279Z {\n    order: 3; }\n  .styles_order-xl-4__2uu7Z {\n    order: 4; }\n  .styles_order-xl-5__3eu7h {\n    order: 5; }\n  .styles_order-xl-6__2Newp {\n    order: 6; }\n  .styles_order-xl-7__2iygr {\n    order: 7; }\n  .styles_order-xl-8__1mtFX {\n    order: 8; }\n  .styles_order-xl-9__2vrAA {\n    order: 9; }\n  .styles_order-xl-10__IBfku {\n    order: 10; }\n  .styles_order-xl-11__33_PC {\n    order: 11; }\n  .styles_order-xl-12__3cmGw {\n    order: 12; }\n  .styles_offset-xl-0__1_63v {\n    margin-left: 0; }\n  .styles_offset-xl-1__2M51g {\n    margin-left: 8.33333%; }\n  .styles_offset-xl-2__2T2EL {\n    margin-left: 16.66667%; }\n  .styles_offset-xl-3__3QKYV {\n    margin-left: 25%; }\n  .styles_offset-xl-4__2GLf5 {\n    margin-left: 33.33333%; }\n  .styles_offset-xl-5__MbcdW {\n    margin-left: 41.66667%; }\n  .styles_offset-xl-6__1Uwz1 {\n    margin-left: 50%; }\n  .styles_offset-xl-7__3a5hm {\n    margin-left: 58.33333%; }\n  .styles_offset-xl-8__3pYj4 {\n    margin-left: 66.66667%; }\n  .styles_offset-xl-9__2a5Aw {\n    margin-left: 75%; }\n  .styles_offset-xl-10__3s620 {\n    margin-left: 83.33333%; }\n  .styles_offset-xl-11__2MN_4 {\n    margin-left: 91.66667%; } }\n\n.styles_table__3n6C2 {\n  width: 100%;\n  margin-bottom: 1rem;\n  color: #212529; }\n  .styles_table__3n6C2 th,\n  .styles_table__3n6C2 td {\n    padding: 0.75rem;\n    vertical-align: top;\n    border-top: 1px solid #dee2e6; }\n  .styles_table__3n6C2 thead th {\n    vertical-align: bottom;\n    border-bottom: 2px solid #dee2e6; }\n  .styles_table__3n6C2 tbody + tbody {\n    border-top: 2px solid #dee2e6; }\n\n.styles_table-sm__1NMAN th,\n.styles_table-sm__1NMAN td {\n  padding: 0.3rem; }\n\n.styles_table-bordered__1lhpI {\n  border: 1px solid #dee2e6; }\n  .styles_table-bordered__1lhpI th,\n  .styles_table-bordered__1lhpI td {\n    border: 1px solid #dee2e6; }\n  .styles_table-bordered__1lhpI thead th,\n  .styles_table-bordered__1lhpI thead td {\n    border-bottom-width: 2px; }\n\n.styles_table-borderless__3xRK3 th,\n.styles_table-borderless__3xRK3 td,\n.styles_table-borderless__3xRK3 thead th,\n.styles_table-borderless__3xRK3 tbody + tbody {\n  border: 0; }\n\n.styles_table-striped__3yCY_ tbody tr:nth-of-type(odd) {\n  background-color: rgba(0, 0, 0, 0.05); }\n\n.styles_table-hover__uVrde tbody tr:hover {\n  color: #212529;\n  background-color: rgba(0, 0, 0, 0.075); }\n\n.styles_table-primary__2cZwj,\n.styles_table-primary__2cZwj > th,\n.styles_table-primary__2cZwj > td {\n  background-color: #b8daff; }\n\n.styles_table-primary__2cZwj th,\n.styles_table-primary__2cZwj td,\n.styles_table-primary__2cZwj thead th,\n.styles_table-primary__2cZwj tbody + tbody {\n  border-color: #7abaff; }\n\n.styles_table-hover__uVrde .styles_table-primary__2cZwj:hover {\n  background-color: #9fcdff; }\n  .styles_table-hover__uVrde .styles_table-primary__2cZwj:hover > td,\n  .styles_table-hover__uVrde .styles_table-primary__2cZwj:hover > th {\n    background-color: #9fcdff; }\n\n.styles_table-secondary__2tR45,\n.styles_table-secondary__2tR45 > th,\n.styles_table-secondary__2tR45 > td {\n  background-color: #d6d8db; }\n\n.styles_table-secondary__2tR45 th,\n.styles_table-secondary__2tR45 td,\n.styles_table-secondary__2tR45 thead th,\n.styles_table-secondary__2tR45 tbody + tbody {\n  border-color: #b3b7bb; }\n\n.styles_table-hover__uVrde .styles_table-secondary__2tR45:hover {\n  background-color: #c8cbcf; }\n  .styles_table-hover__uVrde .styles_table-secondary__2tR45:hover > td,\n  .styles_table-hover__uVrde .styles_table-secondary__2tR45:hover > th {\n    background-color: #c8cbcf; }\n\n.styles_table-success__3wNx8,\n.styles_table-success__3wNx8 > th,\n.styles_table-success__3wNx8 > td {\n  background-color: #c3e6cb; }\n\n.styles_table-success__3wNx8 th,\n.styles_table-success__3wNx8 td,\n.styles_table-success__3wNx8 thead th,\n.styles_table-success__3wNx8 tbody + tbody {\n  border-color: #8fd19e; }\n\n.styles_table-hover__uVrde .styles_table-success__3wNx8:hover {\n  background-color: #b1dfbb; }\n  .styles_table-hover__uVrde .styles_table-success__3wNx8:hover > td,\n  .styles_table-hover__uVrde .styles_table-success__3wNx8:hover > th {\n    background-color: #b1dfbb; }\n\n.styles_table-info__1lIs1,\n.styles_table-info__1lIs1 > th,\n.styles_table-info__1lIs1 > td {\n  background-color: #bee5eb; }\n\n.styles_table-info__1lIs1 th,\n.styles_table-info__1lIs1 td,\n.styles_table-info__1lIs1 thead th,\n.styles_table-info__1lIs1 tbody + tbody {\n  border-color: #86cfda; }\n\n.styles_table-hover__uVrde .styles_table-info__1lIs1:hover {\n  background-color: #abdde5; }\n  .styles_table-hover__uVrde .styles_table-info__1lIs1:hover > td,\n  .styles_table-hover__uVrde .styles_table-info__1lIs1:hover > th {\n    background-color: #abdde5; }\n\n.styles_table-warning__N7Khw,\n.styles_table-warning__N7Khw > th,\n.styles_table-warning__N7Khw > td {\n  background-color: #ffeeba; }\n\n.styles_table-warning__N7Khw th,\n.styles_table-warning__N7Khw td,\n.styles_table-warning__N7Khw thead th,\n.styles_table-warning__N7Khw tbody + tbody {\n  border-color: #ffdf7e; }\n\n.styles_table-hover__uVrde .styles_table-warning__N7Khw:hover {\n  background-color: #ffe8a1; }\n  .styles_table-hover__uVrde .styles_table-warning__N7Khw:hover > td,\n  .styles_table-hover__uVrde .styles_table-warning__N7Khw:hover > th {\n    background-color: #ffe8a1; }\n\n.styles_table-danger__10qW5,\n.styles_table-danger__10qW5 > th,\n.styles_table-danger__10qW5 > td {\n  background-color: #f5c6cb; }\n\n.styles_table-danger__10qW5 th,\n.styles_table-danger__10qW5 td,\n.styles_table-danger__10qW5 thead th,\n.styles_table-danger__10qW5 tbody + tbody {\n  border-color: #ed969e; }\n\n.styles_table-hover__uVrde .styles_table-danger__10qW5:hover {\n  background-color: #f1b0b7; }\n  .styles_table-hover__uVrde .styles_table-danger__10qW5:hover > td,\n  .styles_table-hover__uVrde .styles_table-danger__10qW5:hover > th {\n    background-color: #f1b0b7; }\n\n.styles_table-light__3mbZC,\n.styles_table-light__3mbZC > th,\n.styles_table-light__3mbZC > td {\n  background-color: #fdfdfe; }\n\n.styles_table-light__3mbZC th,\n.styles_table-light__3mbZC td,\n.styles_table-light__3mbZC thead th,\n.styles_table-light__3mbZC tbody + tbody {\n  border-color: #fbfcfc; }\n\n.styles_table-hover__uVrde .styles_table-light__3mbZC:hover {\n  background-color: #ececf6; }\n  .styles_table-hover__uVrde .styles_table-light__3mbZC:hover > td,\n  .styles_table-hover__uVrde .styles_table-light__3mbZC:hover > th {\n    background-color: #ececf6; }\n\n.styles_table-dark__2hls8,\n.styles_table-dark__2hls8 > th,\n.styles_table-dark__2hls8 > td {\n  background-color: #c6c8ca; }\n\n.styles_table-dark__2hls8 th,\n.styles_table-dark__2hls8 td,\n.styles_table-dark__2hls8 thead th,\n.styles_table-dark__2hls8 tbody + tbody {\n  border-color: #95999c; }\n\n.styles_table-hover__uVrde .styles_table-dark__2hls8:hover {\n  background-color: #b9bbbe; }\n  .styles_table-hover__uVrde .styles_table-dark__2hls8:hover > td,\n  .styles_table-hover__uVrde .styles_table-dark__2hls8:hover > th {\n    background-color: #b9bbbe; }\n\n.styles_table-active__2Gr8r,\n.styles_table-active__2Gr8r > th,\n.styles_table-active__2Gr8r > td {\n  background-color: rgba(0, 0, 0, 0.075); }\n\n.styles_table-hover__uVrde .styles_table-active__2Gr8r:hover {\n  background-color: rgba(0, 0, 0, 0.075); }\n  .styles_table-hover__uVrde .styles_table-active__2Gr8r:hover > td,\n  .styles_table-hover__uVrde .styles_table-active__2Gr8r:hover > th {\n    background-color: rgba(0, 0, 0, 0.075); }\n\n.styles_table__3n6C2 .styles_thead-dark__1cyG4 th {\n  color: #fff;\n  background-color: #343a40;\n  border-color: #454d55; }\n\n.styles_table__3n6C2 .styles_thead-light__3cnhw th {\n  color: #495057;\n  background-color: #e9ecef;\n  border-color: #dee2e6; }\n\n.styles_table-dark__2hls8 {\n  color: #fff;\n  background-color: #343a40; }\n  .styles_table-dark__2hls8 th,\n  .styles_table-dark__2hls8 td,\n  .styles_table-dark__2hls8 thead th {\n    border-color: #454d55; }\n  .styles_table-dark__2hls8.styles_table-bordered__1lhpI {\n    border: 0; }\n  .styles_table-dark__2hls8.styles_table-striped__3yCY_ tbody tr:nth-of-type(odd) {\n    background-color: rgba(255, 255, 255, 0.05); }\n  .styles_table-dark__2hls8.styles_table-hover__uVrde tbody tr:hover {\n    color: #fff;\n    background-color: rgba(255, 255, 255, 0.075); }\n\n@media (max-width: 575.98px) {\n  .styles_table-responsive-sm__16gkZ {\n    display: block;\n    width: 100%;\n    overflow-x: auto;\n    -webkit-overflow-scrolling: touch; }\n    .styles_table-responsive-sm__16gkZ > .styles_table-bordered__1lhpI {\n      border: 0; } }\n\n@media (max-width: 767.98px) {\n  .styles_table-responsive-md__2IrQA {\n    display: block;\n    width: 100%;\n    overflow-x: auto;\n    -webkit-overflow-scrolling: touch; }\n    .styles_table-responsive-md__2IrQA > .styles_table-bordered__1lhpI {\n      border: 0; } }\n\n@media (max-width: 991.98px) {\n  .styles_table-responsive-lg__1eXJX {\n    display: block;\n    width: 100%;\n    overflow-x: auto;\n    -webkit-overflow-scrolling: touch; }\n    .styles_table-responsive-lg__1eXJX > .styles_table-bordered__1lhpI {\n      border: 0; } }\n\n@media (max-width: 1199.98px) {\n  .styles_table-responsive-xl__3E4Wd {\n    display: block;\n    width: 100%;\n    overflow-x: auto;\n    -webkit-overflow-scrolling: touch; }\n    .styles_table-responsive-xl__3E4Wd > .styles_table-bordered__1lhpI {\n      border: 0; } }\n\n.styles_table-responsive__1SdNI {\n  display: block;\n  width: 100%;\n  overflow-x: auto;\n  -webkit-overflow-scrolling: touch; }\n  .styles_table-responsive__1SdNI > .styles_table-bordered__1lhpI {\n    border: 0; }\n\n.styles_form-control__1vT7R {\n  display: block;\n  width: 100%;\n  height: calc(1.5em + 0.75rem + 2px);\n  padding: 0.375rem 0.75rem;\n  font-size: 1rem;\n  font-weight: 400;\n  line-height: 1.5;\n  color: #495057;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 1px solid #ced4da;\n  border-radius: 0.25rem;\n  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out; }\n  @media (prefers-reduced-motion: reduce) {\n    .styles_form-control__1vT7R {\n      transition: none; } }\n  .styles_form-control__1vT7R::-ms-expand {\n    background-color: transparent;\n    border: 0; }\n  .styles_form-control__1vT7R:-moz-focusring {\n    color: transparent;\n    text-shadow: 0 0 0 #495057; }\n  .styles_form-control__1vT7R:focus {\n    color: #495057;\n    background-color: #fff;\n    border-color: #80bdff;\n    outline: 0;\n    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25); }\n  .styles_form-control__1vT7R::placeholder {\n    color: #6c757d;\n    opacity: 1; }\n  .styles_form-control__1vT7R:disabled, .styles_form-control__1vT7R[readonly] {\n    background-color: #e9ecef;\n    opacity: 1; }\n\nselect.styles_form-control__1vT7R:focus::-ms-value {\n  color: #495057;\n  background-color: #fff; }\n\n.styles_form-control-file__2QtF3,\n.styles_form-control-range__3p0Ee {\n  display: block;\n  width: 100%; }\n\n.styles_col-form-label__wbYUf {\n  padding-top: calc(0.375rem + 1px);\n  padding-bottom: calc(0.375rem + 1px);\n  margin-bottom: 0;\n  font-size: inherit;\n  line-height: 1.5; }\n\n.styles_col-form-label-lg__MQZg0 {\n  padding-top: calc(0.5rem + 1px);\n  padding-bottom: calc(0.5rem + 1px);\n  font-size: 1.25rem;\n  line-height: 1.5; }\n\n.styles_col-form-label-sm__2OFHR {\n  padding-top: calc(0.25rem + 1px);\n  padding-bottom: calc(0.25rem + 1px);\n  font-size: 0.875rem;\n  line-height: 1.5; }\n\n.styles_form-control-plaintext__1wRGf {\n  display: block;\n  width: 100%;\n  padding: 0.375rem 0;\n  margin-bottom: 0;\n  font-size: 1rem;\n  line-height: 1.5;\n  color: #212529;\n  background-color: transparent;\n  border: solid transparent;\n  border-width: 1px 0; }\n  .styles_form-control-plaintext__1wRGf.styles_form-control-sm__2UNMt, .styles_form-control-plaintext__1wRGf.styles_form-control-lg__1LmlB {\n    padding-right: 0;\n    padding-left: 0; }\n\n.styles_form-control-sm__2UNMt {\n  height: calc(1.5em + 0.5rem + 2px);\n  padding: 0.25rem 0.5rem;\n  font-size: 0.875rem;\n  line-height: 1.5;\n  border-radius: 0.2rem; }\n\n.styles_form-control-lg__1LmlB {\n  height: calc(1.5em + 1rem + 2px);\n  padding: 0.5rem 1rem;\n  font-size: 1.25rem;\n  line-height: 1.5;\n  border-radius: 0.3rem; }\n\nselect.styles_form-control__1vT7R[size], select.styles_form-control__1vT7R[multiple] {\n  height: auto; }\n\ntextarea.styles_form-control__1vT7R {\n  height: auto; }\n\n.styles_form-group__2d2rT {\n  margin-bottom: 1rem; }\n\n.styles_form-text__wd14U {\n  display: block;\n  margin-top: 0.25rem; }\n\n.styles_form-row__3lil1 {\n  display: flex;\n  flex-wrap: wrap;\n  margin-right: -5px;\n  margin-left: -5px; }\n  .styles_form-row__3lil1 > .styles_col__1CWhf,\n  .styles_form-row__3lil1 > [class*=\"col-\"] {\n    padding-right: 5px;\n    padding-left: 5px; }\n\n.styles_form-check__1M0Hh {\n  position: relative;\n  display: block;\n  padding-left: 1.25rem; }\n\n.styles_form-check-input__dhYBb {\n  position: absolute;\n  margin-top: 0.3rem;\n  margin-left: -1.25rem; }\n  .styles_form-check-input__dhYBb[disabled] ~ .styles_form-check-label__15K3d,\n  .styles_form-check-input__dhYBb:disabled ~ .styles_form-check-label__15K3d {\n    color: #6c757d; }\n\n.styles_form-check-label__15K3d {\n  margin-bottom: 0; }\n\n.styles_form-check-inline__2egUK {\n  display: inline-flex;\n  align-items: center;\n  padding-left: 0;\n  margin-right: 0.75rem; }\n  .styles_form-check-inline__2egUK .styles_form-check-input__dhYBb {\n    position: static;\n    margin-top: 0;\n    margin-right: 0.3125rem;\n    margin-left: 0; }\n\n.styles_valid-feedback__27ve2 {\n  display: none;\n  width: 100%;\n  margin-top: 0.25rem;\n  font-size: 80%;\n  color: #28a745; }\n\n.styles_valid-tooltip__1WVHB {\n  position: absolute;\n  top: 100%;\n  z-index: 5;\n  display: none;\n  max-width: 100%;\n  padding: 0.25rem 0.5rem;\n  margin-top: .1rem;\n  font-size: 0.875rem;\n  line-height: 1.5;\n  color: #fff;\n  background-color: rgba(40, 167, 69, 0.9);\n  border-radius: 0.25rem; }\n\n.styles_was-validated__2w41s :valid ~ .styles_valid-feedback__27ve2,\n.styles_was-validated__2w41s :valid ~ .styles_valid-tooltip__1WVHB,\n.styles_is-valid__jOLnd ~ .styles_valid-feedback__27ve2,\n.styles_is-valid__jOLnd ~ .styles_valid-tooltip__1WVHB {\n  display: block; }\n\n.styles_was-validated__2w41s .styles_form-control__1vT7R:valid, .styles_form-control__1vT7R.styles_is-valid__jOLnd {\n  border-color: #28a745;\n  padding-right: calc(1.5em + 0.75rem);\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath fill='%2328a745' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e\");\n  background-repeat: no-repeat;\n  background-position: right calc(0.375em + 0.1875rem) center;\n  background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem); }\n  .styles_was-validated__2w41s .styles_form-control__1vT7R:valid:focus, .styles_form-control__1vT7R.styles_is-valid__jOLnd:focus {\n    border-color: #28a745;\n    box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25); }\n\n.styles_was-validated__2w41s textarea.styles_form-control__1vT7R:valid, textarea.styles_form-control__1vT7R.styles_is-valid__jOLnd {\n  padding-right: calc(1.5em + 0.75rem);\n  background-position: top calc(0.375em + 0.1875rem) right calc(0.375em + 0.1875rem); }\n\n.styles_was-validated__2w41s .styles_custom-select__3UHfR:valid, .styles_custom-select__3UHfR.styles_is-valid__jOLnd {\n  border-color: #28a745;\n  padding-right: calc(0.75em + 2.3125rem);\n  background: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='4' height='5' viewBox='0 0 4 5'%3e%3cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e\") no-repeat right 0.75rem center/8px 10px, url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath fill='%2328a745' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e\") #fff no-repeat center right 1.75rem/calc(0.75em + 0.375rem) calc(0.75em + 0.375rem); }\n  .styles_was-validated__2w41s .styles_custom-select__3UHfR:valid:focus, .styles_custom-select__3UHfR.styles_is-valid__jOLnd:focus {\n    border-color: #28a745;\n    box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25); }\n\n.styles_was-validated__2w41s .styles_form-check-input__dhYBb:valid ~ .styles_form-check-label__15K3d, .styles_form-check-input__dhYBb.styles_is-valid__jOLnd ~ .styles_form-check-label__15K3d {\n  color: #28a745; }\n\n.styles_was-validated__2w41s .styles_form-check-input__dhYBb:valid ~ .styles_valid-feedback__27ve2,\n.styles_was-validated__2w41s .styles_form-check-input__dhYBb:valid ~ .styles_valid-tooltip__1WVHB, .styles_form-check-input__dhYBb.styles_is-valid__jOLnd ~ .styles_valid-feedback__27ve2,\n.styles_form-check-input__dhYBb.styles_is-valid__jOLnd ~ .styles_valid-tooltip__1WVHB {\n  display: block; }\n\n.styles_was-validated__2w41s .styles_custom-control-input__6xZyE:valid ~ .styles_custom-control-label__3gmbK, .styles_custom-control-input__6xZyE.styles_is-valid__jOLnd ~ .styles_custom-control-label__3gmbK {\n  color: #28a745; }\n  .styles_was-validated__2w41s .styles_custom-control-input__6xZyE:valid ~ .styles_custom-control-label__3gmbK::before, .styles_custom-control-input__6xZyE.styles_is-valid__jOLnd ~ .styles_custom-control-label__3gmbK::before {\n    border-color: #28a745; }\n\n.styles_was-validated__2w41s .styles_custom-control-input__6xZyE:valid:checked ~ .styles_custom-control-label__3gmbK::before, .styles_custom-control-input__6xZyE.styles_is-valid__jOLnd:checked ~ .styles_custom-control-label__3gmbK::before {\n  border-color: #34ce57;\n  background-color: #34ce57; }\n\n.styles_was-validated__2w41s .styles_custom-control-input__6xZyE:valid:focus ~ .styles_custom-control-label__3gmbK::before, .styles_custom-control-input__6xZyE.styles_is-valid__jOLnd:focus ~ .styles_custom-control-label__3gmbK::before {\n  box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25); }\n\n.styles_was-validated__2w41s .styles_custom-control-input__6xZyE:valid:focus:not(:checked) ~ .styles_custom-control-label__3gmbK::before, .styles_custom-control-input__6xZyE.styles_is-valid__jOLnd:focus:not(:checked) ~ .styles_custom-control-label__3gmbK::before {\n  border-color: #28a745; }\n\n.styles_was-validated__2w41s .styles_custom-file-input__1TwEe:valid ~ .styles_custom-file-label__2SjkB, .styles_custom-file-input__1TwEe.styles_is-valid__jOLnd ~ .styles_custom-file-label__2SjkB {\n  border-color: #28a745; }\n\n.styles_was-validated__2w41s .styles_custom-file-input__1TwEe:valid:focus ~ .styles_custom-file-label__2SjkB, .styles_custom-file-input__1TwEe.styles_is-valid__jOLnd:focus ~ .styles_custom-file-label__2SjkB {\n  border-color: #28a745;\n  box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25); }\n\n.styles_invalid-feedback__18E20 {\n  display: none;\n  width: 100%;\n  margin-top: 0.25rem;\n  font-size: 80%;\n  color: #dc3545; }\n\n.styles_invalid-tooltip__wFGYR {\n  position: absolute;\n  top: 100%;\n  z-index: 5;\n  display: none;\n  max-width: 100%;\n  padding: 0.25rem 0.5rem;\n  margin-top: .1rem;\n  font-size: 0.875rem;\n  line-height: 1.5;\n  color: #fff;\n  background-color: rgba(220, 53, 69, 0.9);\n  border-radius: 0.25rem; }\n\n.styles_was-validated__2w41s :invalid ~ .styles_invalid-feedback__18E20,\n.styles_was-validated__2w41s :invalid ~ .styles_invalid-tooltip__wFGYR,\n.styles_is-invalid__3kwte ~ .styles_invalid-feedback__18E20,\n.styles_is-invalid__3kwte ~ .styles_invalid-tooltip__wFGYR {\n  display: block; }\n\n.styles_was-validated__2w41s .styles_form-control__1vT7R:invalid, .styles_form-control__1vT7R.styles_is-invalid__3kwte {\n  border-color: #dc3545;\n  padding-right: calc(1.5em + 0.75rem);\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23dc3545' viewBox='0 0 12 12'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e\");\n  background-repeat: no-repeat;\n  background-position: right calc(0.375em + 0.1875rem) center;\n  background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem); }\n  .styles_was-validated__2w41s .styles_form-control__1vT7R:invalid:focus, .styles_form-control__1vT7R.styles_is-invalid__3kwte:focus {\n    border-color: #dc3545;\n    box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25); }\n\n.styles_was-validated__2w41s textarea.styles_form-control__1vT7R:invalid, textarea.styles_form-control__1vT7R.styles_is-invalid__3kwte {\n  padding-right: calc(1.5em + 0.75rem);\n  background-position: top calc(0.375em + 0.1875rem) right calc(0.375em + 0.1875rem); }\n\n.styles_was-validated__2w41s .styles_custom-select__3UHfR:invalid, .styles_custom-select__3UHfR.styles_is-invalid__3kwte {\n  border-color: #dc3545;\n  padding-right: calc(0.75em + 2.3125rem);\n  background: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='4' height='5' viewBox='0 0 4 5'%3e%3cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e\") no-repeat right 0.75rem center/8px 10px, url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23dc3545' viewBox='0 0 12 12'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e\") #fff no-repeat center right 1.75rem/calc(0.75em + 0.375rem) calc(0.75em + 0.375rem); }\n  .styles_was-validated__2w41s .styles_custom-select__3UHfR:invalid:focus, .styles_custom-select__3UHfR.styles_is-invalid__3kwte:focus {\n    border-color: #dc3545;\n    box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25); }\n\n.styles_was-validated__2w41s .styles_form-check-input__dhYBb:invalid ~ .styles_form-check-label__15K3d, .styles_form-check-input__dhYBb.styles_is-invalid__3kwte ~ .styles_form-check-label__15K3d {\n  color: #dc3545; }\n\n.styles_was-validated__2w41s .styles_form-check-input__dhYBb:invalid ~ .styles_invalid-feedback__18E20,\n.styles_was-validated__2w41s .styles_form-check-input__dhYBb:invalid ~ .styles_invalid-tooltip__wFGYR, .styles_form-check-input__dhYBb.styles_is-invalid__3kwte ~ .styles_invalid-feedback__18E20,\n.styles_form-check-input__dhYBb.styles_is-invalid__3kwte ~ .styles_invalid-tooltip__wFGYR {\n  display: block; }\n\n.styles_was-validated__2w41s .styles_custom-control-input__6xZyE:invalid ~ .styles_custom-control-label__3gmbK, .styles_custom-control-input__6xZyE.styles_is-invalid__3kwte ~ .styles_custom-control-label__3gmbK {\n  color: #dc3545; }\n  .styles_was-validated__2w41s .styles_custom-control-input__6xZyE:invalid ~ .styles_custom-control-label__3gmbK::before, .styles_custom-control-input__6xZyE.styles_is-invalid__3kwte ~ .styles_custom-control-label__3gmbK::before {\n    border-color: #dc3545; }\n\n.styles_was-validated__2w41s .styles_custom-control-input__6xZyE:invalid:checked ~ .styles_custom-control-label__3gmbK::before, .styles_custom-control-input__6xZyE.styles_is-invalid__3kwte:checked ~ .styles_custom-control-label__3gmbK::before {\n  border-color: #e4606d;\n  background-color: #e4606d; }\n\n.styles_was-validated__2w41s .styles_custom-control-input__6xZyE:invalid:focus ~ .styles_custom-control-label__3gmbK::before, .styles_custom-control-input__6xZyE.styles_is-invalid__3kwte:focus ~ .styles_custom-control-label__3gmbK::before {\n  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25); }\n\n.styles_was-validated__2w41s .styles_custom-control-input__6xZyE:invalid:focus:not(:checked) ~ .styles_custom-control-label__3gmbK::before, .styles_custom-control-input__6xZyE.styles_is-invalid__3kwte:focus:not(:checked) ~ .styles_custom-control-label__3gmbK::before {\n  border-color: #dc3545; }\n\n.styles_was-validated__2w41s .styles_custom-file-input__1TwEe:invalid ~ .styles_custom-file-label__2SjkB, .styles_custom-file-input__1TwEe.styles_is-invalid__3kwte ~ .styles_custom-file-label__2SjkB {\n  border-color: #dc3545; }\n\n.styles_was-validated__2w41s .styles_custom-file-input__1TwEe:invalid:focus ~ .styles_custom-file-label__2SjkB, .styles_custom-file-input__1TwEe.styles_is-invalid__3kwte:focus ~ .styles_custom-file-label__2SjkB {\n  border-color: #dc3545;\n  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25); }\n\n.styles_form-inline__1Hw5W {\n  display: flex;\n  flex-flow: row wrap;\n  align-items: center; }\n  .styles_form-inline__1Hw5W .styles_form-check__1M0Hh {\n    width: 100%; }\n  @media (min-width: 576px) {\n    .styles_form-inline__1Hw5W label {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      margin-bottom: 0; }\n    .styles_form-inline__1Hw5W .styles_form-group__2d2rT {\n      display: flex;\n      flex: 0 0 auto;\n      flex-flow: row wrap;\n      align-items: center;\n      margin-bottom: 0; }\n    .styles_form-inline__1Hw5W .styles_form-control__1vT7R {\n      display: inline-block;\n      width: auto;\n      vertical-align: middle; }\n    .styles_form-inline__1Hw5W .styles_form-control-plaintext__1wRGf {\n      display: inline-block; }\n    .styles_form-inline__1Hw5W .styles_input-group__3EiL4,\n    .styles_form-inline__1Hw5W .styles_custom-select__3UHfR {\n      width: auto; }\n    .styles_form-inline__1Hw5W .styles_form-check__1M0Hh {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      width: auto;\n      padding-left: 0; }\n    .styles_form-inline__1Hw5W .styles_form-check-input__dhYBb {\n      position: relative;\n      flex-shrink: 0;\n      margin-top: 0;\n      margin-right: 0.25rem;\n      margin-left: 0; }\n    .styles_form-inline__1Hw5W .styles_custom-control__1UTEr {\n      align-items: center;\n      justify-content: center; }\n    .styles_form-inline__1Hw5W .styles_custom-control-label__3gmbK {\n      margin-bottom: 0; } }\n\n.styles_btn__34YFe {\n  display: inline-block;\n  font-weight: 400;\n  color: #212529;\n  text-align: center;\n  vertical-align: middle;\n  cursor: pointer;\n  user-select: none;\n  background-color: transparent;\n  border: 1px solid transparent;\n  padding: 0.375rem 0.75rem;\n  font-size: 1rem;\n  line-height: 1.5;\n  border-radius: 0.25rem;\n  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out; }\n  @media (prefers-reduced-motion: reduce) {\n    .styles_btn__34YFe {\n      transition: none; } }\n  .styles_btn__34YFe:hover {\n    color: #212529;\n    text-decoration: none; }\n  .styles_btn__34YFe:focus, .styles_btn__34YFe.styles_focus__283Cs {\n    outline: 0;\n    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25); }\n  .styles_btn__34YFe.styles_disabled__bNrPz, .styles_btn__34YFe:disabled {\n    opacity: 0.65; }\n\na.styles_btn__34YFe.styles_disabled__bNrPz,\nfieldset:disabled a.styles_btn__34YFe {\n  pointer-events: none; }\n\n.styles_btn-primary__17u7Z {\n  color: #fff;\n  background-color: #007bff;\n  border-color: #007bff; }\n  .styles_btn-primary__17u7Z:hover {\n    color: #fff;\n    background-color: #0069d9;\n    border-color: #0062cc; }\n  .styles_btn-primary__17u7Z:focus, .styles_btn-primary__17u7Z.styles_focus__283Cs {\n    color: #fff;\n    background-color: #0069d9;\n    border-color: #0062cc;\n    box-shadow: 0 0 0 0.2rem rgba(38, 143, 255, 0.5); }\n  .styles_btn-primary__17u7Z.styles_disabled__bNrPz, .styles_btn-primary__17u7Z:disabled {\n    color: #fff;\n    background-color: #007bff;\n    border-color: #007bff; }\n  .styles_btn-primary__17u7Z:not(:disabled):not(.styles_disabled__bNrPz):active, .styles_btn-primary__17u7Z:not(:disabled):not(.styles_disabled__bNrPz).styles_active__1jaJY,\n  .styles_show__1YyhL > .styles_btn-primary__17u7Z.styles_dropdown-toggle__30max {\n    color: #fff;\n    background-color: #0062cc;\n    border-color: #005cbf; }\n    .styles_btn-primary__17u7Z:not(:disabled):not(.styles_disabled__bNrPz):active:focus, .styles_btn-primary__17u7Z:not(:disabled):not(.styles_disabled__bNrPz).styles_active__1jaJY:focus,\n    .styles_show__1YyhL > .styles_btn-primary__17u7Z.styles_dropdown-toggle__30max:focus {\n      box-shadow: 0 0 0 0.2rem rgba(38, 143, 255, 0.5); }\n\n.styles_btn-secondary__vqZbA {\n  color: #fff;\n  background-color: #6c757d;\n  border-color: #6c757d; }\n  .styles_btn-secondary__vqZbA:hover {\n    color: #fff;\n    background-color: #5a6268;\n    border-color: #545b62; }\n  .styles_btn-secondary__vqZbA:focus, .styles_btn-secondary__vqZbA.styles_focus__283Cs {\n    color: #fff;\n    background-color: #5a6268;\n    border-color: #545b62;\n    box-shadow: 0 0 0 0.2rem rgba(130, 138, 145, 0.5); }\n  .styles_btn-secondary__vqZbA.styles_disabled__bNrPz, .styles_btn-secondary__vqZbA:disabled {\n    color: #fff;\n    background-color: #6c757d;\n    border-color: #6c757d; }\n  .styles_btn-secondary__vqZbA:not(:disabled):not(.styles_disabled__bNrPz):active, .styles_btn-secondary__vqZbA:not(:disabled):not(.styles_disabled__bNrPz).styles_active__1jaJY,\n  .styles_show__1YyhL > .styles_btn-secondary__vqZbA.styles_dropdown-toggle__30max {\n    color: #fff;\n    background-color: #545b62;\n    border-color: #4e555b; }\n    .styles_btn-secondary__vqZbA:not(:disabled):not(.styles_disabled__bNrPz):active:focus, .styles_btn-secondary__vqZbA:not(:disabled):not(.styles_disabled__bNrPz).styles_active__1jaJY:focus,\n    .styles_show__1YyhL > .styles_btn-secondary__vqZbA.styles_dropdown-toggle__30max:focus {\n      box-shadow: 0 0 0 0.2rem rgba(130, 138, 145, 0.5); }\n\n.styles_btn-success__S0VFd {\n  color: #fff;\n  background-color: #28a745;\n  border-color: #28a745; }\n  .styles_btn-success__S0VFd:hover {\n    color: #fff;\n    background-color: #218838;\n    border-color: #1e7e34; }\n  .styles_btn-success__S0VFd:focus, .styles_btn-success__S0VFd.styles_focus__283Cs {\n    color: #fff;\n    background-color: #218838;\n    border-color: #1e7e34;\n    box-shadow: 0 0 0 0.2rem rgba(72, 180, 97, 0.5); }\n  .styles_btn-success__S0VFd.styles_disabled__bNrPz, .styles_btn-success__S0VFd:disabled {\n    color: #fff;\n    background-color: #28a745;\n    border-color: #28a745; }\n  .styles_btn-success__S0VFd:not(:disabled):not(.styles_disabled__bNrPz):active, .styles_btn-success__S0VFd:not(:disabled):not(.styles_disabled__bNrPz).styles_active__1jaJY,\n  .styles_show__1YyhL > .styles_btn-success__S0VFd.styles_dropdown-toggle__30max {\n    color: #fff;\n    background-color: #1e7e34;\n    border-color: #1c7430; }\n    .styles_btn-success__S0VFd:not(:disabled):not(.styles_disabled__bNrPz):active:focus, .styles_btn-success__S0VFd:not(:disabled):not(.styles_disabled__bNrPz).styles_active__1jaJY:focus,\n    .styles_show__1YyhL > .styles_btn-success__S0VFd.styles_dropdown-toggle__30max:focus {\n      box-shadow: 0 0 0 0.2rem rgba(72, 180, 97, 0.5); }\n\n.styles_btn-info__3LsZl {\n  color: #fff;\n  background-color: #17a2b8;\n  border-color: #17a2b8; }\n  .styles_btn-info__3LsZl:hover {\n    color: #fff;\n    background-color: #138496;\n    border-color: #117a8b; }\n  .styles_btn-info__3LsZl:focus, .styles_btn-info__3LsZl.styles_focus__283Cs {\n    color: #fff;\n    background-color: #138496;\n    border-color: #117a8b;\n    box-shadow: 0 0 0 0.2rem rgba(58, 176, 195, 0.5); }\n  .styles_btn-info__3LsZl.styles_disabled__bNrPz, .styles_btn-info__3LsZl:disabled {\n    color: #fff;\n    background-color: #17a2b8;\n    border-color: #17a2b8; }\n  .styles_btn-info__3LsZl:not(:disabled):not(.styles_disabled__bNrPz):active, .styles_btn-info__3LsZl:not(:disabled):not(.styles_disabled__bNrPz).styles_active__1jaJY,\n  .styles_show__1YyhL > .styles_btn-info__3LsZl.styles_dropdown-toggle__30max {\n    color: #fff;\n    background-color: #117a8b;\n    border-color: #10707f; }\n    .styles_btn-info__3LsZl:not(:disabled):not(.styles_disabled__bNrPz):active:focus, .styles_btn-info__3LsZl:not(:disabled):not(.styles_disabled__bNrPz).styles_active__1jaJY:focus,\n    .styles_show__1YyhL > .styles_btn-info__3LsZl.styles_dropdown-toggle__30max:focus {\n      box-shadow: 0 0 0 0.2rem rgba(58, 176, 195, 0.5); }\n\n.styles_btn-warning__1z0tS {\n  color: #212529;\n  background-color: #ffc107;\n  border-color: #ffc107; }\n  .styles_btn-warning__1z0tS:hover {\n    color: #212529;\n    background-color: #e0a800;\n    border-color: #d39e00; }\n  .styles_btn-warning__1z0tS:focus, .styles_btn-warning__1z0tS.styles_focus__283Cs {\n    color: #212529;\n    background-color: #e0a800;\n    border-color: #d39e00;\n    box-shadow: 0 0 0 0.2rem rgba(222, 170, 12, 0.5); }\n  .styles_btn-warning__1z0tS.styles_disabled__bNrPz, .styles_btn-warning__1z0tS:disabled {\n    color: #212529;\n    background-color: #ffc107;\n    border-color: #ffc107; }\n  .styles_btn-warning__1z0tS:not(:disabled):not(.styles_disabled__bNrPz):active, .styles_btn-warning__1z0tS:not(:disabled):not(.styles_disabled__bNrPz).styles_active__1jaJY,\n  .styles_show__1YyhL > .styles_btn-warning__1z0tS.styles_dropdown-toggle__30max {\n    color: #212529;\n    background-color: #d39e00;\n    border-color: #c69500; }\n    .styles_btn-warning__1z0tS:not(:disabled):not(.styles_disabled__bNrPz):active:focus, .styles_btn-warning__1z0tS:not(:disabled):not(.styles_disabled__bNrPz).styles_active__1jaJY:focus,\n    .styles_show__1YyhL > .styles_btn-warning__1z0tS.styles_dropdown-toggle__30max:focus {\n      box-shadow: 0 0 0 0.2rem rgba(222, 170, 12, 0.5); }\n\n.styles_btn-danger__2wsud {\n  color: #fff;\n  background-color: #dc3545;\n  border-color: #dc3545; }\n  .styles_btn-danger__2wsud:hover {\n    color: #fff;\n    background-color: #c82333;\n    border-color: #bd2130; }\n  .styles_btn-danger__2wsud:focus, .styles_btn-danger__2wsud.styles_focus__283Cs {\n    color: #fff;\n    background-color: #c82333;\n    border-color: #bd2130;\n    box-shadow: 0 0 0 0.2rem rgba(225, 83, 97, 0.5); }\n  .styles_btn-danger__2wsud.styles_disabled__bNrPz, .styles_btn-danger__2wsud:disabled {\n    color: #fff;\n    background-color: #dc3545;\n    border-color: #dc3545; }\n  .styles_btn-danger__2wsud:not(:disabled):not(.styles_disabled__bNrPz):active, .styles_btn-danger__2wsud:not(:disabled):not(.styles_disabled__bNrPz).styles_active__1jaJY,\n  .styles_show__1YyhL > .styles_btn-danger__2wsud.styles_dropdown-toggle__30max {\n    color: #fff;\n    background-color: #bd2130;\n    border-color: #b21f2d; }\n    .styles_btn-danger__2wsud:not(:disabled):not(.styles_disabled__bNrPz):active:focus, .styles_btn-danger__2wsud:not(:disabled):not(.styles_disabled__bNrPz).styles_active__1jaJY:focus,\n    .styles_show__1YyhL > .styles_btn-danger__2wsud.styles_dropdown-toggle__30max:focus {\n      box-shadow: 0 0 0 0.2rem rgba(225, 83, 97, 0.5); }\n\n.styles_btn-light__3_KP9 {\n  color: #212529;\n  background-color: #f8f9fa;\n  border-color: #f8f9fa; }\n  .styles_btn-light__3_KP9:hover {\n    color: #212529;\n    background-color: #e2e6ea;\n    border-color: #dae0e5; }\n  .styles_btn-light__3_KP9:focus, .styles_btn-light__3_KP9.styles_focus__283Cs {\n    color: #212529;\n    background-color: #e2e6ea;\n    border-color: #dae0e5;\n    box-shadow: 0 0 0 0.2rem rgba(216, 217, 219, 0.5); }\n  .styles_btn-light__3_KP9.styles_disabled__bNrPz, .styles_btn-light__3_KP9:disabled {\n    color: #212529;\n    background-color: #f8f9fa;\n    border-color: #f8f9fa; }\n  .styles_btn-light__3_KP9:not(:disabled):not(.styles_disabled__bNrPz):active, .styles_btn-light__3_KP9:not(:disabled):not(.styles_disabled__bNrPz).styles_active__1jaJY,\n  .styles_show__1YyhL > .styles_btn-light__3_KP9.styles_dropdown-toggle__30max {\n    color: #212529;\n    background-color: #dae0e5;\n    border-color: #d3d9df; }\n    .styles_btn-light__3_KP9:not(:disabled):not(.styles_disabled__bNrPz):active:focus, .styles_btn-light__3_KP9:not(:disabled):not(.styles_disabled__bNrPz).styles_active__1jaJY:focus,\n    .styles_show__1YyhL > .styles_btn-light__3_KP9.styles_dropdown-toggle__30max:focus {\n      box-shadow: 0 0 0 0.2rem rgba(216, 217, 219, 0.5); }\n\n.styles_btn-dark__Bdw8g {\n  color: #fff;\n  background-color: #343a40;\n  border-color: #343a40; }\n  .styles_btn-dark__Bdw8g:hover {\n    color: #fff;\n    background-color: #23272b;\n    border-color: #1d2124; }\n  .styles_btn-dark__Bdw8g:focus, .styles_btn-dark__Bdw8g.styles_focus__283Cs {\n    color: #fff;\n    background-color: #23272b;\n    border-color: #1d2124;\n    box-shadow: 0 0 0 0.2rem rgba(82, 88, 93, 0.5); }\n  .styles_btn-dark__Bdw8g.styles_disabled__bNrPz, .styles_btn-dark__Bdw8g:disabled {\n    color: #fff;\n    background-color: #343a40;\n    border-color: #343a40; }\n  .styles_btn-dark__Bdw8g:not(:disabled):not(.styles_disabled__bNrPz):active, .styles_btn-dark__Bdw8g:not(:disabled):not(.styles_disabled__bNrPz).styles_active__1jaJY,\n  .styles_show__1YyhL > .styles_btn-dark__Bdw8g.styles_dropdown-toggle__30max {\n    color: #fff;\n    background-color: #1d2124;\n    border-color: #171a1d; }\n    .styles_btn-dark__Bdw8g:not(:disabled):not(.styles_disabled__bNrPz):active:focus, .styles_btn-dark__Bdw8g:not(:disabled):not(.styles_disabled__bNrPz).styles_active__1jaJY:focus,\n    .styles_show__1YyhL > .styles_btn-dark__Bdw8g.styles_dropdown-toggle__30max:focus {\n      box-shadow: 0 0 0 0.2rem rgba(82, 88, 93, 0.5); }\n\n.styles_btn-outline-primary__1exFT {\n  color: #007bff;\n  border-color: #007bff; }\n  .styles_btn-outline-primary__1exFT:hover {\n    color: #fff;\n    background-color: #007bff;\n    border-color: #007bff; }\n  .styles_btn-outline-primary__1exFT:focus, .styles_btn-outline-primary__1exFT.styles_focus__283Cs {\n    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5); }\n  .styles_btn-outline-primary__1exFT.styles_disabled__bNrPz, .styles_btn-outline-primary__1exFT:disabled {\n    color: #007bff;\n    background-color: transparent; }\n  .styles_btn-outline-primary__1exFT:not(:disabled):not(.styles_disabled__bNrPz):active, .styles_btn-outline-primary__1exFT:not(:disabled):not(.styles_disabled__bNrPz).styles_active__1jaJY,\n  .styles_show__1YyhL > .styles_btn-outline-primary__1exFT.styles_dropdown-toggle__30max {\n    color: #fff;\n    background-color: #007bff;\n    border-color: #007bff; }\n    .styles_btn-outline-primary__1exFT:not(:disabled):not(.styles_disabled__bNrPz):active:focus, .styles_btn-outline-primary__1exFT:not(:disabled):not(.styles_disabled__bNrPz).styles_active__1jaJY:focus,\n    .styles_show__1YyhL > .styles_btn-outline-primary__1exFT.styles_dropdown-toggle__30max:focus {\n      box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5); }\n\n.styles_btn-outline-secondary__3inQB {\n  color: #6c757d;\n  border-color: #6c757d; }\n  .styles_btn-outline-secondary__3inQB:hover {\n    color: #fff;\n    background-color: #6c757d;\n    border-color: #6c757d; }\n  .styles_btn-outline-secondary__3inQB:focus, .styles_btn-outline-secondary__3inQB.styles_focus__283Cs {\n    box-shadow: 0 0 0 0.2rem rgba(108, 117, 125, 0.5); }\n  .styles_btn-outline-secondary__3inQB.styles_disabled__bNrPz, .styles_btn-outline-secondary__3inQB:disabled {\n    color: #6c757d;\n    background-color: transparent; }\n  .styles_btn-outline-secondary__3inQB:not(:disabled):not(.styles_disabled__bNrPz):active, .styles_btn-outline-secondary__3inQB:not(:disabled):not(.styles_disabled__bNrPz).styles_active__1jaJY,\n  .styles_show__1YyhL > .styles_btn-outline-secondary__3inQB.styles_dropdown-toggle__30max {\n    color: #fff;\n    background-color: #6c757d;\n    border-color: #6c757d; }\n    .styles_btn-outline-secondary__3inQB:not(:disabled):not(.styles_disabled__bNrPz):active:focus, .styles_btn-outline-secondary__3inQB:not(:disabled):not(.styles_disabled__bNrPz).styles_active__1jaJY:focus,\n    .styles_show__1YyhL > .styles_btn-outline-secondary__3inQB.styles_dropdown-toggle__30max:focus {\n      box-shadow: 0 0 0 0.2rem rgba(108, 117, 125, 0.5); }\n\n.styles_btn-outline-success__fAUwP {\n  color: #28a745;\n  border-color: #28a745; }\n  .styles_btn-outline-success__fAUwP:hover {\n    color: #fff;\n    background-color: #28a745;\n    border-color: #28a745; }\n  .styles_btn-outline-success__fAUwP:focus, .styles_btn-outline-success__fAUwP.styles_focus__283Cs {\n    box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.5); }\n  .styles_btn-outline-success__fAUwP.styles_disabled__bNrPz, .styles_btn-outline-success__fAUwP:disabled {\n    color: #28a745;\n    background-color: transparent; }\n  .styles_btn-outline-success__fAUwP:not(:disabled):not(.styles_disabled__bNrPz):active, .styles_btn-outline-success__fAUwP:not(:disabled):not(.styles_disabled__bNrPz).styles_active__1jaJY,\n  .styles_show__1YyhL > .styles_btn-outline-success__fAUwP.styles_dropdown-toggle__30max {\n    color: #fff;\n    background-color: #28a745;\n    border-color: #28a745; }\n    .styles_btn-outline-success__fAUwP:not(:disabled):not(.styles_disabled__bNrPz):active:focus, .styles_btn-outline-success__fAUwP:not(:disabled):not(.styles_disabled__bNrPz).styles_active__1jaJY:focus,\n    .styles_show__1YyhL > .styles_btn-outline-success__fAUwP.styles_dropdown-toggle__30max:focus {\n      box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.5); }\n\n.styles_btn-outline-info__2ISGC {\n  color: #17a2b8;\n  border-color: #17a2b8; }\n  .styles_btn-outline-info__2ISGC:hover {\n    color: #fff;\n    background-color: #17a2b8;\n    border-color: #17a2b8; }\n  .styles_btn-outline-info__2ISGC:focus, .styles_btn-outline-info__2ISGC.styles_focus__283Cs {\n    box-shadow: 0 0 0 0.2rem rgba(23, 162, 184, 0.5); }\n  .styles_btn-outline-info__2ISGC.styles_disabled__bNrPz, .styles_btn-outline-info__2ISGC:disabled {\n    color: #17a2b8;\n    background-color: transparent; }\n  .styles_btn-outline-info__2ISGC:not(:disabled):not(.styles_disabled__bNrPz):active, .styles_btn-outline-info__2ISGC:not(:disabled):not(.styles_disabled__bNrPz).styles_active__1jaJY,\n  .styles_show__1YyhL > .styles_btn-outline-info__2ISGC.styles_dropdown-toggle__30max {\n    color: #fff;\n    background-color: #17a2b8;\n    border-color: #17a2b8; }\n    .styles_btn-outline-info__2ISGC:not(:disabled):not(.styles_disabled__bNrPz):active:focus, .styles_btn-outline-info__2ISGC:not(:disabled):not(.styles_disabled__bNrPz).styles_active__1jaJY:focus,\n    .styles_show__1YyhL > .styles_btn-outline-info__2ISGC.styles_dropdown-toggle__30max:focus {\n      box-shadow: 0 0 0 0.2rem rgba(23, 162, 184, 0.5); }\n\n.styles_btn-outline-warning__2CbJr {\n  color: #ffc107;\n  border-color: #ffc107; }\n  .styles_btn-outline-warning__2CbJr:hover {\n    color: #212529;\n    background-color: #ffc107;\n    border-color: #ffc107; }\n  .styles_btn-outline-warning__2CbJr:focus, .styles_btn-outline-warning__2CbJr.styles_focus__283Cs {\n    box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.5); }\n  .styles_btn-outline-warning__2CbJr.styles_disabled__bNrPz, .styles_btn-outline-warning__2CbJr:disabled {\n    color: #ffc107;\n    background-color: transparent; }\n  .styles_btn-outline-warning__2CbJr:not(:disabled):not(.styles_disabled__bNrPz):active, .styles_btn-outline-warning__2CbJr:not(:disabled):not(.styles_disabled__bNrPz).styles_active__1jaJY,\n  .styles_show__1YyhL > .styles_btn-outline-warning__2CbJr.styles_dropdown-toggle__30max {\n    color: #212529;\n    background-color: #ffc107;\n    border-color: #ffc107; }\n    .styles_btn-outline-warning__2CbJr:not(:disabled):not(.styles_disabled__bNrPz):active:focus, .styles_btn-outline-warning__2CbJr:not(:disabled):not(.styles_disabled__bNrPz).styles_active__1jaJY:focus,\n    .styles_show__1YyhL > .styles_btn-outline-warning__2CbJr.styles_dropdown-toggle__30max:focus {\n      box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.5); }\n\n.styles_btn-outline-danger__g_JPJ {\n  color: #dc3545;\n  border-color: #dc3545; }\n  .styles_btn-outline-danger__g_JPJ:hover {\n    color: #fff;\n    background-color: #dc3545;\n    border-color: #dc3545; }\n  .styles_btn-outline-danger__g_JPJ:focus, .styles_btn-outline-danger__g_JPJ.styles_focus__283Cs {\n    box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.5); }\n  .styles_btn-outline-danger__g_JPJ.styles_disabled__bNrPz, .styles_btn-outline-danger__g_JPJ:disabled {\n    color: #dc3545;\n    background-color: transparent; }\n  .styles_btn-outline-danger__g_JPJ:not(:disabled):not(.styles_disabled__bNrPz):active, .styles_btn-outline-danger__g_JPJ:not(:disabled):not(.styles_disabled__bNrPz).styles_active__1jaJY,\n  .styles_show__1YyhL > .styles_btn-outline-danger__g_JPJ.styles_dropdown-toggle__30max {\n    color: #fff;\n    background-color: #dc3545;\n    border-color: #dc3545; }\n    .styles_btn-outline-danger__g_JPJ:not(:disabled):not(.styles_disabled__bNrPz):active:focus, .styles_btn-outline-danger__g_JPJ:not(:disabled):not(.styles_disabled__bNrPz).styles_active__1jaJY:focus,\n    .styles_show__1YyhL > .styles_btn-outline-danger__g_JPJ.styles_dropdown-toggle__30max:focus {\n      box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.5); }\n\n.styles_btn-outline-light__2Zdtn {\n  color: #f8f9fa;\n  border-color: #f8f9fa; }\n  .styles_btn-outline-light__2Zdtn:hover {\n    color: #212529;\n    background-color: #f8f9fa;\n    border-color: #f8f9fa; }\n  .styles_btn-outline-light__2Zdtn:focus, .styles_btn-outline-light__2Zdtn.styles_focus__283Cs {\n    box-shadow: 0 0 0 0.2rem rgba(248, 249, 250, 0.5); }\n  .styles_btn-outline-light__2Zdtn.styles_disabled__bNrPz, .styles_btn-outline-light__2Zdtn:disabled {\n    color: #f8f9fa;\n    background-color: transparent; }\n  .styles_btn-outline-light__2Zdtn:not(:disabled):not(.styles_disabled__bNrPz):active, .styles_btn-outline-light__2Zdtn:not(:disabled):not(.styles_disabled__bNrPz).styles_active__1jaJY,\n  .styles_show__1YyhL > .styles_btn-outline-light__2Zdtn.styles_dropdown-toggle__30max {\n    color: #212529;\n    background-color: #f8f9fa;\n    border-color: #f8f9fa; }\n    .styles_btn-outline-light__2Zdtn:not(:disabled):not(.styles_disabled__bNrPz):active:focus, .styles_btn-outline-light__2Zdtn:not(:disabled):not(.styles_disabled__bNrPz).styles_active__1jaJY:focus,\n    .styles_show__1YyhL > .styles_btn-outline-light__2Zdtn.styles_dropdown-toggle__30max:focus {\n      box-shadow: 0 0 0 0.2rem rgba(248, 249, 250, 0.5); }\n\n.styles_btn-outline-dark__mM1Ei {\n  color: #343a40;\n  border-color: #343a40; }\n  .styles_btn-outline-dark__mM1Ei:hover {\n    color: #fff;\n    background-color: #343a40;\n    border-color: #343a40; }\n  .styles_btn-outline-dark__mM1Ei:focus, .styles_btn-outline-dark__mM1Ei.styles_focus__283Cs {\n    box-shadow: 0 0 0 0.2rem rgba(52, 58, 64, 0.5); }\n  .styles_btn-outline-dark__mM1Ei.styles_disabled__bNrPz, .styles_btn-outline-dark__mM1Ei:disabled {\n    color: #343a40;\n    background-color: transparent; }\n  .styles_btn-outline-dark__mM1Ei:not(:disabled):not(.styles_disabled__bNrPz):active, .styles_btn-outline-dark__mM1Ei:not(:disabled):not(.styles_disabled__bNrPz).styles_active__1jaJY,\n  .styles_show__1YyhL > .styles_btn-outline-dark__mM1Ei.styles_dropdown-toggle__30max {\n    color: #fff;\n    background-color: #343a40;\n    border-color: #343a40; }\n    .styles_btn-outline-dark__mM1Ei:not(:disabled):not(.styles_disabled__bNrPz):active:focus, .styles_btn-outline-dark__mM1Ei:not(:disabled):not(.styles_disabled__bNrPz).styles_active__1jaJY:focus,\n    .styles_show__1YyhL > .styles_btn-outline-dark__mM1Ei.styles_dropdown-toggle__30max:focus {\n      box-shadow: 0 0 0 0.2rem rgba(52, 58, 64, 0.5); }\n\n.styles_btn-link__3Q7U6 {\n  font-weight: 400;\n  color: #007bff;\n  text-decoration: none; }\n  .styles_btn-link__3Q7U6:hover {\n    color: #0056b3;\n    text-decoration: underline; }\n  .styles_btn-link__3Q7U6:focus, .styles_btn-link__3Q7U6.styles_focus__283Cs {\n    text-decoration: underline;\n    box-shadow: none; }\n  .styles_btn-link__3Q7U6:disabled, .styles_btn-link__3Q7U6.styles_disabled__bNrPz {\n    color: #6c757d;\n    pointer-events: none; }\n\n.styles_btn-lg__17yAx, .styles_btn-group-lg__1JBgX > .styles_btn__34YFe {\n  padding: 0.5rem 1rem;\n  font-size: 1.25rem;\n  line-height: 1.5;\n  border-radius: 0.3rem; }\n\n.styles_btn-sm__3GxwP, .styles_btn-group-sm__1KepP > .styles_btn__34YFe {\n  padding: 0.25rem 0.5rem;\n  font-size: 0.875rem;\n  line-height: 1.5;\n  border-radius: 0.2rem; }\n\n.styles_btn-block__2O4jl {\n  display: block;\n  width: 100%; }\n  .styles_btn-block__2O4jl + .styles_btn-block__2O4jl {\n    margin-top: 0.5rem; }\n\ninput[type=\"submit\"].styles_btn-block__2O4jl,\ninput[type=\"reset\"].styles_btn-block__2O4jl,\ninput[type=\"button\"].styles_btn-block__2O4jl {\n  width: 100%; }\n\n.styles_fade__bJB3c {\n  transition: opacity 0.15s linear; }\n  @media (prefers-reduced-motion: reduce) {\n    .styles_fade__bJB3c {\n      transition: none; } }\n  .styles_fade__bJB3c:not(.styles_show__1YyhL) {\n    opacity: 0; }\n\n.styles_collapse__w9ZjN:not(.styles_show__1YyhL) {\n  display: none; }\n\n.styles_collapsing__vz2pM {\n  position: relative;\n  height: 0;\n  overflow: hidden;\n  transition: height 0.35s ease; }\n  @media (prefers-reduced-motion: reduce) {\n    .styles_collapsing__vz2pM {\n      transition: none; } }\n\n.styles_dropup__1P4uh,\n.styles_dropright__3byo1,\n.styles_dropdown__18m0V,\n.styles_dropleft__PbILv {\n  position: relative; }\n\n.styles_dropdown-toggle__30max {\n  white-space: nowrap; }\n  .styles_dropdown-toggle__30max::after {\n    display: inline-block;\n    margin-left: 0.255em;\n    vertical-align: 0.255em;\n    content: \"\";\n    border-top: 0.3em solid;\n    border-right: 0.3em solid transparent;\n    border-bottom: 0;\n    border-left: 0.3em solid transparent; }\n  .styles_dropdown-toggle__30max:empty::after {\n    margin-left: 0; }\n\n.styles_dropdown-menu__2Xqan {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  z-index: 1000;\n  display: none;\n  float: left;\n  min-width: 10rem;\n  padding: 0.5rem 0;\n  margin: 0.125rem 0 0;\n  font-size: 1rem;\n  color: #212529;\n  text-align: left;\n  list-style: none;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 0.25rem; }\n\n.styles_dropdown-menu-left__TV3ie {\n  right: auto;\n  left: 0; }\n\n.styles_dropdown-menu-right__2HMNv {\n  right: 0;\n  left: auto; }\n\n@media (min-width: 576px) {\n  .styles_dropdown-menu-sm-left__1bA80 {\n    right: auto;\n    left: 0; }\n  .styles_dropdown-menu-sm-right__2yX2O {\n    right: 0;\n    left: auto; } }\n\n@media (min-width: 768px) {\n  .styles_dropdown-menu-md-left__CfZ5t {\n    right: auto;\n    left: 0; }\n  .styles_dropdown-menu-md-right__2EC9m {\n    right: 0;\n    left: auto; } }\n\n@media (min-width: 992px) {\n  .styles_dropdown-menu-lg-left__10CqU {\n    right: auto;\n    left: 0; }\n  .styles_dropdown-menu-lg-right__6ba0X {\n    right: 0;\n    left: auto; } }\n\n@media (min-width: 1200px) {\n  .styles_dropdown-menu-xl-left__3ECtZ {\n    right: auto;\n    left: 0; }\n  .styles_dropdown-menu-xl-right__3921Y {\n    right: 0;\n    left: auto; } }\n\n.styles_dropup__1P4uh .styles_dropdown-menu__2Xqan {\n  top: auto;\n  bottom: 100%;\n  margin-top: 0;\n  margin-bottom: 0.125rem; }\n\n.styles_dropup__1P4uh .styles_dropdown-toggle__30max::after {\n  display: inline-block;\n  margin-left: 0.255em;\n  vertical-align: 0.255em;\n  content: \"\";\n  border-top: 0;\n  border-right: 0.3em solid transparent;\n  border-bottom: 0.3em solid;\n  border-left: 0.3em solid transparent; }\n\n.styles_dropup__1P4uh .styles_dropdown-toggle__30max:empty::after {\n  margin-left: 0; }\n\n.styles_dropright__3byo1 .styles_dropdown-menu__2Xqan {\n  top: 0;\n  right: auto;\n  left: 100%;\n  margin-top: 0;\n  margin-left: 0.125rem; }\n\n.styles_dropright__3byo1 .styles_dropdown-toggle__30max::after {\n  display: inline-block;\n  margin-left: 0.255em;\n  vertical-align: 0.255em;\n  content: \"\";\n  border-top: 0.3em solid transparent;\n  border-right: 0;\n  border-bottom: 0.3em solid transparent;\n  border-left: 0.3em solid; }\n\n.styles_dropright__3byo1 .styles_dropdown-toggle__30max:empty::after {\n  margin-left: 0; }\n\n.styles_dropright__3byo1 .styles_dropdown-toggle__30max::after {\n  vertical-align: 0; }\n\n.styles_dropleft__PbILv .styles_dropdown-menu__2Xqan {\n  top: 0;\n  right: 100%;\n  left: auto;\n  margin-top: 0;\n  margin-right: 0.125rem; }\n\n.styles_dropleft__PbILv .styles_dropdown-toggle__30max::after {\n  display: inline-block;\n  margin-left: 0.255em;\n  vertical-align: 0.255em;\n  content: \"\"; }\n\n.styles_dropleft__PbILv .styles_dropdown-toggle__30max::after {\n  display: none; }\n\n.styles_dropleft__PbILv .styles_dropdown-toggle__30max::before {\n  display: inline-block;\n  margin-right: 0.255em;\n  vertical-align: 0.255em;\n  content: \"\";\n  border-top: 0.3em solid transparent;\n  border-right: 0.3em solid;\n  border-bottom: 0.3em solid transparent; }\n\n.styles_dropleft__PbILv .styles_dropdown-toggle__30max:empty::after {\n  margin-left: 0; }\n\n.styles_dropleft__PbILv .styles_dropdown-toggle__30max::before {\n  vertical-align: 0; }\n\n.styles_dropdown-menu__2Xqan[x-placement^=\"top\"], .styles_dropdown-menu__2Xqan[x-placement^=\"right\"], .styles_dropdown-menu__2Xqan[x-placement^=\"bottom\"], .styles_dropdown-menu__2Xqan[x-placement^=\"left\"] {\n  right: auto;\n  bottom: auto; }\n\n.styles_dropdown-divider__2YTXX {\n  height: 0;\n  margin: 0.5rem 0;\n  overflow: hidden;\n  border-top: 1px solid #e9ecef; }\n\n.styles_dropdown-item__2YHsh {\n  display: block;\n  width: 100%;\n  padding: 0.25rem 1.5rem;\n  clear: both;\n  font-weight: 400;\n  color: #212529;\n  text-align: inherit;\n  white-space: nowrap;\n  background-color: transparent;\n  border: 0; }\n  .styles_dropdown-item__2YHsh:hover, .styles_dropdown-item__2YHsh:focus {\n    color: #16181b;\n    text-decoration: none;\n    background-color: #f8f9fa; }\n  .styles_dropdown-item__2YHsh.styles_active__1jaJY, .styles_dropdown-item__2YHsh:active {\n    color: #fff;\n    text-decoration: none;\n    background-color: #007bff; }\n  .styles_dropdown-item__2YHsh.styles_disabled__bNrPz, .styles_dropdown-item__2YHsh:disabled {\n    color: #6c757d;\n    pointer-events: none;\n    background-color: transparent; }\n\n.styles_dropdown-menu__2Xqan.styles_show__1YyhL {\n  display: block; }\n\n.styles_dropdown-header__3b-Ht {\n  display: block;\n  padding: 0.5rem 1.5rem;\n  margin-bottom: 0;\n  font-size: 0.875rem;\n  color: #6c757d;\n  white-space: nowrap; }\n\n.styles_dropdown-item-text__wJWg6 {\n  display: block;\n  padding: 0.25rem 1.5rem;\n  color: #212529; }\n\n.styles_btn-group__6aay1,\n.styles_btn-group-vertical__3gmiI {\n  position: relative;\n  display: inline-flex;\n  vertical-align: middle; }\n  .styles_btn-group__6aay1 > .styles_btn__34YFe,\n  .styles_btn-group-vertical__3gmiI > .styles_btn__34YFe {\n    position: relative;\n    flex: 1 1 auto; }\n    .styles_btn-group__6aay1 > .styles_btn__34YFe:hover,\n    .styles_btn-group-vertical__3gmiI > .styles_btn__34YFe:hover {\n      z-index: 1; }\n    .styles_btn-group__6aay1 > .styles_btn__34YFe:focus, .styles_btn-group__6aay1 > .styles_btn__34YFe:active, .styles_btn-group__6aay1 > .styles_btn__34YFe.styles_active__1jaJY,\n    .styles_btn-group-vertical__3gmiI > .styles_btn__34YFe:focus,\n    .styles_btn-group-vertical__3gmiI > .styles_btn__34YFe:active,\n    .styles_btn-group-vertical__3gmiI > .styles_btn__34YFe.styles_active__1jaJY {\n      z-index: 1; }\n\n.styles_btn-toolbar__2YSEG {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-start; }\n  .styles_btn-toolbar__2YSEG .styles_input-group__3EiL4 {\n    width: auto; }\n\n.styles_btn-group__6aay1 > .styles_btn__34YFe:not(:first-child),\n.styles_btn-group__6aay1 > .styles_btn-group__6aay1:not(:first-child) {\n  margin-left: -1px; }\n\n.styles_btn-group__6aay1 > .styles_btn__34YFe:not(:last-child):not(.styles_dropdown-toggle__30max),\n.styles_btn-group__6aay1 > .styles_btn-group__6aay1:not(:last-child) > .styles_btn__34YFe {\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0; }\n\n.styles_btn-group__6aay1 > .styles_btn__34YFe:not(:first-child),\n.styles_btn-group__6aay1 > .styles_btn-group__6aay1:not(:first-child) > .styles_btn__34YFe {\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0; }\n\n.styles_dropdown-toggle-split__3DSJr {\n  padding-right: 0.5625rem;\n  padding-left: 0.5625rem; }\n  .styles_dropdown-toggle-split__3DSJr::after,\n  .styles_dropup__1P4uh .styles_dropdown-toggle-split__3DSJr::after,\n  .styles_dropright__3byo1 .styles_dropdown-toggle-split__3DSJr::after {\n    margin-left: 0; }\n  .styles_dropleft__PbILv .styles_dropdown-toggle-split__3DSJr::before {\n    margin-right: 0; }\n\n.styles_btn-sm__3GxwP + .styles_dropdown-toggle-split__3DSJr, .styles_btn-group-sm__1KepP > .styles_btn__34YFe + .styles_dropdown-toggle-split__3DSJr {\n  padding-right: 0.375rem;\n  padding-left: 0.375rem; }\n\n.styles_btn-lg__17yAx + .styles_dropdown-toggle-split__3DSJr, .styles_btn-group-lg__1JBgX > .styles_btn__34YFe + .styles_dropdown-toggle-split__3DSJr {\n  padding-right: 0.75rem;\n  padding-left: 0.75rem; }\n\n.styles_btn-group-vertical__3gmiI {\n  flex-direction: column;\n  align-items: flex-start;\n  justify-content: center; }\n  .styles_btn-group-vertical__3gmiI > .styles_btn__34YFe,\n  .styles_btn-group-vertical__3gmiI > .styles_btn-group__6aay1 {\n    width: 100%; }\n  .styles_btn-group-vertical__3gmiI > .styles_btn__34YFe:not(:first-child),\n  .styles_btn-group-vertical__3gmiI > .styles_btn-group__6aay1:not(:first-child) {\n    margin-top: -1px; }\n  .styles_btn-group-vertical__3gmiI > .styles_btn__34YFe:not(:last-child):not(.styles_dropdown-toggle__30max),\n  .styles_btn-group-vertical__3gmiI > .styles_btn-group__6aay1:not(:last-child) > .styles_btn__34YFe {\n    border-bottom-right-radius: 0;\n    border-bottom-left-radius: 0; }\n  .styles_btn-group-vertical__3gmiI > .styles_btn__34YFe:not(:first-child),\n  .styles_btn-group-vertical__3gmiI > .styles_btn-group__6aay1:not(:first-child) > .styles_btn__34YFe {\n    border-top-left-radius: 0;\n    border-top-right-radius: 0; }\n\n.styles_btn-group-toggle__1Kmws > .styles_btn__34YFe,\n.styles_btn-group-toggle__1Kmws > .styles_btn-group__6aay1 > .styles_btn__34YFe {\n  margin-bottom: 0; }\n  .styles_btn-group-toggle__1Kmws > .styles_btn__34YFe input[type=\"radio\"],\n  .styles_btn-group-toggle__1Kmws > .styles_btn__34YFe input[type=\"checkbox\"],\n  .styles_btn-group-toggle__1Kmws > .styles_btn-group__6aay1 > .styles_btn__34YFe input[type=\"radio\"],\n  .styles_btn-group-toggle__1Kmws > .styles_btn-group__6aay1 > .styles_btn__34YFe input[type=\"checkbox\"] {\n    position: absolute;\n    clip: rect(0, 0, 0, 0);\n    pointer-events: none; }\n\n.styles_input-group__3EiL4 {\n  position: relative;\n  display: flex;\n  flex-wrap: wrap;\n  align-items: stretch;\n  width: 100%; }\n  .styles_input-group__3EiL4 > .styles_form-control__1vT7R,\n  .styles_input-group__3EiL4 > .styles_form-control-plaintext__1wRGf,\n  .styles_input-group__3EiL4 > .styles_custom-select__3UHfR,\n  .styles_input-group__3EiL4 > .styles_custom-file__1PrNc {\n    position: relative;\n    flex: 1 1 0%;\n    min-width: 0;\n    margin-bottom: 0; }\n    .styles_input-group__3EiL4 > .styles_form-control__1vT7R + .styles_form-control__1vT7R,\n    .styles_input-group__3EiL4 > .styles_form-control__1vT7R + .styles_custom-select__3UHfR,\n    .styles_input-group__3EiL4 > .styles_form-control__1vT7R + .styles_custom-file__1PrNc,\n    .styles_input-group__3EiL4 > .styles_form-control-plaintext__1wRGf + .styles_form-control__1vT7R,\n    .styles_input-group__3EiL4 > .styles_form-control-plaintext__1wRGf + .styles_custom-select__3UHfR,\n    .styles_input-group__3EiL4 > .styles_form-control-plaintext__1wRGf + .styles_custom-file__1PrNc,\n    .styles_input-group__3EiL4 > .styles_custom-select__3UHfR + .styles_form-control__1vT7R,\n    .styles_input-group__3EiL4 > .styles_custom-select__3UHfR + .styles_custom-select__3UHfR,\n    .styles_input-group__3EiL4 > .styles_custom-select__3UHfR + .styles_custom-file__1PrNc,\n    .styles_input-group__3EiL4 > .styles_custom-file__1PrNc + .styles_form-control__1vT7R,\n    .styles_input-group__3EiL4 > .styles_custom-file__1PrNc + .styles_custom-select__3UHfR,\n    .styles_input-group__3EiL4 > .styles_custom-file__1PrNc + .styles_custom-file__1PrNc {\n      margin-left: -1px; }\n  .styles_input-group__3EiL4 > .styles_form-control__1vT7R:focus,\n  .styles_input-group__3EiL4 > .styles_custom-select__3UHfR:focus,\n  .styles_input-group__3EiL4 > .styles_custom-file__1PrNc .styles_custom-file-input__1TwEe:focus ~ .styles_custom-file-label__2SjkB {\n    z-index: 3; }\n  .styles_input-group__3EiL4 > .styles_custom-file__1PrNc .styles_custom-file-input__1TwEe:focus {\n    z-index: 4; }\n  .styles_input-group__3EiL4 > .styles_form-control__1vT7R:not(:last-child),\n  .styles_input-group__3EiL4 > .styles_custom-select__3UHfR:not(:last-child) {\n    border-top-right-radius: 0;\n    border-bottom-right-radius: 0; }\n  .styles_input-group__3EiL4 > .styles_form-control__1vT7R:not(:first-child),\n  .styles_input-group__3EiL4 > .styles_custom-select__3UHfR:not(:first-child) {\n    border-top-left-radius: 0;\n    border-bottom-left-radius: 0; }\n  .styles_input-group__3EiL4 > .styles_custom-file__1PrNc {\n    display: flex;\n    align-items: center; }\n    .styles_input-group__3EiL4 > .styles_custom-file__1PrNc:not(:last-child) .styles_custom-file-label__2SjkB,\n    .styles_input-group__3EiL4 > .styles_custom-file__1PrNc:not(:last-child) .styles_custom-file-label__2SjkB::after {\n      border-top-right-radius: 0;\n      border-bottom-right-radius: 0; }\n    .styles_input-group__3EiL4 > .styles_custom-file__1PrNc:not(:first-child) .styles_custom-file-label__2SjkB {\n      border-top-left-radius: 0;\n      border-bottom-left-radius: 0; }\n\n.styles_input-group-prepend__2nAsb,\n.styles_input-group-append__BUyke {\n  display: flex; }\n  .styles_input-group-prepend__2nAsb .styles_btn__34YFe,\n  .styles_input-group-append__BUyke .styles_btn__34YFe {\n    position: relative;\n    z-index: 2; }\n    .styles_input-group-prepend__2nAsb .styles_btn__34YFe:focus,\n    .styles_input-group-append__BUyke .styles_btn__34YFe:focus {\n      z-index: 3; }\n  .styles_input-group-prepend__2nAsb .styles_btn__34YFe + .styles_btn__34YFe,\n  .styles_input-group-prepend__2nAsb .styles_btn__34YFe + .styles_input-group-text__35xKL,\n  .styles_input-group-prepend__2nAsb .styles_input-group-text__35xKL + .styles_input-group-text__35xKL,\n  .styles_input-group-prepend__2nAsb .styles_input-group-text__35xKL + .styles_btn__34YFe,\n  .styles_input-group-append__BUyke .styles_btn__34YFe + .styles_btn__34YFe,\n  .styles_input-group-append__BUyke .styles_btn__34YFe + .styles_input-group-text__35xKL,\n  .styles_input-group-append__BUyke .styles_input-group-text__35xKL + .styles_input-group-text__35xKL,\n  .styles_input-group-append__BUyke .styles_input-group-text__35xKL + .styles_btn__34YFe {\n    margin-left: -1px; }\n\n.styles_input-group-prepend__2nAsb {\n  margin-right: -1px; }\n\n.styles_input-group-append__BUyke {\n  margin-left: -1px; }\n\n.styles_input-group-text__35xKL {\n  display: flex;\n  align-items: center;\n  padding: 0.375rem 0.75rem;\n  margin-bottom: 0;\n  font-size: 1rem;\n  font-weight: 400;\n  line-height: 1.5;\n  color: #495057;\n  text-align: center;\n  white-space: nowrap;\n  background-color: #e9ecef;\n  border: 1px solid #ced4da;\n  border-radius: 0.25rem; }\n  .styles_input-group-text__35xKL input[type=\"radio\"],\n  .styles_input-group-text__35xKL input[type=\"checkbox\"] {\n    margin-top: 0; }\n\n.styles_input-group-lg__2uXbd > .styles_form-control__1vT7R:not(textarea),\n.styles_input-group-lg__2uXbd > .styles_custom-select__3UHfR {\n  height: calc(1.5em + 1rem + 2px); }\n\n.styles_input-group-lg__2uXbd > .styles_form-control__1vT7R,\n.styles_input-group-lg__2uXbd > .styles_custom-select__3UHfR,\n.styles_input-group-lg__2uXbd > .styles_input-group-prepend__2nAsb > .styles_input-group-text__35xKL,\n.styles_input-group-lg__2uXbd > .styles_input-group-append__BUyke > .styles_input-group-text__35xKL,\n.styles_input-group-lg__2uXbd > .styles_input-group-prepend__2nAsb > .styles_btn__34YFe,\n.styles_input-group-lg__2uXbd > .styles_input-group-append__BUyke > .styles_btn__34YFe {\n  padding: 0.5rem 1rem;\n  font-size: 1.25rem;\n  line-height: 1.5;\n  border-radius: 0.3rem; }\n\n.styles_input-group-sm__1LWac > .styles_form-control__1vT7R:not(textarea),\n.styles_input-group-sm__1LWac > .styles_custom-select__3UHfR {\n  height: calc(1.5em + 0.5rem + 2px); }\n\n.styles_input-group-sm__1LWac > .styles_form-control__1vT7R,\n.styles_input-group-sm__1LWac > .styles_custom-select__3UHfR,\n.styles_input-group-sm__1LWac > .styles_input-group-prepend__2nAsb > .styles_input-group-text__35xKL,\n.styles_input-group-sm__1LWac > .styles_input-group-append__BUyke > .styles_input-group-text__35xKL,\n.styles_input-group-sm__1LWac > .styles_input-group-prepend__2nAsb > .styles_btn__34YFe,\n.styles_input-group-sm__1LWac > .styles_input-group-append__BUyke > .styles_btn__34YFe {\n  padding: 0.25rem 0.5rem;\n  font-size: 0.875rem;\n  line-height: 1.5;\n  border-radius: 0.2rem; }\n\n.styles_input-group-lg__2uXbd > .styles_custom-select__3UHfR,\n.styles_input-group-sm__1LWac > .styles_custom-select__3UHfR {\n  padding-right: 1.75rem; }\n\n.styles_input-group__3EiL4 > .styles_input-group-prepend__2nAsb > .styles_btn__34YFe,\n.styles_input-group__3EiL4 > .styles_input-group-prepend__2nAsb > .styles_input-group-text__35xKL,\n.styles_input-group__3EiL4 > .styles_input-group-append__BUyke:not(:last-child) > .styles_btn__34YFe,\n.styles_input-group__3EiL4 > .styles_input-group-append__BUyke:not(:last-child) > .styles_input-group-text__35xKL,\n.styles_input-group__3EiL4 > .styles_input-group-append__BUyke:last-child > .styles_btn__34YFe:not(:last-child):not(.styles_dropdown-toggle__30max),\n.styles_input-group__3EiL4 > .styles_input-group-append__BUyke:last-child > .styles_input-group-text__35xKL:not(:last-child) {\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0; }\n\n.styles_input-group__3EiL4 > .styles_input-group-append__BUyke > .styles_btn__34YFe,\n.styles_input-group__3EiL4 > .styles_input-group-append__BUyke > .styles_input-group-text__35xKL,\n.styles_input-group__3EiL4 > .styles_input-group-prepend__2nAsb:not(:first-child) > .styles_btn__34YFe,\n.styles_input-group__3EiL4 > .styles_input-group-prepend__2nAsb:not(:first-child) > .styles_input-group-text__35xKL,\n.styles_input-group__3EiL4 > .styles_input-group-prepend__2nAsb:first-child > .styles_btn__34YFe:not(:first-child),\n.styles_input-group__3EiL4 > .styles_input-group-prepend__2nAsb:first-child > .styles_input-group-text__35xKL:not(:first-child) {\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0; }\n\n.styles_custom-control__1UTEr {\n  position: relative;\n  display: block;\n  min-height: 1.5rem;\n  padding-left: 1.5rem; }\n\n.styles_custom-control-inline__qEHEo {\n  display: inline-flex;\n  margin-right: 1rem; }\n\n.styles_custom-control-input__6xZyE {\n  position: absolute;\n  left: 0;\n  z-index: -1;\n  width: 1rem;\n  height: 1.25rem;\n  opacity: 0; }\n  .styles_custom-control-input__6xZyE:checked ~ .styles_custom-control-label__3gmbK::before {\n    color: #fff;\n    border-color: #007bff;\n    background-color: #007bff; }\n  .styles_custom-control-input__6xZyE:focus ~ .styles_custom-control-label__3gmbK::before {\n    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25); }\n  .styles_custom-control-input__6xZyE:focus:not(:checked) ~ .styles_custom-control-label__3gmbK::before {\n    border-color: #80bdff; }\n  .styles_custom-control-input__6xZyE:not(:disabled):active ~ .styles_custom-control-label__3gmbK::before {\n    color: #fff;\n    background-color: #b3d7ff;\n    border-color: #b3d7ff; }\n  .styles_custom-control-input__6xZyE[disabled] ~ .styles_custom-control-label__3gmbK, .styles_custom-control-input__6xZyE:disabled ~ .styles_custom-control-label__3gmbK {\n    color: #6c757d; }\n    .styles_custom-control-input__6xZyE[disabled] ~ .styles_custom-control-label__3gmbK::before, .styles_custom-control-input__6xZyE:disabled ~ .styles_custom-control-label__3gmbK::before {\n      background-color: #e9ecef; }\n\n.styles_custom-control-label__3gmbK {\n  position: relative;\n  margin-bottom: 0;\n  vertical-align: top; }\n  .styles_custom-control-label__3gmbK::before {\n    position: absolute;\n    top: 0.25rem;\n    left: -1.5rem;\n    display: block;\n    width: 1rem;\n    height: 1rem;\n    pointer-events: none;\n    content: \"\";\n    background-color: #fff;\n    border: #adb5bd solid 1px; }\n  .styles_custom-control-label__3gmbK::after {\n    position: absolute;\n    top: 0.25rem;\n    left: -1.5rem;\n    display: block;\n    width: 1rem;\n    height: 1rem;\n    content: \"\";\n    background: no-repeat 50% / 50% 50%; }\n\n.styles_custom-checkbox__OBz7Y .styles_custom-control-label__3gmbK::before {\n  border-radius: 0.25rem; }\n\n.styles_custom-checkbox__OBz7Y .styles_custom-control-input__6xZyE:checked ~ .styles_custom-control-label__3gmbK::after {\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26l2.974 2.99L8 2.193z'/%3e%3c/svg%3e\"); }\n\n.styles_custom-checkbox__OBz7Y .styles_custom-control-input__6xZyE:indeterminate ~ .styles_custom-control-label__3gmbK::before {\n  border-color: #007bff;\n  background-color: #007bff; }\n\n.styles_custom-checkbox__OBz7Y .styles_custom-control-input__6xZyE:indeterminate ~ .styles_custom-control-label__3gmbK::after {\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3e%3cpath stroke='%23fff' d='M0 2h4'/%3e%3c/svg%3e\"); }\n\n.styles_custom-checkbox__OBz7Y .styles_custom-control-input__6xZyE:disabled:checked ~ .styles_custom-control-label__3gmbK::before {\n  background-color: rgba(0, 123, 255, 0.5); }\n\n.styles_custom-checkbox__OBz7Y .styles_custom-control-input__6xZyE:disabled:indeterminate ~ .styles_custom-control-label__3gmbK::before {\n  background-color: rgba(0, 123, 255, 0.5); }\n\n.styles_custom-radio__tv9-q .styles_custom-control-label__3gmbK::before {\n  border-radius: 50%; }\n\n.styles_custom-radio__tv9-q .styles_custom-control-input__6xZyE:checked ~ .styles_custom-control-label__3gmbK::after {\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23fff'/%3e%3c/svg%3e\"); }\n\n.styles_custom-radio__tv9-q .styles_custom-control-input__6xZyE:disabled:checked ~ .styles_custom-control-label__3gmbK::before {\n  background-color: rgba(0, 123, 255, 0.5); }\n\n.styles_custom-switch__30Z_s {\n  padding-left: 2.25rem; }\n  .styles_custom-switch__30Z_s .styles_custom-control-label__3gmbK::before {\n    left: -2.25rem;\n    width: 1.75rem;\n    pointer-events: all;\n    border-radius: 0.5rem; }\n  .styles_custom-switch__30Z_s .styles_custom-control-label__3gmbK::after {\n    top: calc(0.25rem + 2px);\n    left: calc(-2.25rem + 2px);\n    width: calc(1rem - 4px);\n    height: calc(1rem - 4px);\n    background-color: #adb5bd;\n    border-radius: 0.5rem;\n    transition: transform 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out; }\n    @media (prefers-reduced-motion: reduce) {\n      .styles_custom-switch__30Z_s .styles_custom-control-label__3gmbK::after {\n        transition: none; } }\n  .styles_custom-switch__30Z_s .styles_custom-control-input__6xZyE:checked ~ .styles_custom-control-label__3gmbK::after {\n    background-color: #fff;\n    transform: translateX(0.75rem); }\n  .styles_custom-switch__30Z_s .styles_custom-control-input__6xZyE:disabled:checked ~ .styles_custom-control-label__3gmbK::before {\n    background-color: rgba(0, 123, 255, 0.5); }\n\n.styles_custom-select__3UHfR {\n  display: inline-block;\n  width: 100%;\n  height: calc(1.5em + 0.75rem + 2px);\n  padding: 0.375rem 1.75rem 0.375rem 0.75rem;\n  font-size: 1rem;\n  font-weight: 400;\n  line-height: 1.5;\n  color: #495057;\n  vertical-align: middle;\n  background: #fff url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='4' height='5' viewBox='0 0 4 5'%3e%3cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e\") no-repeat right 0.75rem center/8px 10px;\n  border: 1px solid #ced4da;\n  border-radius: 0.25rem;\n  appearance: none; }\n  .styles_custom-select__3UHfR:focus {\n    border-color: #80bdff;\n    outline: 0;\n    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25); }\n    .styles_custom-select__3UHfR:focus::-ms-value {\n      color: #495057;\n      background-color: #fff; }\n  .styles_custom-select__3UHfR[multiple], .styles_custom-select__3UHfR[size]:not([size=\"1\"]) {\n    height: auto;\n    padding-right: 0.75rem;\n    background-image: none; }\n  .styles_custom-select__3UHfR:disabled {\n    color: #6c757d;\n    background-color: #e9ecef; }\n  .styles_custom-select__3UHfR::-ms-expand {\n    display: none; }\n  .styles_custom-select__3UHfR:-moz-focusring {\n    color: transparent;\n    text-shadow: 0 0 0 #495057; }\n\n.styles_custom-select-sm__2y0O1 {\n  height: calc(1.5em + 0.5rem + 2px);\n  padding-top: 0.25rem;\n  padding-bottom: 0.25rem;\n  padding-left: 0.5rem;\n  font-size: 0.875rem; }\n\n.styles_custom-select-lg__2hatN {\n  height: calc(1.5em + 1rem + 2px);\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n  padding-left: 1rem;\n  font-size: 1.25rem; }\n\n.styles_custom-file__1PrNc {\n  position: relative;\n  display: inline-block;\n  width: 100%;\n  height: calc(1.5em + 0.75rem + 2px);\n  margin-bottom: 0; }\n\n.styles_custom-file-input__1TwEe {\n  position: relative;\n  z-index: 2;\n  width: 100%;\n  height: calc(1.5em + 0.75rem + 2px);\n  margin: 0;\n  opacity: 0; }\n  .styles_custom-file-input__1TwEe:focus ~ .styles_custom-file-label__2SjkB {\n    border-color: #80bdff;\n    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25); }\n  .styles_custom-file-input__1TwEe[disabled] ~ .styles_custom-file-label__2SjkB,\n  .styles_custom-file-input__1TwEe:disabled ~ .styles_custom-file-label__2SjkB {\n    background-color: #e9ecef; }\n  .styles_custom-file-input__1TwEe:lang(en) ~ .styles_custom-file-label__2SjkB::after {\n    content: \"Browse\"; }\n  .styles_custom-file-input__1TwEe ~ .styles_custom-file-label__2SjkB[data-browse]::after {\n    content: attr(data-browse); }\n\n.styles_custom-file-label__2SjkB {\n  position: absolute;\n  top: 0;\n  right: 0;\n  left: 0;\n  z-index: 1;\n  height: calc(1.5em + 0.75rem + 2px);\n  padding: 0.375rem 0.75rem;\n  font-weight: 400;\n  line-height: 1.5;\n  color: #495057;\n  background-color: #fff;\n  border: 1px solid #ced4da;\n  border-radius: 0.25rem; }\n  .styles_custom-file-label__2SjkB::after {\n    position: absolute;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    z-index: 3;\n    display: block;\n    height: calc(1.5em + 0.75rem);\n    padding: 0.375rem 0.75rem;\n    line-height: 1.5;\n    color: #495057;\n    content: \"Browse\";\n    background-color: #e9ecef;\n    border-left: inherit;\n    border-radius: 0 0.25rem 0.25rem 0; }\n\n.styles_custom-range__2drFR {\n  width: 100%;\n  height: 1.4rem;\n  padding: 0;\n  background-color: transparent;\n  appearance: none; }\n  .styles_custom-range__2drFR:focus {\n    outline: none; }\n    .styles_custom-range__2drFR:focus::-webkit-slider-thumb {\n      box-shadow: 0 0 0 1px #fff, 0 0 0 0.2rem rgba(0, 123, 255, 0.25); }\n    .styles_custom-range__2drFR:focus::-moz-range-thumb {\n      box-shadow: 0 0 0 1px #fff, 0 0 0 0.2rem rgba(0, 123, 255, 0.25); }\n    .styles_custom-range__2drFR:focus::-ms-thumb {\n      box-shadow: 0 0 0 1px #fff, 0 0 0 0.2rem rgba(0, 123, 255, 0.25); }\n  .styles_custom-range__2drFR::-moz-focus-outer {\n    border: 0; }\n  .styles_custom-range__2drFR::-webkit-slider-thumb {\n    width: 1rem;\n    height: 1rem;\n    margin-top: -0.25rem;\n    background-color: #007bff;\n    border: 0;\n    border-radius: 1rem;\n    transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n    appearance: none; }\n    @media (prefers-reduced-motion: reduce) {\n      .styles_custom-range__2drFR::-webkit-slider-thumb {\n        transition: none; } }\n    .styles_custom-range__2drFR::-webkit-slider-thumb:active {\n      background-color: #b3d7ff; }\n  .styles_custom-range__2drFR::-webkit-slider-runnable-track {\n    width: 100%;\n    height: 0.5rem;\n    color: transparent;\n    cursor: pointer;\n    background-color: #dee2e6;\n    border-color: transparent;\n    border-radius: 1rem; }\n  .styles_custom-range__2drFR::-moz-range-thumb {\n    width: 1rem;\n    height: 1rem;\n    background-color: #007bff;\n    border: 0;\n    border-radius: 1rem;\n    transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n    appearance: none; }\n    @media (prefers-reduced-motion: reduce) {\n      .styles_custom-range__2drFR::-moz-range-thumb {\n        transition: none; } }\n    .styles_custom-range__2drFR::-moz-range-thumb:active {\n      background-color: #b3d7ff; }\n  .styles_custom-range__2drFR::-moz-range-track {\n    width: 100%;\n    height: 0.5rem;\n    color: transparent;\n    cursor: pointer;\n    background-color: #dee2e6;\n    border-color: transparent;\n    border-radius: 1rem; }\n  .styles_custom-range__2drFR::-ms-thumb {\n    width: 1rem;\n    height: 1rem;\n    margin-top: 0;\n    margin-right: 0.2rem;\n    margin-left: 0.2rem;\n    background-color: #007bff;\n    border: 0;\n    border-radius: 1rem;\n    transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n    appearance: none; }\n    @media (prefers-reduced-motion: reduce) {\n      .styles_custom-range__2drFR::-ms-thumb {\n        transition: none; } }\n    .styles_custom-range__2drFR::-ms-thumb:active {\n      background-color: #b3d7ff; }\n  .styles_custom-range__2drFR::-ms-track {\n    width: 100%;\n    height: 0.5rem;\n    color: transparent;\n    cursor: pointer;\n    background-color: transparent;\n    border-color: transparent;\n    border-width: 0.5rem; }\n  .styles_custom-range__2drFR::-ms-fill-lower {\n    background-color: #dee2e6;\n    border-radius: 1rem; }\n  .styles_custom-range__2drFR::-ms-fill-upper {\n    margin-right: 15px;\n    background-color: #dee2e6;\n    border-radius: 1rem; }\n  .styles_custom-range__2drFR:disabled::-webkit-slider-thumb {\n    background-color: #adb5bd; }\n  .styles_custom-range__2drFR:disabled::-webkit-slider-runnable-track {\n    cursor: default; }\n  .styles_custom-range__2drFR:disabled::-moz-range-thumb {\n    background-color: #adb5bd; }\n  .styles_custom-range__2drFR:disabled::-moz-range-track {\n    cursor: default; }\n  .styles_custom-range__2drFR:disabled::-ms-thumb {\n    background-color: #adb5bd; }\n\n.styles_custom-control-label__3gmbK::before,\n.styles_custom-file-label__2SjkB,\n.styles_custom-select__3UHfR {\n  transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out; }\n  @media (prefers-reduced-motion: reduce) {\n    .styles_custom-control-label__3gmbK::before,\n    .styles_custom-file-label__2SjkB,\n    .styles_custom-select__3UHfR {\n      transition: none; } }\n\n.styles_nav__2DXmX {\n  display: flex;\n  flex-wrap: wrap;\n  padding-left: 0;\n  margin-bottom: 0;\n  list-style: none; }\n\n.styles_nav-link__bhMTJ {\n  display: block;\n  padding: 0.5rem 1rem; }\n  .styles_nav-link__bhMTJ:hover, .styles_nav-link__bhMTJ:focus {\n    text-decoration: none; }\n  .styles_nav-link__bhMTJ.styles_disabled__bNrPz {\n    color: #6c757d;\n    pointer-events: none;\n    cursor: default; }\n\n.styles_nav-tabs__26Y2Z {\n  border-bottom: 1px solid #dee2e6; }\n  .styles_nav-tabs__26Y2Z .styles_nav-item__8OTmm {\n    margin-bottom: -1px; }\n  .styles_nav-tabs__26Y2Z .styles_nav-link__bhMTJ {\n    border: 1px solid transparent;\n    border-top-left-radius: 0.25rem;\n    border-top-right-radius: 0.25rem; }\n    .styles_nav-tabs__26Y2Z .styles_nav-link__bhMTJ:hover, .styles_nav-tabs__26Y2Z .styles_nav-link__bhMTJ:focus {\n      border-color: #e9ecef #e9ecef #dee2e6; }\n    .styles_nav-tabs__26Y2Z .styles_nav-link__bhMTJ.styles_disabled__bNrPz {\n      color: #6c757d;\n      background-color: transparent;\n      border-color: transparent; }\n  .styles_nav-tabs__26Y2Z .styles_nav-link__bhMTJ.styles_active__1jaJY,\n  .styles_nav-tabs__26Y2Z .styles_nav-item__8OTmm.styles_show__1YyhL .styles_nav-link__bhMTJ {\n    color: #495057;\n    background-color: #fff;\n    border-color: #dee2e6 #dee2e6 #fff; }\n  .styles_nav-tabs__26Y2Z .styles_dropdown-menu__2Xqan {\n    margin-top: -1px;\n    border-top-left-radius: 0;\n    border-top-right-radius: 0; }\n\n.styles_nav-pills__fpPM4 .styles_nav-link__bhMTJ {\n  border-radius: 0.25rem; }\n\n.styles_nav-pills__fpPM4 .styles_nav-link__bhMTJ.styles_active__1jaJY,\n.styles_nav-pills__fpPM4 .styles_show__1YyhL > .styles_nav-link__bhMTJ {\n  color: #fff;\n  background-color: #007bff; }\n\n.styles_nav-fill__2CqLD .styles_nav-item__8OTmm {\n  flex: 1 1 auto;\n  text-align: center; }\n\n.styles_nav-justified__3FSgi .styles_nav-item__8OTmm {\n  flex-basis: 0;\n  flex-grow: 1;\n  text-align: center; }\n\n.styles_tab-content__3qwlS > .styles_tab-pane__2f6RJ {\n  display: none; }\n\n.styles_tab-content__3qwlS > .styles_active__1jaJY {\n  display: block; }\n\n.styles_navbar__1FERp {\n  position: relative;\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0.5rem 1rem; }\n  .styles_navbar__1FERp .styles_container__1H7C6,\n  .styles_navbar__1FERp .styles_container-fluid__14efH, .styles_navbar__1FERp .styles_container-sm__1NrLH, .styles_navbar__1FERp .styles_container-md__3Qdym, .styles_navbar__1FERp .styles_container-lg__1Vyon, .styles_navbar__1FERp .styles_container-xl__3JIrQ {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    justify-content: space-between; }\n\n.styles_navbar-brand__2tOvt {\n  display: inline-block;\n  padding-top: 0.3125rem;\n  padding-bottom: 0.3125rem;\n  margin-right: 1rem;\n  font-size: 1.25rem;\n  line-height: inherit;\n  white-space: nowrap; }\n  .styles_navbar-brand__2tOvt:hover, .styles_navbar-brand__2tOvt:focus {\n    text-decoration: none; }\n\n.styles_navbar-nav__3flJ- {\n  display: flex;\n  flex-direction: column;\n  padding-left: 0;\n  margin-bottom: 0;\n  list-style: none; }\n  .styles_navbar-nav__3flJ- .styles_nav-link__bhMTJ {\n    padding-right: 0;\n    padding-left: 0; }\n  .styles_navbar-nav__3flJ- .styles_dropdown-menu__2Xqan {\n    position: static;\n    float: none; }\n\n.styles_navbar-text__1LISi {\n  display: inline-block;\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem; }\n\n.styles_navbar-collapse__4xloc {\n  flex-basis: 100%;\n  flex-grow: 1;\n  align-items: center; }\n\n.styles_navbar-toggler__2rDh9 {\n  padding: 0.25rem 0.75rem;\n  font-size: 1.25rem;\n  line-height: 1;\n  background-color: transparent;\n  border: 1px solid transparent;\n  border-radius: 0.25rem; }\n  .styles_navbar-toggler__2rDh9:hover, .styles_navbar-toggler__2rDh9:focus {\n    text-decoration: none; }\n\n.styles_navbar-toggler-icon__3y0v5 {\n  display: inline-block;\n  width: 1.5em;\n  height: 1.5em;\n  vertical-align: middle;\n  content: \"\";\n  background: no-repeat center center;\n  background-size: 100% 100%; }\n\n@media (max-width: 575.98px) {\n  .styles_navbar-expand-sm__pNv0B > .styles_container__1H7C6,\n  .styles_navbar-expand-sm__pNv0B > .styles_container-fluid__14efH, .styles_navbar-expand-sm__pNv0B > .styles_container-sm__1NrLH, .styles_navbar-expand-sm__pNv0B > .styles_container-md__3Qdym, .styles_navbar-expand-sm__pNv0B > .styles_container-lg__1Vyon, .styles_navbar-expand-sm__pNv0B > .styles_container-xl__3JIrQ {\n    padding-right: 0;\n    padding-left: 0; } }\n\n@media (min-width: 576px) {\n  .styles_navbar-expand-sm__pNv0B {\n    flex-flow: row nowrap;\n    justify-content: flex-start; }\n    .styles_navbar-expand-sm__pNv0B .styles_navbar-nav__3flJ- {\n      flex-direction: row; }\n      .styles_navbar-expand-sm__pNv0B .styles_navbar-nav__3flJ- .styles_dropdown-menu__2Xqan {\n        position: absolute; }\n      .styles_navbar-expand-sm__pNv0B .styles_navbar-nav__3flJ- .styles_nav-link__bhMTJ {\n        padding-right: 0.5rem;\n        padding-left: 0.5rem; }\n    .styles_navbar-expand-sm__pNv0B > .styles_container__1H7C6,\n    .styles_navbar-expand-sm__pNv0B > .styles_container-fluid__14efH, .styles_navbar-expand-sm__pNv0B > .styles_container-sm__1NrLH, .styles_navbar-expand-sm__pNv0B > .styles_container-md__3Qdym, .styles_navbar-expand-sm__pNv0B > .styles_container-lg__1Vyon, .styles_navbar-expand-sm__pNv0B > .styles_container-xl__3JIrQ {\n      flex-wrap: nowrap; }\n    .styles_navbar-expand-sm__pNv0B .styles_navbar-collapse__4xloc {\n      display: flex !important;\n      flex-basis: auto; }\n    .styles_navbar-expand-sm__pNv0B .styles_navbar-toggler__2rDh9 {\n      display: none; } }\n\n@media (max-width: 767.98px) {\n  .styles_navbar-expand-md__YN6f7 > .styles_container__1H7C6,\n  .styles_navbar-expand-md__YN6f7 > .styles_container-fluid__14efH, .styles_navbar-expand-md__YN6f7 > .styles_container-sm__1NrLH, .styles_navbar-expand-md__YN6f7 > .styles_container-md__3Qdym, .styles_navbar-expand-md__YN6f7 > .styles_container-lg__1Vyon, .styles_navbar-expand-md__YN6f7 > .styles_container-xl__3JIrQ {\n    padding-right: 0;\n    padding-left: 0; } }\n\n@media (min-width: 768px) {\n  .styles_navbar-expand-md__YN6f7 {\n    flex-flow: row nowrap;\n    justify-content: flex-start; }\n    .styles_navbar-expand-md__YN6f7 .styles_navbar-nav__3flJ- {\n      flex-direction: row; }\n      .styles_navbar-expand-md__YN6f7 .styles_navbar-nav__3flJ- .styles_dropdown-menu__2Xqan {\n        position: absolute; }\n      .styles_navbar-expand-md__YN6f7 .styles_navbar-nav__3flJ- .styles_nav-link__bhMTJ {\n        padding-right: 0.5rem;\n        padding-left: 0.5rem; }\n    .styles_navbar-expand-md__YN6f7 > .styles_container__1H7C6,\n    .styles_navbar-expand-md__YN6f7 > .styles_container-fluid__14efH, .styles_navbar-expand-md__YN6f7 > .styles_container-sm__1NrLH, .styles_navbar-expand-md__YN6f7 > .styles_container-md__3Qdym, .styles_navbar-expand-md__YN6f7 > .styles_container-lg__1Vyon, .styles_navbar-expand-md__YN6f7 > .styles_container-xl__3JIrQ {\n      flex-wrap: nowrap; }\n    .styles_navbar-expand-md__YN6f7 .styles_navbar-collapse__4xloc {\n      display: flex !important;\n      flex-basis: auto; }\n    .styles_navbar-expand-md__YN6f7 .styles_navbar-toggler__2rDh9 {\n      display: none; } }\n\n@media (max-width: 991.98px) {\n  .styles_navbar-expand-lg__3JYfr > .styles_container__1H7C6,\n  .styles_navbar-expand-lg__3JYfr > .styles_container-fluid__14efH, .styles_navbar-expand-lg__3JYfr > .styles_container-sm__1NrLH, .styles_navbar-expand-lg__3JYfr > .styles_container-md__3Qdym, .styles_navbar-expand-lg__3JYfr > .styles_container-lg__1Vyon, .styles_navbar-expand-lg__3JYfr > .styles_container-xl__3JIrQ {\n    padding-right: 0;\n    padding-left: 0; } }\n\n@media (min-width: 992px) {\n  .styles_navbar-expand-lg__3JYfr {\n    flex-flow: row nowrap;\n    justify-content: flex-start; }\n    .styles_navbar-expand-lg__3JYfr .styles_navbar-nav__3flJ- {\n      flex-direction: row; }\n      .styles_navbar-expand-lg__3JYfr .styles_navbar-nav__3flJ- .styles_dropdown-menu__2Xqan {\n        position: absolute; }\n      .styles_navbar-expand-lg__3JYfr .styles_navbar-nav__3flJ- .styles_nav-link__bhMTJ {\n        padding-right: 0.5rem;\n        padding-left: 0.5rem; }\n    .styles_navbar-expand-lg__3JYfr > .styles_container__1H7C6,\n    .styles_navbar-expand-lg__3JYfr > .styles_container-fluid__14efH, .styles_navbar-expand-lg__3JYfr > .styles_container-sm__1NrLH, .styles_navbar-expand-lg__3JYfr > .styles_container-md__3Qdym, .styles_navbar-expand-lg__3JYfr > .styles_container-lg__1Vyon, .styles_navbar-expand-lg__3JYfr > .styles_container-xl__3JIrQ {\n      flex-wrap: nowrap; }\n    .styles_navbar-expand-lg__3JYfr .styles_navbar-collapse__4xloc {\n      display: flex !important;\n      flex-basis: auto; }\n    .styles_navbar-expand-lg__3JYfr .styles_navbar-toggler__2rDh9 {\n      display: none; } }\n\n@media (max-width: 1199.98px) {\n  .styles_navbar-expand-xl__2BLGS > .styles_container__1H7C6,\n  .styles_navbar-expand-xl__2BLGS > .styles_container-fluid__14efH, .styles_navbar-expand-xl__2BLGS > .styles_container-sm__1NrLH, .styles_navbar-expand-xl__2BLGS > .styles_container-md__3Qdym, .styles_navbar-expand-xl__2BLGS > .styles_container-lg__1Vyon, .styles_navbar-expand-xl__2BLGS > .styles_container-xl__3JIrQ {\n    padding-right: 0;\n    padding-left: 0; } }\n\n@media (min-width: 1200px) {\n  .styles_navbar-expand-xl__2BLGS {\n    flex-flow: row nowrap;\n    justify-content: flex-start; }\n    .styles_navbar-expand-xl__2BLGS .styles_navbar-nav__3flJ- {\n      flex-direction: row; }\n      .styles_navbar-expand-xl__2BLGS .styles_navbar-nav__3flJ- .styles_dropdown-menu__2Xqan {\n        position: absolute; }\n      .styles_navbar-expand-xl__2BLGS .styles_navbar-nav__3flJ- .styles_nav-link__bhMTJ {\n        padding-right: 0.5rem;\n        padding-left: 0.5rem; }\n    .styles_navbar-expand-xl__2BLGS > .styles_container__1H7C6,\n    .styles_navbar-expand-xl__2BLGS > .styles_container-fluid__14efH, .styles_navbar-expand-xl__2BLGS > .styles_container-sm__1NrLH, .styles_navbar-expand-xl__2BLGS > .styles_container-md__3Qdym, .styles_navbar-expand-xl__2BLGS > .styles_container-lg__1Vyon, .styles_navbar-expand-xl__2BLGS > .styles_container-xl__3JIrQ {\n      flex-wrap: nowrap; }\n    .styles_navbar-expand-xl__2BLGS .styles_navbar-collapse__4xloc {\n      display: flex !important;\n      flex-basis: auto; }\n    .styles_navbar-expand-xl__2BLGS .styles_navbar-toggler__2rDh9 {\n      display: none; } }\n\n.styles_navbar-expand__2GVqc {\n  flex-flow: row nowrap;\n  justify-content: flex-start; }\n  .styles_navbar-expand__2GVqc > .styles_container__1H7C6,\n  .styles_navbar-expand__2GVqc > .styles_container-fluid__14efH, .styles_navbar-expand__2GVqc > .styles_container-sm__1NrLH, .styles_navbar-expand__2GVqc > .styles_container-md__3Qdym, .styles_navbar-expand__2GVqc > .styles_container-lg__1Vyon, .styles_navbar-expand__2GVqc > .styles_container-xl__3JIrQ {\n    padding-right: 0;\n    padding-left: 0; }\n  .styles_navbar-expand__2GVqc .styles_navbar-nav__3flJ- {\n    flex-direction: row; }\n    .styles_navbar-expand__2GVqc .styles_navbar-nav__3flJ- .styles_dropdown-menu__2Xqan {\n      position: absolute; }\n    .styles_navbar-expand__2GVqc .styles_navbar-nav__3flJ- .styles_nav-link__bhMTJ {\n      padding-right: 0.5rem;\n      padding-left: 0.5rem; }\n  .styles_navbar-expand__2GVqc > .styles_container__1H7C6,\n  .styles_navbar-expand__2GVqc > .styles_container-fluid__14efH, .styles_navbar-expand__2GVqc > .styles_container-sm__1NrLH, .styles_navbar-expand__2GVqc > .styles_container-md__3Qdym, .styles_navbar-expand__2GVqc > .styles_container-lg__1Vyon, .styles_navbar-expand__2GVqc > .styles_container-xl__3JIrQ {\n    flex-wrap: nowrap; }\n  .styles_navbar-expand__2GVqc .styles_navbar-collapse__4xloc {\n    display: flex !important;\n    flex-basis: auto; }\n  .styles_navbar-expand__2GVqc .styles_navbar-toggler__2rDh9 {\n    display: none; }\n\n.styles_navbar-light__3aS-R .styles_navbar-brand__2tOvt {\n  color: rgba(0, 0, 0, 0.9); }\n  .styles_navbar-light__3aS-R .styles_navbar-brand__2tOvt:hover, .styles_navbar-light__3aS-R .styles_navbar-brand__2tOvt:focus {\n    color: rgba(0, 0, 0, 0.9); }\n\n.styles_navbar-light__3aS-R .styles_navbar-nav__3flJ- .styles_nav-link__bhMTJ {\n  color: rgba(0, 0, 0, 0.5); }\n  .styles_navbar-light__3aS-R .styles_navbar-nav__3flJ- .styles_nav-link__bhMTJ:hover, .styles_navbar-light__3aS-R .styles_navbar-nav__3flJ- .styles_nav-link__bhMTJ:focus {\n    color: rgba(0, 0, 0, 0.7); }\n  .styles_navbar-light__3aS-R .styles_navbar-nav__3flJ- .styles_nav-link__bhMTJ.styles_disabled__bNrPz {\n    color: rgba(0, 0, 0, 0.3); }\n\n.styles_navbar-light__3aS-R .styles_navbar-nav__3flJ- .styles_show__1YyhL > .styles_nav-link__bhMTJ,\n.styles_navbar-light__3aS-R .styles_navbar-nav__3flJ- .styles_active__1jaJY > .styles_nav-link__bhMTJ,\n.styles_navbar-light__3aS-R .styles_navbar-nav__3flJ- .styles_nav-link__bhMTJ.styles_show__1YyhL,\n.styles_navbar-light__3aS-R .styles_navbar-nav__3flJ- .styles_nav-link__bhMTJ.styles_active__1jaJY {\n  color: rgba(0, 0, 0, 0.9); }\n\n.styles_navbar-light__3aS-R .styles_navbar-toggler__2rDh9 {\n  color: rgba(0, 0, 0, 0.5);\n  border-color: rgba(0, 0, 0, 0.1); }\n\n.styles_navbar-light__3aS-R .styles_navbar-toggler-icon__3y0v5 {\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(0, 0, 0, 0.5)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e\"); }\n\n.styles_navbar-light__3aS-R .styles_navbar-text__1LISi {\n  color: rgba(0, 0, 0, 0.5); }\n  .styles_navbar-light__3aS-R .styles_navbar-text__1LISi a {\n    color: rgba(0, 0, 0, 0.9); }\n    .styles_navbar-light__3aS-R .styles_navbar-text__1LISi a:hover, .styles_navbar-light__3aS-R .styles_navbar-text__1LISi a:focus {\n      color: rgba(0, 0, 0, 0.9); }\n\n.styles_navbar-dark__3BWYs .styles_navbar-brand__2tOvt {\n  color: #fff; }\n  .styles_navbar-dark__3BWYs .styles_navbar-brand__2tOvt:hover, .styles_navbar-dark__3BWYs .styles_navbar-brand__2tOvt:focus {\n    color: #fff; }\n\n.styles_navbar-dark__3BWYs .styles_navbar-nav__3flJ- .styles_nav-link__bhMTJ {\n  color: rgba(255, 255, 255, 0.5); }\n  .styles_navbar-dark__3BWYs .styles_navbar-nav__3flJ- .styles_nav-link__bhMTJ:hover, .styles_navbar-dark__3BWYs .styles_navbar-nav__3flJ- .styles_nav-link__bhMTJ:focus {\n    color: rgba(255, 255, 255, 0.75); }\n  .styles_navbar-dark__3BWYs .styles_navbar-nav__3flJ- .styles_nav-link__bhMTJ.styles_disabled__bNrPz {\n    color: rgba(255, 255, 255, 0.25); }\n\n.styles_navbar-dark__3BWYs .styles_navbar-nav__3flJ- .styles_show__1YyhL > .styles_nav-link__bhMTJ,\n.styles_navbar-dark__3BWYs .styles_navbar-nav__3flJ- .styles_active__1jaJY > .styles_nav-link__bhMTJ,\n.styles_navbar-dark__3BWYs .styles_navbar-nav__3flJ- .styles_nav-link__bhMTJ.styles_show__1YyhL,\n.styles_navbar-dark__3BWYs .styles_navbar-nav__3flJ- .styles_nav-link__bhMTJ.styles_active__1jaJY {\n  color: #fff; }\n\n.styles_navbar-dark__3BWYs .styles_navbar-toggler__2rDh9 {\n  color: rgba(255, 255, 255, 0.5);\n  border-color: rgba(255, 255, 255, 0.1); }\n\n.styles_navbar-dark__3BWYs .styles_navbar-toggler-icon__3y0v5 {\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255, 255, 255, 0.5)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e\"); }\n\n.styles_navbar-dark__3BWYs .styles_navbar-text__1LISi {\n  color: rgba(255, 255, 255, 0.5); }\n  .styles_navbar-dark__3BWYs .styles_navbar-text__1LISi a {\n    color: #fff; }\n    .styles_navbar-dark__3BWYs .styles_navbar-text__1LISi a:hover, .styles_navbar-dark__3BWYs .styles_navbar-text__1LISi a:focus {\n      color: #fff; }\n\n.styles_card__2Taky {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  min-width: 0;\n  word-wrap: break-word;\n  background-color: #fff;\n  background-clip: border-box;\n  border: 1px solid rgba(0, 0, 0, 0.125);\n  border-radius: 0.25rem; }\n  .styles_card__2Taky > hr {\n    margin-right: 0;\n    margin-left: 0; }\n  .styles_card__2Taky > .styles_list-group__iLvSf:first-child .styles_list-group-item__3g0vw:first-child {\n    border-top-left-radius: 0.25rem;\n    border-top-right-radius: 0.25rem; }\n  .styles_card__2Taky > .styles_list-group__iLvSf:last-child .styles_list-group-item__3g0vw:last-child {\n    border-bottom-right-radius: 0.25rem;\n    border-bottom-left-radius: 0.25rem; }\n\n.styles_card-body__2m7uQ {\n  flex: 1 1 auto;\n  min-height: 1px;\n  padding: 1.25rem; }\n\n.styles_card-title__3aSbF {\n  margin-bottom: 0.75rem; }\n\n.styles_card-subtitle__1o0ym {\n  margin-top: -0.375rem;\n  margin-bottom: 0; }\n\n.styles_card-text__1sDXj:last-child {\n  margin-bottom: 0; }\n\n.styles_card-link__K-GZu:hover {\n  text-decoration: none; }\n\n.styles_card-link__K-GZu + .styles_card-link__K-GZu {\n  margin-left: 1.25rem; }\n\n.styles_card-header__KxaZ5 {\n  padding: 0.75rem 1.25rem;\n  margin-bottom: 0;\n  background-color: rgba(0, 0, 0, 0.03);\n  border-bottom: 1px solid rgba(0, 0, 0, 0.125); }\n  .styles_card-header__KxaZ5:first-child {\n    border-radius: calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0; }\n  .styles_card-header__KxaZ5 + .styles_list-group__iLvSf .styles_list-group-item__3g0vw:first-child {\n    border-top: 0; }\n\n.styles_card-footer__3i-Av {\n  padding: 0.75rem 1.25rem;\n  background-color: rgba(0, 0, 0, 0.03);\n  border-top: 1px solid rgba(0, 0, 0, 0.125); }\n  .styles_card-footer__3i-Av:last-child {\n    border-radius: 0 0 calc(0.25rem - 1px) calc(0.25rem - 1px); }\n\n.styles_card-header-tabs__1Yoj9 {\n  margin-right: -0.625rem;\n  margin-bottom: -0.75rem;\n  margin-left: -0.625rem;\n  border-bottom: 0; }\n\n.styles_card-header-pills__1x1tB {\n  margin-right: -0.625rem;\n  margin-left: -0.625rem; }\n\n.styles_card-img-overlay__3p0R5 {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  padding: 1.25rem; }\n\n.styles_card-img__3beAM,\n.styles_card-img-top__2Fc0Z,\n.styles_card-img-bottom__1eN5Y {\n  flex-shrink: 0;\n  width: 100%; }\n\n.styles_card-img__3beAM,\n.styles_card-img-top__2Fc0Z {\n  border-top-left-radius: calc(0.25rem - 1px);\n  border-top-right-radius: calc(0.25rem - 1px); }\n\n.styles_card-img__3beAM,\n.styles_card-img-bottom__1eN5Y {\n  border-bottom-right-radius: calc(0.25rem - 1px);\n  border-bottom-left-radius: calc(0.25rem - 1px); }\n\n.styles_card-deck__2lgDL .styles_card__2Taky {\n  margin-bottom: 15px; }\n\n@media (min-width: 576px) {\n  .styles_card-deck__2lgDL {\n    display: flex;\n    flex-flow: row wrap;\n    margin-right: -15px;\n    margin-left: -15px; }\n    .styles_card-deck__2lgDL .styles_card__2Taky {\n      flex: 1 0 0%;\n      margin-right: 15px;\n      margin-bottom: 0;\n      margin-left: 15px; } }\n\n.styles_card-group__298Ut > .styles_card__2Taky {\n  margin-bottom: 15px; }\n\n@media (min-width: 576px) {\n  .styles_card-group__298Ut {\n    display: flex;\n    flex-flow: row wrap; }\n    .styles_card-group__298Ut > .styles_card__2Taky {\n      flex: 1 0 0%;\n      margin-bottom: 0; }\n      .styles_card-group__298Ut > .styles_card__2Taky + .styles_card__2Taky {\n        margin-left: 0;\n        border-left: 0; }\n      .styles_card-group__298Ut > .styles_card__2Taky:not(:last-child) {\n        border-top-right-radius: 0;\n        border-bottom-right-radius: 0; }\n        .styles_card-group__298Ut > .styles_card__2Taky:not(:last-child) .styles_card-img-top__2Fc0Z,\n        .styles_card-group__298Ut > .styles_card__2Taky:not(:last-child) .styles_card-header__KxaZ5 {\n          border-top-right-radius: 0; }\n        .styles_card-group__298Ut > .styles_card__2Taky:not(:last-child) .styles_card-img-bottom__1eN5Y,\n        .styles_card-group__298Ut > .styles_card__2Taky:not(:last-child) .styles_card-footer__3i-Av {\n          border-bottom-right-radius: 0; }\n      .styles_card-group__298Ut > .styles_card__2Taky:not(:first-child) {\n        border-top-left-radius: 0;\n        border-bottom-left-radius: 0; }\n        .styles_card-group__298Ut > .styles_card__2Taky:not(:first-child) .styles_card-img-top__2Fc0Z,\n        .styles_card-group__298Ut > .styles_card__2Taky:not(:first-child) .styles_card-header__KxaZ5 {\n          border-top-left-radius: 0; }\n        .styles_card-group__298Ut > .styles_card__2Taky:not(:first-child) .styles_card-img-bottom__1eN5Y,\n        .styles_card-group__298Ut > .styles_card__2Taky:not(:first-child) .styles_card-footer__3i-Av {\n          border-bottom-left-radius: 0; } }\n\n.styles_card-columns__3Bzs7 .styles_card__2Taky {\n  margin-bottom: 0.75rem; }\n\n@media (min-width: 576px) {\n  .styles_card-columns__3Bzs7 {\n    column-count: 3;\n    column-gap: 1.25rem;\n    orphans: 1;\n    widows: 1; }\n    .styles_card-columns__3Bzs7 .styles_card__2Taky {\n      display: inline-block;\n      width: 100%; } }\n\n.styles_accordion__mHEV2 > .styles_card__2Taky {\n  overflow: hidden; }\n  .styles_accordion__mHEV2 > .styles_card__2Taky:not(:last-of-type) {\n    border-bottom: 0;\n    border-bottom-right-radius: 0;\n    border-bottom-left-radius: 0; }\n  .styles_accordion__mHEV2 > .styles_card__2Taky:not(:first-of-type) {\n    border-top-left-radius: 0;\n    border-top-right-radius: 0; }\n  .styles_accordion__mHEV2 > .styles_card__2Taky > .styles_card-header__KxaZ5 {\n    border-radius: 0;\n    margin-bottom: -1px; }\n\n.styles_breadcrumb__17RJH {\n  display: flex;\n  flex-wrap: wrap;\n  padding: 0.75rem 1rem;\n  margin-bottom: 1rem;\n  list-style: none;\n  background-color: #e9ecef;\n  border-radius: 0.25rem; }\n\n.styles_breadcrumb-item__2Jfxk + .styles_breadcrumb-item__2Jfxk {\n  padding-left: 0.5rem; }\n  .styles_breadcrumb-item__2Jfxk + .styles_breadcrumb-item__2Jfxk::before {\n    display: inline-block;\n    padding-right: 0.5rem;\n    color: #6c757d;\n    content: \"/\"; }\n\n.styles_breadcrumb-item__2Jfxk + .styles_breadcrumb-item__2Jfxk:hover::before {\n  text-decoration: underline; }\n\n.styles_breadcrumb-item__2Jfxk + .styles_breadcrumb-item__2Jfxk:hover::before {\n  text-decoration: none; }\n\n.styles_breadcrumb-item__2Jfxk.styles_active__1jaJY {\n  color: #6c757d; }\n\n.styles_pagination__3ljMa {\n  display: flex;\n  padding-left: 0;\n  list-style: none;\n  border-radius: 0.25rem; }\n\n.styles_page-link__MES16 {\n  position: relative;\n  display: block;\n  padding: 0.5rem 0.75rem;\n  margin-left: -1px;\n  line-height: 1.25;\n  color: #007bff;\n  background-color: #fff;\n  border: 1px solid #dee2e6; }\n  .styles_page-link__MES16:hover {\n    z-index: 2;\n    color: #0056b3;\n    text-decoration: none;\n    background-color: #e9ecef;\n    border-color: #dee2e6; }\n  .styles_page-link__MES16:focus {\n    z-index: 3;\n    outline: 0;\n    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25); }\n\n.styles_page-item___ihUk:first-child .styles_page-link__MES16 {\n  margin-left: 0;\n  border-top-left-radius: 0.25rem;\n  border-bottom-left-radius: 0.25rem; }\n\n.styles_page-item___ihUk:last-child .styles_page-link__MES16 {\n  border-top-right-radius: 0.25rem;\n  border-bottom-right-radius: 0.25rem; }\n\n.styles_page-item___ihUk.styles_active__1jaJY .styles_page-link__MES16 {\n  z-index: 3;\n  color: #fff;\n  background-color: #007bff;\n  border-color: #007bff; }\n\n.styles_page-item___ihUk.styles_disabled__bNrPz .styles_page-link__MES16 {\n  color: #6c757d;\n  pointer-events: none;\n  cursor: auto;\n  background-color: #fff;\n  border-color: #dee2e6; }\n\n.styles_pagination-lg__30WMP .styles_page-link__MES16 {\n  padding: 0.75rem 1.5rem;\n  font-size: 1.25rem;\n  line-height: 1.5; }\n\n.styles_pagination-lg__30WMP .styles_page-item___ihUk:first-child .styles_page-link__MES16 {\n  border-top-left-radius: 0.3rem;\n  border-bottom-left-radius: 0.3rem; }\n\n.styles_pagination-lg__30WMP .styles_page-item___ihUk:last-child .styles_page-link__MES16 {\n  border-top-right-radius: 0.3rem;\n  border-bottom-right-radius: 0.3rem; }\n\n.styles_pagination-sm__1KUMP .styles_page-link__MES16 {\n  padding: 0.25rem 0.5rem;\n  font-size: 0.875rem;\n  line-height: 1.5; }\n\n.styles_pagination-sm__1KUMP .styles_page-item___ihUk:first-child .styles_page-link__MES16 {\n  border-top-left-radius: 0.2rem;\n  border-bottom-left-radius: 0.2rem; }\n\n.styles_pagination-sm__1KUMP .styles_page-item___ihUk:last-child .styles_page-link__MES16 {\n  border-top-right-radius: 0.2rem;\n  border-bottom-right-radius: 0.2rem; }\n\n.styles_badge__16ezc {\n  display: inline-block;\n  padding: 0.25em 0.4em;\n  font-size: 75%;\n  font-weight: 700;\n  line-height: 1;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: baseline;\n  border-radius: 0.25rem;\n  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out; }\n  @media (prefers-reduced-motion: reduce) {\n    .styles_badge__16ezc {\n      transition: none; } }\n  a.styles_badge__16ezc:hover, a.styles_badge__16ezc:focus {\n    text-decoration: none; }\n  .styles_badge__16ezc:empty {\n    display: none; }\n\n.styles_btn__34YFe .styles_badge__16ezc {\n  position: relative;\n  top: -1px; }\n\n.styles_badge-pill__2cBCG {\n  padding-right: 0.6em;\n  padding-left: 0.6em;\n  border-radius: 10rem; }\n\n.styles_badge-primary__3wAor {\n  color: #fff;\n  background-color: #007bff; }\n  a.styles_badge-primary__3wAor:hover, a.styles_badge-primary__3wAor:focus {\n    color: #fff;\n    background-color: #0062cc; }\n  a.styles_badge-primary__3wAor:focus, a.styles_badge-primary__3wAor.styles_focus__283Cs {\n    outline: 0;\n    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5); }\n\n.styles_badge-secondary__U6vcz {\n  color: #fff;\n  background-color: #6c757d; }\n  a.styles_badge-secondary__U6vcz:hover, a.styles_badge-secondary__U6vcz:focus {\n    color: #fff;\n    background-color: #545b62; }\n  a.styles_badge-secondary__U6vcz:focus, a.styles_badge-secondary__U6vcz.styles_focus__283Cs {\n    outline: 0;\n    box-shadow: 0 0 0 0.2rem rgba(108, 117, 125, 0.5); }\n\n.styles_badge-success__3zCFd {\n  color: #fff;\n  background-color: #28a745; }\n  a.styles_badge-success__3zCFd:hover, a.styles_badge-success__3zCFd:focus {\n    color: #fff;\n    background-color: #1e7e34; }\n  a.styles_badge-success__3zCFd:focus, a.styles_badge-success__3zCFd.styles_focus__283Cs {\n    outline: 0;\n    box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.5); }\n\n.styles_badge-info__1P4Lw {\n  color: #fff;\n  background-color: #17a2b8; }\n  a.styles_badge-info__1P4Lw:hover, a.styles_badge-info__1P4Lw:focus {\n    color: #fff;\n    background-color: #117a8b; }\n  a.styles_badge-info__1P4Lw:focus, a.styles_badge-info__1P4Lw.styles_focus__283Cs {\n    outline: 0;\n    box-shadow: 0 0 0 0.2rem rgba(23, 162, 184, 0.5); }\n\n.styles_badge-warning__2iElb {\n  color: #212529;\n  background-color: #ffc107; }\n  a.styles_badge-warning__2iElb:hover, a.styles_badge-warning__2iElb:focus {\n    color: #212529;\n    background-color: #d39e00; }\n  a.styles_badge-warning__2iElb:focus, a.styles_badge-warning__2iElb.styles_focus__283Cs {\n    outline: 0;\n    box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.5); }\n\n.styles_badge-danger__-yjMf {\n  color: #fff;\n  background-color: #dc3545; }\n  a.styles_badge-danger__-yjMf:hover, a.styles_badge-danger__-yjMf:focus {\n    color: #fff;\n    background-color: #bd2130; }\n  a.styles_badge-danger__-yjMf:focus, a.styles_badge-danger__-yjMf.styles_focus__283Cs {\n    outline: 0;\n    box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.5); }\n\n.styles_badge-light__2ssLW {\n  color: #212529;\n  background-color: #f8f9fa; }\n  a.styles_badge-light__2ssLW:hover, a.styles_badge-light__2ssLW:focus {\n    color: #212529;\n    background-color: #dae0e5; }\n  a.styles_badge-light__2ssLW:focus, a.styles_badge-light__2ssLW.styles_focus__283Cs {\n    outline: 0;\n    box-shadow: 0 0 0 0.2rem rgba(248, 249, 250, 0.5); }\n\n.styles_badge-dark__2S8GL {\n  color: #fff;\n  background-color: #343a40; }\n  a.styles_badge-dark__2S8GL:hover, a.styles_badge-dark__2S8GL:focus {\n    color: #fff;\n    background-color: #1d2124; }\n  a.styles_badge-dark__2S8GL:focus, a.styles_badge-dark__2S8GL.styles_focus__283Cs {\n    outline: 0;\n    box-shadow: 0 0 0 0.2rem rgba(52, 58, 64, 0.5); }\n\n.styles_jumbotron__3YjvN {\n  padding: 2rem 1rem;\n  margin-bottom: 2rem;\n  background-color: #e9ecef;\n  border-radius: 0.3rem; }\n  @media (min-width: 576px) {\n    .styles_jumbotron__3YjvN {\n      padding: 4rem 2rem; } }\n\n.styles_jumbotron-fluid__3NhMd {\n  padding-right: 0;\n  padding-left: 0;\n  border-radius: 0; }\n\n.styles_alert__34jal {\n  position: relative;\n  padding: 0.75rem 1.25rem;\n  margin-bottom: 1rem;\n  border: 1px solid transparent;\n  border-radius: 0.25rem; }\n\n.styles_alert-heading__tVtPM {\n  color: inherit; }\n\n.styles_alert-link__tePyQ {\n  font-weight: 700; }\n\n.styles_alert-dismissible__1J4Bc {\n  padding-right: 4rem; }\n  .styles_alert-dismissible__1J4Bc .styles_close__jdMQl {\n    position: absolute;\n    top: 0;\n    right: 0;\n    padding: 0.75rem 1.25rem;\n    color: inherit; }\n\n.styles_alert-primary__2hKsp {\n  color: #004085;\n  background-color: #cce5ff;\n  border-color: #b8daff; }\n  .styles_alert-primary__2hKsp hr {\n    border-top-color: #9fcdff; }\n  .styles_alert-primary__2hKsp .styles_alert-link__tePyQ {\n    color: #002752; }\n\n.styles_alert-secondary__WM2rf {\n  color: #383d41;\n  background-color: #e2e3e5;\n  border-color: #d6d8db; }\n  .styles_alert-secondary__WM2rf hr {\n    border-top-color: #c8cbcf; }\n  .styles_alert-secondary__WM2rf .styles_alert-link__tePyQ {\n    color: #202326; }\n\n.styles_alert-success__1N1Sp {\n  color: #155724;\n  background-color: #d4edda;\n  border-color: #c3e6cb; }\n  .styles_alert-success__1N1Sp hr {\n    border-top-color: #b1dfbb; }\n  .styles_alert-success__1N1Sp .styles_alert-link__tePyQ {\n    color: #0b2e13; }\n\n.styles_alert-info__A1x51 {\n  color: #0c5460;\n  background-color: #d1ecf1;\n  border-color: #bee5eb; }\n  .styles_alert-info__A1x51 hr {\n    border-top-color: #abdde5; }\n  .styles_alert-info__A1x51 .styles_alert-link__tePyQ {\n    color: #062c33; }\n\n.styles_alert-warning__32sSY {\n  color: #856404;\n  background-color: #fff3cd;\n  border-color: #ffeeba; }\n  .styles_alert-warning__32sSY hr {\n    border-top-color: #ffe8a1; }\n  .styles_alert-warning__32sSY .styles_alert-link__tePyQ {\n    color: #533f03; }\n\n.styles_alert-danger__3RDAY {\n  color: #721c24;\n  background-color: #f8d7da;\n  border-color: #f5c6cb; }\n  .styles_alert-danger__3RDAY hr {\n    border-top-color: #f1b0b7; }\n  .styles_alert-danger__3RDAY .styles_alert-link__tePyQ {\n    color: #491217; }\n\n.styles_alert-light__365gF {\n  color: #818182;\n  background-color: #fefefe;\n  border-color: #fdfdfe; }\n  .styles_alert-light__365gF hr {\n    border-top-color: #ececf6; }\n  .styles_alert-light__365gF .styles_alert-link__tePyQ {\n    color: #686868; }\n\n.styles_alert-dark__3RwsM {\n  color: #1b1e21;\n  background-color: #d6d8d9;\n  border-color: #c6c8ca; }\n  .styles_alert-dark__3RwsM hr {\n    border-top-color: #b9bbbe; }\n  .styles_alert-dark__3RwsM .styles_alert-link__tePyQ {\n    color: #040505; }\n\n@keyframes styles_progress-bar-stripes__Hvvvt {\n  from {\n    background-position: 1rem 0; }\n  to {\n    background-position: 0 0; } }\n\n.styles_progress__mAcB_ {\n  display: flex;\n  height: 1rem;\n  overflow: hidden;\n  font-size: 0.75rem;\n  background-color: #e9ecef;\n  border-radius: 0.25rem; }\n\n.styles_progress-bar__2-CEJ {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  overflow: hidden;\n  color: #fff;\n  text-align: center;\n  white-space: nowrap;\n  background-color: #007bff;\n  transition: width 0.6s ease; }\n  @media (prefers-reduced-motion: reduce) {\n    .styles_progress-bar__2-CEJ {\n      transition: none; } }\n\n.styles_progress-bar-striped__18GPa {\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-size: 1rem 1rem; }\n\n.styles_progress-bar-animated__3PJ_R {\n  animation: styles_progress-bar-stripes__Hvvvt 1s linear infinite; }\n  @media (prefers-reduced-motion: reduce) {\n    .styles_progress-bar-animated__3PJ_R {\n      animation: none; } }\n\n.styles_media__1ir6D {\n  display: flex;\n  align-items: flex-start; }\n\n.styles_media-body__3Beru {\n  flex: 1; }\n\n.styles_list-group__iLvSf {\n  display: flex;\n  flex-direction: column;\n  padding-left: 0;\n  margin-bottom: 0; }\n\n.styles_list-group-item-action__1dorA {\n  width: 100%;\n  color: #495057;\n  text-align: inherit; }\n  .styles_list-group-item-action__1dorA:hover, .styles_list-group-item-action__1dorA:focus {\n    z-index: 1;\n    color: #495057;\n    text-decoration: none;\n    background-color: #f8f9fa; }\n  .styles_list-group-item-action__1dorA:active {\n    color: #212529;\n    background-color: #e9ecef; }\n\n.styles_list-group-item__3g0vw {\n  position: relative;\n  display: block;\n  padding: 0.75rem 1.25rem;\n  background-color: #fff;\n  border: 1px solid rgba(0, 0, 0, 0.125); }\n  .styles_list-group-item__3g0vw:first-child {\n    border-top-left-radius: 0.25rem;\n    border-top-right-radius: 0.25rem; }\n  .styles_list-group-item__3g0vw:last-child {\n    border-bottom-right-radius: 0.25rem;\n    border-bottom-left-radius: 0.25rem; }\n  .styles_list-group-item__3g0vw.styles_disabled__bNrPz, .styles_list-group-item__3g0vw:disabled {\n    color: #6c757d;\n    pointer-events: none;\n    background-color: #fff; }\n  .styles_list-group-item__3g0vw.styles_active__1jaJY {\n    z-index: 2;\n    color: #fff;\n    background-color: #007bff;\n    border-color: #007bff; }\n  .styles_list-group-item__3g0vw + .styles_list-group-item__3g0vw {\n    border-top-width: 0; }\n    .styles_list-group-item__3g0vw + .styles_list-group-item__3g0vw.styles_active__1jaJY {\n      margin-top: -1px;\n      border-top-width: 1px; }\n\n.styles_list-group-horizontal__3pTgy {\n  flex-direction: row; }\n  .styles_list-group-horizontal__3pTgy .styles_list-group-item__3g0vw:first-child {\n    border-bottom-left-radius: 0.25rem;\n    border-top-right-radius: 0; }\n  .styles_list-group-horizontal__3pTgy .styles_list-group-item__3g0vw:last-child {\n    border-top-right-radius: 0.25rem;\n    border-bottom-left-radius: 0; }\n  .styles_list-group-horizontal__3pTgy .styles_list-group-item__3g0vw.styles_active__1jaJY {\n    margin-top: 0; }\n  .styles_list-group-horizontal__3pTgy .styles_list-group-item__3g0vw + .styles_list-group-item__3g0vw {\n    border-top-width: 1px;\n    border-left-width: 0; }\n    .styles_list-group-horizontal__3pTgy .styles_list-group-item__3g0vw + .styles_list-group-item__3g0vw.styles_active__1jaJY {\n      margin-left: -1px;\n      border-left-width: 1px; }\n\n@media (min-width: 576px) {\n  .styles_list-group-horizontal-sm__2vEuZ {\n    flex-direction: row; }\n    .styles_list-group-horizontal-sm__2vEuZ .styles_list-group-item__3g0vw:first-child {\n      border-bottom-left-radius: 0.25rem;\n      border-top-right-radius: 0; }\n    .styles_list-group-horizontal-sm__2vEuZ .styles_list-group-item__3g0vw:last-child {\n      border-top-right-radius: 0.25rem;\n      border-bottom-left-radius: 0; }\n    .styles_list-group-horizontal-sm__2vEuZ .styles_list-group-item__3g0vw.styles_active__1jaJY {\n      margin-top: 0; }\n    .styles_list-group-horizontal-sm__2vEuZ .styles_list-group-item__3g0vw + .styles_list-group-item__3g0vw {\n      border-top-width: 1px;\n      border-left-width: 0; }\n      .styles_list-group-horizontal-sm__2vEuZ .styles_list-group-item__3g0vw + .styles_list-group-item__3g0vw.styles_active__1jaJY {\n        margin-left: -1px;\n        border-left-width: 1px; } }\n\n@media (min-width: 768px) {\n  .styles_list-group-horizontal-md__3beh0 {\n    flex-direction: row; }\n    .styles_list-group-horizontal-md__3beh0 .styles_list-group-item__3g0vw:first-child {\n      border-bottom-left-radius: 0.25rem;\n      border-top-right-radius: 0; }\n    .styles_list-group-horizontal-md__3beh0 .styles_list-group-item__3g0vw:last-child {\n      border-top-right-radius: 0.25rem;\n      border-bottom-left-radius: 0; }\n    .styles_list-group-horizontal-md__3beh0 .styles_list-group-item__3g0vw.styles_active__1jaJY {\n      margin-top: 0; }\n    .styles_list-group-horizontal-md__3beh0 .styles_list-group-item__3g0vw + .styles_list-group-item__3g0vw {\n      border-top-width: 1px;\n      border-left-width: 0; }\n      .styles_list-group-horizontal-md__3beh0 .styles_list-group-item__3g0vw + .styles_list-group-item__3g0vw.styles_active__1jaJY {\n        margin-left: -1px;\n        border-left-width: 1px; } }\n\n@media (min-width: 992px) {\n  .styles_list-group-horizontal-lg__3XOjn {\n    flex-direction: row; }\n    .styles_list-group-horizontal-lg__3XOjn .styles_list-group-item__3g0vw:first-child {\n      border-bottom-left-radius: 0.25rem;\n      border-top-right-radius: 0; }\n    .styles_list-group-horizontal-lg__3XOjn .styles_list-group-item__3g0vw:last-child {\n      border-top-right-radius: 0.25rem;\n      border-bottom-left-radius: 0; }\n    .styles_list-group-horizontal-lg__3XOjn .styles_list-group-item__3g0vw.styles_active__1jaJY {\n      margin-top: 0; }\n    .styles_list-group-horizontal-lg__3XOjn .styles_list-group-item__3g0vw + .styles_list-group-item__3g0vw {\n      border-top-width: 1px;\n      border-left-width: 0; }\n      .styles_list-group-horizontal-lg__3XOjn .styles_list-group-item__3g0vw + .styles_list-group-item__3g0vw.styles_active__1jaJY {\n        margin-left: -1px;\n        border-left-width: 1px; } }\n\n@media (min-width: 1200px) {\n  .styles_list-group-horizontal-xl__2Nk3w {\n    flex-direction: row; }\n    .styles_list-group-horizontal-xl__2Nk3w .styles_list-group-item__3g0vw:first-child {\n      border-bottom-left-radius: 0.25rem;\n      border-top-right-radius: 0; }\n    .styles_list-group-horizontal-xl__2Nk3w .styles_list-group-item__3g0vw:last-child {\n      border-top-right-radius: 0.25rem;\n      border-bottom-left-radius: 0; }\n    .styles_list-group-horizontal-xl__2Nk3w .styles_list-group-item__3g0vw.styles_active__1jaJY {\n      margin-top: 0; }\n    .styles_list-group-horizontal-xl__2Nk3w .styles_list-group-item__3g0vw + .styles_list-group-item__3g0vw {\n      border-top-width: 1px;\n      border-left-width: 0; }\n      .styles_list-group-horizontal-xl__2Nk3w .styles_list-group-item__3g0vw + .styles_list-group-item__3g0vw.styles_active__1jaJY {\n        margin-left: -1px;\n        border-left-width: 1px; } }\n\n.styles_list-group-flush__16ib7 .styles_list-group-item__3g0vw {\n  border-right-width: 0;\n  border-left-width: 0;\n  border-radius: 0; }\n  .styles_list-group-flush__16ib7 .styles_list-group-item__3g0vw:first-child {\n    border-top-width: 0; }\n\n.styles_list-group-flush__16ib7:last-child .styles_list-group-item__3g0vw:last-child {\n  border-bottom-width: 0; }\n\n.styles_list-group-item-primary__3D0Wm {\n  color: #004085;\n  background-color: #b8daff; }\n  .styles_list-group-item-primary__3D0Wm.styles_list-group-item-action__1dorA:hover, .styles_list-group-item-primary__3D0Wm.styles_list-group-item-action__1dorA:focus {\n    color: #004085;\n    background-color: #9fcdff; }\n  .styles_list-group-item-primary__3D0Wm.styles_list-group-item-action__1dorA.styles_active__1jaJY {\n    color: #fff;\n    background-color: #004085;\n    border-color: #004085; }\n\n.styles_list-group-item-secondary__32KKx {\n  color: #383d41;\n  background-color: #d6d8db; }\n  .styles_list-group-item-secondary__32KKx.styles_list-group-item-action__1dorA:hover, .styles_list-group-item-secondary__32KKx.styles_list-group-item-action__1dorA:focus {\n    color: #383d41;\n    background-color: #c8cbcf; }\n  .styles_list-group-item-secondary__32KKx.styles_list-group-item-action__1dorA.styles_active__1jaJY {\n    color: #fff;\n    background-color: #383d41;\n    border-color: #383d41; }\n\n.styles_list-group-item-success__1tTtd {\n  color: #155724;\n  background-color: #c3e6cb; }\n  .styles_list-group-item-success__1tTtd.styles_list-group-item-action__1dorA:hover, .styles_list-group-item-success__1tTtd.styles_list-group-item-action__1dorA:focus {\n    color: #155724;\n    background-color: #b1dfbb; }\n  .styles_list-group-item-success__1tTtd.styles_list-group-item-action__1dorA.styles_active__1jaJY {\n    color: #fff;\n    background-color: #155724;\n    border-color: #155724; }\n\n.styles_list-group-item-info__1u-ry {\n  color: #0c5460;\n  background-color: #bee5eb; }\n  .styles_list-group-item-info__1u-ry.styles_list-group-item-action__1dorA:hover, .styles_list-group-item-info__1u-ry.styles_list-group-item-action__1dorA:focus {\n    color: #0c5460;\n    background-color: #abdde5; }\n  .styles_list-group-item-info__1u-ry.styles_list-group-item-action__1dorA.styles_active__1jaJY {\n    color: #fff;\n    background-color: #0c5460;\n    border-color: #0c5460; }\n\n.styles_list-group-item-warning__PST-q {\n  color: #856404;\n  background-color: #ffeeba; }\n  .styles_list-group-item-warning__PST-q.styles_list-group-item-action__1dorA:hover, .styles_list-group-item-warning__PST-q.styles_list-group-item-action__1dorA:focus {\n    color: #856404;\n    background-color: #ffe8a1; }\n  .styles_list-group-item-warning__PST-q.styles_list-group-item-action__1dorA.styles_active__1jaJY {\n    color: #fff;\n    background-color: #856404;\n    border-color: #856404; }\n\n.styles_list-group-item-danger__K-hMN {\n  color: #721c24;\n  background-color: #f5c6cb; }\n  .styles_list-group-item-danger__K-hMN.styles_list-group-item-action__1dorA:hover, .styles_list-group-item-danger__K-hMN.styles_list-group-item-action__1dorA:focus {\n    color: #721c24;\n    background-color: #f1b0b7; }\n  .styles_list-group-item-danger__K-hMN.styles_list-group-item-action__1dorA.styles_active__1jaJY {\n    color: #fff;\n    background-color: #721c24;\n    border-color: #721c24; }\n\n.styles_list-group-item-light__3ERFY {\n  color: #818182;\n  background-color: #fdfdfe; }\n  .styles_list-group-item-light__3ERFY.styles_list-group-item-action__1dorA:hover, .styles_list-group-item-light__3ERFY.styles_list-group-item-action__1dorA:focus {\n    color: #818182;\n    background-color: #ececf6; }\n  .styles_list-group-item-light__3ERFY.styles_list-group-item-action__1dorA.styles_active__1jaJY {\n    color: #fff;\n    background-color: #818182;\n    border-color: #818182; }\n\n.styles_list-group-item-dark__3C2V2 {\n  color: #1b1e21;\n  background-color: #c6c8ca; }\n  .styles_list-group-item-dark__3C2V2.styles_list-group-item-action__1dorA:hover, .styles_list-group-item-dark__3C2V2.styles_list-group-item-action__1dorA:focus {\n    color: #1b1e21;\n    background-color: #b9bbbe; }\n  .styles_list-group-item-dark__3C2V2.styles_list-group-item-action__1dorA.styles_active__1jaJY {\n    color: #fff;\n    background-color: #1b1e21;\n    border-color: #1b1e21; }\n\n.styles_close__jdMQl {\n  float: right;\n  font-size: 1.5rem;\n  font-weight: 700;\n  line-height: 1;\n  color: #000;\n  text-shadow: 0 1px 0 #fff;\n  opacity: .5; }\n  .styles_close__jdMQl:hover {\n    color: #000;\n    text-decoration: none; }\n  .styles_close__jdMQl:not(:disabled):not(.styles_disabled__bNrPz):hover, .styles_close__jdMQl:not(:disabled):not(.styles_disabled__bNrPz):focus {\n    opacity: .75; }\n\nbutton.styles_close__jdMQl {\n  padding: 0;\n  background-color: transparent;\n  border: 0;\n  appearance: none; }\n\na.styles_close__jdMQl.styles_disabled__bNrPz {\n  pointer-events: none; }\n\n.styles_toast__uliFL {\n  max-width: 350px;\n  overflow: hidden;\n  font-size: 0.875rem;\n  background-color: rgba(255, 255, 255, 0.85);\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.1);\n  backdrop-filter: blur(10px);\n  opacity: 0;\n  border-radius: 0.25rem; }\n  .styles_toast__uliFL:not(:last-child) {\n    margin-bottom: 0.75rem; }\n  .styles_toast__uliFL.styles_showing__1_-uJ {\n    opacity: 1; }\n  .styles_toast__uliFL.styles_show__1YyhL {\n    display: block;\n    opacity: 1; }\n  .styles_toast__uliFL.styles_hide__2DiC5 {\n    display: none; }\n\n.styles_toast-header__8gqlZ {\n  display: flex;\n  align-items: center;\n  padding: 0.25rem 0.75rem;\n  color: #6c757d;\n  background-color: rgba(255, 255, 255, 0.85);\n  background-clip: padding-box;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05); }\n\n.styles_toast-body__d_CHm {\n  padding: 0.75rem; }\n\n.styles_modal-open__3DRf6 {\n  overflow: hidden; }\n  .styles_modal-open__3DRf6 .styles_modal__3lxdo {\n    overflow-x: hidden;\n    overflow-y: auto; }\n\n.styles_modal__3lxdo {\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 1050;\n  display: none;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  outline: 0; }\n\n.styles_modal-dialog__3pADI {\n  position: relative;\n  width: auto;\n  margin: 0.5rem;\n  pointer-events: none; }\n  .styles_modal__3lxdo.styles_fade__bJB3c .styles_modal-dialog__3pADI {\n    transition: transform 0.3s ease-out;\n    transform: translate(0, -50px); }\n    @media (prefers-reduced-motion: reduce) {\n      .styles_modal__3lxdo.styles_fade__bJB3c .styles_modal-dialog__3pADI {\n        transition: none; } }\n  .styles_modal__3lxdo.styles_show__1YyhL .styles_modal-dialog__3pADI {\n    transform: none; }\n  .styles_modal__3lxdo.styles_modal-static__1OGpY .styles_modal-dialog__3pADI {\n    transform: scale(1.02); }\n\n.styles_modal-dialog-scrollable__yXJQQ {\n  display: flex;\n  max-height: calc(100% - 1rem); }\n  .styles_modal-dialog-scrollable__yXJQQ .styles_modal-content__1p73o {\n    max-height: calc(100vh - 1rem);\n    overflow: hidden; }\n  .styles_modal-dialog-scrollable__yXJQQ .styles_modal-header__2CvHO,\n  .styles_modal-dialog-scrollable__yXJQQ .styles_modal-footer__1c_8R {\n    flex-shrink: 0; }\n  .styles_modal-dialog-scrollable__yXJQQ .styles_modal-body__1vUY9 {\n    overflow-y: auto; }\n\n.styles_modal-dialog-centered__1kldU {\n  display: flex;\n  align-items: center;\n  min-height: calc(100% - 1rem); }\n  .styles_modal-dialog-centered__1kldU::before {\n    display: block;\n    height: calc(100vh - 1rem);\n    content: \"\"; }\n  .styles_modal-dialog-centered__1kldU.styles_modal-dialog-scrollable__yXJQQ {\n    flex-direction: column;\n    justify-content: center;\n    height: 100%; }\n    .styles_modal-dialog-centered__1kldU.styles_modal-dialog-scrollable__yXJQQ .styles_modal-content__1p73o {\n      max-height: none; }\n    .styles_modal-dialog-centered__1kldU.styles_modal-dialog-scrollable__yXJQQ::before {\n      content: none; }\n\n.styles_modal-content__1p73o {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  pointer-events: auto;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border-radius: 0.3rem;\n  outline: 0; }\n\n.styles_modal-backdrop__2J4Vc {\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 1040;\n  width: 100vw;\n  height: 100vh;\n  background-color: #000; }\n  .styles_modal-backdrop__2J4Vc.styles_fade__bJB3c {\n    opacity: 0; }\n  .styles_modal-backdrop__2J4Vc.styles_show__1YyhL {\n    opacity: 0.5; }\n\n.styles_modal-header__2CvHO {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  padding: 1rem 1rem;\n  border-bottom: 1px solid #dee2e6;\n  border-top-left-radius: calc(0.3rem - 1px);\n  border-top-right-radius: calc(0.3rem - 1px); }\n  .styles_modal-header__2CvHO .styles_close__jdMQl {\n    padding: 1rem 1rem;\n    margin: -1rem -1rem -1rem auto; }\n\n.styles_modal-title__2mo9c {\n  margin-bottom: 0;\n  line-height: 1.5; }\n\n.styles_modal-body__1vUY9 {\n  position: relative;\n  flex: 1 1 auto;\n  padding: 1rem; }\n\n.styles_modal-footer__1c_8R {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  justify-content: flex-end;\n  padding: 0.75rem;\n  border-top: 1px solid #dee2e6;\n  border-bottom-right-radius: calc(0.3rem - 1px);\n  border-bottom-left-radius: calc(0.3rem - 1px); }\n  .styles_modal-footer__1c_8R > * {\n    margin: 0.25rem; }\n\n.styles_modal-scrollbar-measure__2aNOm {\n  position: absolute;\n  top: -9999px;\n  width: 50px;\n  height: 50px;\n  overflow: scroll; }\n\n@media (min-width: 576px) {\n  .styles_modal-dialog__3pADI {\n    max-width: 500px;\n    margin: 1.75rem auto; }\n  .styles_modal-dialog-scrollable__yXJQQ {\n    max-height: calc(100% - 3.5rem); }\n    .styles_modal-dialog-scrollable__yXJQQ .styles_modal-content__1p73o {\n      max-height: calc(100vh - 3.5rem); }\n  .styles_modal-dialog-centered__1kldU {\n    min-height: calc(100% - 3.5rem); }\n    .styles_modal-dialog-centered__1kldU::before {\n      height: calc(100vh - 3.5rem); }\n  .styles_modal-sm__zycOj {\n    max-width: 300px; } }\n\n@media (min-width: 992px) {\n  .styles_modal-lg__i585B,\n  .styles_modal-xl__37cnb {\n    max-width: 800px; } }\n\n@media (min-width: 1200px) {\n  .styles_modal-xl__37cnb {\n    max-width: 1140px; } }\n\n.styles_tooltip__aTFde {\n  position: absolute;\n  z-index: 1070;\n  display: block;\n  margin: 0;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\";\n  font-style: normal;\n  font-weight: 400;\n  line-height: 1.5;\n  text-align: left;\n  text-align: start;\n  text-decoration: none;\n  text-shadow: none;\n  text-transform: none;\n  letter-spacing: normal;\n  word-break: normal;\n  word-spacing: normal;\n  white-space: normal;\n  line-break: auto;\n  font-size: 0.875rem;\n  word-wrap: break-word;\n  opacity: 0; }\n  .styles_tooltip__aTFde.styles_show__1YyhL {\n    opacity: 0.9; }\n  .styles_tooltip__aTFde .styles_arrow__1y88- {\n    position: absolute;\n    display: block;\n    width: 0.8rem;\n    height: 0.4rem; }\n    .styles_tooltip__aTFde .styles_arrow__1y88-::before {\n      position: absolute;\n      content: \"\";\n      border-color: transparent;\n      border-style: solid; }\n\n.styles_bs-tooltip-top__W1BWj, .styles_bs-tooltip-auto__6qcrn[x-placement^=\"top\"] {\n  padding: 0.4rem 0; }\n  .styles_bs-tooltip-top__W1BWj .styles_arrow__1y88-, .styles_bs-tooltip-auto__6qcrn[x-placement^=\"top\"] .styles_arrow__1y88- {\n    bottom: 0; }\n    .styles_bs-tooltip-top__W1BWj .styles_arrow__1y88-::before, .styles_bs-tooltip-auto__6qcrn[x-placement^=\"top\"] .styles_arrow__1y88-::before {\n      top: 0;\n      border-width: 0.4rem 0.4rem 0;\n      border-top-color: #000; }\n\n.styles_bs-tooltip-right__RqPGg, .styles_bs-tooltip-auto__6qcrn[x-placement^=\"right\"] {\n  padding: 0 0.4rem; }\n  .styles_bs-tooltip-right__RqPGg .styles_arrow__1y88-, .styles_bs-tooltip-auto__6qcrn[x-placement^=\"right\"] .styles_arrow__1y88- {\n    left: 0;\n    width: 0.4rem;\n    height: 0.8rem; }\n    .styles_bs-tooltip-right__RqPGg .styles_arrow__1y88-::before, .styles_bs-tooltip-auto__6qcrn[x-placement^=\"right\"] .styles_arrow__1y88-::before {\n      right: 0;\n      border-width: 0.4rem 0.4rem 0.4rem 0;\n      border-right-color: #000; }\n\n.styles_bs-tooltip-bottom__s9dx1, .styles_bs-tooltip-auto__6qcrn[x-placement^=\"bottom\"] {\n  padding: 0.4rem 0; }\n  .styles_bs-tooltip-bottom__s9dx1 .styles_arrow__1y88-, .styles_bs-tooltip-auto__6qcrn[x-placement^=\"bottom\"] .styles_arrow__1y88- {\n    top: 0; }\n    .styles_bs-tooltip-bottom__s9dx1 .styles_arrow__1y88-::before, .styles_bs-tooltip-auto__6qcrn[x-placement^=\"bottom\"] .styles_arrow__1y88-::before {\n      bottom: 0;\n      border-width: 0 0.4rem 0.4rem;\n      border-bottom-color: #000; }\n\n.styles_bs-tooltip-left__3uACa, .styles_bs-tooltip-auto__6qcrn[x-placement^=\"left\"] {\n  padding: 0 0.4rem; }\n  .styles_bs-tooltip-left__3uACa .styles_arrow__1y88-, .styles_bs-tooltip-auto__6qcrn[x-placement^=\"left\"] .styles_arrow__1y88- {\n    right: 0;\n    width: 0.4rem;\n    height: 0.8rem; }\n    .styles_bs-tooltip-left__3uACa .styles_arrow__1y88-::before, .styles_bs-tooltip-auto__6qcrn[x-placement^=\"left\"] .styles_arrow__1y88-::before {\n      left: 0;\n      border-width: 0.4rem 0 0.4rem 0.4rem;\n      border-left-color: #000; }\n\n.styles_tooltip-inner__vWUXe {\n  max-width: 200px;\n  padding: 0.25rem 0.5rem;\n  color: #fff;\n  text-align: center;\n  background-color: #000;\n  border-radius: 0.25rem; }\n\n.styles_popover__yJQaR {\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 1060;\n  display: block;\n  max-width: 276px;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\";\n  font-style: normal;\n  font-weight: 400;\n  line-height: 1.5;\n  text-align: left;\n  text-align: start;\n  text-decoration: none;\n  text-shadow: none;\n  text-transform: none;\n  letter-spacing: normal;\n  word-break: normal;\n  word-spacing: normal;\n  white-space: normal;\n  line-break: auto;\n  font-size: 0.875rem;\n  word-wrap: break-word;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border-radius: 0.3rem; }\n  .styles_popover__yJQaR .styles_arrow__1y88- {\n    position: absolute;\n    display: block;\n    width: 1rem;\n    height: 0.5rem;\n    margin: 0 0.3rem; }\n    .styles_popover__yJQaR .styles_arrow__1y88-::before, .styles_popover__yJQaR .styles_arrow__1y88-::after {\n      position: absolute;\n      display: block;\n      content: \"\";\n      border-color: transparent;\n      border-style: solid; }\n\n.styles_bs-popover-top__1jOJL, .styles_bs-popover-auto__333s0[x-placement^=\"top\"] {\n  margin-bottom: 0.5rem; }\n  .styles_bs-popover-top__1jOJL > .styles_arrow__1y88-, .styles_bs-popover-auto__333s0[x-placement^=\"top\"] > .styles_arrow__1y88- {\n    bottom: calc(-0.5rem - 1px); }\n    .styles_bs-popover-top__1jOJL > .styles_arrow__1y88-::before, .styles_bs-popover-auto__333s0[x-placement^=\"top\"] > .styles_arrow__1y88-::before {\n      bottom: 0;\n      border-width: 0.5rem 0.5rem 0;\n      border-top-color: rgba(0, 0, 0, 0.25); }\n    .styles_bs-popover-top__1jOJL > .styles_arrow__1y88-::after, .styles_bs-popover-auto__333s0[x-placement^=\"top\"] > .styles_arrow__1y88-::after {\n      bottom: 1px;\n      border-width: 0.5rem 0.5rem 0;\n      border-top-color: #fff; }\n\n.styles_bs-popover-right__2IHZV, .styles_bs-popover-auto__333s0[x-placement^=\"right\"] {\n  margin-left: 0.5rem; }\n  .styles_bs-popover-right__2IHZV > .styles_arrow__1y88-, .styles_bs-popover-auto__333s0[x-placement^=\"right\"] > .styles_arrow__1y88- {\n    left: calc(-0.5rem - 1px);\n    width: 0.5rem;\n    height: 1rem;\n    margin: 0.3rem 0; }\n    .styles_bs-popover-right__2IHZV > .styles_arrow__1y88-::before, .styles_bs-popover-auto__333s0[x-placement^=\"right\"] > .styles_arrow__1y88-::before {\n      left: 0;\n      border-width: 0.5rem 0.5rem 0.5rem 0;\n      border-right-color: rgba(0, 0, 0, 0.25); }\n    .styles_bs-popover-right__2IHZV > .styles_arrow__1y88-::after, .styles_bs-popover-auto__333s0[x-placement^=\"right\"] > .styles_arrow__1y88-::after {\n      left: 1px;\n      border-width: 0.5rem 0.5rem 0.5rem 0;\n      border-right-color: #fff; }\n\n.styles_bs-popover-bottom__2xkAu, .styles_bs-popover-auto__333s0[x-placement^=\"bottom\"] {\n  margin-top: 0.5rem; }\n  .styles_bs-popover-bottom__2xkAu > .styles_arrow__1y88-, .styles_bs-popover-auto__333s0[x-placement^=\"bottom\"] > .styles_arrow__1y88- {\n    top: calc(-0.5rem - 1px); }\n    .styles_bs-popover-bottom__2xkAu > .styles_arrow__1y88-::before, .styles_bs-popover-auto__333s0[x-placement^=\"bottom\"] > .styles_arrow__1y88-::before {\n      top: 0;\n      border-width: 0 0.5rem 0.5rem 0.5rem;\n      border-bottom-color: rgba(0, 0, 0, 0.25); }\n    .styles_bs-popover-bottom__2xkAu > .styles_arrow__1y88-::after, .styles_bs-popover-auto__333s0[x-placement^=\"bottom\"] > .styles_arrow__1y88-::after {\n      top: 1px;\n      border-width: 0 0.5rem 0.5rem 0.5rem;\n      border-bottom-color: #fff; }\n  .styles_bs-popover-bottom__2xkAu .styles_popover-header__26CVG::before, .styles_bs-popover-auto__333s0[x-placement^=\"bottom\"] .styles_popover-header__26CVG::before {\n    position: absolute;\n    top: 0;\n    left: 50%;\n    display: block;\n    width: 1rem;\n    margin-left: -0.5rem;\n    content: \"\";\n    border-bottom: 1px solid #f7f7f7; }\n\n.styles_bs-popover-left__2dYBv, .styles_bs-popover-auto__333s0[x-placement^=\"left\"] {\n  margin-right: 0.5rem; }\n  .styles_bs-popover-left__2dYBv > .styles_arrow__1y88-, .styles_bs-popover-auto__333s0[x-placement^=\"left\"] > .styles_arrow__1y88- {\n    right: calc(-0.5rem - 1px);\n    width: 0.5rem;\n    height: 1rem;\n    margin: 0.3rem 0; }\n    .styles_bs-popover-left__2dYBv > .styles_arrow__1y88-::before, .styles_bs-popover-auto__333s0[x-placement^=\"left\"] > .styles_arrow__1y88-::before {\n      right: 0;\n      border-width: 0.5rem 0 0.5rem 0.5rem;\n      border-left-color: rgba(0, 0, 0, 0.25); }\n    .styles_bs-popover-left__2dYBv > .styles_arrow__1y88-::after, .styles_bs-popover-auto__333s0[x-placement^=\"left\"] > .styles_arrow__1y88-::after {\n      right: 1px;\n      border-width: 0.5rem 0 0.5rem 0.5rem;\n      border-left-color: #fff; }\n\n.styles_popover-header__26CVG {\n  padding: 0.5rem 0.75rem;\n  margin-bottom: 0;\n  font-size: 1rem;\n  background-color: #f7f7f7;\n  border-bottom: 1px solid #ebebeb;\n  border-top-left-radius: calc(0.3rem - 1px);\n  border-top-right-radius: calc(0.3rem - 1px); }\n  .styles_popover-header__26CVG:empty {\n    display: none; }\n\n.styles_popover-body__XagjH {\n  padding: 0.5rem 0.75rem;\n  color: #212529; }\n\n.styles_carousel__366Y8 {\n  position: relative; }\n\n.styles_carousel__366Y8.styles_pointer-event__6TqXF {\n  touch-action: pan-y; }\n\n.styles_carousel-inner__1P-Xg {\n  position: relative;\n  width: 100%;\n  overflow: hidden; }\n  .styles_carousel-inner__1P-Xg::after {\n    display: block;\n    clear: both;\n    content: \"\"; }\n\n.styles_carousel-item__zzjVb {\n  position: relative;\n  display: none;\n  float: left;\n  width: 100%;\n  margin-right: -100%;\n  backface-visibility: hidden;\n  transition: transform 0.6s ease-in-out; }\n  @media (prefers-reduced-motion: reduce) {\n    .styles_carousel-item__zzjVb {\n      transition: none; } }\n\n.styles_carousel-item__zzjVb.styles_active__1jaJY,\n.styles_carousel-item-next__3tEs3,\n.styles_carousel-item-prev__1ZM5L {\n  display: block; }\n\n.styles_carousel-item-next__3tEs3:not(.styles_carousel-item-left__2QDO0),\n.styles_active__1jaJY.styles_carousel-item-right__1Nxz0 {\n  transform: translateX(100%); }\n\n.styles_carousel-item-prev__1ZM5L:not(.styles_carousel-item-right__1Nxz0),\n.styles_active__1jaJY.styles_carousel-item-left__2QDO0 {\n  transform: translateX(-100%); }\n\n.styles_carousel-fade__1iPnC .styles_carousel-item__zzjVb {\n  opacity: 0;\n  transition-property: opacity;\n  transform: none; }\n\n.styles_carousel-fade__1iPnC .styles_carousel-item__zzjVb.styles_active__1jaJY,\n.styles_carousel-fade__1iPnC .styles_carousel-item-next__3tEs3.styles_carousel-item-left__2QDO0,\n.styles_carousel-fade__1iPnC .styles_carousel-item-prev__1ZM5L.styles_carousel-item-right__1Nxz0 {\n  z-index: 1;\n  opacity: 1; }\n\n.styles_carousel-fade__1iPnC .styles_active__1jaJY.styles_carousel-item-left__2QDO0,\n.styles_carousel-fade__1iPnC .styles_active__1jaJY.styles_carousel-item-right__1Nxz0 {\n  z-index: 0;\n  opacity: 0;\n  transition: opacity 0s 0.6s; }\n  @media (prefers-reduced-motion: reduce) {\n    .styles_carousel-fade__1iPnC .styles_active__1jaJY.styles_carousel-item-left__2QDO0,\n    .styles_carousel-fade__1iPnC .styles_active__1jaJY.styles_carousel-item-right__1Nxz0 {\n      transition: none; } }\n\n.styles_carousel-control-prev__3tQS5,\n.styles_carousel-control-next__1On8L {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  z-index: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 15%;\n  color: #fff;\n  text-align: center;\n  opacity: 0.5;\n  transition: opacity 0.15s ease; }\n  @media (prefers-reduced-motion: reduce) {\n    .styles_carousel-control-prev__3tQS5,\n    .styles_carousel-control-next__1On8L {\n      transition: none; } }\n  .styles_carousel-control-prev__3tQS5:hover, .styles_carousel-control-prev__3tQS5:focus,\n  .styles_carousel-control-next__1On8L:hover,\n  .styles_carousel-control-next__1On8L:focus {\n    color: #fff;\n    text-decoration: none;\n    outline: 0;\n    opacity: 0.9; }\n\n.styles_carousel-control-prev__3tQS5 {\n  left: 0; }\n\n.styles_carousel-control-next__1On8L {\n  right: 0; }\n\n.styles_carousel-control-prev-icon__1ckRp,\n.styles_carousel-control-next-icon__1wdSP {\n  display: inline-block;\n  width: 20px;\n  height: 20px;\n  background: no-repeat 50% / 100% 100%; }\n\n.styles_carousel-control-prev-icon__1ckRp {\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath d='M5.25 0l-4 4 4 4 1.5-1.5L4.25 4l2.5-2.5L5.25 0z'/%3e%3c/svg%3e\"); }\n\n.styles_carousel-control-next-icon__1wdSP {\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath d='M2.75 0l-1.5 1.5L3.75 4l-2.5 2.5L2.75 8l4-4-4-4z'/%3e%3c/svg%3e\"); }\n\n.styles_carousel-indicators__3PAVU {\n  position: absolute;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 15;\n  display: flex;\n  justify-content: center;\n  padding-left: 0;\n  margin-right: 15%;\n  margin-left: 15%;\n  list-style: none; }\n  .styles_carousel-indicators__3PAVU li {\n    box-sizing: content-box;\n    flex: 0 1 auto;\n    width: 30px;\n    height: 3px;\n    margin-right: 3px;\n    margin-left: 3px;\n    text-indent: -999px;\n    cursor: pointer;\n    background-color: #fff;\n    background-clip: padding-box;\n    border-top: 10px solid transparent;\n    border-bottom: 10px solid transparent;\n    opacity: .5;\n    transition: opacity 0.6s ease; }\n    @media (prefers-reduced-motion: reduce) {\n      .styles_carousel-indicators__3PAVU li {\n        transition: none; } }\n  .styles_carousel-indicators__3PAVU .styles_active__1jaJY {\n    opacity: 1; }\n\n.styles_carousel-caption__znMnR {\n  position: absolute;\n  right: 15%;\n  bottom: 20px;\n  left: 15%;\n  z-index: 10;\n  padding-top: 20px;\n  padding-bottom: 20px;\n  color: #fff;\n  text-align: center; }\n\n@keyframes styles_spinner-border__bsrz5 {\n  to {\n    transform: rotate(360deg); } }\n\n.styles_spinner-border__bsrz5 {\n  display: inline-block;\n  width: 2rem;\n  height: 2rem;\n  vertical-align: text-bottom;\n  border: 0.25em solid currentColor;\n  border-right-color: transparent;\n  border-radius: 50%;\n  animation: styles_spinner-border__bsrz5 .75s linear infinite; }\n\n.styles_spinner-border-sm__145Zo {\n  width: 1rem;\n  height: 1rem;\n  border-width: 0.2em; }\n\n@keyframes styles_spinner-grow__j61UO {\n  0% {\n    transform: scale(0); }\n  50% {\n    opacity: 1; } }\n\n.styles_spinner-grow__j61UO {\n  display: inline-block;\n  width: 2rem;\n  height: 2rem;\n  vertical-align: text-bottom;\n  background-color: currentColor;\n  border-radius: 50%;\n  opacity: 0;\n  animation: styles_spinner-grow__j61UO .75s linear infinite; }\n\n.styles_spinner-grow-sm__1EcVE {\n  width: 1rem;\n  height: 1rem; }\n\n.styles_align-baseline__1HXf4 {\n  vertical-align: baseline !important; }\n\n.styles_align-top__2ND7d {\n  vertical-align: top !important; }\n\n.styles_align-middle__uZP4_ {\n  vertical-align: middle !important; }\n\n.styles_align-bottom__1HAPK {\n  vertical-align: bottom !important; }\n\n.styles_align-text-bottom__sP8qf {\n  vertical-align: text-bottom !important; }\n\n.styles_align-text-top__1FJ-G {\n  vertical-align: text-top !important; }\n\n.styles_bg-primary__2sjZX {\n  background-color: #007bff !important; }\n\na.styles_bg-primary__2sjZX:hover, a.styles_bg-primary__2sjZX:focus,\nbutton.styles_bg-primary__2sjZX:hover,\nbutton.styles_bg-primary__2sjZX:focus {\n  background-color: #0062cc !important; }\n\n.styles_bg-secondary__2uQei {\n  background-color: #6c757d !important; }\n\na.styles_bg-secondary__2uQei:hover, a.styles_bg-secondary__2uQei:focus,\nbutton.styles_bg-secondary__2uQei:hover,\nbutton.styles_bg-secondary__2uQei:focus {\n  background-color: #545b62 !important; }\n\n.styles_bg-success__3teD2 {\n  background-color: #28a745 !important; }\n\na.styles_bg-success__3teD2:hover, a.styles_bg-success__3teD2:focus,\nbutton.styles_bg-success__3teD2:hover,\nbutton.styles_bg-success__3teD2:focus {\n  background-color: #1e7e34 !important; }\n\n.styles_bg-info__2kIfA {\n  background-color: #17a2b8 !important; }\n\na.styles_bg-info__2kIfA:hover, a.styles_bg-info__2kIfA:focus,\nbutton.styles_bg-info__2kIfA:hover,\nbutton.styles_bg-info__2kIfA:focus {\n  background-color: #117a8b !important; }\n\n.styles_bg-warning__c6A5Y {\n  background-color: #ffc107 !important; }\n\na.styles_bg-warning__c6A5Y:hover, a.styles_bg-warning__c6A5Y:focus,\nbutton.styles_bg-warning__c6A5Y:hover,\nbutton.styles_bg-warning__c6A5Y:focus {\n  background-color: #d39e00 !important; }\n\n.styles_bg-danger__3oAXx {\n  background-color: #dc3545 !important; }\n\na.styles_bg-danger__3oAXx:hover, a.styles_bg-danger__3oAXx:focus,\nbutton.styles_bg-danger__3oAXx:hover,\nbutton.styles_bg-danger__3oAXx:focus {\n  background-color: #bd2130 !important; }\n\n.styles_bg-light__10p9N {\n  background-color: #f8f9fa !important; }\n\na.styles_bg-light__10p9N:hover, a.styles_bg-light__10p9N:focus,\nbutton.styles_bg-light__10p9N:hover,\nbutton.styles_bg-light__10p9N:focus {\n  background-color: #dae0e5 !important; }\n\n.styles_bg-dark__A7qEV {\n  background-color: #343a40 !important; }\n\na.styles_bg-dark__A7qEV:hover, a.styles_bg-dark__A7qEV:focus,\nbutton.styles_bg-dark__A7qEV:hover,\nbutton.styles_bg-dark__A7qEV:focus {\n  background-color: #1d2124 !important; }\n\n.styles_bg-white__1VKht {\n  background-color: #fff !important; }\n\n.styles_bg-transparent__kzihZ {\n  background-color: transparent !important; }\n\n.styles_border__15OYC {\n  border: 1px solid #dee2e6 !important; }\n\n.styles_border-top__2V1iO {\n  border-top: 1px solid #dee2e6 !important; }\n\n.styles_border-right__NaFP- {\n  border-right: 1px solid #dee2e6 !important; }\n\n.styles_border-bottom__X80LN {\n  border-bottom: 1px solid #dee2e6 !important; }\n\n.styles_border-left__1yCoS {\n  border-left: 1px solid #dee2e6 !important; }\n\n.styles_border-0__2RTe- {\n  border: 0 !important; }\n\n.styles_border-top-0__Zn7QS {\n  border-top: 0 !important; }\n\n.styles_border-right-0__2m_Ww {\n  border-right: 0 !important; }\n\n.styles_border-bottom-0__1HHdt {\n  border-bottom: 0 !important; }\n\n.styles_border-left-0__2sJpm {\n  border-left: 0 !important; }\n\n.styles_border-primary__G4hzV {\n  border-color: #007bff !important; }\n\n.styles_border-secondary__37a_F {\n  border-color: #6c757d !important; }\n\n.styles_border-success__3DfZY {\n  border-color: #28a745 !important; }\n\n.styles_border-info__zaMLA {\n  border-color: #17a2b8 !important; }\n\n.styles_border-warning__1GQpu {\n  border-color: #ffc107 !important; }\n\n.styles_border-danger__2nj0b {\n  border-color: #dc3545 !important; }\n\n.styles_border-light__2Gmzg {\n  border-color: #f8f9fa !important; }\n\n.styles_border-dark__FBigm {\n  border-color: #343a40 !important; }\n\n.styles_border-white__3W2qs {\n  border-color: #fff !important; }\n\n.styles_rounded-sm__9QtgE {\n  border-radius: 0.2rem !important; }\n\n.styles_rounded__1YZJ_ {\n  border-radius: 0.25rem !important; }\n\n.styles_rounded-top__3S6zE {\n  border-top-left-radius: 0.25rem !important;\n  border-top-right-radius: 0.25rem !important; }\n\n.styles_rounded-right__flOS8 {\n  border-top-right-radius: 0.25rem !important;\n  border-bottom-right-radius: 0.25rem !important; }\n\n.styles_rounded-bottom__3jOBz {\n  border-bottom-right-radius: 0.25rem !important;\n  border-bottom-left-radius: 0.25rem !important; }\n\n.styles_rounded-left__29hqI {\n  border-top-left-radius: 0.25rem !important;\n  border-bottom-left-radius: 0.25rem !important; }\n\n.styles_rounded-lg__3F5-5 {\n  border-radius: 0.3rem !important; }\n\n.styles_rounded-circle__RTtFg {\n  border-radius: 50% !important; }\n\n.styles_rounded-pill__2HiJR {\n  border-radius: 50rem !important; }\n\n.styles_rounded-0__u9GZc {\n  border-radius: 0 !important; }\n\n.styles_clearfix__2HPGn::after {\n  display: block;\n  clear: both;\n  content: \"\"; }\n\n.styles_d-none__27jER {\n  display: none !important; }\n\n.styles_d-inline__1jwda {\n  display: inline !important; }\n\n.styles_d-inline-block__1jZFM {\n  display: inline-block !important; }\n\n.styles_d-block__3_fVZ {\n  display: block !important; }\n\n.styles_d-table__ou33c {\n  display: table !important; }\n\n.styles_d-table-row__3H05K {\n  display: table-row !important; }\n\n.styles_d-table-cell__CZBwW {\n  display: table-cell !important; }\n\n.styles_d-flex__2Zp3O {\n  display: flex !important; }\n\n.styles_d-inline-flex__WMgWE {\n  display: inline-flex !important; }\n\n@media (min-width: 576px) {\n  .styles_d-sm-none__3Jzgm {\n    display: none !important; }\n  .styles_d-sm-inline__33Cdv {\n    display: inline !important; }\n  .styles_d-sm-inline-block__2jYsb {\n    display: inline-block !important; }\n  .styles_d-sm-block__yvzKo {\n    display: block !important; }\n  .styles_d-sm-table__1Brlb {\n    display: table !important; }\n  .styles_d-sm-table-row__vPPZ_ {\n    display: table-row !important; }\n  .styles_d-sm-table-cell__1IODZ {\n    display: table-cell !important; }\n  .styles_d-sm-flex__35sql {\n    display: flex !important; }\n  .styles_d-sm-inline-flex__gk-f3 {\n    display: inline-flex !important; } }\n\n@media (min-width: 768px) {\n  .styles_d-md-none__2UwO4 {\n    display: none !important; }\n  .styles_d-md-inline__4f9ZD {\n    display: inline !important; }\n  .styles_d-md-inline-block__3FOK0 {\n    display: inline-block !important; }\n  .styles_d-md-block__19IED {\n    display: block !important; }\n  .styles_d-md-table__cnBcX {\n    display: table !important; }\n  .styles_d-md-table-row__13YAG {\n    display: table-row !important; }\n  .styles_d-md-table-cell__3ug-a {\n    display: table-cell !important; }\n  .styles_d-md-flex__F9DYf {\n    display: flex !important; }\n  .styles_d-md-inline-flex__36dg3 {\n    display: inline-flex !important; } }\n\n@media (min-width: 992px) {\n  .styles_d-lg-none__zw5FH {\n    display: none !important; }\n  .styles_d-lg-inline__2TmeD {\n    display: inline !important; }\n  .styles_d-lg-inline-block__1IgAQ {\n    display: inline-block !important; }\n  .styles_d-lg-block__2Jhr6 {\n    display: block !important; }\n  .styles_d-lg-table__2HEVo {\n    display: table !important; }\n  .styles_d-lg-table-row__1V46I {\n    display: table-row !important; }\n  .styles_d-lg-table-cell__3l6Io {\n    display: table-cell !important; }\n  .styles_d-lg-flex__22rTq {\n    display: flex !important; }\n  .styles_d-lg-inline-flex__3KRCq {\n    display: inline-flex !important; } }\n\n@media (min-width: 1200px) {\n  .styles_d-xl-none__1hs0f {\n    display: none !important; }\n  .styles_d-xl-inline__3nMF0 {\n    display: inline !important; }\n  .styles_d-xl-inline-block__22dnE {\n    display: inline-block !important; }\n  .styles_d-xl-block__2RHho {\n    display: block !important; }\n  .styles_d-xl-table__BdyTZ {\n    display: table !important; }\n  .styles_d-xl-table-row__1emjA {\n    display: table-row !important; }\n  .styles_d-xl-table-cell__1oN0J {\n    display: table-cell !important; }\n  .styles_d-xl-flex__yMF4p {\n    display: flex !important; }\n  .styles_d-xl-inline-flex__4o04X {\n    display: inline-flex !important; } }\n\n@media print {\n  .styles_d-print-none__9gFBL {\n    display: none !important; }\n  .styles_d-print-inline__2zr9c {\n    display: inline !important; }\n  .styles_d-print-inline-block__3uUAM {\n    display: inline-block !important; }\n  .styles_d-print-block__3Zy-n {\n    display: block !important; }\n  .styles_d-print-table__1cXyi {\n    display: table !important; }\n  .styles_d-print-table-row__qHoj3 {\n    display: table-row !important; }\n  .styles_d-print-table-cell__1EYoC {\n    display: table-cell !important; }\n  .styles_d-print-flex__1ajS_ {\n    display: flex !important; }\n  .styles_d-print-inline-flex__1ls9B {\n    display: inline-flex !important; } }\n\n.styles_embed-responsive__jr66k {\n  position: relative;\n  display: block;\n  width: 100%;\n  padding: 0;\n  overflow: hidden; }\n  .styles_embed-responsive__jr66k::before {\n    display: block;\n    content: \"\"; }\n  .styles_embed-responsive__jr66k .styles_embed-responsive-item__3iqan,\n  .styles_embed-responsive__jr66k iframe,\n  .styles_embed-responsive__jr66k embed,\n  .styles_embed-responsive__jr66k object,\n  .styles_embed-responsive__jr66k video {\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    border: 0; }\n\n.styles_embed-responsive-21by9__2pzk2::before {\n  padding-top: 42.85714%; }\n\n.styles_embed-responsive-16by9__3ixYX::before {\n  padding-top: 56.25%; }\n\n.styles_embed-responsive-4by3__1TfdW::before {\n  padding-top: 75%; }\n\n.styles_embed-responsive-1by1__i0Olx::before {\n  padding-top: 100%; }\n\n.styles_flex-row__3OWn5 {\n  flex-direction: row !important; }\n\n.styles_flex-column__1wOeL {\n  flex-direction: column !important; }\n\n.styles_flex-row-reverse__2RLCD {\n  flex-direction: row-reverse !important; }\n\n.styles_flex-column-reverse__3r-MJ {\n  flex-direction: column-reverse !important; }\n\n.styles_flex-wrap__17vwx {\n  flex-wrap: wrap !important; }\n\n.styles_flex-nowrap__Vdt9E {\n  flex-wrap: nowrap !important; }\n\n.styles_flex-wrap-reverse__1PSgP {\n  flex-wrap: wrap-reverse !important; }\n\n.styles_flex-fill__2afwC {\n  flex: 1 1 auto !important; }\n\n.styles_flex-grow-0__3dV7s {\n  flex-grow: 0 !important; }\n\n.styles_flex-grow-1__2SZPB {\n  flex-grow: 1 !important; }\n\n.styles_flex-shrink-0__2jQT9 {\n  flex-shrink: 0 !important; }\n\n.styles_flex-shrink-1__2M2Rg {\n  flex-shrink: 1 !important; }\n\n.styles_justify-content-start__kvyHw {\n  justify-content: flex-start !important; }\n\n.styles_justify-content-end__2gynu {\n  justify-content: flex-end !important; }\n\n.styles_justify-content-center__1rH9h {\n  justify-content: center !important; }\n\n.styles_justify-content-between__mLGcz {\n  justify-content: space-between !important; }\n\n.styles_justify-content-around__1pUWF {\n  justify-content: space-around !important; }\n\n.styles_align-items-start__rNHsx {\n  align-items: flex-start !important; }\n\n.styles_align-items-end__6Ta-1 {\n  align-items: flex-end !important; }\n\n.styles_align-items-center__25BZh {\n  align-items: center !important; }\n\n.styles_align-items-baseline__pHwyR {\n  align-items: baseline !important; }\n\n.styles_align-items-stretch__2oaq7 {\n  align-items: stretch !important; }\n\n.styles_align-content-start__w45Ip {\n  align-content: flex-start !important; }\n\n.styles_align-content-end___Tr0y {\n  align-content: flex-end !important; }\n\n.styles_align-content-center__1jeUE {\n  align-content: center !important; }\n\n.styles_align-content-between__iJnL0 {\n  align-content: space-between !important; }\n\n.styles_align-content-around__1sdXI {\n  align-content: space-around !important; }\n\n.styles_align-content-stretch__mDApm {\n  align-content: stretch !important; }\n\n.styles_align-self-auto__2tgbN {\n  align-self: auto !important; }\n\n.styles_align-self-start__PZ_0j {\n  align-self: flex-start !important; }\n\n.styles_align-self-end__9rnR_ {\n  align-self: flex-end !important; }\n\n.styles_align-self-center__XIeOQ {\n  align-self: center !important; }\n\n.styles_align-self-baseline__TqkbR {\n  align-self: baseline !important; }\n\n.styles_align-self-stretch__k4S7U {\n  align-self: stretch !important; }\n\n@media (min-width: 576px) {\n  .styles_flex-sm-row__12LJI {\n    flex-direction: row !important; }\n  .styles_flex-sm-column__2HfMP {\n    flex-direction: column !important; }\n  .styles_flex-sm-row-reverse__2yiec {\n    flex-direction: row-reverse !important; }\n  .styles_flex-sm-column-reverse__3Miky {\n    flex-direction: column-reverse !important; }\n  .styles_flex-sm-wrap__3Yjj0 {\n    flex-wrap: wrap !important; }\n  .styles_flex-sm-nowrap__2WH4o {\n    flex-wrap: nowrap !important; }\n  .styles_flex-sm-wrap-reverse__ihi14 {\n    flex-wrap: wrap-reverse !important; }\n  .styles_flex-sm-fill__3Gh58 {\n    flex: 1 1 auto !important; }\n  .styles_flex-sm-grow-0__1wIBU {\n    flex-grow: 0 !important; }\n  .styles_flex-sm-grow-1__3EZwS {\n    flex-grow: 1 !important; }\n  .styles_flex-sm-shrink-0__15pU- {\n    flex-shrink: 0 !important; }\n  .styles_flex-sm-shrink-1__236Iw {\n    flex-shrink: 1 !important; }\n  .styles_justify-content-sm-start__35L7i {\n    justify-content: flex-start !important; }\n  .styles_justify-content-sm-end__jP9na {\n    justify-content: flex-end !important; }\n  .styles_justify-content-sm-center__Kj2XI {\n    justify-content: center !important; }\n  .styles_justify-content-sm-between__2XBNE {\n    justify-content: space-between !important; }\n  .styles_justify-content-sm-around__3ip6w {\n    justify-content: space-around !important; }\n  .styles_align-items-sm-start__1emev {\n    align-items: flex-start !important; }\n  .styles_align-items-sm-end__1fmau {\n    align-items: flex-end !important; }\n  .styles_align-items-sm-center__1BNgf {\n    align-items: center !important; }\n  .styles_align-items-sm-baseline__32LUa {\n    align-items: baseline !important; }\n  .styles_align-items-sm-stretch__3KUsX {\n    align-items: stretch !important; }\n  .styles_align-content-sm-start__2RP49 {\n    align-content: flex-start !important; }\n  .styles_align-content-sm-end__1V83u {\n    align-content: flex-end !important; }\n  .styles_align-content-sm-center__1GqyU {\n    align-content: center !important; }\n  .styles_align-content-sm-between__2rM4z {\n    align-content: space-between !important; }\n  .styles_align-content-sm-around__3n-pu {\n    align-content: space-around !important; }\n  .styles_align-content-sm-stretch__1tWZo {\n    align-content: stretch !important; }\n  .styles_align-self-sm-auto__3RlpO {\n    align-self: auto !important; }\n  .styles_align-self-sm-start__1CWOF {\n    align-self: flex-start !important; }\n  .styles_align-self-sm-end__3Iu3D {\n    align-self: flex-end !important; }\n  .styles_align-self-sm-center__3LWhK {\n    align-self: center !important; }\n  .styles_align-self-sm-baseline__1zLEV {\n    align-self: baseline !important; }\n  .styles_align-self-sm-stretch__2ZwF9 {\n    align-self: stretch !important; } }\n\n@media (min-width: 768px) {\n  .styles_flex-md-row__1bNMC {\n    flex-direction: row !important; }\n  .styles_flex-md-column__2z3-- {\n    flex-direction: column !important; }\n  .styles_flex-md-row-reverse__23xcm {\n    flex-direction: row-reverse !important; }\n  .styles_flex-md-column-reverse__f3pfF {\n    flex-direction: column-reverse !important; }\n  .styles_flex-md-wrap__1TxdL {\n    flex-wrap: wrap !important; }\n  .styles_flex-md-nowrap__icrAo {\n    flex-wrap: nowrap !important; }\n  .styles_flex-md-wrap-reverse__2zwJ1 {\n    flex-wrap: wrap-reverse !important; }\n  .styles_flex-md-fill__1fWMw {\n    flex: 1 1 auto !important; }\n  .styles_flex-md-grow-0__Zy_Vc {\n    flex-grow: 0 !important; }\n  .styles_flex-md-grow-1__27W4c {\n    flex-grow: 1 !important; }\n  .styles_flex-md-shrink-0__22L_G {\n    flex-shrink: 0 !important; }\n  .styles_flex-md-shrink-1__AqeE- {\n    flex-shrink: 1 !important; }\n  .styles_justify-content-md-start__1GSfF {\n    justify-content: flex-start !important; }\n  .styles_justify-content-md-end__DDoeO {\n    justify-content: flex-end !important; }\n  .styles_justify-content-md-center__gfPbd {\n    justify-content: center !important; }\n  .styles_justify-content-md-between__YOHve {\n    justify-content: space-between !important; }\n  .styles_justify-content-md-around__1aq1l {\n    justify-content: space-around !important; }\n  .styles_align-items-md-start__SBAXc {\n    align-items: flex-start !important; }\n  .styles_align-items-md-end__3lKBc {\n    align-items: flex-end !important; }\n  .styles_align-items-md-center__27Kn5 {\n    align-items: center !important; }\n  .styles_align-items-md-baseline__2sFoz {\n    align-items: baseline !important; }\n  .styles_align-items-md-stretch__1CBCz {\n    align-items: stretch !important; }\n  .styles_align-content-md-start__1DUEW {\n    align-content: flex-start !important; }\n  .styles_align-content-md-end__C9JcR {\n    align-content: flex-end !important; }\n  .styles_align-content-md-center__39OaS {\n    align-content: center !important; }\n  .styles_align-content-md-between__2vxvH {\n    align-content: space-between !important; }\n  .styles_align-content-md-around__1z6X_ {\n    align-content: space-around !important; }\n  .styles_align-content-md-stretch__hzQIi {\n    align-content: stretch !important; }\n  .styles_align-self-md-auto__3yFJz {\n    align-self: auto !important; }\n  .styles_align-self-md-start__2eZP2 {\n    align-self: flex-start !important; }\n  .styles_align-self-md-end__1Pauu {\n    align-self: flex-end !important; }\n  .styles_align-self-md-center__2a63u {\n    align-self: center !important; }\n  .styles_align-self-md-baseline__3zROk {\n    align-self: baseline !important; }\n  .styles_align-self-md-stretch__2guTt {\n    align-self: stretch !important; } }\n\n@media (min-width: 992px) {\n  .styles_flex-lg-row__2R0E0 {\n    flex-direction: row !important; }\n  .styles_flex-lg-column__1vITR {\n    flex-direction: column !important; }\n  .styles_flex-lg-row-reverse__2alS0 {\n    flex-direction: row-reverse !important; }\n  .styles_flex-lg-column-reverse__3hx6i {\n    flex-direction: column-reverse !important; }\n  .styles_flex-lg-wrap__S4uTi {\n    flex-wrap: wrap !important; }\n  .styles_flex-lg-nowrap__1hCDA {\n    flex-wrap: nowrap !important; }\n  .styles_flex-lg-wrap-reverse__3_wW7 {\n    flex-wrap: wrap-reverse !important; }\n  .styles_flex-lg-fill__3HlxU {\n    flex: 1 1 auto !important; }\n  .styles_flex-lg-grow-0__1GMCv {\n    flex-grow: 0 !important; }\n  .styles_flex-lg-grow-1__32D8A {\n    flex-grow: 1 !important; }\n  .styles_flex-lg-shrink-0__18uEj {\n    flex-shrink: 0 !important; }\n  .styles_flex-lg-shrink-1__37JoZ {\n    flex-shrink: 1 !important; }\n  .styles_justify-content-lg-start__mGfJ9 {\n    justify-content: flex-start !important; }\n  .styles_justify-content-lg-end__2C1k9 {\n    justify-content: flex-end !important; }\n  .styles_justify-content-lg-center__z6zxs {\n    justify-content: center !important; }\n  .styles_justify-content-lg-between__hpPPu {\n    justify-content: space-between !important; }\n  .styles_justify-content-lg-around__1us6B {\n    justify-content: space-around !important; }\n  .styles_align-items-lg-start__1LB7H {\n    align-items: flex-start !important; }\n  .styles_align-items-lg-end__2YW-P {\n    align-items: flex-end !important; }\n  .styles_align-items-lg-center__3JdBk {\n    align-items: center !important; }\n  .styles_align-items-lg-baseline__2p36J {\n    align-items: baseline !important; }\n  .styles_align-items-lg-stretch__2M2pw {\n    align-items: stretch !important; }\n  .styles_align-content-lg-start__1OIS- {\n    align-content: flex-start !important; }\n  .styles_align-content-lg-end__3c95W {\n    align-content: flex-end !important; }\n  .styles_align-content-lg-center__16Ubk {\n    align-content: center !important; }\n  .styles_align-content-lg-between__2rLxu {\n    align-content: space-between !important; }\n  .styles_align-content-lg-around__15F0b {\n    align-content: space-around !important; }\n  .styles_align-content-lg-stretch__1iORq {\n    align-content: stretch !important; }\n  .styles_align-self-lg-auto__2PBLE {\n    align-self: auto !important; }\n  .styles_align-self-lg-start__L9s5X {\n    align-self: flex-start !important; }\n  .styles_align-self-lg-end__1musq {\n    align-self: flex-end !important; }\n  .styles_align-self-lg-center__DeWj6 {\n    align-self: center !important; }\n  .styles_align-self-lg-baseline__1Uyb3 {\n    align-self: baseline !important; }\n  .styles_align-self-lg-stretch__3l9Cy {\n    align-self: stretch !important; } }\n\n@media (min-width: 1200px) {\n  .styles_flex-xl-row__247AM {\n    flex-direction: row !important; }\n  .styles_flex-xl-column__30PEV {\n    flex-direction: column !important; }\n  .styles_flex-xl-row-reverse__22adS {\n    flex-direction: row-reverse !important; }\n  .styles_flex-xl-column-reverse__3B8bx {\n    flex-direction: column-reverse !important; }\n  .styles_flex-xl-wrap__1O6I- {\n    flex-wrap: wrap !important; }\n  .styles_flex-xl-nowrap__WwS8q {\n    flex-wrap: nowrap !important; }\n  .styles_flex-xl-wrap-reverse__1hSEi {\n    flex-wrap: wrap-reverse !important; }\n  .styles_flex-xl-fill__1Fwtw {\n    flex: 1 1 auto !important; }\n  .styles_flex-xl-grow-0__3CRW8 {\n    flex-grow: 0 !important; }\n  .styles_flex-xl-grow-1__1HjoR {\n    flex-grow: 1 !important; }\n  .styles_flex-xl-shrink-0__1bBgS {\n    flex-shrink: 0 !important; }\n  .styles_flex-xl-shrink-1__2QSp3 {\n    flex-shrink: 1 !important; }\n  .styles_justify-content-xl-start__22up1 {\n    justify-content: flex-start !important; }\n  .styles_justify-content-xl-end__3_DeL {\n    justify-content: flex-end !important; }\n  .styles_justify-content-xl-center__1ClXg {\n    justify-content: center !important; }\n  .styles_justify-content-xl-between__3h-g7 {\n    justify-content: space-between !important; }\n  .styles_justify-content-xl-around__G0gUX {\n    justify-content: space-around !important; }\n  .styles_align-items-xl-start__1JII2 {\n    align-items: flex-start !important; }\n  .styles_align-items-xl-end__1jaaT {\n    align-items: flex-end !important; }\n  .styles_align-items-xl-center__2XYu8 {\n    align-items: center !important; }\n  .styles_align-items-xl-baseline__3I9m9 {\n    align-items: baseline !important; }\n  .styles_align-items-xl-stretch__IvVDP {\n    align-items: stretch !important; }\n  .styles_align-content-xl-start__1hHJN {\n    align-content: flex-start !important; }\n  .styles_align-content-xl-end__3MEm9 {\n    align-content: flex-end !important; }\n  .styles_align-content-xl-center__1NRiQ {\n    align-content: center !important; }\n  .styles_align-content-xl-between__1B6gt {\n    align-content: space-between !important; }\n  .styles_align-content-xl-around__4k46l {\n    align-content: space-around !important; }\n  .styles_align-content-xl-stretch__24ctv {\n    align-content: stretch !important; }\n  .styles_align-self-xl-auto__29Y8b {\n    align-self: auto !important; }\n  .styles_align-self-xl-start__bhGbC {\n    align-self: flex-start !important; }\n  .styles_align-self-xl-end__27z4p {\n    align-self: flex-end !important; }\n  .styles_align-self-xl-center__30Gus {\n    align-self: center !important; }\n  .styles_align-self-xl-baseline__1mlyF {\n    align-self: baseline !important; }\n  .styles_align-self-xl-stretch__3nWec {\n    align-self: stretch !important; } }\n\n.styles_float-left__1Oa5E {\n  float: left !important; }\n\n.styles_float-right__KEbMp {\n  float: right !important; }\n\n.styles_float-none__MIqKF {\n  float: none !important; }\n\n@media (min-width: 576px) {\n  .styles_float-sm-left__VCFYr {\n    float: left !important; }\n  .styles_float-sm-right__29z4N {\n    float: right !important; }\n  .styles_float-sm-none__1hcXC {\n    float: none !important; } }\n\n@media (min-width: 768px) {\n  .styles_float-md-left__1eD7Q {\n    float: left !important; }\n  .styles_float-md-right__2-ntc {\n    float: right !important; }\n  .styles_float-md-none__22wBZ {\n    float: none !important; } }\n\n@media (min-width: 992px) {\n  .styles_float-lg-left__2ytik {\n    float: left !important; }\n  .styles_float-lg-right__1eLpV {\n    float: right !important; }\n  .styles_float-lg-none__18K1F {\n    float: none !important; } }\n\n@media (min-width: 1200px) {\n  .styles_float-xl-left__1Bes7 {\n    float: left !important; }\n  .styles_float-xl-right__gVhqe {\n    float: right !important; }\n  .styles_float-xl-none__1NdZL {\n    float: none !important; } }\n\n.styles_overflow-auto___rgjB {\n  overflow: auto !important; }\n\n.styles_overflow-hidden__3P2Nr {\n  overflow: hidden !important; }\n\n.styles_position-static__1pFuu {\n  position: static !important; }\n\n.styles_position-relative__2Z0SY {\n  position: relative !important; }\n\n.styles_position-absolute__355Nr {\n  position: absolute !important; }\n\n.styles_position-fixed__2Jdjq {\n  position: fixed !important; }\n\n.styles_position-sticky__1dVZu {\n  position: sticky !important; }\n\n.styles_fixed-top__2SNyq {\n  position: fixed;\n  top: 0;\n  right: 0;\n  left: 0;\n  z-index: 1030; }\n\n.styles_fixed-bottom__-aKmB {\n  position: fixed;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1030; }\n\n@supports (position: sticky) {\n  .styles_sticky-top__2opcj {\n    position: sticky;\n    top: 0;\n    z-index: 1020; } }\n\n.styles_sr-only__2X1gF {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border: 0; }\n\n.styles_sr-only-focusable__1pE0k:active, .styles_sr-only-focusable__1pE0k:focus {\n  position: static;\n  width: auto;\n  height: auto;\n  overflow: visible;\n  clip: auto;\n  white-space: normal; }\n\n.styles_shadow-sm__J0s_w {\n  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important; }\n\n.styles_shadow__1MU3p {\n  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important; }\n\n.styles_shadow-lg__3R_j- {\n  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important; }\n\n.styles_shadow-none__2qrV5 {\n  box-shadow: none !important; }\n\n.styles_w-25__1KvmN {\n  width: 25% !important; }\n\n.styles_w-50__2AaMt {\n  width: 50% !important; }\n\n.styles_w-75__3PtzF {\n  width: 75% !important; }\n\n.styles_w-100__2vPua {\n  width: 100% !important; }\n\n.styles_w-auto__11pqL {\n  width: auto !important; }\n\n.styles_h-25__2R3mL {\n  height: 25% !important; }\n\n.styles_h-50__1mum_ {\n  height: 50% !important; }\n\n.styles_h-75__2k0oK {\n  height: 75% !important; }\n\n.styles_h-100__1HYlr {\n  height: 100% !important; }\n\n.styles_h-auto__2Y8Oo {\n  height: auto !important; }\n\n.styles_mw-100__25jTv {\n  max-width: 100% !important; }\n\n.styles_mh-100__WH80k {\n  max-height: 100% !important; }\n\n.styles_min-vw-100__1GEf_ {\n  min-width: 100vw !important; }\n\n.styles_min-vh-100__JSSSS {\n  min-height: 100vh !important; }\n\n.styles_vw-100__2h_HZ {\n  width: 100vw !important; }\n\n.styles_vh-100__IbZ2a {\n  height: 100vh !important; }\n\n.styles_stretched-link__2aCm2::after {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1;\n  pointer-events: auto;\n  content: \"\";\n  background-color: rgba(0, 0, 0, 0); }\n\n.styles_m-0__10yXY {\n  margin: 0 !important; }\n\n.styles_mt-0__1s-Lj,\n.styles_my-0__2GTFm {\n  margin-top: 0 !important; }\n\n.styles_mr-0__21APG,\n.styles_mx-0__2i72p {\n  margin-right: 0 !important; }\n\n.styles_mb-0__1vS4k,\n.styles_my-0__2GTFm {\n  margin-bottom: 0 !important; }\n\n.styles_ml-0__2lp_U,\n.styles_mx-0__2i72p {\n  margin-left: 0 !important; }\n\n.styles_m-1__2ay4h {\n  margin: 0.25rem !important; }\n\n.styles_mt-1__2BQeP,\n.styles_my-1__3C2Zo {\n  margin-top: 0.25rem !important; }\n\n.styles_mr-1__1EOo3,\n.styles_mx-1__3RwA_ {\n  margin-right: 0.25rem !important; }\n\n.styles_mb-1__1qFkw,\n.styles_my-1__3C2Zo {\n  margin-bottom: 0.25rem !important; }\n\n.styles_ml-1__iJ1Uo,\n.styles_mx-1__3RwA_ {\n  margin-left: 0.25rem !important; }\n\n.styles_m-2__VLS_f {\n  margin: 0.5rem !important; }\n\n.styles_mt-2__IuFpG,\n.styles_my-2__2X_ff {\n  margin-top: 0.5rem !important; }\n\n.styles_mr-2__3vXZq,\n.styles_mx-2__h0j6s {\n  margin-right: 0.5rem !important; }\n\n.styles_mb-2__3Sffs,\n.styles_my-2__2X_ff {\n  margin-bottom: 0.5rem !important; }\n\n.styles_ml-2__1vHZC,\n.styles_mx-2__h0j6s {\n  margin-left: 0.5rem !important; }\n\n.styles_m-3__1TQjv {\n  margin: 1rem !important; }\n\n.styles_mt-3__SLhOS,\n.styles_my-3__1BUVx {\n  margin-top: 1rem !important; }\n\n.styles_mr-3__15wtD,\n.styles_mx-3__2RemF {\n  margin-right: 1rem !important; }\n\n.styles_mb-3__142d3,\n.styles_my-3__1BUVx {\n  margin-bottom: 1rem !important; }\n\n.styles_ml-3__3OSMc,\n.styles_mx-3__2RemF {\n  margin-left: 1rem !important; }\n\n.styles_m-4__1tyhN {\n  margin: 1.5rem !important; }\n\n.styles_mt-4__IIxzO,\n.styles_my-4__SNtA5 {\n  margin-top: 1.5rem !important; }\n\n.styles_mr-4__2q36r,\n.styles_mx-4__2mSPo {\n  margin-right: 1.5rem !important; }\n\n.styles_mb-4__3TVhr,\n.styles_my-4__SNtA5 {\n  margin-bottom: 1.5rem !important; }\n\n.styles_ml-4__2dh-p,\n.styles_mx-4__2mSPo {\n  margin-left: 1.5rem !important; }\n\n.styles_m-5__EaKS7 {\n  margin: 3rem !important; }\n\n.styles_mt-5__hGUJR,\n.styles_my-5__Af7Tz {\n  margin-top: 3rem !important; }\n\n.styles_mr-5__1Abz-,\n.styles_mx-5__21thR {\n  margin-right: 3rem !important; }\n\n.styles_mb-5__1ImOF,\n.styles_my-5__Af7Tz {\n  margin-bottom: 3rem !important; }\n\n.styles_ml-5__1wPBW,\n.styles_mx-5__21thR {\n  margin-left: 3rem !important; }\n\n.styles_p-0__2bift {\n  padding: 0 !important; }\n\n.styles_pt-0__3UQ5q,\n.styles_py-0__2Iu0K {\n  padding-top: 0 !important; }\n\n.styles_pr-0__S5V2s,\n.styles_px-0__2d64c {\n  padding-right: 0 !important; }\n\n.styles_pb-0__2s35Z,\n.styles_py-0__2Iu0K {\n  padding-bottom: 0 !important; }\n\n.styles_pl-0__3uGGX,\n.styles_px-0__2d64c {\n  padding-left: 0 !important; }\n\n.styles_p-1__2F2_O {\n  padding: 0.25rem !important; }\n\n.styles_pt-1__2XvyS,\n.styles_py-1__3ZOj_ {\n  padding-top: 0.25rem !important; }\n\n.styles_pr-1__2GIIJ,\n.styles_px-1__22Kdn {\n  padding-right: 0.25rem !important; }\n\n.styles_pb-1__2nlPT,\n.styles_py-1__3ZOj_ {\n  padding-bottom: 0.25rem !important; }\n\n.styles_pl-1__1CY3_,\n.styles_px-1__22Kdn {\n  padding-left: 0.25rem !important; }\n\n.styles_p-2__23lih {\n  padding: 0.5rem !important; }\n\n.styles_pt-2__1-ymy,\n.styles_py-2__25FzH {\n  padding-top: 0.5rem !important; }\n\n.styles_pr-2__2vbck,\n.styles_px-2__17e0o {\n  padding-right: 0.5rem !important; }\n\n.styles_pb-2__3t0el,\n.styles_py-2__25FzH {\n  padding-bottom: 0.5rem !important; }\n\n.styles_pl-2__3kbf5,\n.styles_px-2__17e0o {\n  padding-left: 0.5rem !important; }\n\n.styles_p-3__1HbFe {\n  padding: 1rem !important; }\n\n.styles_pt-3__2VxfL,\n.styles_py-3__2PQB6 {\n  padding-top: 1rem !important; }\n\n.styles_pr-3___4z2L,\n.styles_px-3__13Egd {\n  padding-right: 1rem !important; }\n\n.styles_pb-3__bi7WK,\n.styles_py-3__2PQB6 {\n  padding-bottom: 1rem !important; }\n\n.styles_pl-3__1cmyk,\n.styles_px-3__13Egd {\n  padding-left: 1rem !important; }\n\n.styles_p-4__1Px7S {\n  padding: 1.5rem !important; }\n\n.styles_pt-4__1CxPx,\n.styles_py-4__2rsk3 {\n  padding-top: 1.5rem !important; }\n\n.styles_pr-4__3EYDj,\n.styles_px-4__eLZKV {\n  padding-right: 1.5rem !important; }\n\n.styles_pb-4__2f_YB,\n.styles_py-4__2rsk3 {\n  padding-bottom: 1.5rem !important; }\n\n.styles_pl-4__Ds6Aj,\n.styles_px-4__eLZKV {\n  padding-left: 1.5rem !important; }\n\n.styles_p-5__2ozNu {\n  padding: 3rem !important; }\n\n.styles_pt-5__2CKo8,\n.styles_py-5__2bh-L {\n  padding-top: 3rem !important; }\n\n.styles_pr-5__3EzZI,\n.styles_px-5__300lF {\n  padding-right: 3rem !important; }\n\n.styles_pb-5__1mBdt,\n.styles_py-5__2bh-L {\n  padding-bottom: 3rem !important; }\n\n.styles_pl-5__2hVeQ,\n.styles_px-5__300lF {\n  padding-left: 3rem !important; }\n\n.styles_m-n1__3S_ri {\n  margin: -0.25rem !important; }\n\n.styles_mt-n1__ePTso,\n.styles_my-n1__1iji2 {\n  margin-top: -0.25rem !important; }\n\n.styles_mr-n1__1ME7K,\n.styles_mx-n1__3fVrz {\n  margin-right: -0.25rem !important; }\n\n.styles_mb-n1__1Ohl5,\n.styles_my-n1__1iji2 {\n  margin-bottom: -0.25rem !important; }\n\n.styles_ml-n1__2L0YZ,\n.styles_mx-n1__3fVrz {\n  margin-left: -0.25rem !important; }\n\n.styles_m-n2__lS89M {\n  margin: -0.5rem !important; }\n\n.styles_mt-n2__2Ye9X,\n.styles_my-n2__2D2Jp {\n  margin-top: -0.5rem !important; }\n\n.styles_mr-n2__2n89_,\n.styles_mx-n2__2BFWX {\n  margin-right: -0.5rem !important; }\n\n.styles_mb-n2__2FDCd,\n.styles_my-n2__2D2Jp {\n  margin-bottom: -0.5rem !important; }\n\n.styles_ml-n2__2_kgu,\n.styles_mx-n2__2BFWX {\n  margin-left: -0.5rem !important; }\n\n.styles_m-n3__1YU-C {\n  margin: -1rem !important; }\n\n.styles_mt-n3__2btt9,\n.styles_my-n3__85ePa {\n  margin-top: -1rem !important; }\n\n.styles_mr-n3__WayPs,\n.styles_mx-n3__13cox {\n  margin-right: -1rem !important; }\n\n.styles_mb-n3__3TQqH,\n.styles_my-n3__85ePa {\n  margin-bottom: -1rem !important; }\n\n.styles_ml-n3__32Ice,\n.styles_mx-n3__13cox {\n  margin-left: -1rem !important; }\n\n.styles_m-n4__13piO {\n  margin: -1.5rem !important; }\n\n.styles_mt-n4__3XQFm,\n.styles_my-n4__1L_Et {\n  margin-top: -1.5rem !important; }\n\n.styles_mr-n4__2yyBJ,\n.styles_mx-n4__M99Fj {\n  margin-right: -1.5rem !important; }\n\n.styles_mb-n4__LxDjH,\n.styles_my-n4__1L_Et {\n  margin-bottom: -1.5rem !important; }\n\n.styles_ml-n4__1daUh,\n.styles_mx-n4__M99Fj {\n  margin-left: -1.5rem !important; }\n\n.styles_m-n5__3bjVN {\n  margin: -3rem !important; }\n\n.styles_mt-n5__v-Zuc,\n.styles_my-n5__3nDG7 {\n  margin-top: -3rem !important; }\n\n.styles_mr-n5__3sHU6,\n.styles_mx-n5__25y00 {\n  margin-right: -3rem !important; }\n\n.styles_mb-n5__DbFZQ,\n.styles_my-n5__3nDG7 {\n  margin-bottom: -3rem !important; }\n\n.styles_ml-n5__3b8Nq,\n.styles_mx-n5__25y00 {\n  margin-left: -3rem !important; }\n\n.styles_m-auto__4Dc71 {\n  margin: auto !important; }\n\n.styles_mt-auto__1PrpA,\n.styles_my-auto__35SZL {\n  margin-top: auto !important; }\n\n.styles_mr-auto__30yPF,\n.styles_mx-auto__hEzaB {\n  margin-right: auto !important; }\n\n.styles_mb-auto__2RfNc,\n.styles_my-auto__35SZL {\n  margin-bottom: auto !important; }\n\n.styles_ml-auto__xhD70,\n.styles_mx-auto__hEzaB {\n  margin-left: auto !important; }\n\n@media (min-width: 576px) {\n  .styles_m-sm-0__2FqDX {\n    margin: 0 !important; }\n  .styles_mt-sm-0__YgM3G,\n  .styles_my-sm-0__165sj {\n    margin-top: 0 !important; }\n  .styles_mr-sm-0__2OcpW,\n  .styles_mx-sm-0__1uRmp {\n    margin-right: 0 !important; }\n  .styles_mb-sm-0__3Iy-L,\n  .styles_my-sm-0__165sj {\n    margin-bottom: 0 !important; }\n  .styles_ml-sm-0__c0ibj,\n  .styles_mx-sm-0__1uRmp {\n    margin-left: 0 !important; }\n  .styles_m-sm-1__y4iMT {\n    margin: 0.25rem !important; }\n  .styles_mt-sm-1__12c7T,\n  .styles_my-sm-1__2UL0P {\n    margin-top: 0.25rem !important; }\n  .styles_mr-sm-1__3wusM,\n  .styles_mx-sm-1__zJd4P {\n    margin-right: 0.25rem !important; }\n  .styles_mb-sm-1__3PTad,\n  .styles_my-sm-1__2UL0P {\n    margin-bottom: 0.25rem !important; }\n  .styles_ml-sm-1__3zyH9,\n  .styles_mx-sm-1__zJd4P {\n    margin-left: 0.25rem !important; }\n  .styles_m-sm-2__jSsvU {\n    margin: 0.5rem !important; }\n  .styles_mt-sm-2__2nuhr,\n  .styles_my-sm-2__2oIvW {\n    margin-top: 0.5rem !important; }\n  .styles_mr-sm-2__2075K,\n  .styles_mx-sm-2__2-rFD {\n    margin-right: 0.5rem !important; }\n  .styles_mb-sm-2__x99qA,\n  .styles_my-sm-2__2oIvW {\n    margin-bottom: 0.5rem !important; }\n  .styles_ml-sm-2__1o-5E,\n  .styles_mx-sm-2__2-rFD {\n    margin-left: 0.5rem !important; }\n  .styles_m-sm-3__bXyT_ {\n    margin: 1rem !important; }\n  .styles_mt-sm-3__e1KBM,\n  .styles_my-sm-3__W6yxD {\n    margin-top: 1rem !important; }\n  .styles_mr-sm-3__1fOtD,\n  .styles_mx-sm-3__gazlE {\n    margin-right: 1rem !important; }\n  .styles_mb-sm-3__bPado,\n  .styles_my-sm-3__W6yxD {\n    margin-bottom: 1rem !important; }\n  .styles_ml-sm-3__3ANj_,\n  .styles_mx-sm-3__gazlE {\n    margin-left: 1rem !important; }\n  .styles_m-sm-4__M57Il {\n    margin: 1.5rem !important; }\n  .styles_mt-sm-4__1njmN,\n  .styles_my-sm-4__154Rg {\n    margin-top: 1.5rem !important; }\n  .styles_mr-sm-4__d_5Pw,\n  .styles_mx-sm-4__1JPWR {\n    margin-right: 1.5rem !important; }\n  .styles_mb-sm-4__3ATrv,\n  .styles_my-sm-4__154Rg {\n    margin-bottom: 1.5rem !important; }\n  .styles_ml-sm-4__3NRVO,\n  .styles_mx-sm-4__1JPWR {\n    margin-left: 1.5rem !important; }\n  .styles_m-sm-5__JUifq {\n    margin: 3rem !important; }\n  .styles_mt-sm-5__2K44D,\n  .styles_my-sm-5__1POfI {\n    margin-top: 3rem !important; }\n  .styles_mr-sm-5__2DIli,\n  .styles_mx-sm-5__VzmH0 {\n    margin-right: 3rem !important; }\n  .styles_mb-sm-5__24y-X,\n  .styles_my-sm-5__1POfI {\n    margin-bottom: 3rem !important; }\n  .styles_ml-sm-5__2AP0E,\n  .styles_mx-sm-5__VzmH0 {\n    margin-left: 3rem !important; }\n  .styles_p-sm-0__2DdlC {\n    padding: 0 !important; }\n  .styles_pt-sm-0__3RzyH,\n  .styles_py-sm-0__xSGFH {\n    padding-top: 0 !important; }\n  .styles_pr-sm-0__3rWht,\n  .styles_px-sm-0__3-cbg {\n    padding-right: 0 !important; }\n  .styles_pb-sm-0__31vKV,\n  .styles_py-sm-0__xSGFH {\n    padding-bottom: 0 !important; }\n  .styles_pl-sm-0__2nxvh,\n  .styles_px-sm-0__3-cbg {\n    padding-left: 0 !important; }\n  .styles_p-sm-1__33V-W {\n    padding: 0.25rem !important; }\n  .styles_pt-sm-1__1FPJe,\n  .styles_py-sm-1__1la3d {\n    padding-top: 0.25rem !important; }\n  .styles_pr-sm-1__1FAL3,\n  .styles_px-sm-1__3c1bU {\n    padding-right: 0.25rem !important; }\n  .styles_pb-sm-1__3L-XU,\n  .styles_py-sm-1__1la3d {\n    padding-bottom: 0.25rem !important; }\n  .styles_pl-sm-1__2J5gF,\n  .styles_px-sm-1__3c1bU {\n    padding-left: 0.25rem !important; }\n  .styles_p-sm-2__2lT9U {\n    padding: 0.5rem !important; }\n  .styles_pt-sm-2__2wDXZ,\n  .styles_py-sm-2__1Tqx8 {\n    padding-top: 0.5rem !important; }\n  .styles_pr-sm-2__1BK8W,\n  .styles_px-sm-2__1xZ7M {\n    padding-right: 0.5rem !important; }\n  .styles_pb-sm-2__17Y4i,\n  .styles_py-sm-2__1Tqx8 {\n    padding-bottom: 0.5rem !important; }\n  .styles_pl-sm-2__2dOn6,\n  .styles_px-sm-2__1xZ7M {\n    padding-left: 0.5rem !important; }\n  .styles_p-sm-3__2R0jQ {\n    padding: 1rem !important; }\n  .styles_pt-sm-3__1p1CC,\n  .styles_py-sm-3__1jl73 {\n    padding-top: 1rem !important; }\n  .styles_pr-sm-3__1AA4H,\n  .styles_px-sm-3__2csBZ {\n    padding-right: 1rem !important; }\n  .styles_pb-sm-3__V9bmr,\n  .styles_py-sm-3__1jl73 {\n    padding-bottom: 1rem !important; }\n  .styles_pl-sm-3__1i6JT,\n  .styles_px-sm-3__2csBZ {\n    padding-left: 1rem !important; }\n  .styles_p-sm-4__3Z3SW {\n    padding: 1.5rem !important; }\n  .styles_pt-sm-4__2i-QG,\n  .styles_py-sm-4__24XGT {\n    padding-top: 1.5rem !important; }\n  .styles_pr-sm-4__1ytFI,\n  .styles_px-sm-4__3J6iA {\n    padding-right: 1.5rem !important; }\n  .styles_pb-sm-4__2E8PH,\n  .styles_py-sm-4__24XGT {\n    padding-bottom: 1.5rem !important; }\n  .styles_pl-sm-4__eHmZX,\n  .styles_px-sm-4__3J6iA {\n    padding-left: 1.5rem !important; }\n  .styles_p-sm-5__Fakwm {\n    padding: 3rem !important; }\n  .styles_pt-sm-5__3WQXl,\n  .styles_py-sm-5__1dyiI {\n    padding-top: 3rem !important; }\n  .styles_pr-sm-5__1cPUI,\n  .styles_px-sm-5__2EzDl {\n    padding-right: 3rem !important; }\n  .styles_pb-sm-5__33glI,\n  .styles_py-sm-5__1dyiI {\n    padding-bottom: 3rem !important; }\n  .styles_pl-sm-5__3q20t,\n  .styles_px-sm-5__2EzDl {\n    padding-left: 3rem !important; }\n  .styles_m-sm-n1__2eW6Y {\n    margin: -0.25rem !important; }\n  .styles_mt-sm-n1__2eHdI,\n  .styles_my-sm-n1__2nDK- {\n    margin-top: -0.25rem !important; }\n  .styles_mr-sm-n1__1PqIy,\n  .styles_mx-sm-n1__1GQF5 {\n    margin-right: -0.25rem !important; }\n  .styles_mb-sm-n1__27uRI,\n  .styles_my-sm-n1__2nDK- {\n    margin-bottom: -0.25rem !important; }\n  .styles_ml-sm-n1__SGWTK,\n  .styles_mx-sm-n1__1GQF5 {\n    margin-left: -0.25rem !important; }\n  .styles_m-sm-n2__2roQc {\n    margin: -0.5rem !important; }\n  .styles_mt-sm-n2__1k7IV,\n  .styles_my-sm-n2__3hW-q {\n    margin-top: -0.5rem !important; }\n  .styles_mr-sm-n2__zMHNh,\n  .styles_mx-sm-n2__263LE {\n    margin-right: -0.5rem !important; }\n  .styles_mb-sm-n2__1aiDI,\n  .styles_my-sm-n2__3hW-q {\n    margin-bottom: -0.5rem !important; }\n  .styles_ml-sm-n2__13TUz,\n  .styles_mx-sm-n2__263LE {\n    margin-left: -0.5rem !important; }\n  .styles_m-sm-n3__1F28S {\n    margin: -1rem !important; }\n  .styles_mt-sm-n3__LATNB,\n  .styles_my-sm-n3__3w6zw {\n    margin-top: -1rem !important; }\n  .styles_mr-sm-n3__3RLee,\n  .styles_mx-sm-n3__2shFn {\n    margin-right: -1rem !important; }\n  .styles_mb-sm-n3__MGKpj,\n  .styles_my-sm-n3__3w6zw {\n    margin-bottom: -1rem !important; }\n  .styles_ml-sm-n3__3_scc,\n  .styles_mx-sm-n3__2shFn {\n    margin-left: -1rem !important; }\n  .styles_m-sm-n4__1gRbp {\n    margin: -1.5rem !important; }\n  .styles_mt-sm-n4__F6jGQ,\n  .styles_my-sm-n4__2ClvM {\n    margin-top: -1.5rem !important; }\n  .styles_mr-sm-n4__H_ZT2,\n  .styles_mx-sm-n4__2ZnX1 {\n    margin-right: -1.5rem !important; }\n  .styles_mb-sm-n4__3U65E,\n  .styles_my-sm-n4__2ClvM {\n    margin-bottom: -1.5rem !important; }\n  .styles_ml-sm-n4__36WGK,\n  .styles_mx-sm-n4__2ZnX1 {\n    margin-left: -1.5rem !important; }\n  .styles_m-sm-n5__1yXvH {\n    margin: -3rem !important; }\n  .styles_mt-sm-n5__31TRn,\n  .styles_my-sm-n5__2eyaK {\n    margin-top: -3rem !important; }\n  .styles_mr-sm-n5__1xufY,\n  .styles_mx-sm-n5__2IeTo {\n    margin-right: -3rem !important; }\n  .styles_mb-sm-n5__3Ii7v,\n  .styles_my-sm-n5__2eyaK {\n    margin-bottom: -3rem !important; }\n  .styles_ml-sm-n5__37_wc,\n  .styles_mx-sm-n5__2IeTo {\n    margin-left: -3rem !important; }\n  .styles_m-sm-auto___VrQ0 {\n    margin: auto !important; }\n  .styles_mt-sm-auto__1WbH1,\n  .styles_my-sm-auto__sqc2O {\n    margin-top: auto !important; }\n  .styles_mr-sm-auto__29Imt,\n  .styles_mx-sm-auto__ZWpY_ {\n    margin-right: auto !important; }\n  .styles_mb-sm-auto__1fTcv,\n  .styles_my-sm-auto__sqc2O {\n    margin-bottom: auto !important; }\n  .styles_ml-sm-auto__23ur6,\n  .styles_mx-sm-auto__ZWpY_ {\n    margin-left: auto !important; } }\n\n@media (min-width: 768px) {\n  .styles_m-md-0__2WUpO {\n    margin: 0 !important; }\n  .styles_mt-md-0__3twOr,\n  .styles_my-md-0__POMss {\n    margin-top: 0 !important; }\n  .styles_mr-md-0__2d6ZY,\n  .styles_mx-md-0__3NDxP {\n    margin-right: 0 !important; }\n  .styles_mb-md-0__3M6tT,\n  .styles_my-md-0__POMss {\n    margin-bottom: 0 !important; }\n  .styles_ml-md-0__1PHwy,\n  .styles_mx-md-0__3NDxP {\n    margin-left: 0 !important; }\n  .styles_m-md-1__2Tp8x {\n    margin: 0.25rem !important; }\n  .styles_mt-md-1__2jRV-,\n  .styles_my-md-1__2eRvi {\n    margin-top: 0.25rem !important; }\n  .styles_mr-md-1__Ywr54,\n  .styles_mx-md-1__vYh7l {\n    margin-right: 0.25rem !important; }\n  .styles_mb-md-1__2SYY2,\n  .styles_my-md-1__2eRvi {\n    margin-bottom: 0.25rem !important; }\n  .styles_ml-md-1__3yVg3,\n  .styles_mx-md-1__vYh7l {\n    margin-left: 0.25rem !important; }\n  .styles_m-md-2__1HLGF {\n    margin: 0.5rem !important; }\n  .styles_mt-md-2__2lhQq,\n  .styles_my-md-2__2cZvn {\n    margin-top: 0.5rem !important; }\n  .styles_mr-md-2__245hv,\n  .styles_mx-md-2__3WEdw {\n    margin-right: 0.5rem !important; }\n  .styles_mb-md-2__yoDOO,\n  .styles_my-md-2__2cZvn {\n    margin-bottom: 0.5rem !important; }\n  .styles_ml-md-2__24Wxn,\n  .styles_mx-md-2__3WEdw {\n    margin-left: 0.5rem !important; }\n  .styles_m-md-3__2e1DW {\n    margin: 1rem !important; }\n  .styles_mt-md-3__3_wuO,\n  .styles_my-md-3__26wxE {\n    margin-top: 1rem !important; }\n  .styles_mr-md-3__1cmdx,\n  .styles_mx-md-3__2h80d {\n    margin-right: 1rem !important; }\n  .styles_mb-md-3__1ByrG,\n  .styles_my-md-3__26wxE {\n    margin-bottom: 1rem !important; }\n  .styles_ml-md-3__2X0tf,\n  .styles_mx-md-3__2h80d {\n    margin-left: 1rem !important; }\n  .styles_m-md-4__2xbrw {\n    margin: 1.5rem !important; }\n  .styles_mt-md-4__1Jfki,\n  .styles_my-md-4__Gslj5 {\n    margin-top: 1.5rem !important; }\n  .styles_mr-md-4__3vtfr,\n  .styles_mx-md-4__2lKd8 {\n    margin-right: 1.5rem !important; }\n  .styles_mb-md-4__1DQ8Q,\n  .styles_my-md-4__Gslj5 {\n    margin-bottom: 1.5rem !important; }\n  .styles_ml-md-4__3dvo4,\n  .styles_mx-md-4__2lKd8 {\n    margin-left: 1.5rem !important; }\n  .styles_m-md-5__1QJMk {\n    margin: 3rem !important; }\n  .styles_mt-md-5__36nn2,\n  .styles_my-md-5__vWynI {\n    margin-top: 3rem !important; }\n  .styles_mr-md-5__2Z30h,\n  .styles_mx-md-5__3l6t7 {\n    margin-right: 3rem !important; }\n  .styles_mb-md-5__2p9py,\n  .styles_my-md-5__vWynI {\n    margin-bottom: 3rem !important; }\n  .styles_ml-md-5__l0MW5,\n  .styles_mx-md-5__3l6t7 {\n    margin-left: 3rem !important; }\n  .styles_p-md-0__1DFFI {\n    padding: 0 !important; }\n  .styles_pt-md-0__10-Tt,\n  .styles_py-md-0__Bkj-d {\n    padding-top: 0 !important; }\n  .styles_pr-md-0__J62YW,\n  .styles_px-md-0__EmNLe {\n    padding-right: 0 !important; }\n  .styles_pb-md-0__Gw87B,\n  .styles_py-md-0__Bkj-d {\n    padding-bottom: 0 !important; }\n  .styles_pl-md-0__3KwZR,\n  .styles_px-md-0__EmNLe {\n    padding-left: 0 !important; }\n  .styles_p-md-1__1KEdj {\n    padding: 0.25rem !important; }\n  .styles_pt-md-1__12VhM,\n  .styles_py-md-1__1fKgQ {\n    padding-top: 0.25rem !important; }\n  .styles_pr-md-1__1qCZR,\n  .styles_px-md-1__15MLD {\n    padding-right: 0.25rem !important; }\n  .styles_pb-md-1__KXD5M,\n  .styles_py-md-1__1fKgQ {\n    padding-bottom: 0.25rem !important; }\n  .styles_pl-md-1__RAJn_,\n  .styles_px-md-1__15MLD {\n    padding-left: 0.25rem !important; }\n  .styles_p-md-2__1HJJv {\n    padding: 0.5rem !important; }\n  .styles_pt-md-2__21qpK,\n  .styles_py-md-2__2S-Ja {\n    padding-top: 0.5rem !important; }\n  .styles_pr-md-2__2IF0c,\n  .styles_px-md-2__2ooeR {\n    padding-right: 0.5rem !important; }\n  .styles_pb-md-2__2ZeXN,\n  .styles_py-md-2__2S-Ja {\n    padding-bottom: 0.5rem !important; }\n  .styles_pl-md-2__2VVBW,\n  .styles_px-md-2__2ooeR {\n    padding-left: 0.5rem !important; }\n  .styles_p-md-3__21stO {\n    padding: 1rem !important; }\n  .styles_pt-md-3__2y9sy,\n  .styles_py-md-3__3eyAd {\n    padding-top: 1rem !important; }\n  .styles_pr-md-3__2zKd-,\n  .styles_px-md-3__3Kz8R {\n    padding-right: 1rem !important; }\n  .styles_pb-md-3__2gwBA,\n  .styles_py-md-3__3eyAd {\n    padding-bottom: 1rem !important; }\n  .styles_pl-md-3__32uZF,\n  .styles_px-md-3__3Kz8R {\n    padding-left: 1rem !important; }\n  .styles_p-md-4__19_Mq {\n    padding: 1.5rem !important; }\n  .styles_pt-md-4__3JfXW,\n  .styles_py-md-4__nqODR {\n    padding-top: 1.5rem !important; }\n  .styles_pr-md-4__7LdzS,\n  .styles_px-md-4__2Losa {\n    padding-right: 1.5rem !important; }\n  .styles_pb-md-4__87lrA,\n  .styles_py-md-4__nqODR {\n    padding-bottom: 1.5rem !important; }\n  .styles_pl-md-4__2x41x,\n  .styles_px-md-4__2Losa {\n    padding-left: 1.5rem !important; }\n  .styles_p-md-5__1SJEZ {\n    padding: 3rem !important; }\n  .styles_pt-md-5__knZtv,\n  .styles_py-md-5__NH2Mg {\n    padding-top: 3rem !important; }\n  .styles_pr-md-5__1MvRN,\n  .styles_px-md-5__3h6_o {\n    padding-right: 3rem !important; }\n  .styles_pb-md-5__23AcK,\n  .styles_py-md-5__NH2Mg {\n    padding-bottom: 3rem !important; }\n  .styles_pl-md-5__Iv5NN,\n  .styles_px-md-5__3h6_o {\n    padding-left: 3rem !important; }\n  .styles_m-md-n1__1vkUR {\n    margin: -0.25rem !important; }\n  .styles_mt-md-n1__2XQKm,\n  .styles_my-md-n1__22yb6 {\n    margin-top: -0.25rem !important; }\n  .styles_mr-md-n1__2WD3Q,\n  .styles_mx-md-n1__3X_PZ {\n    margin-right: -0.25rem !important; }\n  .styles_mb-md-n1__2DjGo,\n  .styles_my-md-n1__22yb6 {\n    margin-bottom: -0.25rem !important; }\n  .styles_ml-md-n1__2PCNJ,\n  .styles_mx-md-n1__3X_PZ {\n    margin-left: -0.25rem !important; }\n  .styles_m-md-n2__3jo5u {\n    margin: -0.5rem !important; }\n  .styles_mt-md-n2__24exF,\n  .styles_my-md-n2__Ycyal {\n    margin-top: -0.5rem !important; }\n  .styles_mr-md-n2__3Kk06,\n  .styles_mx-md-n2__1jaUK {\n    margin-right: -0.5rem !important; }\n  .styles_mb-md-n2__1Lq1P,\n  .styles_my-md-n2__Ycyal {\n    margin-bottom: -0.5rem !important; }\n  .styles_ml-md-n2__XceH3,\n  .styles_mx-md-n2__1jaUK {\n    margin-left: -0.5rem !important; }\n  .styles_m-md-n3__2NOOx {\n    margin: -1rem !important; }\n  .styles_mt-md-n3__2MJu-,\n  .styles_my-md-n3__1OfR3 {\n    margin-top: -1rem !important; }\n  .styles_mr-md-n3__3I2vV,\n  .styles_mx-md-n3__C3Ov_ {\n    margin-right: -1rem !important; }\n  .styles_mb-md-n3__1FZLK,\n  .styles_my-md-n3__1OfR3 {\n    margin-bottom: -1rem !important; }\n  .styles_ml-md-n3__2DWBg,\n  .styles_mx-md-n3__C3Ov_ {\n    margin-left: -1rem !important; }\n  .styles_m-md-n4__p1_Xe {\n    margin: -1.5rem !important; }\n  .styles_mt-md-n4__3Db5-,\n  .styles_my-md-n4__NGsWA {\n    margin-top: -1.5rem !important; }\n  .styles_mr-md-n4__19vgq,\n  .styles_mx-md-n4__2AckT {\n    margin-right: -1.5rem !important; }\n  .styles_mb-md-n4__38iTG,\n  .styles_my-md-n4__NGsWA {\n    margin-bottom: -1.5rem !important; }\n  .styles_ml-md-n4__3lGfW,\n  .styles_mx-md-n4__2AckT {\n    margin-left: -1.5rem !important; }\n  .styles_m-md-n5__2bNpA {\n    margin: -3rem !important; }\n  .styles_mt-md-n5__2Diyg,\n  .styles_my-md-n5__1_lGT {\n    margin-top: -3rem !important; }\n  .styles_mr-md-n5__2b42m,\n  .styles_mx-md-n5__1Trm4 {\n    margin-right: -3rem !important; }\n  .styles_mb-md-n5__3sw2w,\n  .styles_my-md-n5__1_lGT {\n    margin-bottom: -3rem !important; }\n  .styles_ml-md-n5__m0M88,\n  .styles_mx-md-n5__1Trm4 {\n    margin-left: -3rem !important; }\n  .styles_m-md-auto__2GL0s {\n    margin: auto !important; }\n  .styles_mt-md-auto__1sJ-I,\n  .styles_my-md-auto__3vZZN {\n    margin-top: auto !important; }\n  .styles_mr-md-auto__3mYCZ,\n  .styles_mx-md-auto__3iqTf {\n    margin-right: auto !important; }\n  .styles_mb-md-auto__Z_Q1R,\n  .styles_my-md-auto__3vZZN {\n    margin-bottom: auto !important; }\n  .styles_ml-md-auto__2quEZ,\n  .styles_mx-md-auto__3iqTf {\n    margin-left: auto !important; } }\n\n@media (min-width: 992px) {\n  .styles_m-lg-0__1vp35 {\n    margin: 0 !important; }\n  .styles_mt-lg-0__2v2lb,\n  .styles_my-lg-0__2gLkv {\n    margin-top: 0 !important; }\n  .styles_mr-lg-0__3j0C8,\n  .styles_mx-lg-0__An24d {\n    margin-right: 0 !important; }\n  .styles_mb-lg-0__1Qx90,\n  .styles_my-lg-0__2gLkv {\n    margin-bottom: 0 !important; }\n  .styles_ml-lg-0__2IILn,\n  .styles_mx-lg-0__An24d {\n    margin-left: 0 !important; }\n  .styles_m-lg-1__NmStB {\n    margin: 0.25rem !important; }\n  .styles_mt-lg-1__2Wl32,\n  .styles_my-lg-1__SbodV {\n    margin-top: 0.25rem !important; }\n  .styles_mr-lg-1__212uI,\n  .styles_mx-lg-1__DfVJt {\n    margin-right: 0.25rem !important; }\n  .styles_mb-lg-1__8JcPa,\n  .styles_my-lg-1__SbodV {\n    margin-bottom: 0.25rem !important; }\n  .styles_ml-lg-1__-Zjfi,\n  .styles_mx-lg-1__DfVJt {\n    margin-left: 0.25rem !important; }\n  .styles_m-lg-2__3JdTz {\n    margin: 0.5rem !important; }\n  .styles_mt-lg-2__2qvYy,\n  .styles_my-lg-2__36CVq {\n    margin-top: 0.5rem !important; }\n  .styles_mr-lg-2__36piF,\n  .styles_mx-lg-2__-RYM0 {\n    margin-right: 0.5rem !important; }\n  .styles_mb-lg-2__AlmU7,\n  .styles_my-lg-2__36CVq {\n    margin-bottom: 0.5rem !important; }\n  .styles_ml-lg-2__2gEFE,\n  .styles_mx-lg-2__-RYM0 {\n    margin-left: 0.5rem !important; }\n  .styles_m-lg-3___Mu78 {\n    margin: 1rem !important; }\n  .styles_mt-lg-3__2LCiL,\n  .styles_my-lg-3__17T1u {\n    margin-top: 1rem !important; }\n  .styles_mr-lg-3__1yQNM,\n  .styles_mx-lg-3__3RKPL {\n    margin-right: 1rem !important; }\n  .styles_mb-lg-3__ugLbQ,\n  .styles_my-lg-3__17T1u {\n    margin-bottom: 1rem !important; }\n  .styles_ml-lg-3__V-T-8,\n  .styles_mx-lg-3__3RKPL {\n    margin-left: 1rem !important; }\n  .styles_m-lg-4__2_Dbh {\n    margin: 1.5rem !important; }\n  .styles_mt-lg-4__SQ0CX,\n  .styles_my-lg-4__2r2-9 {\n    margin-top: 1.5rem !important; }\n  .styles_mr-lg-4__WQCY1,\n  .styles_mx-lg-4__25Bv2 {\n    margin-right: 1.5rem !important; }\n  .styles_mb-lg-4__3LS-H,\n  .styles_my-lg-4__2r2-9 {\n    margin-bottom: 1.5rem !important; }\n  .styles_ml-lg-4__1ltiX,\n  .styles_mx-lg-4__25Bv2 {\n    margin-left: 1.5rem !important; }\n  .styles_m-lg-5__cs9Lk {\n    margin: 3rem !important; }\n  .styles_mt-lg-5__2xksZ,\n  .styles_my-lg-5__2rolY {\n    margin-top: 3rem !important; }\n  .styles_mr-lg-5__25EHn,\n  .styles_mx-lg-5__2Ytvp {\n    margin-right: 3rem !important; }\n  .styles_mb-lg-5___BNOg,\n  .styles_my-lg-5__2rolY {\n    margin-bottom: 3rem !important; }\n  .styles_ml-lg-5__1mcJL,\n  .styles_mx-lg-5__2Ytvp {\n    margin-left: 3rem !important; }\n  .styles_p-lg-0__14ZjS {\n    padding: 0 !important; }\n  .styles_pt-lg-0__1XGac,\n  .styles_py-lg-0__3SEKP {\n    padding-top: 0 !important; }\n  .styles_pr-lg-0__14DJI,\n  .styles_px-lg-0__32JYE {\n    padding-right: 0 !important; }\n  .styles_pb-lg-0__1b0Zg,\n  .styles_py-lg-0__3SEKP {\n    padding-bottom: 0 !important; }\n  .styles_pl-lg-0__2BcK9,\n  .styles_px-lg-0__32JYE {\n    padding-left: 0 !important; }\n  .styles_p-lg-1__1Ouoh {\n    padding: 0.25rem !important; }\n  .styles_pt-lg-1__hzf-B,\n  .styles_py-lg-1__jBfe7 {\n    padding-top: 0.25rem !important; }\n  .styles_pr-lg-1__2pmNe,\n  .styles_px-lg-1__3MRWH {\n    padding-right: 0.25rem !important; }\n  .styles_pb-lg-1__36n9G,\n  .styles_py-lg-1__jBfe7 {\n    padding-bottom: 0.25rem !important; }\n  .styles_pl-lg-1__3SsPZ,\n  .styles_px-lg-1__3MRWH {\n    padding-left: 0.25rem !important; }\n  .styles_p-lg-2__1WeUX {\n    padding: 0.5rem !important; }\n  .styles_pt-lg-2__2Eqvw,\n  .styles_py-lg-2__mxEPE {\n    padding-top: 0.5rem !important; }\n  .styles_pr-lg-2__1IcyX,\n  .styles_px-lg-2__3Ripw {\n    padding-right: 0.5rem !important; }\n  .styles_pb-lg-2__29GNI,\n  .styles_py-lg-2__mxEPE {\n    padding-bottom: 0.5rem !important; }\n  .styles_pl-lg-2__3VsH4,\n  .styles_px-lg-2__3Ripw {\n    padding-left: 0.5rem !important; }\n  .styles_p-lg-3__1wYWH {\n    padding: 1rem !important; }\n  .styles_pt-lg-3__3qO_7,\n  .styles_py-lg-3__2S_DM {\n    padding-top: 1rem !important; }\n  .styles_pr-lg-3__1br-8,\n  .styles_px-lg-3__oXWww {\n    padding-right: 1rem !important; }\n  .styles_pb-lg-3__SKW06,\n  .styles_py-lg-3__2S_DM {\n    padding-bottom: 1rem !important; }\n  .styles_pl-lg-3__2PLMg,\n  .styles_px-lg-3__oXWww {\n    padding-left: 1rem !important; }\n  .styles_p-lg-4__2XrHd {\n    padding: 1.5rem !important; }\n  .styles_pt-lg-4__3cbqN,\n  .styles_py-lg-4__347tM {\n    padding-top: 1.5rem !important; }\n  .styles_pr-lg-4__3lor8,\n  .styles_px-lg-4__3i_3g {\n    padding-right: 1.5rem !important; }\n  .styles_pb-lg-4__2VAEI,\n  .styles_py-lg-4__347tM {\n    padding-bottom: 1.5rem !important; }\n  .styles_pl-lg-4__3P0o2,\n  .styles_px-lg-4__3i_3g {\n    padding-left: 1.5rem !important; }\n  .styles_p-lg-5__60iQ- {\n    padding: 3rem !important; }\n  .styles_pt-lg-5__2I1ME,\n  .styles_py-lg-5__2mw_n {\n    padding-top: 3rem !important; }\n  .styles_pr-lg-5__2TuNX,\n  .styles_px-lg-5__3hJLV {\n    padding-right: 3rem !important; }\n  .styles_pb-lg-5__2Tk8e,\n  .styles_py-lg-5__2mw_n {\n    padding-bottom: 3rem !important; }\n  .styles_pl-lg-5__2D1DH,\n  .styles_px-lg-5__3hJLV {\n    padding-left: 3rem !important; }\n  .styles_m-lg-n1__1EmlP {\n    margin: -0.25rem !important; }\n  .styles_mt-lg-n1__3-Bt6,\n  .styles_my-lg-n1__jfCm0 {\n    margin-top: -0.25rem !important; }\n  .styles_mr-lg-n1__1ZTVJ,\n  .styles_mx-lg-n1__13vyO {\n    margin-right: -0.25rem !important; }\n  .styles_mb-lg-n1__3T7VY,\n  .styles_my-lg-n1__jfCm0 {\n    margin-bottom: -0.25rem !important; }\n  .styles_ml-lg-n1__3M6FR,\n  .styles_mx-lg-n1__13vyO {\n    margin-left: -0.25rem !important; }\n  .styles_m-lg-n2__28Rjk {\n    margin: -0.5rem !important; }\n  .styles_mt-lg-n2__R50F-,\n  .styles_my-lg-n2__2z4sU {\n    margin-top: -0.5rem !important; }\n  .styles_mr-lg-n2__G3Pcp,\n  .styles_mx-lg-n2__dlgoE {\n    margin-right: -0.5rem !important; }\n  .styles_mb-lg-n2__2aXKg,\n  .styles_my-lg-n2__2z4sU {\n    margin-bottom: -0.5rem !important; }\n  .styles_ml-lg-n2__3zdFD,\n  .styles_mx-lg-n2__dlgoE {\n    margin-left: -0.5rem !important; }\n  .styles_m-lg-n3__JSFMK {\n    margin: -1rem !important; }\n  .styles_mt-lg-n3__1cHA4,\n  .styles_my-lg-n3__2Sdoi {\n    margin-top: -1rem !important; }\n  .styles_mr-lg-n3__3KDxM,\n  .styles_mx-lg-n3__3KIaZ {\n    margin-right: -1rem !important; }\n  .styles_mb-lg-n3__3Ham7,\n  .styles_my-lg-n3__2Sdoi {\n    margin-bottom: -1rem !important; }\n  .styles_ml-lg-n3__o4nri,\n  .styles_mx-lg-n3__3KIaZ {\n    margin-left: -1rem !important; }\n  .styles_m-lg-n4__10tMG {\n    margin: -1.5rem !important; }\n  .styles_mt-lg-n4__3ceqK,\n  .styles_my-lg-n4__3xk2Z {\n    margin-top: -1.5rem !important; }\n  .styles_mr-lg-n4__3fxyc,\n  .styles_mx-lg-n4__299e7 {\n    margin-right: -1.5rem !important; }\n  .styles_mb-lg-n4__28ySr,\n  .styles_my-lg-n4__3xk2Z {\n    margin-bottom: -1.5rem !important; }\n  .styles_ml-lg-n4__19-NA,\n  .styles_mx-lg-n4__299e7 {\n    margin-left: -1.5rem !important; }\n  .styles_m-lg-n5__14jIl {\n    margin: -3rem !important; }\n  .styles_mt-lg-n5__1lhFs,\n  .styles_my-lg-n5__3WB6_ {\n    margin-top: -3rem !important; }\n  .styles_mr-lg-n5__31YPp,\n  .styles_mx-lg-n5__3KmQs {\n    margin-right: -3rem !important; }\n  .styles_mb-lg-n5__D7hIq,\n  .styles_my-lg-n5__3WB6_ {\n    margin-bottom: -3rem !important; }\n  .styles_ml-lg-n5__1g6Lm,\n  .styles_mx-lg-n5__3KmQs {\n    margin-left: -3rem !important; }\n  .styles_m-lg-auto__2hqNl {\n    margin: auto !important; }\n  .styles_mt-lg-auto__2xrPg,\n  .styles_my-lg-auto__37WJL {\n    margin-top: auto !important; }\n  .styles_mr-lg-auto__2o-zN,\n  .styles_mx-lg-auto__2f49D {\n    margin-right: auto !important; }\n  .styles_mb-lg-auto__L99Wy,\n  .styles_my-lg-auto__37WJL {\n    margin-bottom: auto !important; }\n  .styles_ml-lg-auto__1vtBg,\n  .styles_mx-lg-auto__2f49D {\n    margin-left: auto !important; } }\n\n@media (min-width: 1200px) {\n  .styles_m-xl-0__1w4fw {\n    margin: 0 !important; }\n  .styles_mt-xl-0__2N3C4,\n  .styles_my-xl-0__3TlKm {\n    margin-top: 0 !important; }\n  .styles_mr-xl-0__2QLPO,\n  .styles_mx-xl-0__nbYB6 {\n    margin-right: 0 !important; }\n  .styles_mb-xl-0__2bj_z,\n  .styles_my-xl-0__3TlKm {\n    margin-bottom: 0 !important; }\n  .styles_ml-xl-0__4cP6y,\n  .styles_mx-xl-0__nbYB6 {\n    margin-left: 0 !important; }\n  .styles_m-xl-1__2TIBr {\n    margin: 0.25rem !important; }\n  .styles_mt-xl-1__1gLik,\n  .styles_my-xl-1__cXw7I {\n    margin-top: 0.25rem !important; }\n  .styles_mr-xl-1__1ovrE,\n  .styles_mx-xl-1__3D5ch {\n    margin-right: 0.25rem !important; }\n  .styles_mb-xl-1__HYqRy,\n  .styles_my-xl-1__cXw7I {\n    margin-bottom: 0.25rem !important; }\n  .styles_ml-xl-1__M7CVN,\n  .styles_mx-xl-1__3D5ch {\n    margin-left: 0.25rem !important; }\n  .styles_m-xl-2__1I0Np {\n    margin: 0.5rem !important; }\n  .styles_mt-xl-2__2PNDs,\n  .styles_my-xl-2__3YwG0 {\n    margin-top: 0.5rem !important; }\n  .styles_mr-xl-2__CNZau,\n  .styles_mx-xl-2__1oj2Z {\n    margin-right: 0.5rem !important; }\n  .styles_mb-xl-2__1lcRF,\n  .styles_my-xl-2__3YwG0 {\n    margin-bottom: 0.5rem !important; }\n  .styles_ml-xl-2__nYLB1,\n  .styles_mx-xl-2__1oj2Z {\n    margin-left: 0.5rem !important; }\n  .styles_m-xl-3__2LoHm {\n    margin: 1rem !important; }\n  .styles_mt-xl-3__2ihz7,\n  .styles_my-xl-3__1youT {\n    margin-top: 1rem !important; }\n  .styles_mr-xl-3__2qlg5,\n  .styles_mx-xl-3__29AIl {\n    margin-right: 1rem !important; }\n  .styles_mb-xl-3__2htdB,\n  .styles_my-xl-3__1youT {\n    margin-bottom: 1rem !important; }\n  .styles_ml-xl-3__3_A0k,\n  .styles_mx-xl-3__29AIl {\n    margin-left: 1rem !important; }\n  .styles_m-xl-4__2I0Jz {\n    margin: 1.5rem !important; }\n  .styles_mt-xl-4__16NfS,\n  .styles_my-xl-4__2q4zX {\n    margin-top: 1.5rem !important; }\n  .styles_mr-xl-4__2Oh6X,\n  .styles_mx-xl-4__16Dcc {\n    margin-right: 1.5rem !important; }\n  .styles_mb-xl-4__1oV3a,\n  .styles_my-xl-4__2q4zX {\n    margin-bottom: 1.5rem !important; }\n  .styles_ml-xl-4__2UG7_,\n  .styles_mx-xl-4__16Dcc {\n    margin-left: 1.5rem !important; }\n  .styles_m-xl-5__2yzPT {\n    margin: 3rem !important; }\n  .styles_mt-xl-5__hgo3l,\n  .styles_my-xl-5__LGA5Y {\n    margin-top: 3rem !important; }\n  .styles_mr-xl-5__GTS9D,\n  .styles_mx-xl-5__18xv9 {\n    margin-right: 3rem !important; }\n  .styles_mb-xl-5__2XKGN,\n  .styles_my-xl-5__LGA5Y {\n    margin-bottom: 3rem !important; }\n  .styles_ml-xl-5__2ETjk,\n  .styles_mx-xl-5__18xv9 {\n    margin-left: 3rem !important; }\n  .styles_p-xl-0__z1Bzl {\n    padding: 0 !important; }\n  .styles_pt-xl-0__3EJk9,\n  .styles_py-xl-0__ZQI2a {\n    padding-top: 0 !important; }\n  .styles_pr-xl-0__XjLsI,\n  .styles_px-xl-0__3gwm7 {\n    padding-right: 0 !important; }\n  .styles_pb-xl-0__3gepg,\n  .styles_py-xl-0__ZQI2a {\n    padding-bottom: 0 !important; }\n  .styles_pl-xl-0__2cSwf,\n  .styles_px-xl-0__3gwm7 {\n    padding-left: 0 !important; }\n  .styles_p-xl-1__1h-Sx {\n    padding: 0.25rem !important; }\n  .styles_pt-xl-1__1lxo3,\n  .styles_py-xl-1__amo21 {\n    padding-top: 0.25rem !important; }\n  .styles_pr-xl-1__r5Ohf,\n  .styles_px-xl-1__23GMG {\n    padding-right: 0.25rem !important; }\n  .styles_pb-xl-1__3Aan-,\n  .styles_py-xl-1__amo21 {\n    padding-bottom: 0.25rem !important; }\n  .styles_pl-xl-1__-R29b,\n  .styles_px-xl-1__23GMG {\n    padding-left: 0.25rem !important; }\n  .styles_p-xl-2__2r9Lm {\n    padding: 0.5rem !important; }\n  .styles_pt-xl-2__3m0SM,\n  .styles_py-xl-2__3PMTy {\n    padding-top: 0.5rem !important; }\n  .styles_pr-xl-2__2xkKs,\n  .styles_px-xl-2__O5ACv {\n    padding-right: 0.5rem !important; }\n  .styles_pb-xl-2__1VA0P,\n  .styles_py-xl-2__3PMTy {\n    padding-bottom: 0.5rem !important; }\n  .styles_pl-xl-2__3p1TP,\n  .styles_px-xl-2__O5ACv {\n    padding-left: 0.5rem !important; }\n  .styles_p-xl-3__8vXR_ {\n    padding: 1rem !important; }\n  .styles_pt-xl-3__KmAzr,\n  .styles_py-xl-3__2k-lx {\n    padding-top: 1rem !important; }\n  .styles_pr-xl-3__33KIB,\n  .styles_px-xl-3__VWiH3 {\n    padding-right: 1rem !important; }\n  .styles_pb-xl-3__3HbEb,\n  .styles_py-xl-3__2k-lx {\n    padding-bottom: 1rem !important; }\n  .styles_pl-xl-3__1V8Xh,\n  .styles_px-xl-3__VWiH3 {\n    padding-left: 1rem !important; }\n  .styles_p-xl-4__1QYty {\n    padding: 1.5rem !important; }\n  .styles_pt-xl-4__3RzxA,\n  .styles_py-xl-4__3BwBn {\n    padding-top: 1.5rem !important; }\n  .styles_pr-xl-4__1EY-6,\n  .styles_px-xl-4__1T0Rt {\n    padding-right: 1.5rem !important; }\n  .styles_pb-xl-4__25IuJ,\n  .styles_py-xl-4__3BwBn {\n    padding-bottom: 1.5rem !important; }\n  .styles_pl-xl-4__1pZzu,\n  .styles_px-xl-4__1T0Rt {\n    padding-left: 1.5rem !important; }\n  .styles_p-xl-5__1SEaG {\n    padding: 3rem !important; }\n  .styles_pt-xl-5__30Hxz,\n  .styles_py-xl-5__2Id1D {\n    padding-top: 3rem !important; }\n  .styles_pr-xl-5__2gHDV,\n  .styles_px-xl-5__2cp36 {\n    padding-right: 3rem !important; }\n  .styles_pb-xl-5__uLZ4Z,\n  .styles_py-xl-5__2Id1D {\n    padding-bottom: 3rem !important; }\n  .styles_pl-xl-5__PTbQ6,\n  .styles_px-xl-5__2cp36 {\n    padding-left: 3rem !important; }\n  .styles_m-xl-n1__1P9Eu {\n    margin: -0.25rem !important; }\n  .styles_mt-xl-n1__2ngEe,\n  .styles_my-xl-n1__WcaHe {\n    margin-top: -0.25rem !important; }\n  .styles_mr-xl-n1__3FYle,\n  .styles_mx-xl-n1__1GIeL {\n    margin-right: -0.25rem !important; }\n  .styles_mb-xl-n1__2PSHs,\n  .styles_my-xl-n1__WcaHe {\n    margin-bottom: -0.25rem !important; }\n  .styles_ml-xl-n1__230uE,\n  .styles_mx-xl-n1__1GIeL {\n    margin-left: -0.25rem !important; }\n  .styles_m-xl-n2__3pjYC {\n    margin: -0.5rem !important; }\n  .styles_mt-xl-n2__38hrL,\n  .styles_my-xl-n2__1HegT {\n    margin-top: -0.5rem !important; }\n  .styles_mr-xl-n2__TZzWm,\n  .styles_mx-xl-n2__19Z2G {\n    margin-right: -0.5rem !important; }\n  .styles_mb-xl-n2__3Szoo,\n  .styles_my-xl-n2__1HegT {\n    margin-bottom: -0.5rem !important; }\n  .styles_ml-xl-n2__vzHot,\n  .styles_mx-xl-n2__19Z2G {\n    margin-left: -0.5rem !important; }\n  .styles_m-xl-n3__27XDZ {\n    margin: -1rem !important; }\n  .styles_mt-xl-n3__1PYkF,\n  .styles_my-xl-n3__7JAQ5 {\n    margin-top: -1rem !important; }\n  .styles_mr-xl-n3__1Bttr,\n  .styles_mx-xl-n3__30VF5 {\n    margin-right: -1rem !important; }\n  .styles_mb-xl-n3__3BPDC,\n  .styles_my-xl-n3__7JAQ5 {\n    margin-bottom: -1rem !important; }\n  .styles_ml-xl-n3__1CNDO,\n  .styles_mx-xl-n3__30VF5 {\n    margin-left: -1rem !important; }\n  .styles_m-xl-n4__1-a4n {\n    margin: -1.5rem !important; }\n  .styles_mt-xl-n4__hKqjg,\n  .styles_my-xl-n4__1MWKY {\n    margin-top: -1.5rem !important; }\n  .styles_mr-xl-n4__xYR8u,\n  .styles_mx-xl-n4__2QR7m {\n    margin-right: -1.5rem !important; }\n  .styles_mb-xl-n4__1zxxk,\n  .styles_my-xl-n4__1MWKY {\n    margin-bottom: -1.5rem !important; }\n  .styles_ml-xl-n4__3Jm1o,\n  .styles_mx-xl-n4__2QR7m {\n    margin-left: -1.5rem !important; }\n  .styles_m-xl-n5__IIxOw {\n    margin: -3rem !important; }\n  .styles_mt-xl-n5__1Nm3t,\n  .styles_my-xl-n5__FLKB8 {\n    margin-top: -3rem !important; }\n  .styles_mr-xl-n5__1VFXb,\n  .styles_mx-xl-n5__2OnPD {\n    margin-right: -3rem !important; }\n  .styles_mb-xl-n5__3-3_l,\n  .styles_my-xl-n5__FLKB8 {\n    margin-bottom: -3rem !important; }\n  .styles_ml-xl-n5__1D8nk,\n  .styles_mx-xl-n5__2OnPD {\n    margin-left: -3rem !important; }\n  .styles_m-xl-auto__1uTGp {\n    margin: auto !important; }\n  .styles_mt-xl-auto__2z-0O,\n  .styles_my-xl-auto__1YULu {\n    margin-top: auto !important; }\n  .styles_mr-xl-auto__1sLTA,\n  .styles_mx-xl-auto__2JvN2 {\n    margin-right: auto !important; }\n  .styles_mb-xl-auto__2ZKJZ,\n  .styles_my-xl-auto__1YULu {\n    margin-bottom: auto !important; }\n  .styles_ml-xl-auto__FumJB,\n  .styles_mx-xl-auto__2JvN2 {\n    margin-left: auto !important; } }\n\n.styles_text-monospace__3O2VJ {\n  font-family: SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace !important; }\n\n.styles_text-justify__3mNjz {\n  text-align: justify !important; }\n\n.styles_text-wrap__3vZ9W {\n  white-space: normal !important; }\n\n.styles_text-nowrap__1av5a {\n  white-space: nowrap !important; }\n\n.styles_text-truncate__3Kt8i {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap; }\n\n.styles_text-left__3pnmt {\n  text-align: left !important; }\n\n.styles_text-right__pCE9H {\n  text-align: right !important; }\n\n.styles_text-center__XceHR {\n  text-align: center !important; }\n\n@media (min-width: 576px) {\n  .styles_text-sm-left__2lOUO {\n    text-align: left !important; }\n  .styles_text-sm-right__webyL {\n    text-align: right !important; }\n  .styles_text-sm-center__2djfI {\n    text-align: center !important; } }\n\n@media (min-width: 768px) {\n  .styles_text-md-left__qlf1I {\n    text-align: left !important; }\n  .styles_text-md-right__2ne48 {\n    text-align: right !important; }\n  .styles_text-md-center__1H9as {\n    text-align: center !important; } }\n\n@media (min-width: 992px) {\n  .styles_text-lg-left__2utiC {\n    text-align: left !important; }\n  .styles_text-lg-right__1fELj {\n    text-align: right !important; }\n  .styles_text-lg-center__1MVi4 {\n    text-align: center !important; } }\n\n@media (min-width: 1200px) {\n  .styles_text-xl-left__1idXt {\n    text-align: left !important; }\n  .styles_text-xl-right__3laik {\n    text-align: right !important; }\n  .styles_text-xl-center__1_KiN {\n    text-align: center !important; } }\n\n.styles_text-lowercase__2u5dc {\n  text-transform: lowercase !important; }\n\n.styles_text-uppercase__1fo4V {\n  text-transform: uppercase !important; }\n\n.styles_text-capitalize__ENi1- {\n  text-transform: capitalize !important; }\n\n.styles_font-weight-light__1AUSx {\n  font-weight: 300 !important; }\n\n.styles_font-weight-lighter__3ps0c {\n  font-weight: lighter !important; }\n\n.styles_font-weight-normal__3rDoh {\n  font-weight: 400 !important; }\n\n.styles_font-weight-bold__3-s57 {\n  font-weight: 700 !important; }\n\n.styles_font-weight-bolder__kaeNh {\n  font-weight: bolder !important; }\n\n.styles_font-italic__2Wyjj {\n  font-style: italic !important; }\n\n.styles_text-white__2pHLb {\n  color: #fff !important; }\n\n.styles_text-primary__35vHE {\n  color: #007bff !important; }\n\na.styles_text-primary__35vHE:hover, a.styles_text-primary__35vHE:focus {\n  color: #0056b3 !important; }\n\n.styles_text-secondary__14csH {\n  color: #6c757d !important; }\n\na.styles_text-secondary__14csH:hover, a.styles_text-secondary__14csH:focus {\n  color: #494f54 !important; }\n\n.styles_text-success__1wixs {\n  color: #28a745 !important; }\n\na.styles_text-success__1wixs:hover, a.styles_text-success__1wixs:focus {\n  color: #19692c !important; }\n\n.styles_text-info__7pk_B {\n  color: #17a2b8 !important; }\n\na.styles_text-info__7pk_B:hover, a.styles_text-info__7pk_B:focus {\n  color: #0f6674 !important; }\n\n.styles_text-warning__2CFiW {\n  color: #ffc107 !important; }\n\na.styles_text-warning__2CFiW:hover, a.styles_text-warning__2CFiW:focus {\n  color: #ba8b00 !important; }\n\n.styles_text-danger__2UuTH {\n  color: #dc3545 !important; }\n\na.styles_text-danger__2UuTH:hover, a.styles_text-danger__2UuTH:focus {\n  color: #a71d2a !important; }\n\n.styles_text-light__2zT8Q {\n  color: #f8f9fa !important; }\n\na.styles_text-light__2zT8Q:hover, a.styles_text-light__2zT8Q:focus {\n  color: #cbd3da !important; }\n\n.styles_text-dark__1Q-Cs {\n  color: #343a40 !important; }\n\na.styles_text-dark__1Q-Cs:hover, a.styles_text-dark__1Q-Cs:focus {\n  color: #121416 !important; }\n\n.styles_text-body__aS0Tq {\n  color: #212529 !important; }\n\n.styles_text-muted__3D7NO {\n  color: #6c757d !important; }\n\n.styles_text-black-50__2lgn9 {\n  color: rgba(0, 0, 0, 0.5) !important; }\n\n.styles_text-white-50__NTCPE {\n  color: rgba(255, 255, 255, 0.5) !important; }\n\n.styles_text-hide__ED8FV {\n  font: 0/0 a;\n  color: transparent;\n  text-shadow: none;\n  background-color: transparent;\n  border: 0; }\n\n.styles_text-decoration-none__jnK-E {\n  text-decoration: none !important; }\n\n.styles_text-break__oaNey {\n  word-break: break-word !important;\n  overflow-wrap: break-word !important; }\n\n.styles_text-reset__2yn3Y {\n  color: inherit !important; }\n\n.styles_visible__2bumB {\n  visibility: visible !important; }\n\n.styles_invisible__S6JLc {\n  visibility: hidden !important; }\n\n@media print {\n  *,\n  *::before,\n  *::after {\n    text-shadow: none !important;\n    box-shadow: none !important; }\n  a:not(.styles_btn__34YFe) {\n    text-decoration: underline; }\n  abbr[title]::after {\n    content: \" (\" attr(title) \")\"; }\n  pre {\n    white-space: pre-wrap !important; }\n  pre,\n  blockquote {\n    border: 1px solid #adb5bd;\n    page-break-inside: avoid; }\n  thead {\n    display: table-header-group; }\n  tr,\n  img {\n    page-break-inside: avoid; }\n  p,\n  h2,\n  h3 {\n    orphans: 3;\n    widows: 3; }\n  h2,\n  h3 {\n    page-break-after: avoid; }\n  @page {\n    size: a3; }\n  body {\n    min-width: 992px !important; }\n  .styles_container__1H7C6 {\n    min-width: 992px !important; }\n  .styles_navbar__1FERp {\n    display: none; }\n  .styles_badge__16ezc {\n    border: 1px solid #000; }\n  .styles_table__3n6C2 {\n    border-collapse: collapse !important; }\n    .styles_table__3n6C2 td,\n    .styles_table__3n6C2 th {\n      background-color: #fff !important; }\n  .styles_table-bordered__1lhpI th,\n  .styles_table-bordered__1lhpI td {\n    border: 1px solid #dee2e6 !important; }\n  .styles_table-dark__2hls8 {\n    color: inherit; }\n    .styles_table-dark__2hls8 th,\n    .styles_table-dark__2hls8 td,\n    .styles_table-dark__2hls8 thead th,\n    .styles_table-dark__2hls8 tbody + tbody {\n      border-color: #dee2e6; }\n  .styles_table__3n6C2 .styles_thead-dark__1cyG4 th {\n    color: inherit;\n    border-color: #dee2e6; } }\n";
styleInject(css$1);

exports.Header = Header$1;
//# sourceMappingURL=index.js.map
