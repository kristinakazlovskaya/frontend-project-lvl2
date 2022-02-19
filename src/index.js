import parseFile from './parsers.js';
import findDiff from './findDiff.js';
import defineFormatter from './formatters/index.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const diff = findDiff(parseFile(filepath1), parseFile(filepath2));
  return defineFormatter(formatName, diff);
};

export default genDiff;
