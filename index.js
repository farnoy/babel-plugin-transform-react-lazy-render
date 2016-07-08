export default function ({types: t}) {
  return {
    visitor: {
      JSXElement(path) {
        const {node} = path;

        if (node.openingElement.name.name === 'LazyRender') {
          const innerFunc = node.children.find(c => c.type === 'JSXExpressionContainer' && c.expression.type === 'ArrowFunctionExpression');
          if (innerFunc == null) return;
          const attributes = [];
          innerFunc.expression.params.forEach(param => {
            param.properties.forEach(prop => {
            	attributes.push(prop.key);
            });
          });


          let parent = path.parentPath.parentPath;
          const elementsToModify = [node];
          while (parent != null) {
            if (parent.node.type === 'JSXElement' && parent.node.openingElement.name.name === 'LazyRender')
              elementsToModify.push(parent.node);

            parent = parent.parentPath;
          }
          elementsToModify.forEach(elem => {
            attributes.forEach(attrib => {
              if (elem.openingElement.attributes.find(existingAttrib => existingAttrib.name.name === attrib.name) == null)
              elem.openingElement.attributes.push(t.JSXAttribute(t.JSXIdentifier(attrib.name), t.JSXExpressionContainer(attrib)));
            });
          });
        }
      }
    }
  };
}

