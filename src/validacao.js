// eslint-disable-next-line import/no-import-module-exports
import chalk from 'chalk';
// eslint-disable-next-line import/no-cycle
import { manejaErro } from './index.js';

function extraiLinks(arrLinks) {
  return arrLinks.map((objetoLink) => objetoLink.href);
}

// function manejaErro(erro) {
//   if (erro.cause.code === 'ENOTFOUND') {
//     return (chalk.red('Link não encontrado'));
//   }
//   return 'Ocorreu algum erro';
// }

function checkStatus(listaURLs) {
  const arrStatus = Promise.all(
    listaURLs.map((url) => fetch(url)
      .then((response) => {
        if (response.status === 200) {
          return (chalk.green.bold(`${response.status} | ${'OK'}`));
        } if (response.status !== 200) {
          return (chalk.red(`${response.status} | ${'FAIL'}`));
        }
        return `${response.status} - ${response.statusText}`;
      })
      .catch((erro) => manejaErro(erro))),
  );
  return arrStatus;
}
function calculaStats(links) {
  const total = links.length;
  const unique = new Set(links.map((link) => link.href)).size;
  const broken = links.filter((link) => (!link.status.includes('OK'))).length;
  const stats = {
    total,
    unique,
    broken,
  };
  return stats;
}

function listaValidada(listaDeLinks) {
  const links = extraiLinks(listaDeLinks);
  return checkStatus(links).then((status) => listaDeLinks.map((objeto, indice) => ({
    ...objeto,
    status: status[indice],
  })));
}

export { listaValidada, calculaStats };
