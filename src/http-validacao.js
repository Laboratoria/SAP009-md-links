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

export function statusBroken(listaDeLinks) {
  const links = extraiLinks(listaDeLinks);
  const arrayStatus = checkStatus(links);
  const linksBroken = [];
  return arrayStatus.then((statusLinks) => {
    statusLinks.forEach((status, index) => {
      if (status.includes('FAIL') || status.includes('ENOTFOUND') || status.includes('link não encontrado')) {
        linksBroken.push(links[index]);
      }
    });
    return linksBroken;
  });
}

export function listaValidada(listaDeLinks) {
  const links = extraiLinks(listaDeLinks);
  return checkStatus(links)
    .then((status) => listaDeLinks.map((objeto, indice) => ({
      ...objeto,
      status: status[indice],
    })));
}
