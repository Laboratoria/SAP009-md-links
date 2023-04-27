import chalk from 'chalk';

function extraiLinks (arrayLinks) {
  // Object.values retorna somente o valor do intem dentro do objeto
  // e o item desse objeto com valor é o link, pois está numa string dentro desse objeto
  return arrayLinks.map((objetoLink) => Object.values(objetoLink).join())
}

// função p/ checar o status 
// uma lista será sempre um array iterável
function checkStatus (listaURLs) {
  // fetch lida c/ uma coisa de cada vez, então precisou primeiro 
  // await todas as promises p/ aí sim retornar a lista de URLs
  const arrayStatus = Promise
  .all(
    // map está encontrando os links e depois usando o fetch p/ retornar
    // o código de status (200, 404, etc)
    listaURLs.map(async (url) => {
      // o retorno do fetch é sempre uma promessa, por isso sempre assíncrona
          return fetch(url)
          .then ((response) => {
            return `${response.status} - ${response.statusText}`;
          })
          // mesmo o link com erro vai para a lista impressa pois está dentro do map
          .catch ((erro) => {
            return manejaErros(erro);
          })
        })
      )
  return arrayStatus;
}

function manejaErros (erro) {
  if (erro.cause.code === 'ENOTFOUND') {
    return 'link não encontrado';
  } else {
    return 'ocorreu algum erro';
  }
}

export default async function listaValidada (listaDeLinks) {
  const links = extraiLinks(listaDeLinks);
  return checkStatus(links)
  .then ((status) => {
    return listaDeLinks.map((objeto, indice) => ({
      ...objeto,
      status: status[indice]
    }))
  })
}