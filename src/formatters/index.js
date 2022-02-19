import formatStylish from './stylish.js';
import formatPlain from './plain.js';

const defineFormatter = (formatName, diff) => {
  const formatters = {
    stylish: formatStylish,
    plain: formatPlain,
  };
  return formatters[formatName](diff);
};

export default defineFormatter;
