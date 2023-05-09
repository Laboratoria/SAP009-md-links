#!/usr/bin/env node

// eslint-disable-next-line import/no-cycle
import { mdLink } from './mdLinks.js';

const parametros = {
  caminho: process.argv[2],
  stats: process.argv.includes('--stats'),
  validate: process.argv.includes('--validate'),
};

mdLink(parametros);
