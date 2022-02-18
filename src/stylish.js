import _ from 'lodash';

const addSpaces = (count) => ' '.repeat(count);

const toString = (value, initSpaces, currentSpaces) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }

  const result = Object.entries(value).map(([entryKey, entryValue]) => `${addSpaces(currentSpaces + (initSpaces * 3))}${entryKey}: ${toString(entryValue, initSpaces, currentSpaces + (initSpaces * 2))}`);

  const resultString = result.join('\n');

  return `{\n${resultString}\n${addSpaces(currentSpaces + initSpaces)}}`;
};

const formatStylish = (object, initSpaces = 2) => {
  const iter = (diff, currentSpaces) => {
    const result = diff.map((node) => {
      if (node.state === 'removed') {
        return `${addSpaces(currentSpaces)}- ${node.name}: ${toString(node.value, initSpaces, currentSpaces)}`;
      }
      if (node.state === 'added') {
        return `${addSpaces(currentSpaces)}+ ${node.name}: ${toString(node.value, initSpaces, currentSpaces)}`;
      }
      if (node.state === 'updated') {
        return `${addSpaces(currentSpaces)}- ${node.name}: ${toString(node.previousValue, initSpaces, currentSpaces)}\n${addSpaces(currentSpaces)}+ ${node.name}: ${toString(node.currentValue, initSpaces, currentSpaces)}`;
      }
      if (node.children) {
        return `${addSpaces(currentSpaces)}  ${node.name}: ${iter(node.children, currentSpaces + (initSpaces * 2))}`;
      }
      return `${addSpaces(currentSpaces)}  ${node.name}: ${toString(node.value, initSpaces, currentSpaces)}`;
    });

    const resultString = result.join('\n');

    return `{\n${resultString}\n${addSpaces(currentSpaces - initSpaces)}}`;
  };

  return iter(object, initSpaces);
};

export default formatStylish;
