import chalk from 'chalk';

function trataErro(erro) {
  throw new Error(chalk.red(erro.code, 'não há arquivo no diretório'));
}

function arquivoNaoExiste(erro) {
  if (erro.code === 'ENOENT') {
    console.log(chalk.redBright.bold('arquivo ou diretório não existe'));
  }
}

function erroArquivo(erro) {
  console.error(chalk.red.bold('Erro ao processar o arquivo', erro));
}

function manejaErros(erro) {
  if (erro.cause.code === 'ENOTFOUND') {
    return chalk.ansi256(196).bold.italic('\u2717 link não encontrado \u2717');
  }
  return 'ocorreu algum erro';
}

export {
  trataErro,
  arquivoNaoExiste,
  erroArquivo,
  manejaErros,
};
