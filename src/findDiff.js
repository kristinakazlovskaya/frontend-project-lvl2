import _ from 'lodash';

const findDiff = (file1, file2) => {
  const keys = _.sortBy(_.union(_.keys(file1), _.keys(file2)));

  return keys.map((key) => {
    if (!Object.hasOwn(file2, key)) {
      return { name: key, value: file1[key], state: 'removed' };
    }
    if (!Object.hasOwn(file1, key)) {
      return { name: key, value: file2[key], state: 'added' };
    }
    if (typeof file2[key] === 'object' && typeof file1[key] === 'object') {
      return { name: key, state: 'nested', children: findDiff(file1[key], file2[key]) };
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
};

export default findDiff;
