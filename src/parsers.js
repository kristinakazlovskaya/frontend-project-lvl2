import path from 'path';
import { readFileSync } from 'fs';
import yaml from 'js-yaml';

const parseFile = (filePath) => {
  const fileExtension = path.extname(filePath).substring(1);
  const parsers = {
    yaml: yaml.load,
    yml: yaml.load,
    json: JSON.parse,
  };
  return parsers[fileExtension](readFileSync(path.resolve(filePath), 'utf8'));
};

export default parseFile;
