import chalk from 'chalk';

function extraiLinks(arrLinks) {
  return arrLinks.map((objetoLink) => objetoLink.href);
}

function manejaErro(erro) {
  if (erro.cause.code === 'ENOTFOUND') {
    return (chalk.red('Link não encontrado'));
  }
  return 'Ocorreu algum erro';
}

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

// export default async function listaValidada (listaDeLinks) {
//     const links = extraiLinks(listaDeLinks);
//     const status = await checkStatus(links);
//     return status;
// }
// export function statusBroken(arrStatus){
//     const linksBroken = checkStatus(arrStatus)
//     arrStatus.map(response) => {
//         .then(response.status !==200) => {
//             linksBroken.join()
//         }
//     }
//     return linksBroken.length
// }



export default function listaValidada(listaDeLinks) {
  const links = extraiLinks(listaDeLinks);
  return checkStatus(links)
    .then((status) => listaDeLinks.map((objeto, indice) => ({
      ...objeto,
      status: status[indice],
    }))).catch((error) => {
      console.error(error);
    });
}
