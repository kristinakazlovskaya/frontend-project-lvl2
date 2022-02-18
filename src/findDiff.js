import _ from 'lodash';

const findDiff = (file1, file2) => {
  const keys = Object.keys({ ...file1, ...file2 });

  const diff = keys.map((key) => {
    if (!_.has(file2, key)) {
      return { name: key, value: file1[key], state: 'removed' };
    }
    if (!_.has(file1, key)) {
      return { name: key, value: file2[key], state: 'added' };
    }
    if (_.isObject(file2[key]) && _.isObject(file1[key])) {
      return { name: key, children: findDiff(file1[key], file2[key]) };
    }
    if (file2[key] !== file1[key]) {
      return {
        name: key,
        previousValue: file1[key],
        currentValue: file2[key],
        state: 'updated',
      };
    }
    return { name: key, value: file1[key], state: 'unchanged' };
  });

  return _.sortBy(diff, 'name');
};

export default findDiff;
