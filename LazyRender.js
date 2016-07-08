
// Uses CommonJS, AMD or browser globals to create a module.

// If you just want to support Node, or other CommonJS-like environments that
// support module.exports, and you are not creating a module that has a
// circular dependency, then see returnExports.js instead. It will allow
// you to export a function as the module value.

// Defines a module "commonJsStrict" that depends another module called "b".
// Note that the name of the module is implied by the file name. It is best
// if the file name and the exported global have matching names.

// If the 'b' module also uses this type of boilerplate, then
// in the browser, it will create a global .b that is used below.

// If you do not want to support the browser global path, then you
// can remove the `root` use and the passing `this` as the first arg to
// the top function.

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['exports', 'react', 'lodash'], factory);
  } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
    // CommonJS
    factory(exports, require('react'), require('lodash'));
  } else {
    // Browser globals
    factory((root.commonJsStrict = {}), root.React, root.lodash);
  }
}(this, function (exports, _react, _lodash) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

  var _react2 = _interopRequireDefault(_react);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  function guidedShallowCompare() {
    if (arguments.length < 3) throw 'Need at least three arguments to guidedShallowCompare';

    var lhs = arguments[0];
    var rhs = arguments[1];

    for (var i = 2; i < arguments.length; i++) {
      var guide = arguments[i];

      if (Array.isArray(guide)) {
        for (var j = 0; j < guide.length; j++) {
          if (guidedShallowCompare(lhs, rhs, guide[j]) === false) return false;
        }
      } else if ((typeof guide === 'undefined' ? 'undefined' : _typeof(guide)) === 'object') {
        var keys = Object.keys(guide);
        for (var _j = 0; _j < keys.length; _j++) {
          var elem = keys[_j];

          if (guidedShallowCompare(lhs[elem], rhs[elem], guide[elem]) === false) return false;
        }
      } else if (typeof guide === 'string') {
        if (lhs[guide] !== rhs[guide]) return false;
      } else if (guide == null) {
        if (lhs !== rhs) return false;
      }
    }

    return true;
  }

  var LazyRender = function (_React$Component) {
    _inherits(LazyRender, _React$Component);

    function LazyRender() {
      _classCallCheck(this, LazyRender);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(LazyRender).apply(this, arguments));
    }

    _createClass(LazyRender, [{
      key: 'shouldComponentUpdate',
      value: function shouldComponentUpdate(nextProps) /* nextState */{
        return !guidedShallowCompare(this.props, nextProps, (0, _lodash.without)(Object.keys(nextProps), 'children'));
      }
    }, {
      key: 'render',
      value: function render() {
        return this.props.children.apply(this, [this.props]);
      }
    }]);

    return LazyRender;
  }(_react2.default.Component);

  LazyRender.propTypes = {
    children: _react2.default.PropTypes.func.isRequired
  };
  exports.default = LazyRender;
}));

