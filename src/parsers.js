import path from 'path';
import { readFileSync } from 'fs';
import yaml from 'js-yaml';

const parseFile = (filePath) => {
  const fileExtension = path.extname(filePath).substring(1);
  let parse;
  if (fileExtension === 'yaml' || fileExtension === 'yml') {
    parse = yaml.load;
  }
  if (fileExtension === 'json') {
    parse = JSON.parse;
  }
  return parse(readFileSync(path.resolve(filePath), 'utf8'));
};

export default parseFile;
