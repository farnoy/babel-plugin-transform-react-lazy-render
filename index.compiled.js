export default function (_ref) {
  var t = _ref.types;

  return {
    visitor: {
      JSXElement: function JSXElement(path) {
        var node = path.node;


        if (node.openingElement.name.name === 'LazyRender') {
          var innerFunc = node.children.find(function (c) {
            return c.type === 'JSXExpressionContainer' && c.expression.type === 'ArrowFunctionExpression';
          });
          if (innerFunc == null) return;
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
        }
      }
    }
  };
}
