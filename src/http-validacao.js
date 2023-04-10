import fetch from "node-fetch";


function extraiLinks(arrLinks) {
    return arrLinks.map((objetoLink) => Object.values(objetoLink).join());
  }
  
  function checaStatus(listaURLs) {
    return Promise.all(
      listaURLs.map((url) => {
        return fetch(url)
          .then((response) => response.status)
          .catch((erro) => manejaErros(erro));
      })
    );
  }
  
  function manejaErros(erro) {
    if (erro.code === "ENOTFOUND") {
        return "link não encontrado";
    } else {
      return "ocorreu algum erro";
    }
  }
 
  
  export default function listaValidada(listaDeLinks) {
    const links = extraiLinks(listaDeLinks);
    return checaStatus(links).then((status) =>
      listaDeLinks.map((objeto, indice) => ({
        ...objeto,
        status: status[indice],
      }))
    );
  }
  