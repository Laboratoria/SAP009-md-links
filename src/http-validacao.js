import fetch from "node-fetch";

function extraiLinks(arrLinks) {
  return arrLinks.map((objetoLink) => Object.values(objetoLink).join());
}



function manejaErros(erro) {
  if (erro.code === "ENOTFOUND") {
    return "link não encontrado";
  } else {
    return "ocorreu algum erro";
  }
}

export default function checaStatus(listaLinks) {
  return Promise.all(
    listaLinks.map((link) => {
      return fetch(link.href)
        .then((response) => ({ ...link, status: response.status, ok: response.ok ? 'ok' : 'fail' }))
        .catch((erro) => ({ ...link, ok: manejaErros(erro) }));
    })
  );
}


function listaValidada(listaDeLinks) {
  const links = extraiLinks(listaDeLinks);
  return checaStatus(links).then((status) =>
    listaDeLinks.map((objeto, indice) => ({
      ...objeto,
      status: status[indice],
    }))
  );
}

// export default { checaStatus, listaValidada }
