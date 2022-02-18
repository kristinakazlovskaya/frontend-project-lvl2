import parseFile from './parsers.js';
import findDiff from './findDiff.js';
import formatStylish from './stylish.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const diff = findDiff(parseFile(filepath1), parseFile(filepath2));
  return format === 'stylish' ? formatStylish(diff) : formatStylish(diff);
};

export default genDiff;
