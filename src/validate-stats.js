import chalk from 'chalk';

function extraiLinks(arrayLinks) {
  return arrayLinks.map((objetoLink) => objetoLink.href);
}

function manejaErros(erro) {
  if (erro.cause.code === 'ENOTFOUND') {
    return (chalk.magenta('link não encontrado'));
  }
  return 'ocorreu algum erro';
}

function checkStatus(listaURLs) {
  const arrayStatus = Promise.all(
    listaURLs.map((url) => fetch(url)
      .then((response) => {
        if (response.status === 200) {
          return (chalk.whiteBright.bgBlue(` ${response.status} | ${'OK'} `));
        }
        if (response.status !== 200) {
          return (chalk.whiteBright.bgMagenta(` ${response.status} | ${'FAIL'} `));
        }
        return `${response.status} - ${response.statusText}`;
      })
      .catch((erro) => manejaErros(erro))),
  );
  return arrayStatus;
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
  return checkStatus(links)
    .then((status) => listaDeLinks.map((objeto, indice) => ({
      ...objeto,
      status: status[indice],
    })));
}

export {
  extraiLinks,
  manejaErros,
  checkStatus,
  calculaStats,
  listaValidada,
};
