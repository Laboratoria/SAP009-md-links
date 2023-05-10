import chalk from 'chalk';
import { calculaStats } from './validacao.js';

function imprimeLista(argumentos, resultado) {
  if (argumentos.stats && argumentos.validate) {
    const stats = calculaStats(resultado);
    console.log(
      // eslint-disable-next-line prefer-template
      chalk.yellow(`Total: ${stats.total}`) + '\n' + chalk.green(`Unique: ${stats.unique}`) + '\n' + chalk.red(`Broken: ${stats.broken} `),
    );
  } else if (argumentos.stats) {
    const stats = calculaStats(resultado);
    console.log(
      // eslint-disable-next-line prefer-template
      chalk.ansi256(21).bold(`Links: ${stats.total}`) + '\n' + chalk.ansi256(93).bold(`Unique: ${stats.unique}`),
    );
  } else if (argumentos.validate) {
    resultado.forEach((link) => {
      console.log(
        // eslint-disable-next-line no-bitwise
        `${chalk.yellow(link.file)} | ${chalk.yellow(link.href)} | ${chalk.yellow(link.text)} | ${link.status}`,
      );
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
