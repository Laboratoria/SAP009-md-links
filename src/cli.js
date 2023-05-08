#!/usr/bin/env node
import chalk from 'chalk';
import { calculaStats, listaValidada } from './validate-stats.js';

function imprimeLista(argumentos, resultado) {
  if (argumentos.stats && argumentos.validate) {
    listaValidada(resultado).then((links) => {
      const stats = calculaStats(links);
      console.log(
        // eslint-disable-next-line prefer-template
        chalk.bgBlue(` total: ${stats.total} `) + '\n' + chalk.bgBlue(` unique: ${stats.unique} `) + '\n' + chalk.bgBlue(` broken: ${stats.broken} `),
      );
    });
  } else if (argumentos.stats) {
    listaValidada(resultado).then((link) => {
      const stats = calculaStats(link);
      console.log(
        // eslint-disable-next-line prefer-template
        chalk.bgBlue(` total: ${stats.total} `) + '\n' + chalk.bgBlue(` unique: ${stats.unique} `),
      );
    });
  } else if (argumentos.validate) {
    listaValidada(resultado).then((linha) => {
      linha.forEach((link) => {
        console.log(
          `${link.file} | ${chalk.yellow(link.href)} | ${link.text} | ${link.status}`,
        );
      });
    });
  } else {
    resultado.forEach((link) => {
      console.log(`${link.file} | ${link.href} | ${link.text}`);
    });
  }
}

export {
  imprimeLista,
};
