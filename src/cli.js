/* eslint-disable import/no-import-module-exports */
/* eslint-disable prefer-template */
/* eslint-disable max-len */

import chalk from 'chalk';
// import fs from 'fs';
// import { extraiLinks } from './mdLink.js';
import { listaValidada, calculaStats } from './validacao.js';

/* PROCESS.ARGV é um obj proprio do Node que representa valores de argumento e objeto, capturamos as informações passadas pela linha de comando */

function imprimeLista(argumentos, resultado) {
  if (argumentos.stats && argumentos.validate) {
    listaValidada(resultado).then((links) => {
      const stats = calculaStats(links);
      // eslint-disable-next-line no-unused-expressions, no-useless-concat
      console.log(chalk.rgb(180, 210, 8).underline.bold(`Total de Links: ${stats.total}`) + '\n' + chalk.ansi256(93).bold(`Links Únicos: ${stats.unique}`) + '\n' + chalk.red(`Links Quebrados: ${stats.broken}`));
    });
  } else if (argumentos.stats) {
    listaValidada(resultado).then((link) => {
      const stats = calculaStats(link);
      // eslint-disable-next-line no-useless-concat
      console.log(chalk.ansi256(202).underline(`Total de Links: ${stats.total}`) + '\n' + chalk.ansi256(93).underline.bold(`Links Únicos: ${stats.unique}`));
    });
  } else if (argumentos.validate) {
    listaValidada(resultado).then((linha) => {
      linha.forEach((link) => {
        console.log(chalk.ansi256(56).bold(`${link.file} | ${link.href} | ${link.text} | ${link.status}`));
      });
    });
  } else {
    resultado.forEach((link) => {
      console.log(
        `${link.file} | ${link.href} | ${link.text}`,
      );
    });
  }
}

// responsavel por mandar nossa lista de links p/ tela do terminal
// const resultao chamará pegaArquivo passando o caminho na posição 2
export { imprimeLista };
