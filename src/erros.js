import chalk from 'chalk';

function tratarErro(erro) {
  throw new Error(chalk.red(erro.code, 'Arquivo ou Diretório não existe2'));
}

function manejaErro(erro) {
  if (erro.cause.code === 'ENOTFOUND') {
    return (chalk.red('Link não encontrado'));
  }
  return 'Ocorreu algum erro';
}

export { tratarErro, manejaErro };
