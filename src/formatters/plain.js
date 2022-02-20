import _ from 'lodash';

const formatValue = (value) => {
  if (_.isString(value)) {
    return `'${value}'`;
  }
  if (!_.isObject(value)) {
    return value;
  }
  return '[complex value]';
};

const formatPlain = (tree) => {
  const iter = (diff, nodeName) => {
    const result = diff.flatMap((node) => {
      const states = {
        removed: () => `Property '${nodeName + node.name}' was removed`,
        added: () => `Property '${nodeName + node.name}' was added with value: ${formatValue(node.value)}`,
        updated: () => `Property '${nodeName + node.name}' was updated. From ${formatValue(node.previousValue)} to ${formatValue(node.currentValue)}`,
        nested: () => iter(node.children, `${nodeName + node.name}.`),
        unchanged: () => [],
      };

      return states[node.state]();
    });

    return result.join('\n');
  };

  return iter(tree, '');
};

export default formatPlain;
