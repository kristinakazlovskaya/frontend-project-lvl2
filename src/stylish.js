import _ from 'lodash';

const addSpaces = (count) => ' '.repeat(count);

const toString = (value, initSpaces, currentSpaces) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }

  const result = _.toPairs(value).map(([entryKey, entryValue]) => `${addSpaces(currentSpaces + (initSpaces * 3))}${entryKey}: ${toString(entryValue, initSpaces, currentSpaces + (initSpaces * 2))}`);

  const resultString = result.join('\n');

  return `{\n${resultString}\n${addSpaces(currentSpaces + initSpaces)}}`;
};

const formatStylish = (diff, initSpaces = 2, currentSpaces = initSpaces) => {
  const result = diff.map((node) => {
    const states = {
      removed: () => `${addSpaces(currentSpaces)}- ${node.name}: ${toString(node.value, initSpaces, currentSpaces)}`,
      added: () => `${addSpaces(currentSpaces)}+ ${node.name}: ${toString(node.value, initSpaces, currentSpaces)}`,
      updated: () => `${addSpaces(currentSpaces)}- ${node.name}: ${toString(node.previousValue, initSpaces, currentSpaces)}\n${addSpaces(currentSpaces)}+ ${node.name}: ${toString(node.currentValue, initSpaces, currentSpaces)}`,
      nested: () => `${addSpaces(currentSpaces)}  ${node.name}: ${formatStylish(node.children, initSpaces, currentSpaces + (initSpaces * 2))}`,
      unchanged: () => `${addSpaces(currentSpaces)}  ${node.name}: ${toString(node.value, initSpaces, currentSpaces)}`,
    };

    return states[node.state]();
  });

  const resultString = result.join('\n');

  return `{\n${resultString}\n${addSpaces(currentSpaces - initSpaces)}}`;
};

export default formatStylish;
