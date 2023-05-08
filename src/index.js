#!/usr/bin/env node
import { processaTexto } from './md-links.js';

const parametros = {
  caminho: process.argv[2],
  stats: process.argv.includes('--stats'),
  validate: process.argv.includes('--validate'),
};

processaTexto(parametros);
