'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = function (_ref) {
  var t = _ref.types;

  return {
    visitor: {
      JSXElement: function JSXElement(path) {
        var node = path.node;


        if (node.openingElement.name.name === 'LazyRender') {
          var _ret = function () {
            var innerFunc = node.children.find(function (c) {
              return c.type === 'JSXExpressionContainer' && c.expression.type === 'ArrowFunctionExpression';
            });
            if (innerFunc == null) return {
                v: void 0
              };
            var attributes = [];
            innerFunc.expression.params.forEach(function (param) {
              param.properties.forEach(function (prop) {
                attributes.push(prop.key);
              });
            });

            var parent = path.parentPath.parentPath;
            var elementsToModify = [node];
            while (parent != null) {
              if (parent.node.type === 'JSXElement' && parent.node.openingElement.name.name === 'LazyRender') elementsToModify.push(parent.node);

              parent = parent.parentPath;
            }
            elementsToModify.forEach(function (elem) {
              attributes.forEach(function (attrib) {
                if (elem.openingElement.attributes.find(function (existingAttrib) {
                  return existingAttrib.name.name === attrib.name;
                }) == null) elem.openingElement.attributes.push(t.JSXAttribute(t.JSXIdentifier(attrib.name), t.JSXExpressionContainer(attrib)));
              });
            });
          }();

          if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
        }
      }
    }
  };
};
