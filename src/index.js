#!/usr/bin/env node
import chalk from 'chalk';
import { mdLink } from './mdLinks.js';

const parametros = {
  caminho: process.argv[2],
  stats: process.argv.includes('--stats'),
  validate: process.argv.includes('--validate'),
};

mdLink(parametros);

function manejaErro(erro) {
  if (erro.cause.code === 'ENOTFOUND' || 'ENOENT') {
    return (chalk.red('Link não encontrado'));
  }
  return 'Ocorreu algum erro';
}

export { manejaErro };
