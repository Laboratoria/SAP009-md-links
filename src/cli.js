#!/usr/bin/env node

import { mdLinks } from './md-links.js';
import chalk from 'chalk';
import process from 'process';
import fetch from 'node-fetch';

const caminhoDoArquivo = process.argv[2];

const options = {
  validate: process.argv.includes('--validate'),
  stats: process.argv.includes('--stats')
};

if (options.validate) {
  mdLinks(caminhoDoArquivo, { validate: true })
    .then((informacoes) => {
      informacoes.map((item) => {
        fetch(item.link)
          .then((res) => {
            const status = res.status === 200 ? chalk.green('ok') : chalk.red('fail');
            console.log(`${chalk.blue(item.arquivo)} ${chalk.cyan(item.link)} ${chalk.yellow(status)} ${chalk.yellow(res.status)} ${chalk.green(item.texto)} `);
          })
          .catch((err) => {
            console.log(`${chalk.blue(item.arquivo)} ${chalk.cyan(item.link)} ${chalk.red('fail')} ${chalk.red(err)} ${chalk.green(item.texto)} `);
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
} else if (options.stats) {
  mdLinks(caminhoDoArquivo, { stats: true })
  .then((informacoes) => {
    const links = informacoes.map((item) => item.link);
    console.log(`Total: ${informacoes.length}`);
    console.log(`Unique: ${links.length}`);
  }).catch((err) => {
    console.log(err);
  });
} else if (options.validate && options.stats) {
  mdLinks(caminhoDoArquivo, { validate: true, stats: true})
  .then((informacoes) => {
    const links = informacoes.map((item) => item.link);
    console.log(`Total: ${informacoes.length}`);
    console.log(`Unique: ${links.length}`);
  }).catch((err) => {
    console.log(err);
  });
}

