module.exports = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Enforce that a variable named `foo` can only be assigned a value of 'bar'.",
    },
    fixable: "code",
    schema: [],
  },
  create(context) {
    return {
      CallExpression(node) {
        if (node.callee.object.name !== 'Promise') {
          return
        }

        if (node.callee.property.name !== 'map') {
          return
        }

        if (node.arguments.length < 2) {
          reportError(context, node)
          return
        }

        const optionsArg = node.arguments[1]
        if (optionsArg.type !== 'ObjectExpression') {
          reportError(context, node)
          return
        }

        const concurrencyProp = optionsArg.properties.find(it => it.key.name === 'concurrency')
        if (!concurrencyProp) {
          reportError(context, node)
        }
      }
    }
  },
}

function reportError (context, node) {
  context.report({
    node,
    message: 'concurrency option is mandatory for Promise.map',
    data: { arguments: node.arguments },
  })
}
