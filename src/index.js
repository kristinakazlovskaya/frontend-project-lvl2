import _ from 'lodash';
import parseFile from './parsers.js';

const genDiff = (filepath1, filepath2) => {
  const file1 = parseFile(filepath1);
  const file2 = parseFile(filepath2);

  const file1Keys = _.sortBy(Object.keys(file1));
  const file2Keys = _.sortBy(Object.keys(file2));

  const diff1 = file1Keys.reduce((acc, key) => {
    if (!file2[key]) {
      acc.push(`  - ${key}: ${file1[key]}`);
    }
    if (file2[key] === file1[key]) {
      acc.push(`    ${key}: ${file1[key]}`);
    }
    if (file2[key] && file2[key] !== file1[key]) {
      acc.push(`  - ${key}: ${file1[key]}`);
      acc.push(`  + ${key}: ${file2[key]}`);
    }
    return acc;
  }, ['{']);

  const result = file2Keys.reduce((acc, key) => {
    if (!file1[key]) {
      acc.push(`  + ${key}: ${file2[key]}`);
    }
    return acc;
  }, diff1);

  result.push('}');

  return result.join('\n');
};

export default genDiff;
