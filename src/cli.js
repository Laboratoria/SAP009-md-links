import chalk from 'chalk';
import { calculaStats } from './validacao.js';

function imprimeLista(argumentos, resultado) {
  if (argumentos.stats && argumentos.validate) {
    const stats = calculaStats(resultado);
    console.log(
      // eslint-disable-next-line prefer-template
      chalk.bgBlue(` total: ${stats.total} `) + '\n' + chalk.bgBlue(` unique: ${stats.unique} `) + '\n' + chalk.bgBlue(` broken: ${stats.broken} `),
    );
  } else if (argumentos.stats) {
    const stats = calculaStats(resultado);
    console.log(
      // eslint-disable-next-line prefer-template
      chalk.bgBlue(` total: ${stats.total} `) + '\n' + chalk.bgBlue(` unique: ${stats.unique} `),
    );
  } else if (argumentos.validate) {
    resultado.forEach((link) => {
      console.log(
        chalk.bgBlue(`${link.file} | ${link.href} | ${link.text} | ${link.status}`),
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
