import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('gendiff between json and yml files in stylish format', () => {
  const received = genDiff(getFixturePath('file1.json'), getFixturePath('file2.yml'), 'stylish');
  const expected = readFileSync(getFixturePath('expected_stylish.txt'), 'utf8');
  expect(received).toEqual(expected);
});

test('gendiff between json and yml files without format', () => {
  const received = genDiff(getFixturePath('file1.json'), getFixturePath('file2.yml'));
  const expected = readFileSync(getFixturePath('expected_stylish.txt'), 'utf8');
  expect(received).toEqual(expected);
});

test('gendiff between json and yml files in plain format', () => {
  const received = genDiff(getFixturePath('file1.json'), getFixturePath('file2.yml'), 'plain');
  const expected = readFileSync(getFixturePath('expected_plain.txt'), 'utf8');
  expect(received).toEqual(expected);
});
