import formatStylish from './stylish.js';
import formatPlain from './plain.js';
import formatJson from './json.js';

const defineFormatter = (formatName, diff) => {
  const formatters = {
    stylish: formatStylish,
    plain: formatPlain,
    json: formatJson,
  };
  return formatters[formatName](diff);
};

export default defineFormatter;
