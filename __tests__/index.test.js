import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('gendiff', () => {
  const received = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  const expected = readFileSync(getFixturePath('expected_file.txt'), 'utf8');
  expect(received).toEqual(expected);
});
