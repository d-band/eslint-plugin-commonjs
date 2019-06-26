const utils = require('eslint-utils');

function isAssignment(node) {
  return (
    node.parent &&
    node.parent.type === 'MemberExpression' &&
    node.parent.parent &&
    node.parent.parent.type === 'AssignmentExpression' &&
    node.parent.parent.left === node.parent
  );
}

function getModuleExportsNodes(scope) {
  const variable = scope.set.get('module');
  if (variable == null) {
    return [];
  }
  return variable.references
    .map(reference => reference.identifier.parent)
    .filter(node => (
      node.type === 'MemberExpression' &&
      utils.getPropertyName(node, scope) === 'exports'
    ));
}

function getExportsNodes(scope) {
  const variable = scope.set.get('exports');
  if (variable == null) {
    return [];
  }
  return variable.references
    .map(reference => reference.identifier);
}

module.exports = {
  meta: {
    docs: {
      description: 'no duplicate exports',
      category: 'Stylistic Issues',
      recommended: true
    },
    type: 'suggestion',
    fixable: null
  },
  create(context) {
    const nodeMap = {};
    const sourceCode = context.getSourceCode();

    function getLocation(node) {
      const token = sourceCode.getTokenAfter(node)
      return {
        start: node.loc.start,
        end: token.loc.end,
      }
    }

    function checkDuplicate(nodes, scope) {
      nodes.filter(isAssignment).forEach(node => {
        const prop = utils.getPropertyName(node.parent, scope);
        if (!prop) return;
        if (nodeMap[prop]) {
          context.report({
            node,
            loc: getLocation(node.parent.property),
            message: `duplicate exports '${prop}'`,
          });
        } else {
          nodeMap[prop] = true;
        }
      });
    }

    return {
      'Program:exit' () {
        const globalScope = context.getScope();
        const exportsNodes = getExportsNodes(globalScope);
        const moduleExportsNodes = getModuleExportsNodes(globalScope);

        checkDuplicate(exportsNodes, globalScope);
        checkDuplicate(moduleExportsNodes, globalScope);
      }
    }
  }
};
