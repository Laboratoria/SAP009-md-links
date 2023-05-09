import chalk from 'chalk';

function trataErro(erro) {
  throw new Error(chalk.red(erro.code, 'não há arquivo no diretório'));
}

function semLinks() {
  console.log(chalk.red('não há links no arquivo'));
}

function arquivoInexistente() {
  console.log(chalk.red('arquivo ou diretório não existe'));
}

function arquivoNaoProcessado() {
  console.error('Erro ao processar o arquivo');
}

function manejaErros(erro) {
  if (erro.cause.code === 'ENOTFOUND') {
    return (chalk.magenta('link não encontrado'));
  }
  return 'ocorreu algum erro';
}

export {
  trataErro,
  semLinks,
  arquivoInexistente,
  arquivoNaoProcessado,
  manejaErros,
};
