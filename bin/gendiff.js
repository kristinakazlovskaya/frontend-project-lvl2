#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<path1> <path2')
  .option('-f, --format <type>', 'output format');

program.parse();