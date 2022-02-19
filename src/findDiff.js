import _ from 'lodash';

const findDiff = (file1, file2) => {
  const keys = _.union(_.keys(file1), _.keys(file2));

  const diff = keys.map((key) => {
    const states = {
      removed: () => ({ name: key, value: file1[key], state: 'removed' }),
      added: () => ({ name: key, value: file2[key], state: 'added' }),
      nested: () => ({ name: key, state: 'nested', children: findDiff(file1[key], file2[key]) }),
      updated: () => ({
        name: key,
        previousValue: file1[key],
        currentValue: file2[key],
        state: 'updated',
      }),
      unchanged: () => ({ name: key, value: file1[key], state: 'unchanged' }),
    };

    const isRemoved = !_.has(file2, key) ? states.removed() : null;
    const isAdded = !_.has(file1, key) ? states.added() : null;
    const isNested = _.isObject(file2[key]) && _.isObject(file1[key]) ? states.nested() : null;
    const isUpdated = file2[key] !== file1[key] ? states.updated() : null;

    return isRemoved ?? isAdded ?? isNested ?? isUpdated ?? states.unchanged();
  });

  return _.sortBy(diff, 'name');
};

export default findDiff;
