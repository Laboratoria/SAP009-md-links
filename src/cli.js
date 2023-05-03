#!/usr/bin/env node

import { mdLinks } from './md-links.js';
import chalk from 'chalk';
import process from 'process';

const caminhoDoArquivo = process.argv[2];

const options = {
  validate: process.argv.includes('--validate'),
  stats: process.argv.includes('--stats')
};

if (options.validate) {
  mdLinks(caminhoDoArquivo, { validate: true })
    .then((informacoes) => {
      informacoes.map((item) => {
        const status = item.status === 200 ? chalk.green('ok') : chalk.red('fail');
        console.log(`${chalk.blue(item.arquivo)} ${chalk.cyan(item.link)} ${chalk.green(item.texto)} ${status}`);
      });
    })
    .catch((err) => {
      console.log(err);
    });
} else {
  console.log('teste')
}


// mdLinks(caminhoDoArquivo, options)
//   .then((informacoes) => {
//     informacoes.map((item) => {
//     console.log(`${chalk.blue(item.arquivo)} ${chalk.cyan(item.link)} ${chalk.green(item.texto)}`)
//     })
//   }).catch((err) => {
//       console.log(err);
//   })
