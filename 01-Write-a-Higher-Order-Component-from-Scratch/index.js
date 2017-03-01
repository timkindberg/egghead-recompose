"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
TITLE:
Write a Higher-Order Component from Scratch

DESCRIPTION:
Learn the proper way to write a higher-order component from scratch.
*/
var _React = React,
    Component = _React.Component;


var overrideProps = function overrideProps(_overrideProps) {
  return function (BaseComponent) {
    return function (props) {
      return React.createElement(BaseComponent, _extends({}, props, _overrideProps));
    };
  };
};

var alwaysBob = overrideProps({ name: 'Bob' });

var neverRender = function neverRender(BaseComponent) {
  return function (_Component) {
    _inherits(_class, _Component);

    function _class() {
      _classCallCheck(this, _class);

      return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    _createClass(_class, [{
      key: "shouldComponentUpdate",
      value: function shouldComponentUpdate() {
        return false;
      }
    }, {
      key: "render",
      value: function render() {
        return React.createElement(BaseComponent, this.props);
      }
    }]);

    return _class;
  }(Component);
};

var User = function User(_ref) {
  var name = _ref.name;
  return React.createElement(
    "div",
    { className: "User" },
    name
  );
};

var User2 = alwaysBob(User);
var User3 = neverRender(User);

var App = function App() {
  return React.createElement(
    "div",
    null,
    React.createElement(User, { name: "Tim" }),
    React.createElement(User2, { name: "Joe" }),
    React.createElement(User3, { name: "Steve" })
  );
};

ReactDOM.render(React.createElement(App, null), document.getElementById('main'));

//# sourceMappingURL=index.js.map