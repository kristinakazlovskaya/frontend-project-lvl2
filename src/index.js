import _ from 'lodash';
import path from 'path';
import { readFileSync } from 'fs';

const parseFile = (file) => JSON.parse(readFileSync(path.resolve(file), 'utf8'));

const genDiff = (filepath1, filepath2) => {
  const file1 = parseFile(filepath1);
  const file2 = parseFile(filepath2);

  const file1Keys = Object.keys(file1);
  const file2Keys = Object.keys(file2);

  const sortedFile1Keys = _.sortBy(file1Keys);
  const sortedFile2Keys = _.sortBy(file2Keys);

  const result = ['{'];

  for (const key of sortedFile1Keys) {
    if (!file2[key]) {
      result.push(`  - ${key}: ${file1[key]}`);
    }
    if (file2[key] === file1[key]) {
      result.push(`    ${key}: ${file1[key]}`);
    }
    if (file2[key] && file2[key] !== file1[key]) {
      result.push(`  - ${key}: ${file1[key]}`);
      result.push(`  + ${key}: ${file2[key]}`);
    }
  }

  for (const key of sortedFile2Keys) {
    if (!file1[key]) {
      result.push(`  + ${key}: ${file2[key]}`);
    }
  }

  result.push('}');

  return result.join('\n');
};

export default genDiff;