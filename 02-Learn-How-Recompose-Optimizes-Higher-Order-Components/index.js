'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/*
TITLE:
Learn How Recompose Optimizes Higher Order Components

DESCRIPTION:
Learn about optimizations that Recompose uses behind the scenes.
*/
window.process = { env: { NODE_ENV: 'development' } };

var _React = React,
    Component = _React.Component;


var overrideProps = function overrideProps(_overrideProps) {
  return function (BaseComponent) {
    var factory = createEagerFactory(BaseComponent);

    return function (props) {
      return factory(_extends({}, props, _overrideProps), props.children);
    };
  };
};

var User = function User(_ref) {
  var name = _ref.name;
  return React.createElement(
    'div',
    { className: 'User' },
    name
  );
};

var alwaysBob = overrideProps({ name: 'Bob' });
var User2 = alwaysBob(User);

var App = function App() {
  return React.createElement(
    'div',
    null,
    React.createElement(User, { name: 'Joe' }),
    React.createElement(User2, { name: 'Steve' })
  );
};

ReactDOM.render(React.createElement(App, null), document.getElementById('main'));

///// HOC Optimizations /////

function createEagerFactory(Component) {
  return function (props, children) {
    if (isReferentiallyTransparentFunctionComponent(Component)) {
      return children ? Component(_extends({}, props, { children: children })) : Component(props);
    }

    return children ? React.createElement(
      Component,
      props,
      children
    ) : React.createElement(Component, props);
  };
}

function isReferentiallyTransparentFunctionComponent(Component) {
  return Boolean(typeof Component === 'function' && !isClassComponent(Component) && !Component.defaultProps && !Component.contextTypes && (window.process.env.NODE_ENV === 'production' || !Component.propTypes));
}

function isClassComponent(Component) {
  return Boolean(Component && Component.prototype && _typeof(Component.prototype.isReactComponent) === 'object');
}

//# sourceMappingURL=index.js.map